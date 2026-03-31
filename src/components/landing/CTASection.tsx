"use client";

import Link from "next/link";

export function CTASection() {
  return (
    <section className="py-20 px-4 gradient-warm relative overflow-hidden">
      {/* Subtle decorative circles */}
      <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/10 -translate-y-1/2 translate-x-1/3" aria-hidden="true" />
      <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-white/10 translate-y-1/3 -translate-x-1/4" aria-hidden="true" />

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        <h2 className="font-extrabold text-3xl md:text-4xl text-white mb-4">
          Pret a rejoindre la communaute ?
        </h2>
        <p className="text-white/80 text-lg mb-10 leading-relaxed">
          Gratuit, bienveillant, fait pour vous.
        </p>
        <Link
          href="/connexion"
          className="inline-flex items-center justify-center bg-white text-hc-text rounded-full px-10 py-4 font-bold shadow-lg hover:shadow-xl transition-shadow"
        >
          Creer mon compte gratuitement
        </Link>
      </div>
    </section>
  );
}
