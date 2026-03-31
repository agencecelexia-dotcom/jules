"use client";

import { useMemo } from "react";
import { useApp } from "@/components/providers/AppProvider";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { formatDate, formatPrice, getInitials } from "@/lib/utils";
import { BOOKING_STATUS_LABELS, BOOKING_STATUS_COLORS } from "@/lib/constants";
import { Star } from "lucide-react";

export default function DashboardOverviewPage() {
  const {
    currentUser,
    getBusinessReviews,
    getBusinessBookings,
    activities,
    getUser,
  } = useApp();

  const businessBookings = getBusinessBookings();
  const businessReviews = getBusinessReviews(currentUser.id);

  const stats = useMemo(() => {
    const confirmedBookings = businessBookings.filter(
      (b) => b.status === "CONFIRMED" || b.status === "COMPLETED"
    );
    const totalRevenue = confirmedBookings.reduce((sum, b) => sum + b.totalPrice, 0);
    const avgRating =
      businessReviews.length > 0
        ? businessReviews.reduce((sum, r) => sum + r.rating, 0) / businessReviews.length
        : 0;

    return {
      bookings: businessBookings.length,
      revenue: totalRevenue,
      rating: avgRating,
      reviews: businessReviews.length,
    };
  }, [businessBookings, businessReviews]);

  const recentBookings = businessBookings.slice(0, 3);
  const recentReviews = businessReviews.slice(0, 3);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-heading font-bold text-foreground">Tableau de bord</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Vue d&apos;ensemble de votre activite
        </p>
      </div>

      <StatsCards stats={stats} />

      {/* Recent bookings */}
      <section>
        <h2 className="mb-4 text-lg font-heading font-semibold text-foreground">Reservations recentes</h2>
        {recentBookings.length > 0 ? (
          <div className="overflow-x-auto rounded-xl border bg-card ring-1 ring-foreground/10">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Client</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Activite</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Date</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Total</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Statut</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {recentBookings.map((booking) => {
                  const client = getUser(booking.userId);
                  const activity = activities.find((a) => a.id === booking.activityId);
                  return (
                    <tr key={booking.id}>
                      <td className="px-4 py-3 font-medium">{client?.name ?? "Inconnu"}</td>
                      <td className="px-4 py-3 text-muted-foreground">{activity?.title ?? "N/A"}</td>
                      <td className="px-4 py-3 text-muted-foreground">{formatDate(booking.date)}</td>
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
          <p className="text-sm text-muted-foreground">Aucune reservation pour le moment.</p>
        )}
      </section>

      {/* Recent reviews */}
      <section>
        <h2 className="mb-4 text-lg font-heading font-semibold text-foreground">Derniers avis</h2>
        {recentReviews.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {recentReviews.map((review) => {
              const author = getUser(review.authorId);
              return (
                <div
                  key={review.id}
                  className="rounded-xl border bg-card p-4 ring-1 ring-foreground/10"
                >
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-hc-blue/10 text-hc-blue text-xs font-semibold">
                        {getInitials(author?.name ?? "?")}
                      </div>
                      <span className="text-sm font-medium">{author?.name ?? "Anonyme"}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="size-3.5 fill-hc-gold text-hc-gold" aria-hidden="true" />
                      <span className="text-sm font-medium">{review.rating}</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-3">{review.content}</p>
                  <p className="mt-2 text-xs text-muted-foreground">{formatDate(review.createdAt)}</p>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">Aucun avis pour le moment.</p>
        )}
      </section>
    </div>
  );
}
