"use client";

import Link from "next/link";
import { MapPin, Mail, Pencil } from "lucide-react";
import { useApp } from "@/components/providers/AppProvider";
import { HandicapBadge } from "@/components/shared/HandicapBadge";
import type { UserWithProfile } from "@/lib/types";
import { getInitials } from "@/lib/utils";

interface ProfileHeaderProps {
  user: UserWithProfile;
}

export function ProfileHeader({ user }: ProfileHeaderProps) {
  const { currentUser, getFollowerCount, getFollowingCount, getUserPosts, isFollowing, toggleFollow, isMutualFollow } =
    useApp();

  const followerCount = getFollowerCount(user.id);
  const followingCount = getFollowingCount(user.id);
  const postCount = getUserPosts(user.id).length;
  const isOwnProfile = currentUser.id === user.id;
  const following = isFollowing(user.id);
  const mutual = isMutualFollow(user.id);

  const city = user.familyProfile?.city ?? user.businessProfile?.city;
  const department = user.familyProfile?.department ?? user.businessProfile?.department;
  const handicapTypes = user.familyProfile?.handicapTypes ?? [];

  return (
    <div className="space-y-4">
      {/* Top row: avatar + stats (Instagram style) */}
      <div className="flex items-center gap-6">
        {/* Avatar with gradient ring */}
        <div className="avatar-ring shrink-0">
          <div className="h-20 w-20 rounded-full bg-white flex items-center justify-center overflow-hidden">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="text-2xl font-semibold text-hc-text-muted">
                {getInitials(user.name)}
              </span>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-6 text-center">
          <div>
            <span className="block font-extrabold text-lg text-hc-text">{postCount}</span>
            <span className="text-xs text-hc-text-muted">Publications</span>
          </div>
          <div>
            <span className="block font-extrabold text-lg text-hc-text">{followerCount}</span>
            <span className="text-xs text-hc-text-muted">Abonnes</span>
          </div>
          <div>
            <span className="block font-extrabold text-lg text-hc-text">{followingCount}</span>
            <span className="text-xs text-hc-text-muted">Abonnements</span>
          </div>
        </div>
      </div>

      {/* Name, location, bio */}
      <div className="space-y-1">
        <h1 className="font-bold text-sm text-hc-text">{user.name}</h1>

        {(city || department) && (
          <div className="flex items-center gap-1 text-xs text-hc-text-muted">
            <MapPin className="h-3 w-3 shrink-0" aria-hidden="true" />
            <span>
              {city}
              {city && department && ", "}
              {department && `dept. ${department}`}
            </span>
          </div>
        )}

        {user.bio && (
          <p className="text-sm text-hc-text-secondary leading-relaxed">{user.bio}</p>
        )}
      </div>

      {/* Handicap badges inline */}
      {handicapTypes.length > 0 && (
        <div className="flex flex-wrap items-center gap-1">
          {handicapTypes.map((type) => (
            <HandicapBadge key={type} type={type} />
          ))}
        </div>
      )}

      {/* Action buttons */}
      <div className="flex items-center gap-2">
        {isOwnProfile ? (
          <button
            disabled
            className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-hc-bg-secondary text-hc-text px-6 py-2 text-sm font-semibold"
          >
            <Pencil className="h-3.5 w-3.5" aria-hidden="true" />
            Modifier le profil
          </button>
        ) : (
          <>
            {following ? (
              <button
                onClick={() => toggleFollow(user.id)}
                className="inline-flex items-center justify-center rounded-lg bg-hc-bg-secondary text-hc-text px-6 py-2 text-sm font-semibold hover:bg-neutral-200 transition-colors"
                aria-pressed={true}
                aria-label="Se desabonner"
              >
                Abonne(e)
              </button>
            ) : (
              <button
                onClick={() => toggleFollow(user.id)}
                className="inline-flex items-center justify-center rounded-lg gradient-warm text-white px-6 py-2 text-sm font-semibold hover:opacity-90 transition-opacity"
                aria-pressed={false}
                aria-label="Suivre"
              >
                Suivre
              </button>
            )}

            {mutual && (
              <Link
                href="/messages"
                className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-hc-border text-hc-text px-4 py-2 text-sm font-semibold hover:bg-hc-bg-secondary transition-colors"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                Message
              </Link>
            )}
          </>
        )}
      </div>
    </div>
  );
}
