"use client";

import { use } from "react";
import Link from "next/link";
import { ChevronRight, Building2 } from "lucide-react";
import { useApp } from "@/components/providers/AppProvider";
import { BookingForm } from "@/components/booking/BookingForm";
import { EmptyState } from "@/components/shared/EmptyState";

interface ReserverPageProps {
  params: Promise<{ businessId: string }>;
}

export default function ReserverPage({ params }: ReserverPageProps) {
  const { businessId } = use(params);
  const { getUser, getBusinessActivities, currentUser } = useApp();

  // Only families can book activities
  if (currentUser.role !== "FAMILY") {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <EmptyState
          icon={Building2}
          title="Acces restreint"
          description="Seules les familles peuvent reserver des activites."
          actionLabel="Retour a l'explorateur"
          actionHref="/explorer"
        />
      </div>
    );
  }

  const business = getUser(businessId);
  const activities = getBusinessActivities(businessId);

  if (!business || business.role !== "BUSINESS" || !business.businessProfile) {
    return (
      <EmptyState
        icon={Building2}
        title="Etablissement introuvable"
        description="L'etablissement que vous recherchez n'existe pas ou a ete supprime."
        actionLabel="Retour a l'explorateur"
        actionHref="/explorer"
      />
    );
  }

  const companyName = business.businessProfile.companyName;

  if (activities.length === 0) {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Breadcrumb */}
        <nav aria-label="Fil d'Ariane" className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <Link href="/explorer" className="hover:text-foreground transition-colors">
            Explorer
          </Link>
          <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
          <Link href={`/explorer/${businessId}`} className="hover:text-foreground transition-colors">
            {companyName}
          </Link>
          <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
          <span className="text-foreground font-medium">Reserver</span>
        </nav>

        <EmptyState
          icon={Building2}
          title="Aucune activite disponible"
          description="Cet etablissement ne propose pas encore d'activite a reserver."
          actionLabel="Retour a l'etablissement"
          actionHref={`/explorer/${businessId}`}
        />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Breadcrumb */}
      <nav aria-label="Fil d'Ariane" className="flex items-center gap-1.5 text-sm text-muted-foreground">
        <Link href="/explorer" className="hover:text-foreground transition-colors">
          Explorer
        </Link>
        <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
        <Link href={`/explorer/${businessId}`} className="hover:text-foreground transition-colors">
          {companyName}
        </Link>
        <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
        <span className="text-foreground font-medium">Reserver</span>
      </nav>

      {/* Title */}
      <h1 className="text-2xl font-heading font-bold text-foreground">
        Reserver une activite
      </h1>

      {/* Booking form */}
      <BookingForm businessId={businessId} activities={activities} />
    </div>
  );
}
