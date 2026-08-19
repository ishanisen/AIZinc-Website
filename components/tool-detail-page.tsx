import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import ToolLogo from "@/components/tool-logo";
import BlueprintFrame from "@/components/blueprint-frame";
import ComingSoon from "@/components/coming-soon";
import CompareToggle from "@/components/compare-toggle";
import { categoryPalette } from "@/lib/category-colors";
import { ToolDetail, ToolDetails } from "@/lib/types";

type ToolDetailPageProps = {
  tool: ToolDetail;
};

const OVERVIEW_FIELDS: Array<{
  key: keyof ToolDetails;
  label: string;
}> = [
  { key: "primaryCapability", label: "Primary capability" },
  { key: "specificUseCases", label: "Specific use cases" },
  { key: "targetAudience", label: "Target audience" },
  { key: "deploymentType", label: "Deployment type" },
  { key: "underlyingModelApi", label: "Underlying model / API" },
  { key: "apiAvailability", label: "API availability" },
  { key: "openSourceStatus", label: "Open source status" },
  { key: "dataStoragePolicy", label: "Data storage policy" },
  { key: "complianceCertifications", label: "Compliance certifications" },
  { key: "commercialUseRights", label: "Commercial use rights" },
  { key: "developerParent", label: "Developer / parent" },
  { key: "countryOfOrigin", label: "Country of origin" },
  { key: "integrationEcosystem", label: "Integration ecosystem" },
  { key: "trialLimitations", label: "Trial limitations" },
];

function OverviewField({
  label,
  value,
}: {
  label: string;
  value: string | null;
}) {
  const isMissing = !value;

  return (
    <div className="flex flex-col gap-2">
      <span className="kicker">{label}</span>
      {isMissing ? (
        <ComingSoon />
      ) : (
        <div className="rounded-[10px] border border-border bg-white px-3 py-3 text-sm leading-[1.55] text-text-primary">
          {value}
        </div>
      )}
    </div>
  );
}

export default function ToolDetailPage({ tool }: ToolDetailPageProps) {
  const palette = categoryPalette(tool.category);
  const websiteHref = tool.websiteUrl?.trim();
  const tagline = tool.description.trim();

  return (
    <>
      <Navbar />
      <main>
        <section className="container-main pb-8 pt-[clamp(48px,6vw,80px)]">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-text-secondary no-underline transition-colors hover:text-accent"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to directory
          </Link>

          <span className="kicker mb-3 mt-8 block">Tool record</span>
          <div className="draw-rule" />

          <BlueprintFrame className="mt-8 p-6 sm:p-8">
            <div className="flex flex-wrap items-start justify-between gap-6">
              <div className="flex min-w-0 flex-1 items-start gap-4">
                <ToolLogo
                  name={tool.name}
                  logoUrl={tool.logoUrl}
                  size="lg"
                />
                <div className="min-w-0">
                  <h1 className="m-0 font-heading text-[clamp(28px,3.4vw,44px)] font-semibold uppercase leading-[1.08] tracking-[0.02em]">
                    {tool.name}
                  </h1>
                  {tagline ? (
                    <p className="mt-3 max-w-[58ch] text-[15px] leading-[1.55] text-[color-mix(in_srgb,#1d1f20_78%,transparent)]">
                      {tagline}
                    </p>
                  ) : null}
                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    {tool.pricingLabel ? (
                      <span className="rounded-lg bg-[#f5f5f8] px-2.5 py-[3px] text-[11px] tracking-[0.02em] text-[#424244]">
                        {tool.pricingLabel}
                      </span>
                    ) : (
                      <span className="rounded-lg border border-dashed border-accent/35 bg-[color-mix(in_srgb,#1e3a6e_6%,transparent)] px-2.5 py-[3px] text-[11px] tracking-[0.02em] text-text-secondary">
                        Details coming soon
                      </span>
                    )}
                    {tool.hasFreePlan ? (
                      <span className="rounded-lg bg-accent-100 px-2.5 py-[3px] text-[11px] tracking-[0.02em] text-accent-700">
                        Free plan
                      </span>
                    ) : null}
                    <span
                      className="inline-flex items-center rounded-lg px-2.5 py-[3px] text-[11px] tracking-[0.02em]"
                      style={{
                        background: palette.fill,
                        color: palette.text,
                      }}
                    >
                      {tool.category}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex shrink-0 flex-wrap items-center gap-2.5">
                <CompareToggle
                  slug={tool.slug}
                  name={tool.name}
                  logoUrl={tool.logoUrl}
                  variant="button"
                />
                {websiteHref ? (
                  <a
                    href={websiteHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary !px-7"
                  >
                    Visit Site
                    <ArrowUpRight
                      className="h-4 w-4"
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                  </a>
                ) : null}
              </div>
            </div>
          </BlueprintFrame>
        </section>

        <section className="container-main pb-[clamp(56px,7vw,96px)] pt-4">
          <span className="kicker mb-3 block">Overview</span>
          <div className="draw-rule" />
          <h2 className="mb-8 mt-5 font-heading text-[clamp(26px,2.8vw,36px)] font-semibold uppercase leading-[1.1]">
            Spec sheet
          </h2>

          <div className="grid grid-cols-1 gap-x-7 gap-y-6 sm:grid-cols-2">
            {OVERVIEW_FIELDS.map((field) => (
              <OverviewField
                key={field.key}
                label={field.label}
                value={tool.details?.[field.key] ?? null}
              />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
