"use client";

import { useState } from "react";
import { Check, Plus, UserMinus } from "lucide-react";
import { useApp } from "@/components/providers/AppProvider";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FollowButtonProps {
  targetUserId: string;
}

export function FollowButton({ targetUserId }: FollowButtonProps) {
  const { currentUser, isFollowing, toggleFollow } = useApp();
  const following = isFollowing(targetUserId);
  const [hovered, setHovered] = useState(false);
  const isOwnProfile = targetUserId === currentUser.id;

  const handleClick = () => {
    toggleFollow(targetUserId);
  };

  if (isOwnProfile) return null;

  if (following) {
    return (
      <Button
        variant={hovered ? "destructive" : "secondary"}
        size="sm"
        onClick={handleClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        aria-pressed={true}
        aria-label={hovered ? "Se desabonner" : "Abonne(e)"}
        className="min-w-[130px] transition-all"
      >
        {hovered ? (
          <>
            <UserMinus className="h-4 w-4" aria-hidden="true" />
            Se desabonner
          </>
        ) : (
          <>
            <Check className="h-4 w-4" aria-hidden="true" />
            Abonne(e)
          </>
        )}
      </Button>
    );
  }

  return (
    <Button
      variant="default"
      size="sm"
      onClick={handleClick}
      aria-pressed={false}
      aria-label="Suivre"
      className="min-w-[130px]"
    >
      <Plus className="h-4 w-4" aria-hidden="true" />
      Suivre
    </Button>
  );
}
