"use client";

import { use } from "react";
import { ShieldCheck, Building2 } from "lucide-react";
import { useApp } from "@/components/providers/AppProvider";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { ProfileTabs } from "@/components/profile/ProfileTabs";
import { HandicapBadge } from "@/components/shared/HandicapBadge";
import { EmptyState } from "@/components/shared/EmptyState";
import { BUSINESS_CATEGORIES } from "@/lib/constants";

interface ProfilePageProps {
  params: Promise<{ userId: string }>;
}

export default function ProfilePage({ params }: ProfilePageProps) {
  const { userId } = use(params);
  const { getUser } = useApp();
  const user = getUser(userId);

  if (!user) {
    return (
      <EmptyState
        icon={Building2}
        title="Utilisateur introuvable"
        description="Le profil que vous recherchez n'existe pas ou a ete supprime."
        actionLabel="Retour a l'accueil"
        actionHref="/"
      />
    );
  }

  const isFamily = user.role === "FAMILY";
  const isBusiness = user.role === "BUSINESS";

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <ProfileHeader user={user} />

      <hr className="border-border" />

      {/* Handicap badges for family profiles */}
      {isFamily && user.familyProfile && user.familyProfile.handicapTypes.length > 0 && (
        <div className="card-editorial card-accent-sage p-5 space-y-3">
          <h2 className="text-sm font-heading font-semibold text-foreground">
            Types de handicap concernes
          </h2>
          <div className="flex flex-wrap gap-2">
            {user.familyProfile.handicapTypes.map((type) => (
              <HandicapBadge key={type} type={type} />
            ))}
          </div>
        </div>
      )}

      {/* Category & verified badges for business profiles */}
      {isBusiness && user.businessProfile && (
        <div className="flex flex-wrap items-center gap-2">
          {user.businessProfile.categories.map((cat) => {
            const categoryLabel =
              BUSINESS_CATEGORIES.find((c) => c.value === cat)?.label ?? cat;
            return (
              <span
                key={cat}
                className="inline-flex items-center rounded-full bg-primary/10 text-primary px-2.5 py-0.5 text-xs font-medium"
              >
                {categoryLabel}
              </span>
            );
          })}
          {user.businessProfile.isVerified && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 text-green-700 px-3 py-1 text-sm font-semibold">
              <ShieldCheck className="h-4 w-4" aria-hidden="true" />
              Etablissement verifie
            </span>
          )}
          {user.businessProfile.handicapTypesSupported.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-1 w-full">
              {user.businessProfile.handicapTypesSupported.map((type) => (
                <HandicapBadge key={type} type={type} />
              ))}
            </div>
          )}
        </div>
      )}

      <ProfileTabs user={user} />
    </div>
  );
}
