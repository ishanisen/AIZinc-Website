import Link from "next/link";
import BrandMark from "@/components/brand-mark";

const footerLinks = {
  Discover: [
    { label: "Categories", href: "/#browse" },
    { label: "Trending", href: "/#trending" },
    { label: "New tools", href: "/#browse" },
  ],
  AIZinc: [
    { label: "Submit a tool", href: "/submit" },
    { label: "About", href: "#" },
    { label: "Contact", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="container-main flex flex-wrap gap-10 py-12 lg:gap-16">
        <div className="min-w-[280px] flex-[2_1_280px]">
          <Link
            href="/"
            className="inline-flex items-center gap-2.5 font-heading text-xl font-semibold uppercase tracking-[0.04em] text-text-primary no-underline"
          >
            <BrandMark size={16} />
            AIZinc
          </Link>
          <p className="mt-3 max-w-[42ch] text-sm leading-[1.55] text-text-secondary">
            A curated directory of AI tools — search, compare, and find the
            right fit for your workflow.
          </p>
        </div>

        {Object.entries(footerLinks).map(([title, links]) => (
          <div key={title} className="grid flex-[1_1_140px] content-start gap-2.5">
            <span className="text-xs font-semibold uppercase tracking-[0.08em] text-text-secondary">
              {title}
            </span>
            {links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm text-accent-700 no-underline hover:text-[#091629]"
              >
                {link.label}
              </Link>
            ))}
          </div>
        ))}
      </div>

      <div className="container-main pb-8 text-[13px] text-text-muted">
        &copy; {new Date().getFullYear()} AIZinc. All rights reserved.
      </div>
    </footer>
  );
}
