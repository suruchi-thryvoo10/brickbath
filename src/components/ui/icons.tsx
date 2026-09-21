import type { ComponentType, SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

/** All icons share a 24px grid, 1.5 stroke and `currentColor`. */
function Base({ children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

export const ArrowRight = (p: IconProps) => (
  <Base {...p}>
    <path d="M4 12h15m0 0-5.5-5.5M19 12l-5.5 5.5" />
  </Base>
);

export const ArrowLeft = (p: IconProps) => (
  <Base {...p}>
    <path d="M20 12H5m0 0 5.5-5.5M5 12l5.5 5.5" />
  </Base>
);

export const ChevronDown = (p: IconProps) => (
  <Base {...p}>
    <path d="m6 9 6 6 6-6" />
  </Base>
);

export const ChevronRight = (p: IconProps) => (
  <Base {...p}>
    <path d="m9 6 6 6-6 6" />
  </Base>
);

export const Search = (p: IconProps) => (
  <Base {...p}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.2-3.2" />
  </Base>
);

export const Heart = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 20s-7.5-4.6-7.5-9.6A4.4 4.4 0 0 1 12 7.6a4.4 4.4 0 0 1 7.5 2.8c0 5-7.5 9.6-7.5 9.6Z" />
  </Base>
);

export const Scale = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 4v16M7 8h10M4.5 8 2 15h5zM19.5 8 17 15h5z" />
    <path d="M2 15a2.5 2.5 0 0 0 5 0M17 15a2.5 2.5 0 0 0 5 0" />
  </Base>
);

export const Close = (p: IconProps) => (
  <Base {...p}>
    <path d="M6 6 18 18M18 6 6 18" />
  </Base>
);

export const Menu = (p: IconProps) => (
  <Base {...p}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </Base>
);

export const Phone = (p: IconProps) => (
  <Base {...p}>
    <path d="M6.5 3h3l1.5 4-2 1.5a12 12 0 0 0 6.5 6.5L17 13l4 1.5v3a2.5 2.5 0 0 1-2.7 2.5A16.5 16.5 0 0 1 3.5 5.7 2.5 2.5 0 0 1 6 3Z" />
  </Base>
);

export const Mail = (p: IconProps) => (
  <Base {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2.5" />
    <path d="m3.5 7 8.5 6 8.5-6" />
  </Base>
);

export const Pin = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11Z" />
    <circle cx="12" cy="10" r="2.5" />
  </Base>
);

export const WhatsApp = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" {...p}>
    <path d="M12.04 2c-5.5 0-9.96 4.46-9.96 9.96 0 1.76.46 3.48 1.34 5L2 22l5.2-1.36a9.9 9.9 0 0 0 4.84 1.24h.01c5.5 0 9.96-4.46 9.96-9.96A9.9 9.9 0 0 0 19.1 4.9 9.9 9.9 0 0 0 12.04 2Zm0 1.86c2.17 0 4.2.84 5.74 2.38a8.05 8.05 0 0 1 2.38 5.73c0 4.48-3.64 8.1-8.12 8.1a8.2 8.2 0 0 1-4.14-1.13l-.3-.18-3.08.8.82-3-.19-.31a8.06 8.06 0 0 1-1.24-4.29c0-4.47 3.64-8.1 8.13-8.1Zm-2.6 4.1c-.16 0-.41.06-.63.29-.21.23-.82.8-.82 1.95 0 1.15.84 2.26.96 2.42.12.15 1.63 2.6 4.03 3.55 1.99.79 2.4.63 2.83.59.43-.04 1.4-.57 1.6-1.13.2-.55.2-1.03.14-1.13-.06-.1-.21-.16-.44-.28-.23-.11-1.4-.69-1.61-.77-.22-.08-.38-.12-.53.12-.16.23-.61.77-.75.93-.14.16-.28.18-.5.06-.23-.12-.98-.36-1.87-1.15-.69-.61-1.16-1.37-1.3-1.6-.13-.23-.01-.35.1-.47.1-.1.23-.27.34-.4.12-.14.15-.24.23-.4.08-.15.04-.29-.02-.4-.06-.12-.52-1.28-.72-1.75-.19-.46-.38-.4-.52-.4h-.45Z" />
  </svg>
);

export const Check = (p: IconProps) => (
  <Base {...p}>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </Base>
);

