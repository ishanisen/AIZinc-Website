import Link from "next/link";

export default function SubmitCta() {
  return (
    <section
      id="submit"
      className="container-main pb-[clamp(56px,7vw,96px)] pt-[clamp(48px,6vw,80px)]"
    >
      <span className="kicker mb-3 block">04 · Submit a tool</span>
      <div className="draw-rule" />
      <div className="mt-5 flex flex-wrap items-end justify-between gap-6">
        <div>
          <h2 className="m-0 font-heading text-[clamp(26px,2.8vw,36px)] font-semibold uppercase leading-[1.1]">
            List your tool in the index
          </h2>
          <p className="mt-3.5 max-w-[56ch] text-[15px] leading-[1.55] text-[color-mix(in_srgb,#1d1f20_78%,transparent)]">
            Submissions are reviewed by hand before they print. If it clears the
            bar, it ships in the next weekly revision.
          </p>
        </div>
        <Link href="/submit" className="btn-primary !px-7">
          Submit Tool
        </Link>
      </div>
    </section>
  );
}
