import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CategoryDetailPage from "@/components/category-detail-page";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import DataError from "@/components/data-error";
import { fetchCategoryBySlug } from "@/lib/categories";
import { fetchToolsByCategorySlug } from "@/lib/tools";
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

  const label = categorySlug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

  return {
    title: `${label} AI Tools — AIZinc`,
    description: `Discover published AI tools in the ${label} category on AIZinc.`,
  };
}

export default async function Page({ params, searchParams }: PageProps) {
  const { categorySlug } = await params;
  const { page: pageParam } = await searchParams;
  const page = Math.max(1, Number.parseInt(pageParam ?? "1", 10) || 1);

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
                retryHref={`/ai-tools/${categorySlug}`}
              />
            </div>
          </section>
        </main>
        <Footer />
      </>
    );
  }
}
