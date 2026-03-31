"use client";

import Link from "next/link";

export function CTASection() {
  return (
    <section className="py-24 px-4 bg-hc-blue">
      <div className="max-w-2xl mx-auto text-center text-white">
        <h2 className="font-heading text-3xl font-bold mb-6">
          Pret a rejoindre HandiConnect ?
        </h2>
        <p className="text-lg text-white/80 mb-10">
          Creez votre compte gratuitement et decouvrez une communaute engagee.
        </p>
        <Link
          href="/connexion"
          className="inline-flex items-center justify-center rounded-xl bg-white text-hc-blue px-8 py-4 text-lg font-semibold hover:bg-white/90 transition-colors"
        >
          Creer mon compte gratuitement
        </Link>
      </div>
    </section>
  );
}
