"use client";

import Link from "next/link";
import { MapPin, Mail, Pencil } from "lucide-react";
import { useApp } from "@/components/providers/AppProvider";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { FollowButton } from "@/components/profile/FollowButton";
import type { UserWithProfile } from "@/lib/types";
import { getInitials } from "@/lib/utils";

interface ProfileHeaderProps {
  user: UserWithProfile;
}

export function ProfileHeader({ user }: ProfileHeaderProps) {
  const { currentUser, getFollowerCount, getFollowingCount, getUserPosts, isMutualFollow } =
    useApp();

  const followerCount = getFollowerCount(user.id);
  const followingCount = getFollowingCount(user.id);
  const postCount = getUserPosts(user.id).length;
  const isOwnProfile = currentUser.id === user.id;
  const mutual = isMutualFollow(user.id);

  const city = user.familyProfile?.city ?? user.businessProfile?.city;
  const department = user.familyProfile?.department ?? user.businessProfile?.department;

  return (
    <div className="space-y-4">
      {/* Top row: avatar + info */}
      <div className="flex flex-col sm:flex-row items-start gap-4">
        {/* Avatar */}
        <div className="relative shrink-0">
          <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center overflow-hidden ring-2 ring-hc-sage/30">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="text-2xl font-semibold text-muted-foreground">
                {getInitials(user.name)}
              </span>
            )}
          </div>
        </div>

        {/* Info + actions */}
        <div className="flex-1 min-w-0 space-y-2">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <h1 className="text-xl font-heading font-bold text-foreground truncate">
              {user.name}
            </h1>
            <div className="flex items-center gap-2">
              {isOwnProfile ? (
                <Button variant="outline" size="sm" className="rounded-full" disabled>
                  <Pencil className="h-4 w-4" aria-hidden="true" />
                  Modifier le profil
                </Button>
              ) : (
                <FollowButton targetUserId={user.id} />
              )}
              {!isOwnProfile && mutual && (
                <Link
                  href="/messages"
                  className="inline-flex items-center justify-center gap-1.5 rounded-full border border-border bg-background px-2.5 py-1 text-sm font-medium hover:bg-muted transition-colors"
                >
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  Envoyer un message
                </Link>
              )}
            </div>
          </div>

          {/* Location */}
          {(city || department) && (
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span>
                {city}
                {city && department && ", "}
                {department && `departement ${department}`}
              </span>
            </div>
          )}

          {/* Bio */}
          {user.bio && (
            <p className="text-sm text-foreground leading-relaxed">{user.bio}</p>
          )}
        </div>
      </div>

      {/* Stats row */}
      <div className="flex items-center gap-6 text-sm">
        <div>
          <span className="font-heading font-bold text-foreground">{postCount}</span>{" "}
          <span className="text-muted-foreground">
            {postCount <= 1 ? "publication" : "publications"}
          </span>
        </div>
        <div>
          <span className="font-heading font-bold text-foreground">{followerCount}</span>{" "}
          <span className="text-muted-foreground">
            {followerCount <= 1 ? "abonne" : "abonnes"}
          </span>
        </div>
        <div>
          <span className="font-heading font-bold text-foreground">{followingCount}</span>{" "}
          <span className="text-muted-foreground">abonnements</span>
        </div>
      </div>
    </div>
  );
}
