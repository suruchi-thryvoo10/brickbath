import Image from "next/image";
import type { ReactNode } from "react";
import { Breadcrumbs, type Crumb } from "@/components/ui/primitives";
import { cx } from "@/lib/utils/format";

export function PageHero({
  eyebrow,
  title,
  intro,
  crumbs,
  image,
  actions,
  aside,
  tone = "light",
}: {
  eyebrow?: string;
  title: string;
  intro?: ReactNode;
  crumbs: Crumb[];
  image?: string;
  actions?: ReactNode;
  aside?: ReactNode;
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark" || Boolean(image);

  return (
    <section
      className={cx(
        "relative overflow-hidden",
        image ? "bg-ink-900" : dark ? "bg-ink-900" : "bg-ink-50",
      )}
    >
      {image ? (
        <>
          <Image
            src={image}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-45"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink-950/85 via-ink-950/55 to-ink-950/20" />
        </>
      ) : null}

      <div className="container-page relative py-10 md:py-14">
        <Breadcrumbs
          items={crumbs}
          className={cx(dark && "[&_a]:text-ink-300 [&_a:hover]:text-ink-50 [&_span]:text-ink-100 text-ink-400")}
        />

        <div className="mt-6 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            {eyebrow ? (
              <p className={cx("eyebrow", dark && "text-brass-400")}>{eyebrow}</p>
            ) : null}
            <h1
              className={cx(
                "mt-3 text-[clamp(2rem,4.6vw,3.25rem)] leading-[1.04]",
                dark ? "text-ink-50" : "text-ink-900",
              )}
            >
              {title}
            </h1>
            {intro ? (
              <div
                className={cx(
                  "mt-5 text-[1.0625rem] leading-relaxed",
                  dark ? "text-ink-300" : "text-ink-600",
                )}
              >
                {intro}
              </div>
            ) : null}
            {actions ? <div className="mt-7 flex flex-wrap gap-3">{actions}</div> : null}
          </div>
          {aside ? <div className="shrink-0">{aside}</div> : null}
        </div>
      </div>
    </section>
  );
}
