"use client";

import Link from "next/link";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { CalendarDays, Users, X, MessageSquarePlus } from "lucide-react";
import { toast } from "sonner";
import { useApp } from "@/components/providers/AppProvider";
import { BookingStatusBadge } from "@/components/booking/BookingStatusBadge";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import type { Booking } from "@/lib/types";

interface BookingCardProps {
  booking: Booking;
}

export function BookingCard({ booking }: BookingCardProps) {
  const { activities, cancelBooking, getUser } = useApp();

  const activity = activities.find((a) => a.id === booking.activityId);
  const business = activity ? getUser(activity.businessId) : undefined;

  const canCancel =
    booking.status === "PENDING" || booking.status === "CONFIRMED";
  const isCompleted = booking.status === "COMPLETED";

  function handleCancel() {
    cancelBooking(booking.id);
    toast.success("Reservation annulee");
  }

  return (
    <div className="rounded-xl border border-border bg-card p-4 space-y-3">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="text-sm font-semibold text-foreground truncate">
            {activity?.title ?? "Activite inconnue"}
          </h3>
          {business && (
            <p className="text-xs text-muted-foreground truncate">
              {business.businessProfile?.companyName ?? business.name}
            </p>
          )}
        </div>
        <BookingStatusBadge status={booking.status} />
      </div>

      {/* Details */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
        <span className="flex items-center gap-1">
          <CalendarDays className="h-4 w-4" aria-hidden="true" />
          {format(new Date(booking.date), "d MMMM yyyy", { locale: fr })}
        </span>
        <span className="flex items-center gap-1">
          <Users className="h-4 w-4" aria-hidden="true" />
          {booking.participants} participant{booking.participants > 1 ? "s" : ""}
        </span>
      </div>

      {/* Price */}
      <p className="text-lg font-bold text-primary">
        {formatPrice(booking.totalPrice)}
      </p>

      {/* Actions */}
      <div className="flex items-center gap-2 pt-1">
        {canCancel && (
          <Button
            type="button"
            variant="destructive"
            size="sm"
            onClick={handleCancel}
          >
            <X className="h-4 w-4" aria-hidden="true" />
            Annuler
          </Button>
        )}
        {isCompleted && activity && (
          <Link
            href={`/explorer/${activity.businessId}`}
            className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-2.5 py-1 text-sm font-medium text-foreground hover:bg-muted transition-colors"
          >
            <MessageSquarePlus className="h-4 w-4" aria-hidden="true" />
            Laisser un avis
          </Link>
        )}
      </div>
    </div>
  );
}
