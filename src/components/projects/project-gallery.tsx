"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/primitives";
import { projectCategories, projects, projectStyles } from "@/lib/data/projects";
import { cx } from "@/lib/utils/format";

type Axis = "style" | "category";

export function ProjectGallery() {
  const [axis, setAxis] = useState<Axis>("style");
  const [value, setValue] = useState<string>("All");

  const options = axis === "style" ? projectStyles : projectCategories;

  const filtered = useMemo(() => {
    if (value === "All") return projects;
    return projects.filter((p) => (axis === "style" ? p.style : p.category) === value);
  }, [axis, value]);

  return (
    <div>
      <div className="flex flex-col gap-4 border-b border-ink-200 pb-5 sm:flex-row sm:items-center sm:justify-between">
        <div
          className="inline-flex rounded-[10px] bg-ink-100 p-1"
          role="tablist"
          aria-label="Group projects by"
        >
          {(["style", "category"] as Axis[]).map((a) => (
            <button
              key={a}
              role="tab"
              aria-selected={axis === a}
              onClick={() => {
                setAxis(a);
                setValue("All");
              }}
              className={cx(
                "rounded-[8px] px-4 py-2 text-[0.8125rem] font-medium capitalize transition-colors",
                axis === a ? "bg-white text-ink-900 shadow-soft" : "text-ink-600 hover:text-ink-900",
              )}
            >
              By {a === "category" ? "room type" : "style"}
            </button>
          ))}
        </div>

        <p className="text-[0.8125rem] text-ink-500" role="status" aria-live="polite">
          {filtered.length} project{filtered.length === 1 ? "" : "s"}
        </p>
      </div>

      <div className="flex flex-wrap gap-2 py-5">
        {["All", ...options].map((option) => (
          <button
            key={option}
            type="button"
            aria-pressed={value === option}
            onClick={() => setValue(option)}
            className={cx(
              "rounded-full border px-4 py-2 text-[0.8125rem] transition-all duration-200",
              value === option
                ? "border-ink-900 bg-ink-900 text-ink-50"
                : "border-ink-200 text-ink-700 hover:border-ink-900",
            )}
          >
            {option}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          title="No projects in that style yet"
          description="We photograph every handover, so this fills up fast. Try another filter meanwhile."
          action={<Button variant="outline" onClick={() => setValue("All")}>Show all projects</Button>}
        />
      ) : (
        <ul className="mt-2 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project, i) => (
            <li key={project.slug}>
              <Link
                href={`/projects/${project.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-[18px] border border-ink-200 bg-white transition-all duration-400 hover:-translate-y-1 hover:shadow-lift"
              >
                <span className="relative block aspect-4/3 overflow-hidden bg-ink-100">
                  <Image
                    src={project.afterImage}
                    alt=""
                    fill
                    priority={i < 3}
                    loading={i < 3 ? "eager" : "lazy"}
                    sizes="(min-width:1024px) 31vw, (min-width:768px) 46vw, 92vw"
                    className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[0.625rem] font-semibold uppercase tracking-[0.12em] text-ink-800 backdrop-blur-sm">
                    {project.style}
                  </span>
                </span>
                <span className="flex flex-1 flex-col p-6">
                  <span className="font-display text-lg leading-snug text-ink-900">
                    {project.title}
                  </span>
                  <span className="mt-1.5 text-[0.75rem] text-ink-500">
                    {project.location} · {project.areaSqft} sq.ft. · {project.durationDays} days
                  </span>
                  <span className="mt-3 flex-1 text-[0.875rem] leading-relaxed text-ink-600">
                    {project.summary}
                  </span>
                  <span className="mt-4 flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-ink-100 px-2.5 py-1 text-[0.6875rem] text-ink-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
