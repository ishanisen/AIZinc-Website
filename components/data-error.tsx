import Link from "next/link";
import { RefreshCw } from "lucide-react";

type DataErrorProps = {
  title?: string;
  message: string;
  retryHref?: string;
};

export default function DataError({
  title = "Could not load data",
  message,
  retryHref = "/",
}: DataErrorProps) {
  return (
    <div className="rounded-2xl border border-border bg-white px-6 py-16 text-center shadow-card">
      <p className="text-base font-semibold text-text-primary">{title}</p>
      <p className="mt-2 text-sm text-text-secondary">{message}</p>
      <Link
        href={retryHref}
        className="mt-6 inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-accent-foreground shadow-sm transition-colors hover:bg-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        <RefreshCw className="h-4 w-4" aria-hidden="true" />
        Try again
      </Link>
    </div>
  );
}
