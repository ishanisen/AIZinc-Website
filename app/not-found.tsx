import Link from "next/link";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main>
        <section className="bg-background py-12 sm:py-16">
          <div className="container-main">
            <div className="rounded-2xl border border-border bg-white px-6 py-16 text-center shadow-card">
              <p className="text-base font-semibold text-text-primary">
                Page not found
              </p>
              <p className="mt-2 text-sm text-text-secondary">
                The page you&apos;re looking for doesn&apos;t exist or was moved.
              </p>
              <Link
                href="/"
                className="mt-6 inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent-hover"
              >
                Back to home
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
