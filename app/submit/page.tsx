import type { Metadata } from "next";
import SubmitToolPage from "@/components/submit-tool-page";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import DataError from "@/components/data-error";
import SupabaseConfigMissing from "@/components/supabase-config-missing";
import { fetchCategories } from "@/lib/categories";
import { getSupabaseEnvError, isSupabaseConfigError } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Submit Tool — AIZinc",
  description:
    "Submit your AI tool to the AIZinc directory and reach people searching for AI solutions.",
};

export default async function Page() {
  if (getSupabaseEnvError()) {
    return <SupabaseConfigMissing retryHref="/submit" />;
  }

  try {
    const categories = await fetchCategories();
    return <SubmitToolPage categories={categories} />;
  } catch (error) {
    if (isSupabaseConfigError(error)) {
      return <SupabaseConfigMissing retryHref="/submit" />;
    }

    const message =
      error instanceof Error ? error.message : "An unexpected error occurred.";
    console.error("[SubmitToolPage] failed to load categories:", error);

    return (
      <>
        <Navbar />
        <main>
          <section className="bg-background py-12 sm:py-16">
            <div className="container-main">
              <DataError
                title="Could not load form"
                message={message}
                retryHref="/submit"
              />
            </div>
          </section>
        </main>
        <Footer />
      </>
    );
  }
}
