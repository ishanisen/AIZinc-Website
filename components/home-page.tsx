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
import { fetchCategories } from "@/lib/categories";
import { fetchTools, getFeaturedTools } from "@/lib/tools";
import { getSupabaseEnvError } from "@/lib/supabase";
import { CategoryRecord, PricingOption, Tool } from "@/lib/types";
import { Loader2, RefreshCw } from "lucide-react";

function ToolsLoading() {
  return (
    <section className="bg-background py-12 sm:py-16">
      <div className="container-main flex flex-col items-center justify-center py-20 text-center">
        <Loader2
          className="h-8 w-8 animate-spin text-accent"
          aria-hidden="true"
        />
        <p className="mt-4 text-sm font-medium text-text-secondary">Loading tools…</p>
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
    <section className="bg-background py-12 sm:py-16">
      <div className="container-main">
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
      </div>
    </section>
  );
}

export default function HomePage() {
  const [tools, setTools] = useState<Tool[]>([]);
  const [categories, setCategories] = useState<CategoryRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchInput, setSearchInput] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);
  const [activePricing, setActivePricing] = useState<PricingOption | null>(null);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);

    const configError = getSupabaseEnvError();
    if (configError) {
      setError(configError);
      setTools([]);
      setCategories([]);
      setLoading(false);
      return;
    }

    try {
      const [toolsData, categoriesData] = await Promise.all([
        fetchTools(),
        fetchCategories(),
      ]);
      setTools(toolsData);
      setCategories(categoriesData);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "An unexpected error occurred.";
      console.error("[HomePage] failed to load data:", err);
      setError(message);
      setTools([]);
      setCategories([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const isFiltered = hasActiveFilters(
    submittedQuery,
    activeCategoryId,
    activePricing,
  );

  const featuredTools = useMemo(() => getFeaturedTools(tools), [tools]);

  const filteredTools = useMemo(
    () =>
      filterTools(tools, submittedQuery, activeCategoryId, activePricing),
    [tools, submittedQuery, activeCategoryId, activePricing],
  );

  const resultsHeading = getResultsHeading(
    submittedQuery,
    activeCategoryId,
    activePricing,
    categories,
  );

  function handleSearchSubmit() {
    setSubmittedQuery(searchInput.trim());
  }

  function clearFilters() {
    setSearchInput("");
    setSubmittedQuery("");
    setActiveCategoryId(null);
    setActivePricing(null);
  }

  return (
    <>
      <Navbar />
      <main>
        <Hero
          searchInput={searchInput}
          onSearchInputChange={setSearchInput}
          onSearchSubmit={handleSearchSubmit}
          categories={categories}
          activeCategoryId={activeCategoryId}
          onCategoryChange={setActiveCategoryId}
        />

        {loading ? (
          <ToolsLoading />
        ) : error ? (
          <ToolsError message={error} onRetry={loadData} />
        ) : isFiltered ? (
          <FilteredResults
            tools={filteredTools}
            heading={resultsHeading}
            onClear={clearFilters}
          />
        ) : (
          <>
            <FeaturedTools tools={featuredTools} />
            <ToolGrid
              tools={tools}
              categories={categories}
              activeCategoryId={activeCategoryId}
              onCategoryChange={setActiveCategoryId}
              activePricing={activePricing}
              onPricingChange={setActivePricing}
            />
          </>
        )}
      </main>
      <Footer />
    </>
  );
}
