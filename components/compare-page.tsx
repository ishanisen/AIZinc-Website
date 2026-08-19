"use client";

import Link from "next/link";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import BlueprintFrame from "@/components/blueprint-frame";
import CompareTable from "@/components/compare-table";
import { useCompare } from "@/components/compare-provider";
import { ToolDetail } from "@/lib/types";

type ComparePageViewProps = {
  tools: ToolDetail[];
};

export default function ComparePageView({ tools }: ComparePageViewProps) {
  const { slugs } = useCompare();
  const orderedSlugs = slugs.length > 0 ? slugs : tools.map((tool) => tool.slug);
  const visible = orderedSlugs
    .map((slug) => tools.find((tool) => tool.slug === slug))
    .filter((tool): tool is ToolDetail => Boolean(tool));
  const showTable = visible.length >= 2;

  return (
    <>
      <Navbar />
      <main>
        <section className="container-main pb-10 pt-[clamp(48px,6vw,80px)]">
          <span className="kicker mb-3 block">Compare</span>
          <div className="draw-rule" />
          <div className="mt-5 flex flex-wrap items-end justify-between gap-4">
            <h1 className="m-0 font-heading text-[clamp(28px,3.4vw,44px)] font-semibold uppercase leading-[1.08]">
              Side by side
            </h1>
            {showTable ? (
              <p className="m-0 text-[13px] font-semibold uppercase tracking-[0.08em] text-text-secondary [font-feature-settings:'tnum'_1]">
                {visible.length} tools
              </p>
            ) : null}
          </div>
        </section>

        <section className="container-main pb-[clamp(56px,7vw,96px)]">
          {showTable ? (
            <CompareTable tools={tools} />
          ) : (
            <BlueprintFrame className="px-6 py-16 text-center">
              <p className="font-heading text-2xl font-semibold uppercase tracking-[0.02em]">
                Select two tools to compare
              </p>
              <p className="mx-auto mt-3 max-w-[46ch] text-sm leading-[1.55] text-text-secondary">
                Use the + control on any tool card, or Add to Compare on a tool
                page. Comparisons need at least two tools.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Link href="/" className="btn-primary">
                  Browse tools
                </Link>
                <Link href="/ai-tools" className="btn-secondary">
                  View categories
                </Link>
              </div>
            </BlueprintFrame>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
