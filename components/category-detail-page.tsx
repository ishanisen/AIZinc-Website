"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Loader2,
  RefreshCw,
} from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import ToolCard from "@/components/tool-card";
import { getCategoryIcon } from "@/lib/category-icons";
import { getSupabaseEnvError } from "@/lib/supabase";
import { fetchToolsByCategorySlug, type CategoryToolsPage } from "@/lib/tools";
import { CATEGORY_PAGE_SIZE } from "@/lib/types";

type CategoryDetailPageProps = {
  categorySlug: string;
};

function DetailLoading() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <Loader2
        className="h-8 w-8 animate-spin text-accent"
        aria-hidden="true"
      />
      <p className="mt-4 text-sm font-medium text-text-secondary">
        Loading tools…
      </p>
    </div>
  );
}

type DetailErrorProps = {
  message: string;
  onRetry: () => void;
};

function DetailError({ message, onRetry }: DetailErrorProps) {
  return (
    <div className="rounded-2xl border border-border bg-white px-6 py-16 text-center shadow-card">
      <p className="text-base font-semibold text-text-primary">
        Could not load tools
      </p>
      <p className="mt-2 text-sm text-text-secondary">{message}</p>
      <button
        type="button"
        onClick={onRetry}
        className="mt-6 inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-accent-foreground shadow-sm transition-colors hover:bg-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        <RefreshCw className="h-4 w-4" aria-hidden="true" />
        Try again
      </button>
    </div>
  );
}

export default function CategoryDetailPage({
  categorySlug,
}: CategoryDetailPageProps) {
  const [page, setPage] = useState(1);
  const [data, setData] = useState<CategoryToolsPage | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notFound, setNotFound] = useState(false);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    setNotFound(false);

    const configError = getSupabaseEnvError();
    if (configError) {
      setError(configError);
      setData(null);
      setLoading(false);
      return;
    }

    try {
      const result = await fetchToolsByCategorySlug(
        categorySlug,
        page,
        CATEGORY_PAGE_SIZE,
      );

      if (!result) {
        setNotFound(true);
        setData(null);
        return;
      }

      setData(result);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "An unexpected error occurred.";
      console.error("[CategoryDetailPage] failed to load data:", err);
      setError(message);
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [categorySlug, page]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    setPage(1);
  }, [categorySlug]);

  const Icon = getCategoryIcon(categorySlug);
  const categoryName = data?.category.name ?? categorySlug;

  return (
    <>
      <Navbar />
      <main>
        <section className="border-b border-border bg-gradient-to-b from-accent-soft/50 via-background to-background py-10 sm:py-14">
          <div className="container-main">
            <Link
              href="/ai-tools"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-text-secondary transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              All categories
            </Link>

            <div className="mt-6 flex items-start gap-4">
              <div
                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-border bg-white text-accent shadow-card"
                aria-hidden="true"
              >
                <Icon className="h-7 w-7" />
              </div>
              <div>
                <h1 className="text-3xl font-semibold tracking-tight text-text-primary sm:text-4xl">
                  {loading && !data ? "Loading…" : categoryName}
                </h1>
                {!loading && data && (
                  <p className="mt-2 text-sm text-text-secondary sm:text-base">
                    {data.total}{" "}
                    {data.total === 1 ? "published tool" : "published tools"} in
                    this category
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-background py-12 sm:py-16">
          <div className="container-main">
            {loading ? (
              <DetailLoading />
            ) : error ? (
              <DetailError message={error} onRetry={loadData} />
            ) : notFound ? (
              <div className="rounded-2xl border border-border bg-white px-6 py-16 text-center shadow-card">
                <p className="text-base font-semibold text-text-primary">
                  Category not found
                </p>
                <p className="mt-2 text-sm text-text-secondary">
                  We couldn&apos;t find a category for{" "}
                  <span className="font-medium text-text-primary">
                    {categorySlug}
                  </span>
                  .
                </p>
                <Link
                  href="/ai-tools"
                  className="mt-6 inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent-hover"
                >
                  Browse categories
                </Link>
              </div>
            ) : data && data.tools.length === 0 ? (
              <div className="rounded-2xl border border-border bg-white px-6 py-16 text-center shadow-card">
                <p className="text-base font-semibold text-text-primary">
                  No tools yet
                </p>
                <p className="mt-2 text-sm text-text-secondary">
                  There are no published tools in {data.category.name} right
                  now. Check back soon.
                </p>
                <Link
                  href="/ai-tools"
                  className="mt-6 inline-flex items-center gap-2 rounded-lg border border-border bg-white px-4 py-2 text-sm font-medium text-text-primary transition-colors hover:border-accent hover:text-accent"
                >
                  Back to categories
                </Link>
              </div>
            ) : data ? (
              <>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {data.tools.map((tool) => (
                    <ToolCard
                      key={tool.id}
                      tool={tool}
                      featured={tool.featured}
                    />
                  ))}
                </div>

                {data.totalPages > 1 && (
                  <div className="mt-10 flex items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => setPage((current) => Math.max(1, current - 1))}
                      disabled={page <= 1}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-white px-3 py-2 text-sm font-medium text-text-primary transition-colors hover:border-accent hover:text-accent disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                    >
                      <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                      Previous
                    </button>
                    <span className="text-sm text-text-secondary">
                      Page {data.page} of {data.totalPages}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        setPage((current) =>
                          Math.min(data.totalPages, current + 1),
                        )
                      }
                      disabled={page >= data.totalPages}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-white px-3 py-2 text-sm font-medium text-text-primary transition-colors hover:border-accent hover:text-accent disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                    >
                      Next
                      <ChevronRight className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </div>
                )}
              </>
            ) : null}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
