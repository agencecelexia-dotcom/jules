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
    setTimeout(() => setAnimating(false), 400);
  }, [postId, toggleLike]);

  return (
    <div className="flex flex-col">
      <button
        type="button"
        onClick={handleClick}
        aria-pressed={isLiked}
        aria-label={`J'aime (${likesCount})`}
        className="inline-flex items-center text-hc-text hover:text-hc-red transition-colors"
      >
        <Heart
          className={cn(
            "size-6 transition-all",
            isLiked && "fill-hc-red text-hc-red",
            animating && "animate-like-pulse"
          )}
        />
      </button>
      {likesCount > 0 && (
        <span className={cn(
          "text-sm font-semibold mt-1",
          isLiked ? "text-hc-red" : "text-hc-text"
        )}>
          {likesCount} J&apos;aime
        </span>
      )}
    </div>
  );
}
