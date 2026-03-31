"use client";

import { useState, useMemo } from "react";
import { MessageSquarePlus, Star } from "lucide-react";
import { useApp } from "@/components/providers/AppProvider";
import { ReviewCard } from "@/components/reviews/ReviewCard";
import { ReviewForm } from "@/components/reviews/ReviewForm";
import { StarRating } from "@/components/reviews/StarRating";
import { Button } from "@/components/ui/button";

interface ReviewListProps {
  businessId: string;
}

export function ReviewList({ businessId }: ReviewListProps) {
  const { getBusinessReviews } = useApp();
  const [formOpen, setFormOpen] = useState(false);

  const reviews = getBusinessReviews(businessId);

  const averageRating = useMemo(() => {
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
    return sum / reviews.length;
  }, [reviews]);

  return (
    <section className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-heading font-semibold text-foreground">
          Avis de la communaute
        </h2>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setFormOpen(true)}
        >
          <MessageSquarePlus className="h-4 w-4" aria-hidden="true" />
          Laisser un avis
        </Button>
      </div>

      {/* Average rating summary */}
      {reviews.length > 0 && (
        <div className="flex items-center gap-3">
          <span className="text-3xl font-bold text-foreground">
            {averageRating.toFixed(1)}
          </span>
          <div className="space-y-0.5">
            <StarRating mode="readonly" value={averageRating} size="md" />
            <p className="text-sm text-muted-foreground">
              {reviews.length} avis
            </p>
          </div>
        </div>
      )}

      {/* Review list */}
      {reviews.length > 0 ? (
        <div>
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      ) : (
        <div className="py-8 text-center">
          <Star className="h-8 w-8 mx-auto text-muted-foreground/30 mb-3" aria-hidden="true" />
          <p className="text-sm text-muted-foreground">
            Aucun avis pour le moment. Soyez le premier a partager votre experience !
          </p>
        </div>
      )}

      {/* Review form dialog */}
      <ReviewForm
        businessId={businessId}
        open={formOpen}
        onClose={() => setFormOpen(false)}
      />
    </section>
  );
}
