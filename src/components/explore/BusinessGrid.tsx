"use client";

import { Building2 } from "lucide-react";
import { BusinessCard } from "@/components/explore/BusinessCard";
import { EmptyState } from "@/components/shared/EmptyState";
import type { UserWithProfile } from "@/lib/types";

interface BusinessGridProps {
  businesses: UserWithProfile[];
}

export function BusinessGrid({ businesses }: BusinessGridProps) {
  if (businesses.length === 0) {
    return (
      <EmptyState
        icon={Building2}
        title="Aucun etablissement trouve"
        description="Aucun etablissement ne correspond a vos criteres. Essayez de modifier vos filtres."
      />
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {businesses.map((business) => (
        <BusinessCard key={business.id} business={business} />
      ))}
    </div>
  );
}
