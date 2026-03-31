"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { Users, Building2 } from "lucide-react";
import { useApp } from "@/components/providers/AppProvider";

export default function OnboardingPage() {
  const router = useRouter();
  const { currentUser } = useApp();

  const roles = [
    {
      value: "FAMILY" as const,
      label: "Famille",
      desc: "Je suis un parent ou un proche d'une personne en situation de handicap.",
      icon: Users,
    },
    {
      value: "BUSINESS" as const,
      label: "Etablissement",
      desc: "Je represente un etablissement proposant des activites ou services adaptes.",
      icon: Building2,
    },
  ];

  return (
    <div className="min-h-screen bg-hc-bg-secondary">
      {/* Simple top bar */}
      <header className="flex items-center px-6 py-4 bg-white border-b border-border">
        <Link href="/" className="font-heading text-xl font-bold text-hc-blue">
          HandiConnect
        </Link>
      </header>

      <main className="max-w-lg mx-auto mt-20 px-4 pb-20">
        <div className="text-center mb-10">
          <h1 className="font-heading text-3xl font-bold text-hc-text mb-2">
            Bienvenue sur HandiConnect
          </h1>
          <p className="text-hc-text-secondary">
            Quel est votre profil ?
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 mb-10">
          {roles.map((role) => {
            const Icon = role.icon;
            const isSelected = currentUser.role === role.value;
            return (
              <div
                key={role.value}
                className={`rounded-2xl border-2 p-6 text-center transition-colors ${
                  isSelected
                    ? "border-hc-blue bg-hc-blue/5"
                    : "border-border bg-white"
                }`}
              >
                <div
                  className={`inline-flex items-center justify-center w-14 h-14 rounded-full mb-4 ${
                    isSelected
                      ? "bg-hc-blue text-white"
                      : "bg-hc-blue/10 text-hc-blue"
                  }`}
                >
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="font-heading text-lg font-semibold text-hc-text mb-1">
                  {role.label}
                </h3>
                <p className="text-sm text-hc-text-secondary">{role.desc}</p>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <button
            onClick={() => router.push("/onboarding/profil")}
            className="inline-flex items-center justify-center rounded-xl bg-hc-blue text-white px-8 py-3 text-base font-semibold hover:bg-hc-blue-light transition-colors"
          >
            Continuer
          </button>
        </div>
      </main>
    </div>
  );
}
