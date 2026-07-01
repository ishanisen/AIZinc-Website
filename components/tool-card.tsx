"use client";

import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { useState } from "react";
import { Tool } from "@/lib/types";

type ToolCardProps = {
  tool: Tool;
  featured?: boolean;
};

function pricingStyles(pricing: Tool["pricing"]) {
  switch (pricing) {
    case "Free":
      return "bg-accent/10 text-accent";
    case "Freemium":
      return "bg-badge-blue/10 text-badge-blue";
    case "Paid":
      return "bg-badge-gold/10 text-badge-gold";
  }
}

function ToolLogo({ tool }: { tool: Tool }) {
  const [error, setError] = useState(false);

  if (tool.logoUrl && !error) {
    return (
      <Image
        src={tool.logoUrl}
        alt={`${tool.name} logo`}
        width={40}
        height={40}
        className="h-10 w-10 rounded-lg object-cover"
        onError={() => setError(true)}
      />
    );
  }

  return (
    <div
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-surface-2 text-sm font-semibold text-accent"
      aria-hidden="true"
    >
      {tool.name.charAt(0)}
    </div>
  );
}

export default function ToolCard({ tool, featured = false }: ToolCardProps) {
  return (
    <article
      className={`group flex flex-col rounded-xl border border-border bg-surface transition-colors hover:border-text-muted/40 hover:bg-surface-2 ${
        featured ? "p-6" : "p-5"
      }`}
    >
      <div className="flex items-start gap-3">
        <ToolLogo tool={tool} />
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <h3
              className={`truncate font-semibold text-text-primary ${
                featured ? "text-lg" : "text-base"
              }`}
            >
              {tool.name}
            </h3>
            <span
              className={`shrink-0 rounded-md px-2 py-0.5 text-xs font-medium ${pricingStyles(tool.pricing)}`}
            >
              {tool.pricing}
            </span>
          </div>
          <span className="mt-0.5 inline-block text-xs text-text-muted">
            {tool.category}
          </span>
        </div>
      </div>

      <p
        className={`mt-3 line-clamp-2 text-text-secondary ${
          featured ? "text-sm leading-relaxed" : "text-sm"
        }`}
      >
        {tool.description}
      </p>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {tool.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-md bg-background px-2 py-0.5 text-xs text-text-muted"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-auto flex items-center justify-between pt-4">
        <span className="text-xs text-text-muted">{tool.platform}</span>
        {tool.websiteUrl ? (
          <Link
            href={tool.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium text-text-primary transition-colors hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
          >
            View tool
            <ExternalLink className="h-3 w-3" aria-hidden="true" />
          </Link>
        ) : (
          <button
            type="button"
            className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium text-text-primary transition-colors hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
          >
            View tool
          </button>
        )}
      </div>
    </article>
  );
}
