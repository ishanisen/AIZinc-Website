import ToolCard from "./tool-card";
import { Tool } from "@/lib/types";

type FeaturedToolsProps = {
  tools: Tool[];
};

export default function FeaturedTools({ tools }: FeaturedToolsProps) {
  if (tools.length === 0) return null;

  return (
    <section
      id="trending"
      className="container-main pb-8 pt-[clamp(48px,6vw,80px)]"
    >
      <span className="kicker mb-3 block">02 · Trending this week</span>
      <div className="draw-rule" />
      <div className="mt-5 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <h2 className="m-0 font-heading text-[clamp(26px,2.8vw,36px)] font-semibold uppercase leading-[1.1]">
          Trending this week
        </h2>
        <p className="m-0 text-[15px] text-text-secondary">
          Hand-picked tools gaining traction right now.
        </p>
      </div>

      <div className="mt-9 grid grid-cols-[repeat(auto-fill,minmax(290px,1fr))] gap-x-7 gap-y-9">
        {tools.map((tool) => (
          <ToolCard key={tool.id} tool={tool} featured />
        ))}
      </div>
    </section>
  );
}
