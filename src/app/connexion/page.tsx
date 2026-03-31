"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { mockUsers } from "@/lib/mock-data/users";
import { useApp } from "@/components/providers/AppProvider";
import { getInitials } from "@/lib/utils";

export default function ConnexionPage() {
  const router = useRouter();
  const { switchUser } = useApp();

  function handleSelect(userId: string) {
    switchUser(userId);
    router.push("/fil");
  }

  const families = mockUsers.filter((u) => u.role === "FAMILY");
  const businesses = mockUsers.filter((u) => u.role === "BUSINESS");

  return (
    <div className="min-h-screen bg-hc-cream">
      {/* Simple top bar */}
      <header className="flex items-center px-6 py-4 bg-white/90 backdrop-blur-lg border-b border-border/40">
        <Link href="/" className="font-heading text-xl font-bold text-hc-blue italic">
          HandiConnect
        </Link>
      </header>

      <main className="max-w-lg mx-auto mt-16 px-4 pb-20">
        <div className="text-center mb-12">
          <h1 className="font-heading text-3xl font-bold text-hc-text mb-3">
            Bienvenue sur <span className="italic text-hc-blue">HandiConnect</span>
          </h1>
          <p className="text-hc-text-muted text-[15px]">
            Selectionnez un profil pour explorer l&apos;application
          </p>
        </div>

        {/* Families section */}
        <div className="mb-8">
          <h2 className="font-heading text-lg font-semibold text-hc-text mb-4 px-1">
            Familles
          </h2>
          <div className="grid grid-cols-1 gap-3">
            {families.map((user) => (
              <button
                key={user.id}
                onClick={() => handleSelect(user.id)}
                className="card-editorial card-hover flex items-center gap-4 p-4 text-left border-l-4 border-l-hc-blue"
              >
                {/* Avatar */}
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-hc-blue/10 text-hc-blue font-semibold flex items-center justify-center text-sm ring-2 ring-border">
                  {getInitials(user.name)}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-hc-text truncate">
                    {user.name}
                  </p>
                  <span className="inline-block mt-1 text-xs font-medium px-2.5 py-0.5 rounded-full bg-hc-blue-muted text-hc-blue">
                    Famille
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Businesses section */}
        <div>
          <h2 className="font-heading text-lg font-semibold text-hc-text mb-4 px-1">
            Etablissements
          </h2>
          <div className="grid grid-cols-1 gap-3">
            {businesses.map((user) => (
              <button
                key={user.id}
                onClick={() => handleSelect(user.id)}
                className="card-editorial card-hover flex items-center gap-4 p-4 text-left border-l-4 border-l-hc-sage"
              >
                {/* Avatar */}
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-hc-sage/10 text-hc-sage font-semibold flex items-center justify-center text-sm ring-2 ring-border">
                  {getInitials(user.name)}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-hc-text truncate">
                    {user.name}
                  </p>
                  <span className="inline-block mt-1 text-xs font-medium px-2.5 py-0.5 rounded-full bg-hc-sage/10 text-hc-sage">
                    Etablissement
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
