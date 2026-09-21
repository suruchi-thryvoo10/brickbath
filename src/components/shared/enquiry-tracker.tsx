"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ButtonLink } from "@/components/ui/button";
import { Check, Clock, Phone, WhatsApp } from "@/components/ui/icons";
import { EmptyState, Skeleton } from "@/components/ui/primitives";
import { site, whatsappLink } from "@/lib/site";
import { useShop, type Enquiry } from "@/lib/store/shop-store";
import { cx, formatDate, formatPrice } from "@/lib/utils/format";

const STAGES: { key: Enquiry["status"]; label: string; note: string }[] = [
  { key: "submitted", label: "Received", note: "Logged and assigned to a designer" },
  { key: "reviewing", label: "Under review", note: "We check dimensions, pressure and stock" },
  { key: "quoted", label: "Quote sent", note: "Itemised, with every material named" },
  { key: "closed", label: "Closed", note: "Accepted, declined or lapsed" },
];

export function EnquiryTracker() {
  const { enquiries, ready } = useShop();
  const [search, setSearch] = useState("");

  if (!ready) {
    return (
      <div className="grid gap-4">
        <Skeleton className="h-40" />
        <Skeleton className="h-40" />
      </div>
    );
  }

  if (enquiries.length === 0) {
    return (
      <EmptyState
        icon={<Clock width={22} height={22} />}
        title="No enquiries on this device"
        description="Enquiries you send from here show up in this list with their reference number and current stage. If you sent one from another device or by phone, call us with the reference and we'll pull it up."
        action={
          <div className="flex flex-wrap justify-center gap-3">
            <ButtonLink href="/quote">Start an enquiry</ButtonLink>
            <ButtonLink href={`tel:${site.phone}`} variant="outline" external>
              <Phone width={16} height={16} />
              {site.phoneDisplay}
            </ButtonLink>
          </div>
        }
      />
    );
  }

  const filtered = search.trim()
    ? enquiries.filter((e) =>
        `${e.reference} ${e.name} ${e.city} ${e.topic}`
          .toLowerCase()
          .includes(search.trim().toLowerCase()),
      )
    : enquiries;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6">
        <p className="text-[0.875rem] text-ink-600">
          {enquiries.length} enquir{enquiries.length === 1 ? "y" : "ies"} on this device
        </p>
        <div className="w-full sm:w-64">
          <label htmlFor="enquiry-search" className="sr-only">
            Search enquiries
          </label>
          <input
            id="enquiry-search"
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by reference…"
            className="h-10 w-full rounded-[10px] border border-ink-200 px-3.5 text-[0.875rem] outline-none transition-colors focus:border-ink-900"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="rounded-[12px] border border-dashed border-ink-200 bg-ink-50 p-8 text-center text-[0.875rem] text-ink-600">
          No enquiry matches “{search}”.
        </p>
      ) : (
        <ul className="grid gap-5">
          {filtered.map((enquiry) => (
            <li
              key={enquiry.id}
              className="overflow-hidden rounded-[18px] border border-ink-200 bg-white"
            >
              <div className="flex flex-wrap items-start justify-between gap-4 border-b border-ink-100 p-6">
                <div>
                  <p className="font-mono text-[0.875rem] font-semibold text-ink-900">
                    {enquiry.reference}
                  </p>
                  <p className="mt-1 text-[0.8125rem] text-ink-500">
                    {formatDate(enquiry.createdAt)} · {enquiry.city} · {enquiry.topic}
                  </p>
                </div>
                <div className="flex gap-2">
                  <ButtonLink
                    href={whatsappLink(
                      `Hi Brick & Bath — checking in on enquiry ${enquiry.reference}.`,
                    )}
                    variant="whatsapp"
                    size="sm"
                    external
                  >
                    <WhatsApp width={15} height={15} />
                    Follow up
                  </ButtonLink>
                </div>
              </div>

              {/* Stage tracker */}
              <ol className="grid gap-px bg-ink-100 sm:grid-cols-4">
                {STAGES.map((stage, i) => {
                  const currentIndex = STAGES.findIndex((s) => s.key === enquiry.status);
                  const done = i <= currentIndex;
                  return (
                    <li key={stage.key} className="bg-white p-5">
                      <span
                        className={cx(
                          "flex size-7 items-center justify-center rounded-full text-[0.6875rem] font-semibold",
                          done
                            ? "bg-ink-900 text-ink-50"
                            : "border border-ink-200 text-ink-400",
                        )}
                      >
                        {done ? <Check width={14} height={14} /> : i + 1}
                      </span>
                      <p
                        className={cx(
                          "mt-3 text-[0.875rem] font-medium",
                          done ? "text-ink-900" : "text-ink-400",
                        )}
                      >
                        {stage.label}
                      </p>
                      <p className="mt-1 text-[0.75rem] leading-snug text-ink-500">{stage.note}</p>
                    </li>
                  );
                })}
              </ol>

              {enquiry.items.length > 0 ? (
                <div className="border-t border-ink-100 p-6">
                  <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-ink-400">
                    Products in this enquiry
                  </p>
                  <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                    {enquiry.items.map((item) => (
                      <li key={item.slug} className="flex items-center gap-3">
                        <span className="relative size-11 shrink-0 overflow-hidden rounded-[8px] bg-ink-100">
                          <Image src={item.image} alt="" fill sizes="44px" className="object-cover" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <Link
                            href={`/products/${item.slug}`}
                            className="block truncate text-[0.875rem] text-ink-900 hover:underline"
                          >
                            {item.name}
                          </Link>
                          {item.variant ? (
                            <span className="block truncate text-[0.75rem] text-ink-500">
                              {item.variant}
                            </span>
                          ) : null}
                        </span>
                        <span className="text-[0.8125rem] text-ink-600">
                          {formatPrice(item.price)}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              <div className="border-t border-ink-100 bg-ink-50/60 p-6">
                <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-ink-400">
                  Activity
                </p>
                <ul className="mt-3 grid gap-2">
                  {enquiry.timeline.map((entry) => (
                    <li key={entry.at} className="text-[0.8125rem] text-ink-700">
                      <span className="font-medium text-ink-900">{entry.label}</span>
                      <span className="text-ink-500"> — {entry.note}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
