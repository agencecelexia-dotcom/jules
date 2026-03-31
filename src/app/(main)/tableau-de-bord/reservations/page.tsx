"use client";

import { useApp } from "@/components/providers/AppProvider";
import { formatDate, formatPrice } from "@/lib/utils";
import { BOOKING_STATUS_LABELS, BOOKING_STATUS_COLORS } from "@/lib/constants";
import { CalendarDays } from "lucide-react";
import { EmptyState } from "@/components/shared/EmptyState";

export default function BookingsPage() {
  const { getBusinessBookings, getUser, activities } = useApp();

  const bookings = getBusinessBookings();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Reservations</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Suivez les reservations de vos clients
        </p>
      </div>

      {bookings.length > 0 ? (
        <div className="overflow-x-auto rounded-xl border bg-card ring-1 ring-foreground/10">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Client</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Activite</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Date</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Participants</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Total</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Statut</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {bookings.map((booking) => {
                const client = getUser(booking.userId);
                const activity = activities.find((a) => a.id === booking.activityId);
                return (
                  <tr key={booking.id}>
                    <td className="px-4 py-3 font-medium">{client?.name ?? "Inconnu"}</td>
                    <td className="px-4 py-3 text-muted-foreground">{activity?.title ?? "N/A"}</td>
                    <td className="px-4 py-3 text-muted-foreground">{formatDate(booking.date)}</td>
                    <td className="px-4 py-3 text-muted-foreground">{booking.participants}</td>
                    <td className="px-4 py-3">{formatPrice(booking.totalPrice)}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${BOOKING_STATUS_COLORS[booking.status]}`}
                      >
                        {BOOKING_STATUS_LABELS[booking.status]}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <EmptyState
          icon={CalendarDays}
          title="Aucune reservation"
          description="Vous n'avez pas encore recu de reservations."
        />
      )}
    </div>
  );
}
