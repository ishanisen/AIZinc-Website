export default function ComingSoon({
  compact = false,
}: {
  compact?: boolean;
}) {
  return (
    <div
      className={
        compact
          ? "rounded-[10px] border border-dashed border-accent/35 bg-[color-mix(in_srgb,#1e3a6e_6%,transparent)] px-2.5 py-2 text-[13px] text-text-secondary"
          : "rounded-[10px] border border-dashed border-accent/35 bg-[color-mix(in_srgb,#1e3a6e_6%,transparent)] px-3 py-3 text-sm text-text-secondary"
      }
    >
      Details coming soon
    </div>
  );
}
