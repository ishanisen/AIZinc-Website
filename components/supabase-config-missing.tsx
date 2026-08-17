import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import DataError from "@/components/data-error";
import { getSupabaseEnvError } from "@/lib/supabase";

type SupabaseConfigMissingProps = {
  retryHref?: string;
};

export default function SupabaseConfigMissing({
  retryHref = "/",
}: SupabaseConfigMissingProps) {
  const detail = getSupabaseEnvError();

  return (
    <>
      <Navbar />
      <main>
        <section className="bg-background py-12 sm:py-16">
          <div className="container-main">
            <DataError
              title="Supabase is not configured"
              message={
                detail ??
                "Supabase is not configured — check environment variables"
              }
              retryHref={retryHref}
            />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
