"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useSyncExternalStore,
  type ReactNode,
} from "react";

export type EnquiryStatus = "submitted" | "reviewing" | "quoted" | "closed";

export type EnquiryLine = {
  slug: string;
  name: string;
  image: string;
  price: number;
  variant?: string;
};

export type Enquiry = {
  id: string;
  reference: string;
  createdAt: string;
  status: EnquiryStatus;
  name: string;
  email: string;
  phone: string;
  city: string;
  message: string;
  topic: string;
  items: EnquiryLine[];
  timeline: { at: string; label: string; note: string }[];
};

type State = {
  wishlist: string[];
  compare: string[];
  recent: string[];
  enquiryCart: EnquiryLine[];
  enquiries: Enquiry[];
};

const STORAGE_KEY = "bnb.shop.v1";
export const COMPARE_LIMIT = 4;
const RECENT_LIMIT = 12;

const initialState: State = {
  wishlist: [],
  compare: [],
  recent: [],
  enquiryCart: [],
  enquiries: [],
};

type Action =
  | { type: "hydrate"; state: State }
  | { type: "toggleWishlist"; slug: string }
  | { type: "toggleCompare"; slug: string }
  | { type: "clearCompare" }
  | { type: "addRecent"; slug: string }
  | { type: "addEnquiryItem"; item: EnquiryLine }
  | { type: "removeEnquiryItem"; slug: string }
  | { type: "clearEnquiryCart" }
  | { type: "addEnquiry"; enquiry: Enquiry };

function toggle(list: string[], slug: string, limit?: number): string[] {
  if (list.includes(slug)) return list.filter((s) => s !== slug);
  const next = [...list, slug];
  return limit ? next.slice(-limit) : next;
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "hydrate":
      return action.state;
    case "toggleWishlist":
      return { ...state, wishlist: toggle(state.wishlist, action.slug) };
    case "toggleCompare":
      return { ...state, compare: toggle(state.compare, action.slug, COMPARE_LIMIT) };
    case "clearCompare":
      return { ...state, compare: [] };
    case "addRecent":
      // Already the most recent view — returning the same state keeps callers
      // whose effects depend on it from looping.
      if (state.recent[0] === action.slug) return state;
      return {
        ...state,
        recent: [action.slug, ...state.recent.filter((s) => s !== action.slug)].slice(
          0,
          RECENT_LIMIT,
        ),
      };
    case "addEnquiryItem":
      if (state.enquiryCart.some((i) => i.slug === action.item.slug)) return state;
      return { ...state, enquiryCart: [...state.enquiryCart, action.item] };
    case "removeEnquiryItem":
      return {
        ...state,
        enquiryCart: state.enquiryCart.filter((i) => i.slug !== action.slug),
      };
    case "clearEnquiryCart":
      return { ...state, enquiryCart: [] };
    case "addEnquiry":
      return { ...state, enquiries: [action.enquiry, ...state.enquiries] };
    default:
      return state;
  }
}

type ShopContextValue = State & {
  ready: boolean;
  toggleWishlist: (slug: string) => void;
  isWishlisted: (slug: string) => boolean;
  toggleCompare: (slug: string) => void;
  isCompared: (slug: string) => boolean;
  clearCompare: () => void;
  trackView: (slug: string) => void;
  addEnquiryItem: (item: EnquiryLine) => void;
  removeEnquiryItem: (slug: string) => void;
  clearEnquiryCart: () => void;
  inEnquiry: (slug: string) => boolean;
  submitEnquiry: (input: Omit<Enquiry, "id" | "reference" | "createdAt" | "status" | "timeline">) => Enquiry;
};

const ShopContext = createContext<ShopContextValue | null>(null);

function reference(): string {
  const now = new Date();
  const stamp = `${now.getFullYear()}`.slice(2) + `${now.getMonth() + 1}`.padStart(2, "0");
  const rand = Math.random().toString(36).slice(2, 7).toUpperCase();
  return `BNB-${stamp}-${rand}`;
}

export function ShopProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  // `ready` gates persistence so the first (empty) render never overwrites
  // stored state, and lets consumers render skeletons instead of a flash.
  const [ready, setReady] = useReducer(() => true, false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<State>;
        dispatch({ type: "hydrate", state: { ...initialState, ...parsed } });
      }
    } catch {
      // Private mode or corrupted payload — carry on with an empty store.
    }
    setReady();
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Quota or private mode; state still works for this session.
    }
  }, [state, ready]);

  const submitEnquiry = useCallback<ShopContextValue["submitEnquiry"]>((input) => {
    const now = new Date().toISOString();
    const enquiry: Enquiry = {
      ...input,
      id: `${Date.now()}`,
      reference: reference(),
      createdAt: now,
      status: "submitted",
      timeline: [
        {
          at: now,
          label: "Enquiry received",
          note: "A designer will call you within one working day.",
        },
      ],
    };
    dispatch({ type: "addEnquiry", enquiry });
    dispatch({ type: "clearEnquiryCart" });
    return enquiry;
  }, []);

  // Dispatch-only actions never change identity, so effects that depend on
  // them (such as recording a product view) run exactly once.
  const actions = useMemo(
    () => ({
      toggleWishlist: (slug: string) => dispatch({ type: "toggleWishlist" as const, slug }),
      toggleCompare: (slug: string) => dispatch({ type: "toggleCompare" as const, slug }),
      clearCompare: () => dispatch({ type: "clearCompare" as const }),
      trackView: (slug: string) => dispatch({ type: "addRecent" as const, slug }),
      addEnquiryItem: (item: EnquiryLine) => dispatch({ type: "addEnquiryItem" as const, item }),
      removeEnquiryItem: (slug: string) => dispatch({ type: "removeEnquiryItem" as const, slug }),
      clearEnquiryCart: () => dispatch({ type: "clearEnquiryCart" as const }),
    }),
    [],
  );

  const value = useMemo<ShopContextValue>(
    () => ({
      ...state,
      ready,
      ...actions,
      isWishlisted: (slug) => state.wishlist.includes(slug),
      isCompared: (slug) => state.compare.includes(slug),
      inEnquiry: (slug) => state.enquiryCart.some((i) => i.slug === slug),
      submitEnquiry,
    }),
    [state, ready, actions, submitEnquiry],
  );

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop(): ShopContextValue {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error("useShop must be used inside <ShopProvider>");
  return ctx;
}

/** True only after the client has mounted — for suppressing hydration mismatch. */
export function useMounted(): boolean {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}
