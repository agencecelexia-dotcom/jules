"use client";

import Link from "next/link";
import { HeroSection } from "@/components/landing/HeroSection";
import { ValuePropSection } from "@/components/landing/ValuePropSection";
import { TestimonialsSection } from "@/components/landing/TestimonialsSection";
import { CTASection } from "@/components/landing/CTASection";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Fixed top bar */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 h-14 bg-white/80 backdrop-blur-md">
        <Link href="/" className="text-lg font-bold">
          <span className="text-hc-text">Handi</span>
          <span className="text-gradient-warm">Connect</span>
        </Link>
        <Link
          href="/connexion"
          className="rounded-full gradient-warm text-white px-5 py-2 text-sm font-semibold hover:opacity-90 transition-opacity"
        >
          Se connecter
        </Link>
      </header>

      {/* Sections */}
      <main className="flex-1 pt-14">
        <HeroSection />
        <ValuePropSection />
        <TestimonialsSection />
        <CTASection />
      </main>

      {/* Simple footer */}
      <footer className="py-10 px-6 bg-white border-t border-hc-border text-center">
        <p className="text-sm text-hc-text-muted">
          &copy; {new Date().getFullYear()} HandiConnect. Tous droits reserves.
        </p>
        <p className="text-xs text-hc-text-muted mt-1">
          Fait avec bienveillance pour les familles en situation de handicap.
        </p>
      </footer>
    </div>
  );
}
