import type { Metadata } from "next";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import DataError from "@/components/data-error";
import SupabaseConfigMissing from "@/components/supabase-config-missing";
import ComparePageView from "@/components/compare-page";
import { parseCompareParam } from "@/lib/compare";
import { fetchToolsBySlugs } from "@/lib/tools";
import { getSupabaseEnvError, isSupabaseConfigError } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Compare AI Tools — AIZinc",
  description: "Compare AI tools side by side on AIZinc.",
};

type PageProps = {
  searchParams: Promise<{ compare?: string }>;
};

export default async function Page({ searchParams }: PageProps) {
  const { compare } = await searchParams;
  const slugs = parseCompareParam(compare);
  const retryHref = slugs.length
    ? `/compare?compare=${encodeURIComponent(slugs.join(","))}`
    : "/compare";

  if (getSupabaseEnvError()) {
    return <SupabaseConfigMissing retryHref={retryHref} />;
  }

  try {
    const tools = slugs.length > 0 ? await fetchToolsBySlugs(slugs) : [];
    return <ComparePageView tools={tools} />;
  } catch (error) {
    if (isSupabaseConfigError(error)) {
      return <SupabaseConfigMissing retryHref={retryHref} />;
    }

    const message =
      error instanceof Error ? error.message : "An unexpected error occurred.";
    console.error("[ComparePage] failed to load data:", error);

    return (
      <>
        <Navbar />
        <main>
          <section className="bg-background py-12 sm:py-16">
            <div className="container-main">
              <DataError
                title="Could not load comparison"
                message={message}
                retryHref={retryHref}
              />
            </div>
          </section>
        </main>
        <Footer />
      </>
    );
  }
}
