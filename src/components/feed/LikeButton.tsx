"use client";

import { useState, useCallback } from "react";
import { useApp } from "@/components/providers/AppProvider";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";

interface LikeButtonProps {
  postId: string;
  likesCount: number;
}

export function LikeButton({ postId, likesCount }: LikeButtonProps) {
  const { hasLiked, toggleLike } = useApp();
  const isLiked = hasLiked(postId);
  const [animating, setAnimating] = useState(false);

  const handleClick = useCallback(() => {
    toggleLike(postId);
    setAnimating(true);
    setTimeout(() => setAnimating(false), 300);
  }, [postId, toggleLike]);

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-pressed={isLiked}
      aria-label={`J'aime (${likesCount})`}
      className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-red-500 transition-colors"
    >
      <Heart
        className={cn(
          "size-5 transition-colors",
          isLiked && "fill-red-500 text-red-500",
          animating && "animate-like-pulse"
        )}
      />
      {likesCount > 0 && (
        <span className={cn(isLiked && "text-red-500")}>{likesCount}</span>
      )}
    </button>
  );
}
