export function Footer() {
  return (
    <footer className="border-t border-border py-8 px-4">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 max-w-7xl mx-auto">
        <p className="text-sm text-muted-foreground">
          HandiConnect &copy; 2026
        </p>
        <div className="flex items-center gap-6">
          <a
            href="#"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Accessibilite
          </a>
          <a
            href="#"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Mentions legales
          </a>
          <a
            href="#"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
