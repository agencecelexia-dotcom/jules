"use client";

import Link from "next/link";
import { Search, User, FileText, Calendar } from "lucide-react";
import type { UserWithProfile, Post, Activity } from "@/lib/types";
import { useApp } from "@/components/providers/AppProvider";
import { EmptyState } from "@/components/shared/EmptyState";
import { HandicapBadge } from "@/components/shared/HandicapBadge";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { cn, formatDate, formatPrice, getInitials, truncateText } from "@/lib/utils";

interface SearchResultsProps {
  query: string;
  users: UserWithProfile[];
  posts: Post[];
  activities: Activity[];
}

// --- User result item ---
function UserResultItem({ user }: { user: UserWithProfile }) {
  const city = user.familyProfile?.city || user.businessProfile?.city;
  const roleLabel = user.role === "FAMILY" ? "Famille" : "Etablissement";
  const roleColor =
    user.role === "FAMILY"
      ? "bg-blue-100 text-blue-800"
      : "bg-green-100 text-green-800";

  return (
    <Link
      href={`/profil/${user.id}`}
      className="flex items-center gap-3 rounded-xl border border-border bg-white p-4 hover:border-hc-blue hover:shadow-sm transition-all"
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-hc-blue/10 text-hc-blue text-sm font-semibold">
        {getInitials(user.name)}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="font-medium text-foreground truncate">
            {user.name}
          </span>
          <span
            className={cn(
              "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
              roleColor
            )}
          >
            {roleLabel}
          </span>
        </div>
        {city && (
          <p className="text-sm text-muted-foreground truncate">{city}</p>
        )}
      </div>
    </Link>
  );
}

// --- Post result item ---
function PostResultItem({ post }: { post: Post }) {
  const { getUser } = useApp();
  const author = getUser(post.authorId);

  return (
    <Link
      href={`/fil/${post.id}`}
      className="flex gap-3 rounded-xl border border-border bg-white p-4 hover:border-hc-blue hover:shadow-sm transition-all"
    >
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-hc-blue/10 text-hc-blue text-xs font-semibold">
        {author ? getInitials(author.name) : "?"}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm font-medium text-foreground truncate">
            {author?.name ?? "Utilisateur inconnu"}
          </span>
          <span className="text-xs text-muted-foreground">
            {formatDate(post.createdAt)}
          </span>
        </div>
        <p className="text-sm text-muted-foreground mb-2">
          {truncateText(post.content, 100)}
        </p>
        {post.handicapTags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {post.handicapTags.map((tag) => (
              <HandicapBadge key={tag} type={tag} />
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}

// --- Activity result item ---
function ActivityResultItem({ activity }: { activity: Activity }) {
  const { getUser } = useApp();
  const business = getUser(activity.businessId);

  return (
    <Link
      href={`/explorer/${activity.businessId}`}
      className="flex gap-3 rounded-xl border border-border bg-white p-4 hover:border-hc-blue hover:shadow-sm transition-all"
    >
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-700">
        <Calendar className="h-4 w-4" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="font-medium text-foreground truncate">{activity.title}</p>
        {business && (
          <p className="text-sm text-muted-foreground truncate">
            {business.name}
          </p>
        )}
        <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
          <span>{formatPrice(activity.price)}</span>
          <span>{activity.duration}</span>
        </div>
      </div>
    </Link>
  );
}

// --- Section header ---
function SectionHeader({
  icon: Icon,
  label,
  count,
}: {
  icon: typeof Search;
  label: string;
  count: number;
}) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <Icon className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
      <h3 className="text-sm font-semibold text-foreground">
        {label}{" "}
        <span className="font-normal text-muted-foreground">({count})</span>
      </h3>
    </div>
  );
}

export function SearchResults({
  query,
  users,
  posts,
  activities,
}: SearchResultsProps) {
  const totalResults = users.length + posts.length + activities.length;

  if (totalResults === 0) {
    return (
      <EmptyState
        icon={Search}
        title={`Aucun resultat pour "${query}"`}
        description="Essayez avec d'autres mots-cles ou verifiez l'orthographe."
      />
    );
  }

  return (
    <Tabs defaultValue="tout">
      <TabsList className="w-full">
        <TabsTrigger value="tout">
          Tout ({totalResults})
        </TabsTrigger>
        <TabsTrigger value="personnes">
          Personnes ({users.length})
        </TabsTrigger>
        <TabsTrigger value="publications">
          Publications ({posts.length})
        </TabsTrigger>
        <TabsTrigger value="activites">
          Activites ({activities.length})
        </TabsTrigger>
      </TabsList>

      {/* Tout tab */}
      <TabsContent value="tout" className="mt-4 space-y-6">
        {users.length > 0 && (
          <div>
            <SectionHeader icon={User} label="Personnes" count={users.length} />
            <div className="space-y-2">
              {users.slice(0, 3).map((user) => (
                <UserResultItem key={user.id} user={user} />
              ))}
            </div>
          </div>
        )}
        {posts.length > 0 && (
          <div>
            <SectionHeader
              icon={FileText}
              label="Publications"
              count={posts.length}
            />
            <div className="space-y-2">
              {posts.slice(0, 3).map((post) => (
                <PostResultItem key={post.id} post={post} />
              ))}
            </div>
          </div>
        )}
        {activities.length > 0 && (
          <div>
            <SectionHeader
              icon={Calendar}
              label="Activites"
              count={activities.length}
            />
            <div className="space-y-2">
              {activities.slice(0, 3).map((activity) => (
                <ActivityResultItem key={activity.id} activity={activity} />
              ))}
            </div>
          </div>
        )}
      </TabsContent>

      {/* Personnes tab */}
      <TabsContent value="personnes" className="mt-4 space-y-2">
        {users.length > 0 ? (
          users.map((user) => <UserResultItem key={user.id} user={user} />)
        ) : (
          <p className="py-8 text-center text-sm text-muted-foreground">
            Aucune personne trouvee.
          </p>
        )}
      </TabsContent>

      {/* Publications tab */}
      <TabsContent value="publications" className="mt-4 space-y-2">
        {posts.length > 0 ? (
          posts.map((post) => <PostResultItem key={post.id} post={post} />)
        ) : (
          <p className="py-8 text-center text-sm text-muted-foreground">
            Aucune publication trouvee.
          </p>
        )}
      </TabsContent>

      {/* Activites tab */}
      <TabsContent value="activites" className="mt-4 space-y-2">
        {activities.length > 0 ? (
          activities.map((activity) => (
            <ActivityResultItem key={activity.id} activity={activity} />
          ))
        ) : (
          <p className="py-8 text-center text-sm text-muted-foreground">
            Aucune activite trouvee.
          </p>
        )}
      </TabsContent>
    </Tabs>
  );
}
