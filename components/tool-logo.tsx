"use client";

import { useState } from "react";

type ToolLogoProps = {
  name: string;
  logoUrl?: string | null;
  className?: string;
};

const frameClass =
  "flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-border bg-surface-2";

function LetterAvatar({ name }: { name: string }) {
  const letter = name.trim().charAt(0).toUpperCase() || "?";

  return (
    <div className={`${frameClass} text-sm font-semibold text-accent`} aria-hidden="true">
      {letter}
    </div>
  );
}

export default function ToolLogo({ name, logoUrl, className }: ToolLogoProps) {
  const [failed, setFailed] = useState(false);
  const src = logoUrl?.trim() || "";
  const showImage = Boolean(src) && !failed;

  if (!showImage) {
    return (
      <div className={className}>
        <LetterAvatar name={name} />
      </div>
    );
  }

  return (
    <div className={`${frameClass} ${className ?? ""}`}>
      {/* Native img: Google Favicon URLs are often ICO/PNG via redirect and can fail Next Image optimization. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt=""
        width={44}
        height={44}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-contain p-1"
        onError={() => setFailed(true)}
      />
    </div>
  );
}
