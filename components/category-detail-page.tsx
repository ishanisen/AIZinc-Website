import Link from "next/link";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import ToolCard from "@/components/tool-card";
import { getCategoryIcon } from "@/lib/category-icons";
import type { CategoryToolsPage } from "@/lib/tools";

type CategoryDetailPageProps = {
  data: CategoryToolsPage;
};

export default function CategoryDetailPage({ data }: CategoryDetailPageProps) {
  const Icon = getCategoryIcon(data.category.slug);
  const slug = data.category.slug;

  return (
    <>
      <Navbar />
      <main>
        <section className="border-b border-border bg-gradient-to-b from-accent-soft/50 via-background to-background py-10 sm:py-14">
          <div className="container-main">
            <Link
              href="/ai-tools"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-text-secondary transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              All categories
            </Link>

            <div className="mt-6 flex items-start gap-4">
              <div
                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-border bg-white text-accent shadow-card"
                aria-hidden="true"
              >
                <Icon className="h-7 w-7" />
              </div>
              <div>
                <h1 className="text-3xl font-semibold tracking-tight text-text-primary sm:text-4xl">
                  {data.category.name}
                </h1>
                <p className="mt-2 text-sm text-text-secondary sm:text-base">
                  {data.total}{" "}
                  {data.total === 1 ? "published tool" : "published tools"} in
                  this category
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-background py-12 sm:py-16">
          <div className="container-main">
            {data.tools.length === 0 ? (
              <div className="rounded-2xl border border-border bg-white px-6 py-16 text-center shadow-card">
                <p className="text-base font-semibold text-text-primary">
                  No tools yet
                </p>
                <p className="mt-2 text-sm text-text-secondary">
                  There are no published tools in {data.category.name} right
                  now. Check back soon.
                </p>
                <Link
                  href="/ai-tools"
                  className="mt-6 inline-flex items-center gap-2 rounded-lg border border-border bg-white px-4 py-2 text-sm font-medium text-text-primary transition-colors hover:border-accent hover:text-accent"
                >
                  Back to categories
                </Link>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {data.tools.map((tool) => (
                    <ToolCard
                      key={tool.id}
                      tool={tool}
                      featured={tool.featured}
                    />
                  ))}
                </div>

                {data.totalPages > 1 && (
                  <div className="mt-10 flex items-center justify-center gap-3">
                    {data.page > 1 ? (
                      <Link
                        href={
                          data.page === 2
                            ? `/ai-tools/${slug}`
                            : `/ai-tools/${slug}?page=${data.page - 1}`
                        }
                        className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-white px-3 py-2 text-sm font-medium text-text-primary transition-colors hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                      >
                        <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                        Previous
                      </Link>
                    ) : (
                      <span className="inline-flex cursor-not-allowed items-center gap-1.5 rounded-lg border border-border bg-white px-3 py-2 text-sm font-medium text-text-primary opacity-40">
                        <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                        Previous
                      </span>
                    )}

                    <span className="text-sm text-text-secondary">
                      Page {data.page} of {data.totalPages}
                    </span>

                    {data.page < data.totalPages ? (
                      <Link
                        href={`/ai-tools/${slug}?page=${data.page + 1}`}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-white px-3 py-2 text-sm font-medium text-text-primary transition-colors hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                      >
                        Next
                        <ChevronRight className="h-4 w-4" aria-hidden="true" />
                      </Link>
                    ) : (
                      <span className="inline-flex cursor-not-allowed items-center gap-1.5 rounded-lg border border-border bg-white px-3 py-2 text-sm font-medium text-text-primary opacity-40">
                        Next
                        <ChevronRight className="h-4 w-4" aria-hidden="true" />
                      </span>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
