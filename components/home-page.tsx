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
  getResultsHeading,
  hasActiveFilters,
} from "@/lib/filter-tools";
import { getFeaturedTools } from "@/lib/tools";
import { Category, Tool } from "@/lib/types";

type HomePageProps = {
  tools: Tool[];
};

export default function HomePage({ tools }: HomePageProps) {
  const [searchInput, setSearchInput] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);

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

        {isFiltered ? (
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
