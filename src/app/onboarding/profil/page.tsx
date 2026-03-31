"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useApp } from "@/components/providers/AppProvider";
import { getInitials } from "@/lib/utils";
import { HANDICAP_LABELS } from "@/lib/constants";

export default function OnboardingProfilPage() {
  const router = useRouter();
  const { currentUser } = useApp();

  const isFamily = currentUser.role === "FAMILY";
  const profile = isFamily
    ? currentUser.familyProfile
    : currentUser.businessProfile;

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
            Votre profil
          </h1>
          <p className="text-hc-text-light">
            Verifiez vos informations avant de commencer
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-white p-6">
          {/* Avatar + Name */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-hc-blue/10 text-hc-blue font-bold flex items-center justify-center text-lg">
              {getInitials(currentUser.name)}
            </div>
            <div>
              <p className="font-heading text-xl font-semibold text-hc-text">
                {currentUser.name}
              </p>
              <span
                className={`inline-block mt-1 text-xs font-medium px-2 py-0.5 rounded-full ${
                  isFamily
                    ? "bg-green-100 text-green-800"
                    : "bg-purple-100 text-purple-800"
                }`}
              >
                {isFamily ? "Famille" : "Etablissement"}
              </span>
            </div>
          </div>

          {/* Profile info */}
          <div className="space-y-4 text-sm">
            <div>
              <p className="text-hc-text-light mb-1">Email</p>
              <p className="text-hc-text font-medium">{currentUser.email}</p>
            </div>

            {currentUser.bio && (
              <div>
                <p className="text-hc-text-light mb-1">Bio</p>
                <p className="text-hc-text">{currentUser.bio}</p>
              </div>
            )}

            {isFamily && currentUser.familyProfile && (
              <>
                <div>
                  <p className="text-hc-text-light mb-1">Ville</p>
                  <p className="text-hc-text font-medium">
                    {currentUser.familyProfile.city}
                  </p>
                </div>
                <div>
                  <p className="text-hc-text-light mb-1">
                    Types de handicap
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {currentUser.familyProfile.handicapTypes.map((type) => (
                      <span
                        key={type}
                        className="inline-block text-xs font-medium px-2 py-0.5 rounded-full bg-blue-100 text-blue-800"
                      >
                        {HANDICAP_LABELS[type]}
                      </span>
                    ))}
                  </div>
                </div>
              </>
            )}

            {!isFamily && currentUser.businessProfile && (
              <>
                <div>
                  <p className="text-hc-text-light mb-1">Adresse</p>
                  <p className="text-hc-text font-medium">
                    {currentUser.businessProfile.address}
                  </p>
                </div>
                <div>
                  <p className="text-hc-text-light mb-1">
                    Handicaps accompagnes
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {currentUser.businessProfile.handicapTypesSupported.map(
                      (type) => (
                        <span
                          key={type}
                          className="inline-block text-xs font-medium px-2 py-0.5 rounded-full bg-blue-100 text-blue-800"
                        >
                          {HANDICAP_LABELS[type]}
                        </span>
                      )
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="text-center mt-8">
          <button
            onClick={() => router.push("/fil")}
            className="inline-flex items-center justify-center rounded-xl bg-hc-blue text-white px-8 py-3 text-base font-semibold hover:bg-hc-blue-light transition-colors"
          >
            Commencer
          </button>
        </div>
      </main>
    </div>
  );
}
