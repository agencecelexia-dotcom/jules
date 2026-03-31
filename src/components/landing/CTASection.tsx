"use client";

import Link from "next/link";

export function CTASection() {
  return (
    <section className="relative py-20 px-4 bg-hc-blue overflow-hidden">
      {/* Subtle dot pattern overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.07]"
        aria-hidden="true"
        style={{
          backgroundImage:
            "radial-gradient(circle, #FEFCF9 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-6">
          Pret a rejoindre la communaute ?
        </h2>
        <p className="text-lg text-white/80 mb-10 leading-relaxed">
          Creez votre compte gratuitement et decouvrez une communaute engagee
          pour l'inclusion.
        </p>
        <Link
          href="/connexion"
          className="inline-flex items-center justify-center rounded-full bg-white text-hc-blue px-10 py-4 font-semibold shadow-lg hover:shadow-xl hover:bg-hc-cream transition-all"
        >
          Creer mon compte gratuitement
        </Link>
      </div>
    </section>
  );
}
