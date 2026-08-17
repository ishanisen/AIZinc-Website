"use client";

import Link from "next/link";
import ToolLogo from "@/components/tool-logo";
import { categoryPalette } from "@/lib/category-colors";
import { Tool } from "@/lib/types";

type ToolCardProps = {
  tool: Tool;
  featured?: boolean;
};

function Corners() {
  return (
    <>
      <i className="corner tl" aria-hidden="true" />
      <i className="corner tr" aria-hidden="true" />
      <i className="corner bl" aria-hidden="true" />
      <i className="corner br" aria-hidden="true" />
    </>
  );
}

export default function ToolCard({ tool }: ToolCardProps) {
  const href = tool.websiteUrl?.trim();
  const palette = categoryPalette(tool.category);

  const body = (
    <>
      <Corners />
      <span className="flex items-center gap-3">
        <ToolLogo name={tool.name} logoUrl={tool.logoUrl} />
        <span className="min-w-0 flex-1 font-heading text-[21px] font-semibold uppercase leading-[1.1] tracking-[0.02em] text-text-primary">
          {tool.name}
        </span>
        <span className="shrink-0 rounded-lg bg-[#f5f5f8] px-2.5 py-[3px] text-[11px] tracking-[0.02em] text-[#424244]">
          {tool.pricing}
        </span>
      </span>

      <span className="tagline-clamp flex-1 text-sm leading-[1.55] text-[color-mix(in_srgb,#1d1f20_72%,transparent)]">
        {tool.description}
      </span>

      <span className="flex items-center justify-between gap-3 border-t border-[color-mix(in_srgb,#1d1f20_8%,transparent)] pt-3">
        <span
          className="inline-flex items-center rounded-lg px-2.5 py-[3px] text-[11px] tracking-[0.02em]"
          style={{ background: palette.fill, color: palette.text }}
        >
          {tool.category}
        </span>
        <span className="text-xs font-semibold uppercase tracking-[0.08em] text-accent-700">
          View tool →
        </span>
      </span>
    </>
  );

  const cardClass =
    "blueprint rise-on-view flex h-full flex-col gap-3.5 p-6 text-inherit no-underline transition-[transform,border-color,box-shadow] duration-[250ms] ease-out hover:-translate-y-1 hover:border-accent hover:shadow-card-hover";

  if (href) {
    return (
      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cardClass}
        aria-label={`View ${tool.name}`}
      >
        {body}
      </Link>
    );
  }

  return <article className={cardClass}>{body}</article>;
}
