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

  return (
    <div className="min-h-screen bg-hc-cream">
      {/* Simple top bar */}
      <header className="flex items-center px-6 py-4 bg-white border-b border-border">
        <Link href="/" className="font-heading text-xl font-bold text-hc-blue">
          HandiConnect
        </Link>
      </header>

      <main className="max-w-lg mx-auto mt-20 px-4 pb-20">
        <div className="text-center mb-10">
          <h1 className="font-heading text-3xl font-bold text-hc-text mb-2">
            Connexion
          </h1>
          <p className="text-hc-text-light">
            Choisissez un profil pour tester l&apos;application
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {mockUsers.map((user) => (
            <button
              key={user.id}
              onClick={() => handleSelect(user.id)}
              className="flex items-center gap-4 rounded-2xl border border-border bg-white p-4 text-left hover:border-hc-blue hover:shadow-sm transition-all card-hover"
            >
              {/* Avatar with initials */}
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-hc-blue/10 text-hc-blue font-semibold flex items-center justify-center text-sm">
                {getInitials(user.name)}
              </div>

              <div className="flex-1 min-w-0">
                <p className="font-semibold text-hc-text truncate">
                  {user.name}
                </p>
                <span
                  className={`inline-block mt-1 text-xs font-medium px-2 py-0.5 rounded-full ${
                    user.role === "FAMILY"
                      ? "bg-green-100 text-green-800"
                      : "bg-purple-100 text-purple-800"
                  }`}
                >
                  {user.role === "FAMILY" ? "Famille" : "Etablissement"}
                </span>
              </div>
            </button>
          ))}
        </div>
      </main>
    </div>
  );
}
