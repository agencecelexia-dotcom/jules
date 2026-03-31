"use client";

import { CalendarDays, Euro, Star, MessageSquare } from "lucide-react";
import { formatPrice } from "@/lib/utils";

interface StatsCardsProps {
  stats: {
    bookings: number;
    revenue: number;
    rating: number;
    reviews: number;
  };
}

export function StatsCards({ stats }: StatsCardsProps) {
  const cards = [
    {
      icon: CalendarDays,
      label: "Reservations",
      value: stats.bookings.toString(),
      bgColor: "bg-hc-blue/10",
      iconColor: "text-hc-blue",
      borderColor: "border-l-hc-blue",
    },
    {
      icon: Euro,
      label: "Chiffre d'affaires",
      value: formatPrice(stats.revenue),
      bgColor: "bg-hc-green/10",
      iconColor: "text-hc-green",
      borderColor: "border-l-hc-green",
    },
    {
      icon: Star,
      label: "Note moyenne",
      value: stats.rating > 0 ? `${stats.rating.toFixed(1)}/5` : "N/A",
      bgColor: "bg-hc-gold/10",
      iconColor: "text-hc-gold",
      borderColor: "border-l-hc-orange",
    },
    {
      icon: MessageSquare,
      label: "Avis",
      value: stats.reviews.toString(),
      bgColor: "bg-blue-50",
      iconColor: "text-hc-blue",
      borderColor: "border-l-hc-blue",
    },
  ];

  return (
    <dl className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.label}
          className={`rounded-xl border border-l-4 ${card.borderColor} bg-card p-4 ring-1 ring-foreground/10`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${card.bgColor}`}
            >
              <card.icon className={`size-5 ${card.iconColor}`} aria-hidden="true" />
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">{card.label}</dt>
              <dd className="text-lg font-semibold text-foreground">{card.value}</dd>
            </div>
          </div>
        </div>
      ))}
    </dl>
  );
}
