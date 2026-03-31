"use client";

import { useState } from "react";
import { useApp } from "@/components/providers/AppProvider";
import { formatDate, getInitials } from "@/lib/utils";
import { Star, MessageSquare } from "lucide-react";
import { EmptyState } from "@/components/shared/EmptyState";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ReviewReplyForm } from "@/components/reviews/ReviewReplyForm";

export default function ReviewsPage() {
  const { currentUser, getBusinessReviews, getUser } = useApp();
  const reviews = getBusinessReviews(currentUser.id);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Avis clients</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Consultez et repondez aux avis laisses par vos clients
        </p>
      </div>

      {reviews.length > 0 ? (
        <div className="space-y-4">
          {reviews.map((review) => (
            <ReviewDashboardCard key={review.id} review={review} getUser={getUser} currentUser={currentUser} />
          ))}
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

function ReviewDashboardCard({
  review,
  getUser,
  currentUser,
}: {
  review: ReturnType<ReturnType<typeof useApp>["getBusinessReviews"]>[number];
  getUser: ReturnType<typeof useApp>["getUser"];
  currentUser: ReturnType<typeof useApp>["currentUser"];
}) {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const author = getUser(review.authorId);
  const canReply = currentUser.id === review.businessId && !review.businessReply;

  return (
    <article className="rounded-xl border bg-card p-5 ring-1 ring-foreground/10">
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

      {/* Business reply display */}
      {review.businessReply && (
        <div className="mt-4 ml-2 pl-4 border-l-2 border-hc-coral/30 bg-hc-bg-secondary/50 rounded-r-lg py-3 pr-3">
          <div className="flex items-center gap-2 mb-1.5">
            <Avatar size="sm" className="w-6 h-6">
              {currentUser.avatar && (
                <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
              )}
              <AvatarFallback className="text-[9px]">
                {getInitials(currentUser.name)}
              </AvatarFallback>
            </Avatar>
            <span className="text-xs font-semibold text-foreground">
              Votre reponse
            </span>
            {review.businessReplyDate && (
              <span className="text-xs text-muted-foreground">
                {formatDate(review.businessReplyDate)}
              </span>
            )}
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {review.businessReply}
          </p>
        </div>
      )}

      {/* Reply button / form */}
      {canReply && !showReplyForm && (
        <button
          onClick={() => setShowReplyForm(true)}
          className="mt-3 inline-flex items-center gap-1.5 rounded-full gradient-warm px-4 py-1.5 text-xs font-medium text-white transition-opacity hover:opacity-90"
        >
          <MessageSquare className="size-3.5" />
          Repondre
        </button>
      )}

      {showReplyForm && (
        <div className="mt-3">
          <ReviewReplyForm
            reviewId={review.id}
            onCancel={() => setShowReplyForm(false)}
            onSubmitted={() => setShowReplyForm(false)}
          />
        </div>
      )}
    </article>
  );
}
