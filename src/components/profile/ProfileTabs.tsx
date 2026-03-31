"use client";

import { Star, Clock, Users } from "lucide-react";
import { useApp } from "@/components/providers/AppProvider";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { PostCard } from "@/components/feed/PostCard";
import { HandicapBadge } from "@/components/shared/HandicapBadge";
import { EmptyState } from "@/components/shared/EmptyState";
import type { UserWithProfile, Review, Activity } from "@/lib/types";
import { formatDate, formatPrice, getInitials } from "@/lib/utils";
import { FileText, Star as StarIcon, CalendarDays } from "lucide-react";

interface ProfileTabsProps {
  user: UserWithProfile;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} sur 5 etoiles`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i <= rating
              ? "fill-hc-gold text-hc-gold"
              : "fill-none text-neutral-300"
          }`}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

function ActivityCard({ activity }: { activity: Activity }) {
  return (
    <div className="bg-card rounded-xl border border-border/50 p-4 space-y-3">
      <div className="flex items-start justify-between gap-2">
        <h4 className="font-semibold text-foreground">{activity.title}</h4>
        <span className="shrink-0 text-sm font-semibold text-primary">
          {formatPrice(activity.price)}
        </span>
      </div>
      <p className="text-sm text-muted-foreground line-clamp-2">
        {activity.description}
      </p>
      <div className="flex items-center gap-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <Clock className="h-3.5 w-3.5" aria-hidden="true" />
          {activity.duration}
        </span>
        <span className="flex items-center gap-1">
          <Users className="h-3.5 w-3.5" aria-hidden="true" />
          {activity.maxParticipants} participants max
        </span>
      </div>
      {activity.handicapTypesCompatible.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {activity.handicapTypesCompatible.map((type) => (
            <HandicapBadge key={type} type={type} />
          ))}
        </div>
      )}
    </div>
  );
}

function ReviewCard({ review }: { review: Review }) {
  const { getUser } = useApp();
  const author = getUser(review.authorId);

  return (
    <div className="bg-card rounded-xl border border-border/50 p-4 space-y-2">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-xs font-medium text-muted-foreground">
            {author ? getInitials(author.name) : "?"}
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">
              {author?.name ?? "Utilisateur inconnu"}
            </p>
            <p className="text-xs text-muted-foreground">
              {formatDate(review.createdAt)}
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

export function ProfileTabs({ user }: ProfileTabsProps) {
  const { getUserPosts, getBusinessReviews, getBusinessActivities } = useApp();

  const posts = getUserPosts(user.id);
  const isBusiness = user.role === "BUSINESS";
  const reviews = isBusiness ? getBusinessReviews(user.id) : [];
  const activities = isBusiness ? getBusinessActivities(user.id) : [];

  const defaultTab = "publications";

  return (
    <Tabs defaultValue={defaultTab} className="mt-6">
      <TabsList variant="line">
        <TabsTrigger value="publications">
          <FileText className="h-4 w-4" aria-hidden="true" />
          Publications
        </TabsTrigger>
        {isBusiness && (
          <TabsTrigger value="activites">
            <CalendarDays className="h-4 w-4" aria-hidden="true" />
            Activites
          </TabsTrigger>
        )}
        {isBusiness && (
          <TabsTrigger value="avis">
            <StarIcon className="h-4 w-4" aria-hidden="true" />
            Avis
          </TabsTrigger>
        )}
      </TabsList>

      {/* Publications tab */}
      <TabsContent value="publications">
        {posts.length > 0 ? (
          <div className="space-y-4 mt-4">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <EmptyState
            icon={FileText}
            title="Aucune publication"
            description="Cet utilisateur n'a pas encore publie de contenu."
          />
        )}
      </TabsContent>

      {/* Activities tab (business only) */}
      {isBusiness && (
        <TabsContent value="activites">
          {activities.length > 0 ? (
            <div className="space-y-4 mt-4">
              {activities.map((activity) => (
                <ActivityCard key={activity.id} activity={activity} />
              ))}
            </div>
          ) : (
            <EmptyState
              icon={CalendarDays}
              title="Aucune activite"
              description="Cet etablissement n'a pas encore propose d'activite."
            />
          )}
        </TabsContent>
      )}

      {/* Reviews tab (business only) */}
      {isBusiness && (
        <TabsContent value="avis">
          {reviews.length > 0 ? (
            <div className="space-y-4 mt-4">
              {reviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          ) : (
            <EmptyState
              icon={StarIcon}
              title="Aucun avis"
              description="Cet etablissement n'a pas encore recu d'avis."
            />
          )}
        </TabsContent>
      )}
    </Tabs>
  );
}
