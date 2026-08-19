"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { useCompare } from "@/components/compare-provider";
import { compareHref } from "@/lib/compare";

export default function CompareTray() {
  const pathname = usePathname();
  const { items, slugs, removeTool, clearAll, notice } = useCompare();
  const onComparePage = pathname === "/compare";

  if (items.length === 0 && !notice) {
    return null;
  }

  return (
    <>
      {items.length > 0 ? (
        <div className="h-28" aria-hidden="true" />
      ) : null}

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-[color-mix(in_srgb,#f6f8fd_94%,transparent)] backdrop-blur-[8px]">
        {notice ? (
          <p className="border-b border-dashed border-accent/35 bg-[color-mix(in_srgb,#1e3a6e_8%,transparent)] px-4 py-2 text-center text-sm text-accent-700">
            {notice}
          </p>
        ) : null}

        {items.length === 1 ? (
          <div className="container-main flex flex-wrap items-center justify-between gap-3 py-3">
            <p className="m-0 text-sm text-text-secondary">
              <span className="font-medium text-text-primary">
                {items[0].name}
              </span>{" "}
              added. Add another tool to compare.
            </p>
            <button
              type="button"
              onClick={() => removeTool(items[0].slug)}
              className="text-sm text-text-secondary underline-offset-2 hover:text-accent hover:underline"
            >
              Clear
            </button>
          </div>
        ) : items.length > 1 ? (
          <div className="container-main flex flex-wrap items-center gap-3 py-3">
            <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2">
              {items.map((item) => (
                <span
                  key={item.slug}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-white px-2.5 py-1 text-[13px] text-text-primary"
                >
                  <span className="max-w-[18ch] truncate">{item.name}</span>
                  <button
                    type="button"
                    onClick={() => removeTool(item.slug)}
                    aria-label={`Remove ${item.name}`}
                    className="inline-flex text-text-muted hover:text-accent"
                  >
                    <X className="h-3.5 w-3.5" strokeWidth={1.5} />
                  </button>
                </span>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={clearAll}
                className="text-sm text-text-secondary underline-offset-2 hover:text-accent hover:underline"
              >
                Clear
              </button>
              {onComparePage ? null : (
                <Link href={compareHref(slugs)} className="btn-primary !min-h-9 px-4">
                  Compare ({items.length}) →
                </Link>
              )}
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}
