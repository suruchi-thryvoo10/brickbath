import { Skeleton } from "@/components/ui/primitives";

export default function Loading() {
  return (
    <div className="container-page py-16" aria-busy="true" aria-live="polite">
      <span className="sr-only">Loading page…</span>
      <Skeleton className="h-3 w-40" />
      <Skeleton className="mt-6 h-12 w-3/4 max-w-2xl" />
      <Skeleton className="mt-4 h-4 w-full max-w-xl" />
      <Skeleton className="mt-2 h-4 w-2/3 max-w-lg" />
      <div className="mt-14 grid grid-cols-2 gap-5 md:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-3">
            <Skeleton className="aspect-4/5 w-full rounded-[14px]" />
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-4 w-4/5" />
          </div>
        ))}
      </div>
    </div>
  );
}
