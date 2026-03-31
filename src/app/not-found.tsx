import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <p className="text-8xl font-heading font-bold text-hc-blue">404</p>
      <h1 className="mt-4 text-2xl font-heading font-semibold text-foreground">
        Page introuvable
      </h1>
      <p className="mt-2 max-w-md text-sm text-muted-foreground">
        La page que vous recherchez n&apos;existe pas ou a ete deplacee.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center justify-center rounded-xl bg-hc-blue text-white px-6 py-3 text-sm font-semibold hover:bg-hc-blue-light transition-colors"
      >
        Retour a l&apos;accueil
      </Link>
    </div>
  );
}
