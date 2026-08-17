import type { Metadata } from "next";
import CategoriesPage from "@/components/categories-page";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import DataError from "@/components/data-error";
import SupabaseConfigMissing from "@/components/supabase-config-missing";
import { fetchCategoryOverviews } from "@/lib/categories";
import { getSupabaseEnvError, isSupabaseConfigError } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "All AI Tool Categories — AIZinc",
  description:
    "Browse AI tool categories and find the most popular and featured tools for writing, coding, design, automation, and more.",
};

export default async function Page() {
  if (getSupabaseEnvError()) {
    return <SupabaseConfigMissing retryHref="/ai-tools" />;
  }

  try {
    const categories = await fetchCategoryOverviews();
    return <CategoriesPage categories={categories} />;
  } catch (error) {
    if (isSupabaseConfigError(error)) {
      return <SupabaseConfigMissing retryHref="/ai-tools" />;
    }

    const message =
      error instanceof Error ? error.message : "An unexpected error occurred.";
    console.error("[CategoriesPage] failed to load data:", error);

    return (
      <>
        <Navbar />
        <main>
          <section className="bg-background py-12 sm:py-16">
            <div className="container-main">
              <DataError
                title="Could not load categories"
                message={message}
                retryHref="/ai-tools"
              />
            </div>
          </section>
        </main>
        <Footer />
      </>
    );
  }
}
