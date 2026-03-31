"use client";

import { useMemo } from "react";
import { useApp } from "@/components/providers/AppProvider";
import { ActivityTable } from "@/components/dashboard/ActivityTable";

export default function ActivitiesPage() {
  const { currentUser, activities } = useApp();

  const businessActivities = useMemo(
    () => activities.filter((a) => a.businessId === currentUser.id),
    [activities, currentUser.id]
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Gestion des activites</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Creez, modifiez et gerez vos activites
        </p>
      </div>

      <ActivityTable activities={businessActivities} />
    </div>
  );
}
