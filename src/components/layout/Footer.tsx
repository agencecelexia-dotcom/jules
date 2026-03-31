import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border bg-hc-cream-dark py-12 px-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-8 max-w-7xl mx-auto">
        {/* Left: Brand + tagline */}
        <div className="text-center md:text-left">
          <Link href="/" className="font-heading text-hc-blue font-bold text-lg italic">
            HandiConnect
          </Link>
          <p className="text-xs text-hc-text-muted mt-1">
            Le reseau social du handicap
          </p>
        </div>

        {/* Center: Nav links */}
        <div className="flex items-center gap-6">
          <a
            href="#"
            className="text-sm text-hc-text-muted hover:text-hc-blue transition-colors"
          >
            Accessibilite
          </a>
          <a
            href="#"
            className="text-sm text-hc-text-muted hover:text-hc-blue transition-colors"
          >
            Mentions legales
          </a>
          <a
            href="#"
            className="text-sm text-hc-text-muted hover:text-hc-blue transition-colors"
          >
            Contact
          </a>
        </div>

        {/* Right: Copyright */}
        <p className="text-xs text-hc-text-muted">
          &copy; 2026 HandiConnect
        </p>
      </div>
    </footer>
  );
}
