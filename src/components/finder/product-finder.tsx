"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ProductCard } from "@/components/product/product-card";
import { Button, ButtonLink } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Sparkle } from "@/components/ui/icons";
import { EmptyState } from "@/components/ui/primitives";
import { categories } from "@/lib/data/categories";
import { collections } from "@/lib/data/collections";
import { products } from "@/lib/data/products";
import type { Product } from "@/lib/data/types";
import { cx } from "@/lib/utils/format";

type Question = {
  id: string;
  title: string;
  hint: string;
  multi?: boolean;
  options: { value: string; label: string; description?: string }[];
};

const QUESTIONS: Question[] = [
  {
    id: "room",
    title: "Which room are we specifying?",
    hint: "This sets the scale, the slip rating and how hard the finishes need to work.",
    options: [
      { value: "Master bath", label: "Master bathroom", description: "Daily use, usually the largest" },
      { value: "Guest bath", label: "Guest bathroom", description: "Occasional use, smaller budget" },
      { value: "Powder room", label: "Powder room", description: "WC and basin only — a place to be bold" },
      { value: "Service bath", label: "Service or utility", description: "Hard-wearing and inexpensive" },
    ],
  },
  {
    id: "need",
    title: "What are you shopping for?",
    hint: "Pick as many as apply — we will build a shortlist across all of them.",
    multi: true,
    options: categories.map((c) => ({ value: c.slug, label: c.name, description: c.tagline })),
  },
  {
    id: "style",
    title: "Which of these feels like your bathroom?",
    hint: "Style drives finish and material more than anything else in the specification.",
    options: [
      { value: "Modern", label: "Modern", description: "Clean lines, flush detailing" },
      { value: "Minimal", label: "Minimal", description: "As little visible hardware as possible" },
      { value: "Luxury", label: "Luxury", description: "Stone, brass, layered lighting" },
      { value: "Classic", label: "Classic", description: "Proportion and warmth over novelty" },
      { value: "Organic", label: "Organic", description: "Stone, terracotta, visible making" },
      { value: "Industrial", label: "Industrial", description: "Steel grids, reeded glass, dark tile" },
    ],
  },
  {
    id: "finish",
    title: "Which metal finish are you drawn to?",
    hint: "Matte and brushed finishes hide hard-water spotting far better than polished chrome.",
    options: [
      { value: "Brushed Brass", label: "Brushed brass", description: "Warm, forgiving, currently everywhere" },
      { value: "Matte Black", label: "Matte black", description: "Graphic, hides water marks best" },
      { value: "Chrome", label: "Chrome", description: "Neutral and the least expensive" },
      { value: "Brushed Nickel", label: "Brushed nickel", description: "Softer than chrome, cooler than brass" },
    ],
  },
  {
    id: "tier",
    title: "Where should we pitch it?",
    hint: "You can mix tiers — this just weights the shortlist.",
    options: [
      { value: "value", label: "Sensible", description: "Hard-wearing, well priced" },
      { value: "premium", label: "Premium", description: "Where most of our clients land" },
      { value: "luxury", label: "No compromises", description: "Stone, bespoke joinery, wellness" },
    ],
  },
  {
    id: "priority",
    title: "What matters most?",
    hint: "The tie-breaker when two products are otherwise equal.",
    options: [
      { value: "rating", label: "Proven in other homes", description: "Highest rated, most reviewed" },
      { value: "stock", label: "Available now", description: "In stock, no lead time" },
      { value: "design", label: "The design", description: "Our designers' picks first" },
      { value: "value", label: "Value for money", description: "On offer, best price per feature" },
    ],
  },
];

type Answers = Record<string, string[]>;

