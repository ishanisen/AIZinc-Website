import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import DataError from "@/components/data-error";
import SupabaseConfigMissing from "@/components/supabase-config-missing";
import ToolDetailPage from "@/components/tool-detail-page";
import { fetchToolBySlug } from "@/lib/tools";
import { getSupabaseEnvError, isSupabaseConfigError } from "@/lib/supabase";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ slug: string }>;
};

function labelFromSlug(slug: string): string {
  return slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const label = labelFromSlug(slug);

  const fallback: Metadata = {
    title: `${label} — AIZinc`,
    description: `View ${label} on AIZinc, a curated directory of AI tools.`,
  };

  if (getSupabaseEnvError()) {
    return fallback;
  }

  try {
    const tool = await fetchToolBySlug(slug);
    if (tool) {
      return {
        title: `${tool.name} — AIZinc`,
        description:
          tool.description ||
          `View ${tool.name} on AIZinc, a curated directory of AI tools.`,
      };
    }
  } catch {
    // Fall through to slug-based metadata
  }

  return fallback;
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const retryHref = `/tools/${slug}`;

  if (getSupabaseEnvError()) {
    return <SupabaseConfigMissing retryHref={retryHref} />;
  }

  try {
    const tool = await fetchToolBySlug(slug);

    if (!tool) {
      notFound();
    }

    return <ToolDetailPage tool={tool} />;
  } catch (error) {
    if (isSupabaseConfigError(error)) {
      return <SupabaseConfigMissing retryHref={retryHref} />;
    }

    const message =
      error instanceof Error ? error.message : "An unexpected error occurred.";
    console.error("[ToolDetailPage] failed to load data:", error);

    return (
      <>
        <Navbar />
        <main>
          <section className="bg-background py-12 sm:py-16">
            <div className="container-main">
              <DataError
                title="Could not load tool"
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
