"use client";

import Link from "next/link";
import { X } from "lucide-react";
import ComingSoon from "@/components/coming-soon";
import ToolLogo from "@/components/tool-logo";
import { useCompare } from "@/components/compare-provider";
import { ToolDetail, ToolDetails } from "@/lib/types";

type CompareTableProps = {
  tools: ToolDetail[];
};

const DETAIL_ROWS: Array<{ key: keyof ToolDetails; label: string }> = [
  { key: "primaryCapability", label: "Primary capability" },
  { key: "deploymentType", label: "Deployment type" },
  { key: "underlyingModelApi", label: "Underlying model / API" },
  { key: "openSourceStatus", label: "Open source status" },
  { key: "dataStoragePolicy", label: "Data storage policy" },
  { key: "complianceCertifications", label: "Compliance certifications" },
  { key: "commercialUseRights", label: "Commercial use rights" },
  { key: "targetAudience", label: "Target audience" },
  { key: "integrationEcosystem", label: "Integration ecosystem" },
  { key: "trialLimitations", label: "Trial limitations" },
];

function CellValue({ value }: { value: string | null }) {
  if (!value) return <ComingSoon compact />;
  return (
    <p className="m-0 text-sm leading-[1.55] text-text-primary">{value}</p>
  );
}

export default function CompareTable({ tools }: CompareTableProps) {
  const { slugs, removeTool } = useCompare();
  const orderedSlugs = slugs.length > 0 ? slugs : tools.map((tool) => tool.slug);
  const visible = orderedSlugs
    .map((slug) => tools.find((tool) => tool.slug === slug))
    .filter((tool): tool is ToolDetail => Boolean(tool));

  if (visible.length < 2) {
    return null;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[640px] border-collapse text-left">
        <thead>
          <tr>
            <th className="sticky left-0 z-10 min-w-[11rem] border-b border-border bg-background py-4 pr-4 align-bottom text-[13px] font-semibold uppercase tracking-[0.08em] text-text-secondary">
              Field
            </th>
            {visible.map((tool) => (
              <th
                key={tool.slug}
                className="min-w-[14rem] border-b border-border px-4 py-4 align-top"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <ToolLogo name={tool.name} logoUrl={tool.logoUrl} />
                    <div className="min-w-0">
                      <Link
                        href={`/tools/${tool.slug}`}
                        className="block truncate font-heading text-base font-semibold uppercase tracking-[0.02em] text-text-primary no-underline hover:text-accent"
                      >
                        {tool.name}
                      </Link>
                      {tool.websiteUrl ? (
                        <a
                          href={tool.websiteUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-1 inline-block text-[13px] text-accent-700 no-underline hover:text-accent"
                        >
                          Visit Site
                        </a>
                      ) : null}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeTool(tool.slug)}
                    aria-label={`Remove ${tool.name} from comparison`}
                    className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] border border-border text-text-muted hover:border-accent hover:text-accent"
                  >
                    <X className="h-3.5 w-3.5" strokeWidth={1.5} />
                  </button>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-border">
            <th className="sticky left-0 bg-background py-4 pr-4 align-top text-[13px] font-semibold uppercase tracking-[0.08em] text-text-secondary">
              Pricing
            </th>
            {visible.map((tool) => (
              <td key={tool.slug} className="px-4 py-4 align-top">
                <CellValue value={tool.pricingLabel} />
              </td>
            ))}
          </tr>
          <tr className="border-b border-border">
            <th className="sticky left-0 bg-background py-4 pr-4 align-top text-[13px] font-semibold uppercase tracking-[0.08em] text-text-secondary">
              Free plan
            </th>
            {visible.map((tool) => (
              <td key={tool.slug} className="px-4 py-4 align-top">
                <p className="m-0 text-sm text-text-primary">
                  {tool.hasFreePlan ? "Yes" : "—"}
                </p>
              </td>
            ))}
          </tr>
          {DETAIL_ROWS.map((row) => (
            <tr key={row.key} className="border-b border-border">
              <th className="sticky left-0 bg-background py-4 pr-4 align-top text-[13px] font-semibold uppercase tracking-[0.08em] text-text-secondary">
                {row.label}
              </th>
              {visible.map((tool) => (
                <td key={tool.slug} className="px-4 py-4 align-top">
                  <CellValue value={tool.details?.[row.key] ?? null} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
