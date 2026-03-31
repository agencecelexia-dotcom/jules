import type { Review } from "@/lib/types";
import { useApp } from "@/components/providers/AppProvider";
import { StarRating } from "@/components/reviews/StarRating";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { formatDate, getInitials } from "@/lib/utils";

interface ReviewCardProps {
  review: Review;
}

export function ReviewCard({ review }: ReviewCardProps) {
  const { getUser } = useApp();
  const author = getUser(review.authorId);

  return (
    <div className="card-editorial py-4 last:border-0">
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
        </div>
      </div>
    </div>
  );
}
