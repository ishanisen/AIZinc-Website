import type { Metadata } from "next";
import HomePage from "@/components/home-page";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import DataError from "@/components/data-error";
import SupabaseConfigMissing from "@/components/supabase-config-missing";
import { fetchCategories } from "@/lib/categories";
import { fetchTools } from "@/lib/tools";
import { getSupabaseEnvError, isSupabaseConfigError } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "AIZinc — Discover AI Tools",
  description:
    "Search, filter, and compare AI tools across writing, coding, design, video, productivity, and more.",
};

export default async function Page() {
  if (getSupabaseEnvError()) {
    return <SupabaseConfigMissing retryHref="/" />;
  }

  try {
    const [tools, categories] = await Promise.all([
      fetchTools(),
      fetchCategories(),
    ]);

    return <HomePage tools={tools} categories={categories} />;
  } catch (error) {
    if (isSupabaseConfigError(error)) {
      return <SupabaseConfigMissing retryHref="/" />;
    }

    const message =
      error instanceof Error ? error.message : "An unexpected error occurred.";
    console.error("[HomePage] failed to load data:", error);

    return (
      <>
        <Navbar />
        <main>
          <section className="bg-background py-12 sm:py-16">
            <div className="container-main">
              <DataError
                title="Could not load tools"
                message={message}
                retryHref="/"
              />
            </div>
          </section>
        </main>
        <Footer />
      </>
    );
  }
}
