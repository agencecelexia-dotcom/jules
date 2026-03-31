"use client";

import { use } from "react";
import Link from "next/link";
import {
  Star,
  ShieldCheck,
  Clock,
  Users,
  Globe,
  MapPin,
  Building2,
  ChevronLeft,
  CalendarPlus,
  MessageSquarePlus,
} from "lucide-react";
import { useApp } from "@/components/providers/AppProvider";
import { HandicapBadge } from "@/components/shared/HandicapBadge";
import { EmptyState } from "@/components/shared/EmptyState";
import { ReviewList } from "@/components/reviews/ReviewList";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import type { Review, Activity } from "@/lib/types";
import { cn, formatDate, formatPrice, getInitials } from "@/lib/utils";
import { BUSINESS_CATEGORIES } from "@/lib/constants";

interface BusinessDetailPageProps {
  params: Promise<{ businessId: string }>;
}

function StarRating({ rating, size = "sm" }: { rating: number; size?: "sm" | "md" }) {
  const iconSize = size === "md" ? "h-5 w-5" : "h-4 w-4";
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} sur 5 etoiles`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={cn(
            iconSize,
            i <= Math.round(rating)
              ? "fill-hc-gold text-hc-gold"
              : "fill-none text-muted-foreground/30"
          )}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

function ActivityDetailCard({ activity, businessId }: { activity: Activity; businessId: string }) {
  return (
    <div className="card-social card-accent-blue p-5 space-y-3">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-semibold text-foreground text-base">{activity.title}</h3>
        <span className="shrink-0 text-lg font-bold text-primary">
          {formatPrice(activity.price)}
        </span>
      </div>

      {/* Description */}
      <p className="text-sm text-muted-foreground leading-relaxed">
        {activity.description}
      </p>

      {/* Meta */}
      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        <span className="flex items-center gap-1">
          <Clock className="h-4 w-4" aria-hidden="true" />
          {activity.duration}
        </span>
        <span className="flex items-center gap-1">
          <Users className="h-4 w-4" aria-hidden="true" />
          {activity.maxParticipants} participants max
        </span>
      </div>

      {/* Handicap badges */}
      {activity.handicapTypesCompatible.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {activity.handicapTypesCompatible.map((type) => (
            <HandicapBadge key={type} type={type} />
          ))}
        </div>
      )}

      {/* Photos */}
      {activity.photos.length > 0 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {activity.photos.map((photo, i) => (
            <img
              key={i}
              src={photo}
              alt={`${activity.title} - photo ${i + 1}`}
              className="h-24 w-36 object-cover rounded-lg shrink-0"
              loading="lazy"
            />
          ))}
        </div>
      )}

      {/* Action */}
      <Link
        href={`/explorer/${businessId}/reserver`}
        className="inline-flex items-center justify-center gap-2 rounded-full bg-hc-blue px-6 py-3 text-base font-semibold text-white hover:bg-hc-blue/90 transition-colors shadow-sm"
      >
        <CalendarPlus className="h-5 w-5" aria-hidden="true" />
        Reserver
      </Link>
    </div>
  );
}

function ReviewDetailCard({ review }: { review: Review }) {
  const { getUser } = useApp();
  const author = getUser(review.authorId);

  return (
    <div className="bg-card rounded-xl border border-border/50 p-4 space-y-2">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-full bg-muted flex items-center justify-center text-xs font-medium text-muted-foreground">
            {author ? getInitials(author.name) : "?"}
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">
              {author?.name ?? "Utilisateur inconnu"}
            </p>
            <p className="text-xs text-muted-foreground">
              {formatDate(review.createdAt)}
              {review.visitDate && (
                <> · Visite le {new Date(review.visitDate).toLocaleDateString("fr-FR")}</>
              )}
            </p>
          </div>
        </div>
        <StarRating rating={review.rating} />
      </div>
      <p className="text-sm text-foreground leading-relaxed">{review.content}</p>
      {review.handicapContext && (
        <p className="text-xs text-muted-foreground italic">
          Contexte : {review.handicapContext}
        </p>
      )}
    </div>
  );
}

export default function BusinessDetailPage({ params }: BusinessDetailPageProps) {
  const { businessId } = use(params);
  const { getUser, getBusinessReviews, getBusinessActivities } = useApp();
  const business = getUser(businessId);

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

  const bp = business.businessProfile;
  const reviews = getBusinessReviews(business.id);
  const activities = getBusinessActivities(business.id);

  const categoryLabels = bp.categories
    .map((cat) => BUSINESS_CATEGORIES.find((c) => c.value === cat)?.label ?? cat)
    .join(", ");

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Back link */}
      <Link
        href="/explorer"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ChevronLeft className="h-4 w-4" aria-hidden="true" />
        Retour a l&apos;explorateur
      </Link>

      {/* Photo carousel */}
      {bp.photos.length > 0 && (
        <div className="relative">
          {bp.photos.length === 1 ? (
            <img
              src={bp.photos[0]}
              alt={bp.companyName}
              className="w-full h-64 md:h-80 object-cover rounded-2xl"
            />
          ) : (
            <Carousel className="w-full">
              <CarouselContent>
                {bp.photos.map((photo, i) => (
                  <CarouselItem key={i}>
                    <img
                      src={photo}
                      alt={`${bp.companyName} - photo ${i + 1}`}
                      className="w-full h-64 md:h-80 object-cover rounded-2xl"
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="-left-4 md:-left-5" />
              <CarouselNext className="-right-4 md:-right-5" />
            </Carousel>
          )}
        </div>
      )}

      {/* Business info */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
          <div className="space-y-2">
            <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground">
              {bp.companyName}
            </h1>
            <div className="flex flex-wrap items-center gap-2">
              {categoryLabels && (
                <span className="inline-flex items-center rounded-full bg-primary/10 text-primary px-2.5 py-0.5 text-xs font-medium">
                  {categoryLabels}
                </span>
              )}
              {bp.isVerified && (
                <span className="inline-flex items-center gap-1 rounded-full bg-green-100 text-green-800 px-2.5 py-0.5 text-xs font-medium">
                  <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
                  Verifie
                </span>
              )}
            </div>
          </div>

          {/* Rating summary */}
          <div className="flex items-center gap-2 shrink-0">
            <StarRating rating={bp.averageRating} size="md" />
            <span className="text-lg font-bold text-foreground">
              {bp.averageRating.toFixed(1)}
            </span>
            <span className="text-sm text-muted-foreground">
              ({bp.totalReviews} {bp.totalReviews <= 1 ? "avis" : "avis"})
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-foreground leading-relaxed">{bp.description}</p>

        {/* Address & contact */}
        <div className="flex flex-col gap-2 text-sm text-muted-foreground">
          {bp.address && (
            <div className="flex items-start gap-2">
              <MapPin className="h-4 w-4 mt-0.5 shrink-0" aria-hidden="true" />
              <span>
                {bp.address}
                {bp.city && `, ${bp.city}`}
                {bp.department && ` (${bp.department})`}
              </span>
            </div>
          )}
          {bp.website && (
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 shrink-0" aria-hidden="true" />
              <a
                href={bp.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline truncate"
              >
                {bp.website.replace(/^https?:\/\//, "")}
              </a>
            </div>
          )}
        </div>

        {/* Handicap badges */}
        {bp.handicapTypesSupported.length > 0 && (
          <div className="space-y-2">
            <h2 className="text-sm font-medium text-foreground">
              Types de handicap pris en charge
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {bp.handicapTypesSupported.map((type) => (
                <HandicapBadge key={type} type={type} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Activities section */}
      <section className="space-y-4">
        <h2 className="text-xl font-heading font-semibold text-foreground">
          Activites proposees
        </h2>
        {activities.length > 0 ? (
          <div className="space-y-4">
            {activities.map((activity) => (
              <ActivityDetailCard
                key={activity.id}
                activity={activity}
                businessId={business.id}
              />
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground py-4">
            Aucune activite proposee pour le moment.
          </p>
        )}
      </section>

      {/* Reviews section */}
      <ReviewList businessId={business.id} />
    </div>
  );
}
