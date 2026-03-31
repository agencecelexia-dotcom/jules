"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { MapPin, Mail, Pencil } from "lucide-react";
import { useApp } from "@/components/providers/AppProvider";
import { HandicapBadge } from "@/components/shared/HandicapBadge";
import { EditProfileModal } from "@/components/profile/EditProfileModal";
import { FollowersModal } from "@/components/profile/FollowersModal";
import type { UserWithProfile } from "@/lib/types";
import { getInitials } from "@/lib/utils";

interface ProfileHeaderProps {
  user: UserWithProfile;
}

export function ProfileHeader({ user }: ProfileHeaderProps) {
  const { currentUser, getFollowerCount, getFollowingCount, getUserPosts, isFollowing, toggleFollow, canMessage, getOrCreateConversation } =
    useApp();
  const router = useRouter();

  const [editOpen, setEditOpen] = useState(false);
  const [followersOpen, setFollowersOpen] = useState(false);
  const [followingOpen, setFollowingOpen] = useState(false);

  const followerCount = getFollowerCount(user.id);
  const followingCount = getFollowingCount(user.id);
  const postCount = getUserPosts(user.id).length;
  const isOwnProfile = currentUser.id === user.id;
  const following = isFollowing(user.id);
  const canSendMessage = canMessage(user.id);

  const handleMessage = useCallback(() => {
    const conversationId = getOrCreateConversation(user.id);
    router.push(`/messages/${conversationId}`);
  }, [getOrCreateConversation, user.id, router]);

  // Determine if follow/subscribe button should show
  const showFollowButton = (() => {
    if (isOwnProfile) return false;
    // Business viewing a family: no follow button
    if (currentUser.role === "BUSINESS" && user.role === "FAMILY") return false;
    // Business viewing a business: no follow button
    if (currentUser.role === "BUSINESS" && user.role === "BUSINESS") return false;
    // Family viewing family or business: show button
    return true;
  })();

  // Label for follow button depends on target role
  const isSubscription = currentUser.role === "FAMILY" && user.role === "BUSINESS";

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
          <button
            type="button"
            onClick={() => setFollowersOpen(true)}
            className="cursor-pointer hover:opacity-70 transition-opacity"
          >
            <span className="block font-extrabold text-lg text-hc-text hover:underline">{followerCount}</span>
            <span className="text-xs text-hc-text-muted">Abonnes</span>
          </button>
          <button
            type="button"
            onClick={() => setFollowingOpen(true)}
            className="cursor-pointer hover:opacity-70 transition-opacity"
          >
            <span className="block font-extrabold text-lg text-hc-text hover:underline">{followingCount}</span>
            <span className="text-xs text-hc-text-muted">Abonnements</span>
          </button>
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
            onClick={() => setEditOpen(true)}
            className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-hc-bg-secondary text-hc-text px-6 py-2 text-sm font-semibold hover:bg-neutral-200 transition-colors"
          >
            <Pencil className="h-3.5 w-3.5" aria-hidden="true" />
            Modifier le profil
          </button>
        ) : (
          <>
            {showFollowButton && (
              following ? (
                <button
                  onClick={() => toggleFollow(user.id)}
                  className="inline-flex items-center justify-center rounded-lg bg-hc-bg-secondary text-hc-text px-6 py-2 text-sm font-semibold hover:bg-neutral-200 transition-colors"
                  aria-pressed={true}
                  aria-label={isSubscription ? "Se desabonner" : "Ne plus suivre"}
                >
                  {isSubscription ? "Abonne(e)" : "Abonne(e)"}
                </button>
              ) : (
                <button
                  onClick={() => toggleFollow(user.id)}
                  className="inline-flex items-center justify-center rounded-lg gradient-warm text-white px-6 py-2 text-sm font-semibold hover:opacity-90 transition-opacity"
                  aria-pressed={false}
                  aria-label={isSubscription ? "S'abonner" : "Suivre"}
                >
                  {isSubscription ? "S'abonner" : "Suivre"}
                </button>
              )
            )}

            {canSendMessage && (
              <button
                onClick={handleMessage}
                className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-hc-border text-hc-text px-4 py-2 text-sm font-semibold hover:bg-hc-bg-secondary transition-colors"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                Message
              </button>
            )}
          </>
        )}
      </div>

      {/* Modals */}
      <EditProfileModal open={editOpen} onClose={() => setEditOpen(false)} />
      <FollowersModal
        userId={user.id}
        mode="followers"
        open={followersOpen}
        onClose={() => setFollowersOpen(false)}
      />
      <FollowersModal
        userId={user.id}
        mode="following"
        open={followingOpen}
        onClose={() => setFollowingOpen(false)}
      />
    </div>
  );
}
