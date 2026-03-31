"use client";

import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative min-h-[80vh] flex items-center overflow-hidden bg-gradient-to-b from-hc-cream via-[#FFF5E8] to-white">
      {/* Decorative circles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-hc-orange/10" />
        <div className="absolute top-1/3 -right-16 w-96 h-96 rounded-full bg-hc-blue/10" />
        <div className="absolute bottom-10 left-1/4 w-56 h-56 rounded-full bg-hc-blue-light/10" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto text-center px-4 py-20">
        <h1 className="font-heading text-4xl md:text-6xl font-bold text-hc-text animate-fade-in-up">
          Connecter les familles, ouvrir les possibles
        </h1>

        <p className="text-lg md:text-xl text-hc-text-light mt-6 animate-fade-in-up stagger-1">
          Le premier reseau social qui connecte les familles en situation de
          handicap avec des activites et etablissements adaptes, testes par la
          communaute.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10 animate-fade-in-up stagger-2">
          <Link
            href="/connexion"
            className="inline-flex items-center justify-center rounded-xl bg-hc-blue text-white px-8 py-4 text-lg font-semibold hover:bg-hc-blue-light transition-colors"
          >
            Rejoindre la communaute
          </Link>
          <Link
            href="/explorer"
            className="inline-flex items-center justify-center rounded-xl border-2 border-hc-blue text-hc-blue px-8 py-4 text-lg font-semibold hover:bg-hc-blue hover:text-white transition-colors"
          >
            Decouvrir les etablissements
          </Link>
        </div>
      </div>
    </section>
  );
}
