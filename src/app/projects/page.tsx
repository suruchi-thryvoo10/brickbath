import type { Metadata } from "next";
import { PageHero } from "@/components/layout/page-hero";
import { ProjectGallery } from "@/components/projects/project-gallery";
import { TestimonialGrid } from "@/components/shared/testimonials";
import { ButtonLink } from "@/components/ui/button";
import { Section, SectionHeading, Stat } from "@/components/ui/primitives";
import { img, wide } from "@/lib/data/images";
import { projects } from "@/lib/data/projects";

export const metadata: Metadata = {
  title: "Projects & gallery",
  description:
    "Completed bathroom transformations across Bhubaneswar, Cuttack and Puri — with before-and-after reveals, the brief, the outcome and every product used.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  const totalArea = projects.reduce((sum, p) => sum + p.areaSqft, 0);
  const avgDays = Math.round(
    projects.reduce((sum, p) => sum + p.durationDays, 0) / projects.length,
  );

  return (
    <>
      <PageHero
        eyebrow="Projects & gallery"
        title="Finished rooms, with the products listed"
        intro="Every project here includes the brief we were given, what we changed and why, and a link to each product used — so you can price the look instead of guessing at it."
        crumbs={[{ label: "Projects", href: "/projects" }]}
        image={wide(img.heroGallery, 1920, 900)}
        actions={
          <>
            <ButtonLink href="/quote" variant="secondary" size="lg">
              Start your project
            </ButtonLink>
            <ButtonLink
              href="/collections"
              variant="outline"
              size="lg"
              className="border-ink-500 text-ink-100 hover:border-ink-100 hover:bg-ink-800"
            >
              See collections
            </ButtonLink>
          </>
        }
      />

      <section className="container-page py-12">
        <dl className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <Stat value="1,400+" label="Bathrooms delivered since 2016" />
          <Stat value={`${avgDays} days`} label="Average time on site" />
          <Stat value={`${totalArea} sq.ft.`} label="Shown in this gallery" />
          <Stat value="94%" label="Handed over on the quoted date" />
        </dl>
      </section>

      <Section className="!pt-0 !pb-16">
        <div className="container-page">
          <ProjectGallery />
        </div>
      </Section>

      <Section tone="muted" className="!py-16">
        <div className="container-page">
          <SectionHeading
            eyebrow="From the owners"
            title="What they said afterwards"
            intro="Collected at the 30-day check-in, not on handover day when everyone is still relieved."
          />
          <div className="mt-10">
            <TestimonialGrid limit={6} />
          </div>
        </div>
      </Section>
    </>
  );
}
