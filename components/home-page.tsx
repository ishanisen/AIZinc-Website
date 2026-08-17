"use client";

import { useMemo, useState } from "react";
import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import CategoryTicker from "@/components/category-ticker";
import DirectoryRegister from "@/components/directory-register";
import FeaturedTools from "@/components/featured-tools";
import BrowseTools from "@/components/browse-tools";
import SubmitCta from "@/components/submit-cta";
import Footer from "@/components/footer";
import { filterTools, getFeaturedTools } from "@/lib/filter-tools";
import { CategoryRecord, PricingOption, Tool } from "@/lib/types";

type HomePageProps = {
  tools: Tool[];
  categories: CategoryRecord[];
};

export default function HomePage({ tools, categories }: HomePageProps) {
  const [query, setQuery] = useState("");
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);
  const [activePricing, setActivePricing] = useState<PricingOption | null>(null);

  const featuredTools = useMemo(() => getFeaturedTools(tools), [tools]);

  const filteredTools = useMemo(
    () => filterTools(tools, query, activeCategoryId, activePricing),
    [tools, query, activeCategoryId, activePricing],
  );

  function clearFilters() {
    setQuery("");
    setActiveCategoryId(null);
    setActivePricing(null);
  }

  return (
    <>
      <Navbar />
      <main>
        <Hero
          query={query}
          onQueryChange={setQuery}
          categories={categories}
          onCategoryChange={setActiveCategoryId}
        />
        <CategoryTicker categories={categories} />
        <DirectoryRegister categoryCount={categories.length} />
        <FeaturedTools tools={featuredTools} />
        <BrowseTools
          tools={filteredTools}
          categories={categories}
          query={query}
          onQueryChange={setQuery}
          activeCategoryId={activeCategoryId}
          onCategoryChange={setActiveCategoryId}
          activePricing={activePricing}
          onPricingChange={setActivePricing}
          onClear={clearFilters}
        />
        <SubmitCta />
      </main>
      <Footer />
    </>
  );
}
