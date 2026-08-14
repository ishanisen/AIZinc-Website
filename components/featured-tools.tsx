import ToolCard from "./tool-card";
import { Tool } from "@/lib/types";

type FeaturedToolsProps = {
  tools: Tool[];
};

export default function FeaturedTools({ tools }: FeaturedToolsProps) {
  if (tools.length === 0) return null;

  return (
    <section id="featured" className="border-b border-border bg-surface-2 py-12 sm:py-16">
      <div className="container-main">
        <h2 className="text-xl font-semibold tracking-tight text-text-primary sm:text-2xl">
          Trending this week
        </h2>
        <p className="mt-1.5 text-sm text-text-secondary">
          Hand-picked tools gaining traction right now.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} featured />
          ))}
        </div>
      </div>
    </section>
  );
}
