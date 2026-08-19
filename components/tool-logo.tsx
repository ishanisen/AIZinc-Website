"use client";

import { useState } from "react";

type ToolLogoProps = {
  name: string;
  logoUrl?: string | null;
  className?: string;
  size?: "sm" | "lg";
};

const sizeStyles = {
  sm: {
    frame: "h-10 w-10 rounded-[10px]",
    img: "h-[22px] w-[22px]",
    imgPx: 22,
    letter: "text-sm",
  },
  lg: {
    frame: "h-16 w-16 rounded-[12px]",
    img: "h-9 w-9",
    imgPx: 36,
    letter: "text-xl",
  },
} as const;

function LetterAvatar({
  name,
  size,
}: {
  name: string;
  size: keyof typeof sizeStyles;
}) {
  const letter = name.trim().charAt(0).toUpperCase() || "?";
  const styles = sizeStyles[size];

  return (
    <div
      className={`grid shrink-0 place-items-center overflow-hidden border border-border font-heading font-semibold text-accent ${styles.frame} ${styles.letter}`}
      aria-hidden="true"
    >
      {letter}
    </div>
  );
}

export default function ToolLogo({
  name,
  logoUrl,
  className,
  size = "sm",
}: ToolLogoProps) {
  const [failed, setFailed] = useState(false);
  const src = logoUrl?.trim() || "";
  const showImage = Boolean(src) && !failed;
  const styles = sizeStyles[size];

  if (!showImage) {
    return (
      <div className={className}>
        <LetterAvatar name={name} size={size} />
      </div>
    );
  }

  return (
    <div
      className={`grid shrink-0 place-items-center overflow-hidden border border-border ${styles.frame} ${className ?? ""}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt=""
        width={styles.imgPx}
        height={styles.imgPx}
        loading="lazy"
        decoding="async"
        className={`${styles.img} object-contain`}
        onError={() => setFailed(true)}
      />
    </div>
  );
}
