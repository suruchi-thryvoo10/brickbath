"use client";

import { useEffect } from "react";
import { Button, ButtonLink } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // A real deployment would forward this to its error tracker.
    console.error(error);
  }, [error]);

  return (
    <section className="container-page flex min-h-[60dvh] flex-col justify-center py-20">
      <p className="eyebrow">Something broke</p>
      <h1 className="mt-4 text-[clamp(1.75rem,4vw,3rem)] leading-[1.06] text-ink-900">
        We hit an error rendering this page.
      </h1>
      <p className="mt-5 max-w-lg text-[1.0625rem] leading-relaxed text-ink-600">
        Nothing you did caused it. Try again — and if it keeps happening, call us on
        1800&nbsp;212&nbsp;0151 and we will sort it out directly.
      </p>
      {error.digest ? (
        <p className="mt-3 font-mono text-[0.75rem] text-ink-400">Reference: {error.digest}</p>
      ) : null}
      <div className="mt-8 flex flex-wrap gap-3">
        <Button size="lg" onClick={reset}>
          Try again
        </Button>
        <ButtonLink href="/" variant="outline" size="lg">
          Back to home
        </ButtonLink>
      </div>
    </section>
  );
}
