"use client";

import { useApp } from "@/components/providers/AppProvider";
import { formatDate, getInitials } from "@/lib/utils";
import { Star, MessageSquare } from "lucide-react";
import { EmptyState } from "@/components/shared/EmptyState";

export default function ReviewsPage() {
  const { currentUser, getBusinessReviews, getUser } = useApp();

  const reviews = getBusinessReviews(currentUser.id);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Avis clients</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Consultez les avis laisses par vos clients
        </p>
      </div>

      {reviews.length > 0 ? (
        <div className="space-y-4">
          {reviews.map((review) => {
            const author = getUser(review.authorId);
            return (
              <article
                key={review.id}
                className="rounded-xl border bg-card p-5 ring-1 ring-foreground/10"
              >
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-hc-blue/10 text-hc-blue text-sm font-semibold">
                      {getInitials(author?.name ?? "?")}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {author?.name ?? "Anonyme"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatDate(review.createdAt)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1" aria-label={`Note : ${review.rating} sur 5`}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`size-4 ${
                          i < review.rating
                            ? "fill-hc-gold text-hc-gold"
                            : "fill-none text-neutral-300"
                        }`}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                </div>

                {review.handicapContext && (
                  <p className="mb-2 text-xs font-medium text-hc-blue">
                    {review.handicapContext}
                  </p>
                )}

                <p className="text-sm text-muted-foreground leading-relaxed">
                  {review.content}
                </p>

                {review.visitDate && (
                  <p className="mt-3 text-xs text-muted-foreground">
                    Visite le {formatDate(review.visitDate)}
                  </p>
                )}
              </article>
            );
          })}
        </div>
      ) : (
        <EmptyState
          icon={MessageSquare}
          title="Aucun avis"
          description="Vous n'avez pas encore recu d'avis de la part de vos clients."
        />
      )}
    </div>
  );
}
