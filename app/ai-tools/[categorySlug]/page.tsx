import type { Metadata } from "next";
import CategoryDetailPage from "@/components/category-detail-page";
import { fetchCategories } from "@/lib/categories";

type PageProps = {
  params: Promise<{ categorySlug: string }>;
};

export async function generateStaticParams() {
  try {
    const categories = await fetchCategories();
    return categories.map((category) => ({
      categorySlug: category.slug,
    }));
  } catch (error) {
    console.error(
      "[ai-tools/[categorySlug]] generateStaticParams failed:",
      error,
    );
    return [];
  }
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { categorySlug } = await params;
  const label = categorySlug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

  return {
    title: `${label} AI Tools — AIZinc`,
    description: `Discover published AI tools in the ${label} category on AIZinc.`,
  };
}

export default async function Page({ params }: PageProps) {
  const { categorySlug } = await params;
  return <CategoryDetailPage categorySlug={categorySlug} />;
}
