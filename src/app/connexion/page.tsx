"use client";

import { useRouter } from "next/navigation";
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
    <div className="min-h-screen bg-white">
      <main className="max-w-sm mx-auto pt-20 px-4 pb-20">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold">
            <span className="text-hc-text">Handi</span>
            <span className="text-gradient-warm">Connect</span>
          </h1>
          <p className="text-hc-text-secondary text-sm mt-2">
            Choisissez un profil
          </p>
        </div>

        {/* Families */}
        <div className="mb-6">
          <p className="text-xs text-hc-text-muted uppercase tracking-wider font-medium mb-3 px-4">
            Familles
          </p>
          <div className="space-y-1">
            {families.map((user) => (
              <button
                key={user.id}
                onClick={() => handleSelect(user.id)}
                className="flex items-center gap-3 p-4 rounded-xl hover:bg-hc-bg-secondary transition-colors w-full text-left"
              >
                <div className="avatar-ring flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-hc-bg-secondary text-hc-text font-semibold flex items-center justify-center text-sm">
                    {user.avatar ? (
                      <img
                        src={user.avatar}
                        alt=""
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      getInitials(user.name)
                    )}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm text-hc-text truncate">
                    {user.name}
                  </p>
                  <p className="text-xs text-hc-text-muted">Famille</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Businesses */}
        <div>
          <p className="text-xs text-hc-text-muted uppercase tracking-wider font-medium mb-3 px-4">
            Etablissements
          </p>
          <div className="space-y-1">
            {businesses.map((user) => (
              <button
                key={user.id}
                onClick={() => handleSelect(user.id)}
                className="flex items-center gap-3 p-4 rounded-xl hover:bg-hc-bg-secondary transition-colors w-full text-left"
              >
                <div className="avatar-ring flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-hc-bg-secondary text-hc-text font-semibold flex items-center justify-center text-sm">
                    {user.avatar ? (
                      <img
                        src={user.avatar}
                        alt=""
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      getInitials(user.name)
                    )}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm text-hc-text truncate">
                    {user.name}
                  </p>
                  <p className="text-xs text-hc-text-muted">Etablissement</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
