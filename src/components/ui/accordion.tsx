"use client";

import { useId, useState, type ReactNode } from "react";
import { cx } from "@/lib/utils/format";

export type AccordionItem = {
  id: string;
  question: ReactNode;
  answer: ReactNode;
  meta?: ReactNode;
};

/**
 * Disclosure list built on buttons + aria-expanded rather than <details>, so
 * the open/close transition can be animated and only one panel stays open.
 */
export function Accordion({
  items,
  defaultOpenId,
  allowMultiple = false,
}: {
  items: AccordionItem[];
  defaultOpenId?: string;
  allowMultiple?: boolean;
}) {
  const baseId = useId();
  const [open, setOpen] = useState<string[]>(defaultOpenId ? [defaultOpenId] : []);

  const toggle = (id: string) =>
    setOpen((current) => {
      if (current.includes(id)) return current.filter((x) => x !== id);
      return allowMultiple ? [...current, id] : [id];
    });

  return (
    <div className="divide-y divide-ink-200 border-y border-ink-200">
      {items.map((item) => {
        const isOpen = open.includes(item.id);
        const panelId = `${baseId}-${item.id}`;
        return (
          <div key={item.id} id={item.id} className="scroll-mt-28">
            <h3>
              <button
                type="button"
                onClick={() => toggle(item.id)}
                aria-expanded={isOpen}
                aria-controls={panelId}
                className="group flex w-full items-start justify-between gap-6 py-5 text-left transition-colors hover:text-brass-700"
              >
                <span className="flex-1">
                  <span className="block font-sans text-[0.975rem] font-medium leading-snug text-ink-900 group-hover:text-brass-700">
                    {item.question}
                  </span>
                  {item.meta ? (
                    <span className="mt-1 block text-xs text-ink-500">{item.meta}</span>
                  ) : null}
                </span>
                <span
                  aria-hidden="true"
                  className={cx(
                    "mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full border border-ink-200 text-ink-600 transition-all duration-300",
                    isOpen && "rotate-45 border-ink-900 bg-ink-900 text-ink-50",
                  )}
                >
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              hidden={!isOpen}
              className="grid transition-all duration-300 ease-out"
            >
              <div className="max-w-3xl pb-6 text-[0.9375rem] leading-relaxed text-ink-600">
                {item.answer}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