export function ProductFinder() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [finished, setFinished] = useState(false);

  const question = QUESTIONS[step];
  const current = answers[question?.id] ?? [];

  const select = (value: string) => {
    setAnswers((a) => {
      const existing = a[question.id] ?? [];
      if (question.multi) {
        return {
          ...a,
          [question.id]: existing.includes(value)
            ? existing.filter((v) => v !== value)
            : [...existing, value],
        };
      }
      return { ...a, [question.id]: [value] };
    });
    if (!question.multi) {
      window.setTimeout(() => {
        if (step === QUESTIONS.length - 1) setFinished(true);
        else setStep((s) => s + 1);
      }, 180);
    }
  };

  const results = useMemo(() => (finished ? recommend(answers) : []), [finished, answers]);

  const suggestedCollection = useMemo(() => {
    const tier = answers.tier?.[0];
    if (tier === "value") return collections[0];
    if (tier === "luxury") return collections[2];
    return collections[1];
  }, [answers]);

  if (finished) {
    return (
      <div>
        <div className="flex flex-col items-start justify-between gap-4 border-b border-ink-200 pb-6 md:flex-row md:items-end">
          <div>
            <p className="eyebrow mb-2">Your shortlist</p>
            <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] leading-tight text-ink-900">
              {results.length} products for your {(answers.room?.[0] ?? "bathroom").toLowerCase()}
            </h2>
            <p className="mt-2 max-w-xl text-[0.9375rem] text-ink-600">
              Weighted towards {(answers.style?.[0] ?? "modern").toLowerCase()} pieces in{" "}
              {(answers.finish?.[0] ?? "any finish").toLowerCase()}. Save the ones you like, then
              send them to us as one enquiry.
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setFinished(false);
                setStep(0);
                setAnswers({});
              }}
            >
              Start again
            </Button>
            <ButtonLink href="/quote">Send as enquiry</ButtonLink>
          </div>
        </div>

        {results.length === 0 ? (
          <EmptyState
            className="mt-10"
            title="That combination is a bit too specific"
            description="Loosen one answer, or tell us what you are after — we source well beyond the catalogue."
            action={
              <Button variant="outline" onClick={() => setStep(0)}>
                Adjust answers
              </Button>
            }
          />
        ) : (
          <>
            <div className="mt-10 grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3 xl:grid-cols-4">
              {results.map((p, i) => (
                <ProductCard key={p.slug} product={p} priority={i < 4} />
              ))}
            </div>

            <div className="mt-14 overflow-hidden rounded-[18px] bg-ink-900 p-8 text-ink-100 md:p-10">
              <p className="eyebrow text-brass-400">Or hand us the whole room</p>
              <h3 className="mt-3 text-2xl text-ink-50 md:text-3xl">
                The {suggestedCollection.name} collection fits what you described
              </h3>
              <p className="mt-3 max-w-2xl text-[0.9375rem] leading-relaxed text-ink-300">
                {suggestedCollection.description}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <ButtonLink href={`/collections/${suggestedCollection.slug}`} variant="secondary">
                  See what&apos;s included
                </ButtonLink>
                <ButtonLink href="/quote" variant="outline" className="border-ink-600 text-ink-100 hover:border-ink-100 hover:bg-ink-800">
                  Get a firm quote
                </ButtonLink>
              </div>
            </div>
          </>
        )}
      </div>
    );
  }

  const progress = ((step + (current.length ? 1 : 0)) / QUESTIONS.length) * 100;

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-8">
        <div className="flex items-center justify-between text-[0.75rem] text-ink-500">
          <span>
            Question {step + 1} of {QUESTIONS.length}
          </span>
          <span className="flex items-center gap-1.5 text-brass-700">
            <Sparkle width={13} height={13} />
            About 40 seconds
          </span>
        </div>
        <div
          className="mt-2 h-1 overflow-hidden rounded-full bg-ink-200"
          role="progressbar"
          aria-valuenow={Math.round(progress)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Finder progress"
        >
          <div
            className="h-full rounded-full bg-ink-900 transition-[width] duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <h2 className="text-[clamp(1.4rem,3vw,2rem)] leading-tight text-ink-900">{question.title}</h2>
      <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-ink-600">{question.hint}</p>

      <div
        className={cx(
          "mt-7 grid gap-3",
          question.options.length > 4 ? "sm:grid-cols-2" : "sm:grid-cols-2",
        )}
      >
        {question.options.map((option) => {
          const active = current.includes(option.value);
          return (
            <button
              key={option.value}
              type="button"
              aria-pressed={active}
              onClick={() => select(option.value)}
              className={cx(
                "rounded-[14px] border p-5 text-left transition-all duration-200",
                active
                  ? "border-ink-900 bg-ink-900 text-ink-50 shadow-soft"
                  : "border-ink-200 bg-white hover:-translate-y-0.5 hover:border-ink-400 hover:shadow-soft",
              )}
            >
              <span className="block text-[1rem] font-medium">{option.label}</span>
              {option.description ? (
                <span
                  className={cx(
                    "mt-1.5 block text-[0.8125rem] leading-snug",
                    active ? "text-ink-300" : "text-ink-500",
                  )}
                >
                  {option.description}
                </span>
              ) : null}
            </button>
          );
        })}
      </div>

      <div className="mt-8 flex items-center justify-between">
        <Button
          variant="ghost"
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          disabled={step === 0}
        >
          <ArrowLeft width={16} height={16} />
          Back
        </Button>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => (step === QUESTIONS.length - 1 ? setFinished(true) : setStep((s) => s + 1))}
            className="text-[0.8125rem] text-ink-500 underline underline-offset-4 transition-colors hover:text-ink-900"
          >
            Skip
          </button>
          <Button
            onClick={() =>
              step === QUESTIONS.length - 1 ? setFinished(true) : setStep((s) => s + 1)
            }
            disabled={current.length === 0}
          >
            {step === QUESTIONS.length - 1 ? "See my shortlist" : "Next"}
            <ArrowRight width={16} height={16} />
          </Button>
        </div>
      </div>

      <p className="mt-6 text-center text-[0.8125rem] text-ink-500">
        Would rather just talk?{" "}
        <Link href="/contact" className="font-medium text-brass-700 underline underline-offset-4">
          Call a designer
        </Link>
      </p>
    </div>
  );
}

/** Scores the catalogue against the answers; deterministic and explainable. */
function recommend(answers: Answers): Product[] {
  const room = answers.room?.[0];
  const needs = answers.need ?? [];
  const style = answers.style?.[0];
  const finish = answers.finish?.[0];
  const tier = answers.tier?.[0];
  const priority = answers.priority?.[0];

  const scored = products
    .map((p) => {
      let score = 0;
      if (needs.length && needs.includes(p.category)) score += 8;
      else if (needs.length) score -= 4;
      if (room && p.rooms.includes(room)) score += 5;
      if (style && p.styles.includes(style)) score += 6;
      if (finish && p.finishes.includes(finish)) score += 5;
      if (tier && p.priceTier === tier) score += 4;

      if (priority === "rating") score += p.rating * 2 + Math.min(p.reviewCount, 300) / 100;
      if (priority === "stock" && p.availability === "in-stock") score += 5;
      if (priority === "design" && p.featured) score += 6;
      if (priority === "value" && p.compareAtPrice) score += 5;

      return { p, score };
    })
    .filter((x) => x.score > 3)
    .sort((a, b) => b.score - a.score || b.p.rating - a.p.rating);

  return scored.slice(0, 12).map((x) => x.p);
}
