import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CategoryDetailPage from "@/components/category-detail-page";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import DataError from "@/components/data-error";
import SupabaseConfigMissing from "@/components/supabase-config-missing";
import { fetchCategoryBySlug } from "@/lib/categories";
import { fetchToolsByCategorySlug } from "@/lib/tools";
import { getSupabaseEnvError, isSupabaseConfigError } from "@/lib/supabase";
import { CATEGORY_PAGE_SIZE } from "@/lib/types";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ categorySlug: string }>;
  searchParams: Promise<{ page?: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { categorySlug } = await params;

  const label = categorySlug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

  const fallback: Metadata = {
    title: `${label} AI Tools — AIZinc`,
    description: `Discover published AI tools in the ${label} category on AIZinc.`,
  };

  if (getSupabaseEnvError()) {
    return fallback;
  }

  try {
    const category = await fetchCategoryBySlug(categorySlug);
    if (category) {
      return {
        title: `${category.name} AI Tools — AIZinc`,
        description: `Discover published AI tools in the ${category.name} category on AIZinc.`,
      };
    }
  } catch {
    // Fall through to slug-based metadata
  }

  return fallback;
}

export default async function Page({ params, searchParams }: PageProps) {
  const { categorySlug } = await params;
  const { page: pageParam } = await searchParams;
  const page = Math.max(1, Number.parseInt(pageParam ?? "1", 10) || 1);
  const retryHref = `/ai-tools/${categorySlug}`;

  if (getSupabaseEnvError()) {
    return <SupabaseConfigMissing retryHref={retryHref} />;
  }

  try {
    const data = await fetchToolsByCategorySlug(
      categorySlug,
      page,
      CATEGORY_PAGE_SIZE,
    );

    if (!data) {
      notFound();
    }

    return <CategoryDetailPage data={data} />;
  } catch (error) {
    if (isSupabaseConfigError(error)) {
      return <SupabaseConfigMissing retryHref={retryHref} />;
    }

    const message =
      error instanceof Error ? error.message : "An unexpected error occurred.";
    console.error("[CategoryDetailPage] failed to load data:", error);

    return (
      <>
        <Navbar />
        <main>
          <section className="bg-background py-12 sm:py-16">
            <div className="container-main">
              <DataError
                title="Could not load tools"
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
