import Link from "next/link";
import { Rating } from "@/components/ui/primitives";
import { testimonials } from "@/lib/data/content";
import { getProject } from "@/lib/data/projects";
import { formatDate } from "@/lib/utils/format";

export function TestimonialGrid({ limit = 6 }: { limit?: number }) {
  return (
    <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {testimonials.slice(0, limit).map((t, i) => {
        const project = t.project ? getProject(t.project) : undefined;
        return (
          <li
            key={t.id}
            className="reveal flex flex-col rounded-[16px] border border-ink-200 bg-white p-6 transition-shadow duration-300 hover:shadow-soft"
            style={{ "--reveal-delay": `${i * 60}ms` } as React.CSSProperties}
          >
            <Rating value={t.rating} showValue={false} size={15} />
            <blockquote className="mt-4 flex-1 text-[0.9375rem] leading-relaxed text-ink-700">
              “{t.quote}”
            </blockquote>
            <footer className="mt-5 border-t border-ink-100 pt-4">
              <p className="text-[0.875rem] font-medium text-ink-900">{t.name}</p>
              <p className="mt-0.5 text-[0.75rem] text-ink-500">
                {t.location} · {formatDate(t.date)}
              </p>
              {project ? (
                <Link
                  href={`/projects/${project.slug}`}
                  className="mt-2 inline-block text-[0.75rem] font-medium text-brass-700 underline underline-offset-4"
                >
                  See this project →
                </Link>
              ) : null}
            </footer>
          </li>
        );
      })}
    </ul>
  );
}
