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
  const visibleBadges = handicapTypes.slice(0, 2);
  const extraCount = handicapTypes.length - 2;

  return (
    <Link
      href={`/explorer/${business.id}`}
      className="group block rounded-xl overflow-hidden card-hover focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
    >
      {/* Image */}
      {firstPhoto ? (
        <img
          src={firstPhoto}
          alt={bp.companyName}
          className="h-44 w-full object-cover rounded-xl transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
      ) : (
        <div className="h-44 w-full bg-gradient-to-br from-hc-blue/10 to-hc-blue/5 rounded-xl flex items-center justify-center">
          <span className="text-4xl font-bold text-hc-blue/20">
            {bp.companyName.charAt(0)}
          </span>
        </div>
      )}

      {/* Content */}
      <div className="pt-2.5 pb-1 space-y-1">
        {/* Company name */}
        <h3 className="font-bold text-sm text-hc-text truncate group-hover:text-hc-blue transition-colors">
          {bp.companyName}
        </h3>

        {/* Category */}
        {categoryLabel && (
          <p className="text-xs text-hc-text-muted">{categoryLabel}</p>
        )}

        {/* Rating */}
        <div className="flex items-center gap-1">
          <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star
                key={i}
                className={cn(
                  "h-3 w-3",
                  i <= Math.round(bp.averageRating)
                    ? "fill-hc-gold text-hc-gold"
                    : "fill-none text-hc-text-muted/30"
                )}
                aria-hidden="true"
              />
            ))}
          </div>
          <span className="text-xs font-medium text-hc-text">
            {bp.averageRating.toFixed(1)}
          </span>
          <span className="text-xs text-hc-text-muted">
            ({bp.totalReviews})
          </span>
        </div>

        {/* Location */}
        {bp.city && (
          <div className="flex items-center gap-1 text-xs text-hc-text-muted">
            <MapPin className="h-3 w-3 shrink-0" aria-hidden="true" />
            <span>{bp.city}</span>
          </div>
        )}

        {/* Handicap badges */}
        {handicapTypes.length > 0 && (
          <div className="flex flex-wrap items-center gap-1 pt-0.5">
            {visibleBadges.map((type) => (
              <HandicapBadge key={type} type={type} />
            ))}
            {extraCount > 0 && (
              <span className="inline-flex items-center rounded-full bg-neutral-100 px-2 py-0.5 text-[10px] font-medium text-hc-text-muted">
                +{extraCount}
              </span>
            )}
          </div>
        )}
      </div>
    </Link>
  );
}
