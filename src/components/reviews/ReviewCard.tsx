"use client";

import { useState } from "react";
import type { Review } from "@/lib/types";
import { useApp } from "@/components/providers/AppProvider";
import { StarRating } from "@/components/reviews/StarRating";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { formatDate, getInitials } from "@/lib/utils";
import { ReviewReplyForm } from "@/components/reviews/ReviewReplyForm";
import { MessageSquare } from "lucide-react";

interface ReviewCardProps {
  review: Review;
  /** Show the reply form for the business owner */
  showReplyAction?: boolean;
}

export function ReviewCard({ review, showReplyAction }: ReviewCardProps) {
  const { getUser, currentUser } = useApp();
  const author = getUser(review.authorId);
  const business = getUser(review.businessId);
  const [showReplyForm, setShowReplyForm] = useState(false);

  const isBusinessOwner =
    currentUser.role === "BUSINESS" && currentUser.id === review.businessId;
  const canReply = (showReplyAction ?? isBusinessOwner) && !review.businessReply;

  return (
    <div className="card-social py-4 last:border-0">
      <div className="flex items-start gap-3">
        {/* Avatar */}
        <Avatar>
          {author?.avatar && (
            <AvatarImage src={author.avatar} alt={author.name} />
          )}
          <AvatarFallback>
            {author ? getInitials(author.name) : "?"}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0">
          {/* Header line */}
          <div className="flex items-center justify-between gap-2">
            <p className="text-sm font-medium text-foreground truncate">
              {author?.name ?? "Utilisateur inconnu"}
            </p>
            <span className="text-xs text-muted-foreground shrink-0">
              {formatDate(review.createdAt)}
            </span>
          </div>

          {/* Stars */}
          <div className="mt-0.5">
            <StarRating mode="readonly" value={review.rating} size="sm" />
          </div>

          {/* Content */}
          <p className="mt-2 text-sm text-foreground leading-relaxed">
            {review.content}
          </p>

          {/* Handicap context */}
          {review.handicapContext && (
            <span className="mt-2 inline-flex items-center rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
              {review.handicapContext}
            </span>
          )}

          {/* Business reply */}
          {review.businessReply && (
            <div className="mt-3 ml-2 pl-3 border-l-2 border-hc-coral/30">
              <div className="flex items-center gap-2 mb-1">
                <Avatar size="sm" className="w-6 h-6">
                  {business?.avatar && (
                    <AvatarImage src={business.avatar} alt={business.name} />
                  )}
                  <AvatarFallback className="text-[9px]">
                    {business ? getInitials(business.name) : "?"}
                  </AvatarFallback>
                </Avatar>
                <span className="text-xs font-semibold text-foreground">
                  {business?.name ?? "Professionnel"}
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

          {/* Reply button */}
          {canReply && !showReplyForm && (
            <button
              onClick={() => setShowReplyForm(true)}
              className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-hc-coral hover:text-hc-coral/80 transition-colors"
            >
              <MessageSquare className="size-3.5" />
              Repondre
            </button>
          )}
        </div>
      </div>

      {/* Reply form */}
      {showReplyForm && (
        <ReviewReplyForm
          reviewId={review.id}
          onCancel={() => setShowReplyForm(false)}
          onSubmitted={() => setShowReplyForm(false)}
        />
      )}
    </div>
  );
}
