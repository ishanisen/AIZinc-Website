"use client";

import { useMemo, useState } from "react";
import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import FeaturedTools from "@/components/featured-tools";
import FilteredResults from "@/components/filtered-results";
import ToolGrid from "@/components/tool-grid";
import Footer from "@/components/footer";
import {
  filterTools,
  getFeaturedTools,
  getResultsHeading,
  hasActiveFilters,
} from "@/lib/filter-tools";
import { CategoryRecord, PricingOption, Tool } from "@/lib/types";

type HomePageProps = {
  tools: Tool[];
  categories: CategoryRecord[];
};

export default function HomePage({ tools, categories }: HomePageProps) {
  const [searchInput, setSearchInput] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);
  const [activePricing, setActivePricing] = useState<PricingOption | null>(null);

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

        {isFiltered ? (
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
