"use client";

import { useState } from "react";

type ToolLogoProps = {
  name: string;
  logoUrl?: string | null;
  className?: string;
};

const frameClass =
  "grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-[10px] border border-border";

function LetterAvatar({ name }: { name: string }) {
  const letter = name.trim().charAt(0).toUpperCase() || "?";

  return (
    <div
      className={`${frameClass} font-heading text-sm font-semibold text-accent`}
      aria-hidden="true"
    >
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
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt=""
        width={22}
        height={22}
        loading="lazy"
        decoding="async"
        className="h-[22px] w-[22px] object-contain"
        onError={() => setFailed(true)}
      />
    </div>
  );
}
