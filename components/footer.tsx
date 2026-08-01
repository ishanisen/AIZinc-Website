import Link from "next/link";

const footerLinks = {
  Discover: [
    { label: "Categories", href: "/ai-tools" },
    { label: "Trending", href: "/#featured" },
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
    <footer className="border-t border-border bg-white">
      <div className="container-main py-14">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
          <div className="col-span-2 sm:col-span-1">
            <Link
              href="/"
              className="text-lg font-semibold tracking-tight text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              AIZinc
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-text-muted">
              A curated directory of AI tools — search, compare, and find the
              right fit for your workflow.
            </p>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-sm font-semibold text-text-primary">{title}</h3>
              <ul className="mt-3 space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-text-muted transition-colors hover:text-text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-border pt-8">
          <p className="text-xs text-text-muted">
            &copy; {new Date().getFullYear()} AIZinc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
