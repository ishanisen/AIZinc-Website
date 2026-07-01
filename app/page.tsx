"use client";

import { useMemo, useState } from "react";
import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import FeaturedTools from "@/components/featured-tools";
import ToolGrid from "@/components/tool-grid";
import Footer from "@/components/footer";
import { sampleTools, getFeaturedTools } from "@/lib/sample-tools";
import { Category } from "@/lib/types";

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);

  const featuredTools = useMemo(() => getFeaturedTools(sampleTools), []);

  const filteredTools = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return sampleTools.filter((tool) => {
      const matchesCategory =
        !activeCategory || tool.category === activeCategory;

      if (!query) return matchesCategory;

      const searchable = [
        tool.name,
        tool.description,
        tool.category,
        ...tool.tags,
      ]
        .join(" ")
        .toLowerCase();

      return matchesCategory && searchable.includes(query);
    });
  }, [searchQuery, activeCategory]);

  return (
    <>
      <Navbar />
      <main>
        <Hero
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
        <FeaturedTools tools={featuredTools} />
        <ToolGrid tools={filteredTools} />
      </main>
      <Footer />
    </>
  );
}