export const Star = ({ filled = false, ...p }: IconProps & { filled?: boolean }) => (
  <svg
    viewBox="0 0 24 24"
    fill={filled ? "currentColor" : "none"}
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
    {...p}
  >
    <path d="m12 3.5 2.6 5.3 5.9.85-4.25 4.15 1 5.85L12 16.9l-5.25 2.75 1-5.85L3.5 9.65l5.9-.85z" />
  </svg>
);

export const Share = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 3v12m0-12L8 7m4-4 4 4" />
    <path d="M5 13v5.5A1.5 1.5 0 0 0 6.5 20h11a1.5 1.5 0 0 0 1.5-1.5V13" />
  </Base>
);

export const Sparkle = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 3.5 13.7 9l5.5 1.7-5.5 1.7L12 18l-1.7-5.6L4.8 10.7 10.3 9z" />
  </Base>
);

export const Shield = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 3.5 5 6v5.5c0 4.2 2.9 7.4 7 9 4.1-1.6 7-4.8 7-9V6z" />
    <path d="m9.2 12 2 2 3.6-4" />
  </Base>
);

export const Truck = (p: IconProps) => (
  <Base {...p}>
    <path d="M3 7.5A1.5 1.5 0 0 1 4.5 6H14v10H4.5A1.5 1.5 0 0 1 3 14.5z" />
    <path d="M14 9h3.4a2 2 0 0 1 1.7 1l1.9 3v3H14z" />
    <circle cx="7.5" cy="17.5" r="1.8" />
    <circle cx="17" cy="17.5" r="1.8" />
  </Base>
);

export const Ruler = (p: IconProps) => (
  <Base {...p}>
    <rect x="2.5" y="8" width="19" height="8" rx="1.5" />
    <path d="M7 8v3M11 8v4M15 8v3M19 8v4" />
  </Base>
);

export const Clock = (p: IconProps) => (
  <Base {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 2" />
  </Base>
);

export const Filter = (p: IconProps) => (
  <Base {...p}>
    <path d="M3.5 6h17M6.5 12h11M10 18h4" />
  </Base>
);

export const Grid = (p: IconProps) => (
  <Base {...p}>
    <rect x="3.5" y="3.5" width="7" height="7" rx="1.5" />
    <rect x="13.5" y="3.5" width="7" height="7" rx="1.5" />
    <rect x="3.5" y="13.5" width="7" height="7" rx="1.5" />
    <rect x="13.5" y="13.5" width="7" height="7" rx="1.5" />
  </Base>
);

export const Droplet = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 3.5c3 3.6 5.5 6.6 5.5 9.4A5.5 5.5 0 0 1 6.5 13c0-2.8 2.5-5.8 5.5-9.5Z" />
  </Base>
);

export const Waves = (p: IconProps) => (
  <Base {...p}>
    <path d="M2.5 9c2-2 3.5-2 5.5 0s3.5 2 5.5 0 3.5-2 5.5 0M2.5 14c2-2 3.5-2 5.5 0s3.5 2 5.5 0 3.5-2 5.5 0" />
  </Base>
);

export const Sun = (p: IconProps) => (
  <Base {...p}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2.5v2M12 19.5v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M2.5 12h2M19.5 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
  </Base>
);

export const Cabinet = (p: IconProps) => (
  <Base {...p}>
    <rect x="4" y="4" width="16" height="16" rx="2" />
    <path d="M4 12h16M10 8.5h1M10 15.5h1" />
  </Base>
);

export const Shell = (p: IconProps) => (
  <Base {...p}>
    <path d="M4 10h16a8 8 0 0 1-8 9 8 8 0 0 1-8-9Z" />
    <path d="M9 4.5c0 2.2-1 4-2 5.5M15 4.5c0 2.2 1 4 2 5.5" />
  </Base>
);

export const Panel = (p: IconProps) => (
  <Base {...p}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="1.5" />
    <path d="M12 3.5v17M7.5 3.5v17M16.5 3.5v17" />
  </Base>
);

export const Hook = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 4v8a4 4 0 0 1-8 0" />
    <circle cx="12" cy="18" r="2.5" />
  </Base>
);

export const categoryIcons: Record<string, ComponentType<IconProps>> = {
  droplet: Droplet,
  shell: Shell,
  grid: Grid,
  cabinet: Cabinet,
  waves: Waves,
  sun: Sun,
  hook: Hook,
  panel: Panel,
};
