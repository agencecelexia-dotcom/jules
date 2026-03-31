"use client";

import Link from "next/link";
import { HeroSection } from "@/components/landing/HeroSection";
import { ValuePropSection } from "@/components/landing/ValuePropSection";
import { TestimonialsSection } from "@/components/landing/TestimonialsSection";
import { CTASection } from "@/components/landing/CTASection";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Top bar */}
      <header className="flex items-center justify-between px-6 py-4 bg-white/80 backdrop-blur-sm border-b border-border sticky top-0 z-50">
        <Link href="/" className="font-heading text-xl font-bold text-hc-blue">
          HandiConnect
        </Link>
        <Link
          href="/connexion"
          className="inline-flex items-center justify-center rounded-xl bg-hc-blue text-white px-5 py-2 text-sm font-semibold hover:bg-hc-blue-light transition-colors"
        >
          Connexion
        </Link>
      </header>

      {/* Sections */}
      <main className="flex-1">
        <HeroSection />
        <ValuePropSection />
        <TestimonialsSection />
        <CTASection />
      </main>

      {/* Footer */}
      <footer className="py-8 px-6 bg-hc-text text-white/60 text-center text-sm">
        <p>
          &copy; {new Date().getFullYear()} HandiConnect. Tous droits reserves.
        </p>
        <p className="mt-1">
          Fait avec bienveillance pour les familles en situation de handicap.
        </p>
      </footer>
    </div>
  );
}
