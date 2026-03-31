"use client";

import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-hero-gradient">
      {/* Subtle decorative background circles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute -top-20 -right-20 w-[500px] h-[500px] rounded-full bg-hc-sage/5" />
        <div className="absolute bottom-0 -left-16 w-[400px] h-[400px] rounded-full bg-hc-orange/5" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-20 flex flex-col lg:flex-row items-center gap-16">
        {/* Left side — text content (60%) */}
        <div className="flex-[3] max-w-2xl">
          {/* Eyebrow */}
          <div className="flex items-center gap-3 animate-fade-in-up stagger-1">
            <span className="block w-8 h-px bg-hc-sage" aria-hidden="true" />
            <span className="uppercase tracking-widest text-xs text-hc-sage font-semibold">
              Le reseau social du handicap en France
            </span>
          </div>

          {/* Heading */}
          <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold text-hc-text leading-[1.08] mt-6 animate-fade-in-up stagger-2">
            Connecter les familles,
            <br />
            ouvrir les possibles
          </h1>

          {/* Paragraph */}
          <p className="text-lg text-hc-text-light max-w-lg leading-relaxed mt-8 animate-fade-in-up stagger-3">
            Le premier reseau social qui connecte les familles en situation de
            handicap avec des activites et etablissements adaptes, testes par la
            communaute.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-start gap-4 mt-10 animate-fade-in-up stagger-4">
            <Link
              href="/connexion"
              className="inline-flex items-center justify-center rounded-full px-8 py-4 bg-hc-blue text-white font-semibold shadow-lg hover:shadow-xl hover:bg-hc-blue-dark transition-all"
            >
              Rejoindre la communaute
            </Link>
            <Link
              href="/explorer"
              className="inline-flex items-center justify-center rounded-full px-8 py-4 border-2 border-hc-blue text-hc-blue font-semibold hover:bg-hc-blue hover:text-white transition-all"
            >
              Decouvrir les etablissements
            </Link>
          </div>
        </div>

        {/* Right side — decorative composition (40%, desktop only) */}
        <div className="hidden lg:flex flex-[2] relative h-[480px] items-center justify-center">
          {/* Card 1 — sage */}
          <div
            className="absolute w-56 h-72 rounded-3xl bg-gradient-to-br from-hc-sage/20 to-hc-sage/5 border border-hc-sage/20 shadow-lg rotate-3 top-0 left-0 animate-fade-in-up stagger-5"
          />

          {/* Card 2 — orange with quote */}
          <div
            className="absolute w-64 h-80 rounded-3xl bg-gradient-to-br from-hc-orange/10 to-hc-orange/5 border border-hc-orange/15 shadow-xl -rotate-2 top-8 left-16 flex items-start p-8 animate-fade-in-up animate-float stagger-6"
          >
            <span className="text-[120px] leading-none text-hc-orange/25 font-heading select-none" aria-hidden="true">
              &#10077;
            </span>
          </div>

          {/* Card 3 — blue */}
          <div
            className="absolute w-52 h-64 rounded-3xl bg-gradient-to-br from-hc-blue/10 to-hc-blue/5 border border-hc-blue/15 shadow-lg rotate-2 top-20 left-40 animate-fade-in-up stagger-7"
          />
        </div>
      </div>
    </section>
  );
}
