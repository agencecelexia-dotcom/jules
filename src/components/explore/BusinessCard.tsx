import Link from "next/link";
import { Star, MapPin } from "lucide-react";
import { HandicapBadge } from "@/components/shared/HandicapBadge";
import { BUSINESS_CATEGORIES } from "@/lib/constants";
import type { UserWithProfile } from "@/lib/types";
import { cn } from "@/lib/utils";

interface BusinessCardProps {
  business: UserWithProfile;
}

export function BusinessCard({ business }: BusinessCardProps) {
  const bp = business.businessProfile;
  if (!bp) return null;

  const firstPhoto = bp.photos[0];
  const categoryLabel =
    BUSINESS_CATEGORIES.find((c) => bp.categories.includes(c.value))?.label ??
    bp.categories[0];
  const handicapTypes = bp.handicapTypesSupported;
  const visibleBadges = handicapTypes.slice(0, 3);
  const extraCount = handicapTypes.length - 3;

  return (
    <Link
      href={`/explorer/${business.id}`}
      className="group block card-editorial card-hover overflow-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        {firstPhoto ? (
          <img
            src={firstPhoto}
            alt={bp.companyName}
            className="w-full h-full object-cover rounded-t-2xl transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 rounded-t-2xl flex items-center justify-center">
            <span className="text-4xl font-bold text-primary/30">
              {bp.companyName.charAt(0)}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 space-y-2.5">
        {/* Name + category */}
        <div className="space-y-1">
          <h3 className="font-heading font-semibold text-foreground truncate group-hover:text-hc-blue transition-colors">
            {bp.companyName}
          </h3>
          {categoryLabel && (
            <span className="inline-flex items-center rounded-full bg-hc-blue-muted text-hc-blue px-3 py-1 text-xs font-medium">
              {categoryLabel}
            </span>
          )}
        </div>

        {/* City */}
        {bp.city && (
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            <span>{bp.city}</span>
          </div>
        )}

        {/* Rating */}
        <div className="flex items-center gap-1.5">
          <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star
                key={i}
                className={cn(
                  "h-3.5 w-3.5",
                  i <= Math.round(bp.averageRating)
                    ? "fill-hc-gold text-hc-gold"
                    : "fill-none text-muted-foreground/30"
                )}
                aria-hidden="true"
              />
            ))}
          </div>
          <span className="text-xs font-medium text-foreground">
            {bp.averageRating.toFixed(1)}
          </span>
          <span className="text-xs text-muted-foreground">
            ({bp.totalReviews} {bp.totalReviews <= 1 ? "avis" : "avis"})
          </span>
        </div>

        {/* Handicap badges */}
        {handicapTypes.length > 0 && (
          <div className="flex flex-wrap items-center gap-1">
            {visibleBadges.map((type) => (
              <HandicapBadge key={type} type={type} />
            ))}
            {extraCount > 0 && (
              <span className="inline-flex items-center rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
                +{extraCount}
              </span>
            )}
          </div>
        )}
      </div>
    </Link>
  );
}
