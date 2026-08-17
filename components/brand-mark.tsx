type BrandMarkProps = {
  size?: number;
  className?: string;
};

export default function BrandMark({ size = 18, className }: BrandMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className={className ?? "text-accent"}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="7" />
      <path d="M12 1v6M12 17v6M1 12h6M17 12h6" />
    </svg>
  );
}
