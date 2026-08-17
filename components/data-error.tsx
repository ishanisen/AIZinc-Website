import Link from "next/link";
import { RefreshCw } from "lucide-react";
import BlueprintFrame from "@/components/blueprint-frame";

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
    <BlueprintFrame className="px-6 py-16 text-center">
      <p className="font-heading text-base font-semibold uppercase tracking-[0.02em] text-text-primary">
        {title}
      </p>
      <p className="mt-2 text-sm text-text-secondary">{message}</p>
      <Link href={retryHref} className="btn-primary mt-6 inline-flex gap-2">
        <RefreshCw className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
        Try again
      </Link>
    </BlueprintFrame>
  );
}
