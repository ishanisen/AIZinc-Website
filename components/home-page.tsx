"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import FeaturedTools from "@/components/featured-tools";
import FilteredResults from "@/components/filtered-results";
import ToolGrid from "@/components/tool-grid";
import Footer from "@/components/footer";
import {
  filterTools,
  getResultsHeading,
  hasActiveFilters,
} from "@/lib/filter-tools";
import { fetchTools, getFeaturedTools } from "@/lib/tools";
import { Category, Tool } from "@/lib/types";
import { Loader2, RefreshCw } from "lucide-react";

function ToolsLoading() {
  return (
    <section className="py-12 sm:py-16">
      <div className="container-main flex flex-col items-center justify-center py-16 text-center">
        <Loader2
          className="h-8 w-8 animate-spin text-accent"
          aria-hidden="true"
        />
        <p className="mt-4 text-sm text-text-secondary">Loading tools…</p>
      </div>
    </section>
  );
}

type ToolsErrorProps = {
  message: string;
  onRetry: () => void;
};

function ToolsError({ message, onRetry }: ToolsErrorProps) {
  return (
    <section className="py-12 sm:py-16">
      <div className="container-main">
        <div className="rounded-xl border border-border bg-surface px-6 py-16 text-center">
          <p className="text-base font-medium text-text-primary">
            Could not load tools
          </p>
          <p className="mt-2 text-sm text-text-secondary">{message}</p>
          <button
            type="button"
            onClick={onRetry}
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-background transition-colors hover:bg-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <RefreshCw className="h-4 w-4" aria-hidden="true" />
            Try again
          </button>
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchInput, setSearchInput] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);

  const loadTools = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await fetchTools();
      setTools(data);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "An unexpected error occurred.";
      console.error("[HomePage] failed to load tools:", err);
      setError(message);
      setTools([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTools();
  }, [loadTools]);

  const isFiltered = hasActiveFilters(submittedQuery, activeCategory);

  const featuredTools = useMemo(() => getFeaturedTools(tools), [tools]);

  const filteredTools = useMemo(
    () => filterTools(tools, submittedQuery, activeCategory),
    [tools, submittedQuery, activeCategory],
  );

  const resultsHeading = getResultsHeading(submittedQuery, activeCategory);

  function handleSearchSubmit() {
    setSubmittedQuery(searchInput.trim());
  }

  function clearFilters() {
    setSearchInput("");
    setSubmittedQuery("");
    setActiveCategory(null);
  }

  return (
    <>
      <Navbar />
      <main>
        <Hero
          searchInput={searchInput}
          onSearchInputChange={setSearchInput}
          onSearchSubmit={handleSearchSubmit}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        {loading ? (
          <ToolsLoading />
        ) : error ? (
          <ToolsError message={error} onRetry={loadTools} />
        ) : isFiltered ? (
          <FilteredResults
            tools={filteredTools}
            heading={resultsHeading}
            onClear={clearFilters}
          />
        ) : (
          <>
            <FeaturedTools tools={featuredTools} />
            <ToolGrid tools={tools} />
          </>
        )}
      </main>
      <Footer />
    </>
  );
}
