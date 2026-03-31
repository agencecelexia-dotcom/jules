"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { CalendarDays, Search } from "lucide-react";
import { useApp } from "@/components/providers/AppProvider";
import { BookingCard } from "@/components/booking/BookingCard";
import { EmptyState } from "@/components/shared/EmptyState";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

type TabValue = "all" | "upcoming" | "past" | "cancelled";

export default function MesReservationsPage() {
  const { getUserBookings } = useApp();
  const bookings = getUserBookings();
  const [tab, setTab] = useState<TabValue>("all");

  const now = new Date();

  const filtered = useMemo(() => {
    switch (tab) {
      case "upcoming":
        return bookings.filter(
          (b) =>
            b.status === "CONFIRMED" && new Date(b.date) > now
        );
      case "past":
        return bookings.filter((b) => b.status === "COMPLETED");
      case "cancelled":
        return bookings.filter((b) => b.status === "CANCELLED");
      default:
        return bookings;
    }
  }, [bookings, tab, now]);

  if (bookings.length === 0) {
    return (
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-heading font-bold text-foreground mb-6">
          Mes reservations
        </h1>
        <EmptyState
          icon={CalendarDays}
          title="Vous n'avez pas encore de reservation"
          description="Explorez les activites accessibles pres de chez vous et reservez en quelques clics."
          actionLabel="Decouvrir les activites"
          actionHref="/explorer"
        />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-heading font-bold text-foreground">
        Mes reservations
      </h1>

      <Tabs
        defaultValue="all"
        value={tab}
        onValueChange={(v) => setTab(v as TabValue)}
      >
        <TabsList>
          <TabsTrigger value="all">Toutes</TabsTrigger>
          <TabsTrigger value="upcoming">A venir</TabsTrigger>
          <TabsTrigger value="past">Passees</TabsTrigger>
          <TabsTrigger value="cancelled">Annulees</TabsTrigger>
        </TabsList>

        <TabsContent value={tab} className="mt-4">
          {filtered.length > 0 ? (
            <div className="space-y-3">
              {filtered.map((booking) => (
                <BookingCard key={booking.id} booking={booking} />
              ))}
            </div>
          ) : (
            <div className="py-12 text-center">
              <Search
                className="h-8 w-8 mx-auto text-muted-foreground/30 mb-3"
                aria-hidden="true"
              />
              <p className="text-sm text-muted-foreground">
                Aucune reservation dans cette categorie.
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
