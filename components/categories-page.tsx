import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import CategoryCard from "@/components/category-card";
import { CategoryOverview } from "@/lib/types";

type CategoriesPageProps = {
  categories: CategoryOverview[];
};

export default function CategoriesPage({ categories }: CategoriesPageProps) {
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
            {categories.length === 0 ? (
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
