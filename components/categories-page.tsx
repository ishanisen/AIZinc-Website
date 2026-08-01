"use client";

import { useCallback, useEffect, useState } from "react";
import { Loader2, RefreshCw } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import CategoryCard from "@/components/category-card";
import { fetchCategoryOverviews } from "@/lib/categories";
import { getSupabaseEnvError } from "@/lib/supabase";
import { CategoryOverview } from "@/lib/types";

function CategoriesLoading() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <Loader2
        className="h-8 w-8 animate-spin text-accent"
        aria-hidden="true"
      />
      <p className="mt-4 text-sm font-medium text-text-secondary">
        Loading categories…
      </p>
    </div>
  );
}

type CategoriesErrorProps = {
  message: string;
  onRetry: () => void;
};

function CategoriesError({ message, onRetry }: CategoriesErrorProps) {
  return (
    <div className="rounded-2xl border border-border bg-white px-6 py-16 text-center shadow-card">
      <p className="text-base font-semibold text-text-primary">
        Could not load categories
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

export default function CategoriesPage() {
  const [categories, setCategories] = useState<CategoryOverview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);

    const configError = getSupabaseEnvError();
    if (configError) {
      setError(configError);
      setCategories([]);
      setLoading(false);
      return;
    }

    try {
      const data = await fetchCategoryOverviews();
      setCategories(data);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "An unexpected error occurred.";
      console.error("[CategoriesPage] failed to load data:", err);
      setError(message);
      setCategories([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <>
      <Navbar />
      <main>
        <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-accent-soft/60 via-background to-background py-14 sm:py-20">
          <div
            className="pointer-events-none absolute inset-0 opacity-40"
            aria-hidden="true"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 20%, rgb(45 106 106 / 0.12), transparent 45%), radial-gradient(circle at 80% 0%, rgb(45 106 106 / 0.08), transparent 40%)",
            }}
          />
          <div className="container-main relative mx-auto max-w-3xl text-center">
            <h1 className="text-3xl font-semibold tracking-tight text-text-primary sm:text-4xl">
              All AI Tool Categories
            </h1>
            <p className="mt-3 text-base text-text-secondary sm:text-lg">
              Find Most Popular and Featured Tools by Category
            </p>
          </div>
        </section>

        <section className="bg-background py-12 sm:py-16">
          <div className="container-main">
            {loading ? (
              <CategoriesLoading />
            ) : error ? (
              <CategoriesError message={error} onRetry={loadData} />
            ) : categories.length === 0 ? (
              <div className="rounded-2xl border border-border bg-white px-6 py-16 text-center shadow-card">
                <p className="text-base font-semibold text-text-primary">
                  No categories with tools yet
                </p>
                <p className="mt-2 text-sm text-text-secondary">
                  Published tools will appear here once they are assigned to a
                  category.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
                {categories.map((category) => (
                  <CategoryCard key={category.id} category={category} />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
