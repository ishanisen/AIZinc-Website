import type { Metadata } from "next";
import SubmitToolPage from "@/components/submit-tool-page";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import DataError from "@/components/data-error";
import { fetchCategories } from "@/lib/categories";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Submit Tool — AIZinc",
  description:
    "Submit your AI tool to the AIZinc directory and reach people searching for AI solutions.",
};

export default async function Page() {
  try {
    const categories = await fetchCategories();
    return <SubmitToolPage categories={categories} />;
  } catch (error) {
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
