import BlueprintFrame from "@/components/blueprint-frame";

const ROWS = [
  {
    num: "01",
    val: "19",
    prop: "Categories tracked",
    rem: "From writing to sales & CRM",
    mark: "oklch(55% 0.14 195)",
  },
  {
    num: "02",
    val: "7 days",
    prop: "Index refresh",
    rem: "Updated weekly, curated by hand",
    mark: "oklch(55% 0.14 60)",
  },
  {
    num: "03",
    val: "4",
    prop: "Pricing models",
    rem: "Free · Freemium · Free trial · Paid",
    mark: "oklch(55% 0.14 320)",
  },
  {
    num: "04",
    val: "$0",
    prop: "Cost to browse",
    rem: "No account required",
    mark: "oklch(55% 0.14 145)",
  },
] as const;

type DirectoryRegisterProps = {
  categoryCount: number;
};

export default function DirectoryRegister({
  categoryCount,
}: DirectoryRegisterProps) {
  const rows = ROWS.map((row) =>
    row.num === "01"
      ? { ...row, val: String(categoryCount || row.val) }
      : row,
  );

  return (
    <section className="container-main pb-6 pt-[clamp(56px,7vw,96px)]">
      <BlueprintFrame className="rise-on-view">
        <header className="flex flex-wrap items-stretch border-b border-border text-[13px] font-semibold uppercase tracking-[0.08em]">
          <span className="min-w-[16ch] flex-1 px-6 py-3">
            AIZinc — directory register
          </span>
          <span className="whitespace-nowrap border-l border-border px-6 py-3 text-text-secondary">
            AZ-01
          </span>
          <span className="whitespace-nowrap border-l border-border px-6 py-3 text-text-secondary">
            Rev A
          </span>
          <span className="whitespace-nowrap border-l border-border px-6 py-3 text-text-secondary">
            Sheet 01 of 04
          </span>
        </header>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-px bg-border">
          {rows.map((row) => (
            <div
              key={row.num}
              className="flex flex-col gap-2.5 bg-background px-6 pb-6 pt-7"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(to bottom, color-mix(in srgb, #1e3a6e 6%, transparent) 0 1px, transparent 1px 24px)",
              }}
            >
              <span className="flex items-baseline justify-between gap-3">
                <span className="kicker">№ {row.num}</span>
                <span
                  aria-hidden="true"
                  className="text-[13px] font-semibold"
                  style={{ color: row.mark }}
                >
                  +
                </span>
              </span>
              <span className="font-heading text-[clamp(36px,3.6vw,52px)] font-semibold leading-none tracking-[-0.01em] [font-feature-settings:'tnum'_1]">
                {row.val}
              </span>
              <span className="mt-1 text-[13px] font-semibold uppercase tracking-[0.08em]">
                {row.prop}
              </span>
              <span className="text-[13px] leading-[1.5] text-text-secondary">
                {row.rem}
              </span>
            </div>
          ))}
        </div>

        <p className="m-0 border-t border-border px-6 py-3 text-[13px] text-text-secondary">
          Values hold for the current weekly printing; earlier revisions are
          void.
        </p>
      </BlueprintFrame>
    </section>
  );
}
