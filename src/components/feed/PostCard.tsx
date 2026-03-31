"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import type { Post } from "@/lib/types";
import { POST_TYPE_LABELS } from "@/lib/constants";
import { cn, formatDate, getInitials, truncateText } from "@/lib/utils";
import { useApp } from "@/components/providers/AppProvider";
import { HandicapBadge } from "@/components/shared/HandicapBadge";
import { LikeButton } from "@/components/feed/LikeButton";
import { CommentSection } from "@/components/feed/CommentSection";
import { MapPin, Link as LinkIcon, MessageCircle } from "lucide-react";
import { toast } from "sonner";

interface PostCardProps {
  post: Post;
  showFullContent?: boolean;
}

export function PostCard({ post, showFullContent = false }: PostCardProps) {
  const { getUser } = useApp();
  const author = getUser(post.authorId);
  const [expanded, setExpanded] = useState(showFullContent);
  const [showComments, setShowComments] = useState(false);

  const displayContent =
    expanded || post.content.length <= 300
      ? post.content
      : truncateText(post.content, 300);

  const needsTruncation = !showFullContent && post.content.length > 300;

  const handleShare = useCallback(() => {
    const url = `${window.location.origin}/fil/${post.id}`;
    navigator.clipboard.writeText(url).then(() => {
      toast("Lien copie !");
    });
  }, [post.id]);

  return (
    <article
      aria-label={`Publication de ${author?.name ?? "Utilisateur"}`}
      className="card-editorial p-6"
    >
      {/* Header */}
      <div className="flex items-start gap-3">
        {/* Avatar */}
        <Link
          href={`/profil/${post.authorId}`}
          className="flex-shrink-0"
          aria-label={`Profil de ${author?.name ?? "Utilisateur"}`}
        >
          <div className="w-10 h-10 rounded-full bg-hc-blue text-white flex items-center justify-center text-sm font-semibold">
            {author?.avatar ? (
              <img
                src={author.avatar}
                alt=""
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              getInitials(author?.name ?? "??")
            )}
          </div>
        </Link>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <Link
              href={`/profil/${post.authorId}`}
              className="font-semibold text-[15px] hover:underline text-hc-text"
            >
              {author?.name ?? "Utilisateur"}
            </Link>
            <span className={cn(
              "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
              post.type === "EXPERIENCE" || post.type === "STORY"
                ? "bg-hc-orange-muted text-hc-orange"
                : "bg-hc-blue-muted text-hc-blue"
            )}>
              {POST_TYPE_LABELS[post.type]}
            </span>
          </div>
          <Link
            href={`/fil/${post.id}`}
            className="text-xs text-hc-text-muted hover:underline"
          >
            {formatDate(post.createdAt)}
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="mt-3">
        <p className="text-[15px] leading-relaxed whitespace-pre-wrap">{displayContent}</p>
        {needsTruncation && !expanded && (
          <button
            type="button"
            onClick={() => setExpanded(true)}
            className="text-sm text-hc-blue hover:underline mt-1 font-medium"
          >
            Voir plus
          </button>
        )}
      </div>

      {/* Media grid */}
      {post.media.length > 0 && (
        <div
          className={cn(
            "mt-3 gap-1 rounded-xl overflow-hidden",
            post.media.length === 1 && "grid grid-cols-1",
            post.media.length === 2 && "grid grid-cols-2",
            post.media.length === 3 && "grid grid-cols-2 grid-rows-2",
            post.media.length >= 4 && "grid grid-cols-2 grid-rows-2"
          )}
        >
          {post.media.slice(0, 4).map((src, index) => (
            <div
              key={index}
              className={cn(
                "relative overflow-hidden bg-muted",
                post.media.length === 1 && "aspect-video rounded-xl",
                post.media.length === 2 && "aspect-square rounded-xl",
                post.media.length === 3 &&
                  index === 0 &&
                  "row-span-2 aspect-auto rounded-l-xl",
                post.media.length === 3 &&
                  index > 0 &&
                  "aspect-square",
                post.media.length === 3 &&
                  index === 1 &&
                  "rounded-tr-xl",
                post.media.length === 3 &&
                  index === 2 &&
                  "rounded-br-xl",
                post.media.length >= 4 && "aspect-square",
                post.media.length >= 4 && index === 0 && "rounded-tl-xl",
                post.media.length >= 4 && index === 1 && "rounded-tr-xl",
                post.media.length >= 4 && index === 2 && "rounded-bl-xl",
                post.media.length >= 4 && index === 3 && "rounded-br-xl"
              )}
            >
              <img
                src={src}
                alt={`Image ${index + 1} de la publication`}
                className="w-full h-full object-cover"
                loading="lazy"
                onError={(e) => {
                  const target = e.currentTarget;
                  target.style.display = "none";
                }}
              />
            </div>
          ))}
        </div>
      )}

      {/* Handicap tags */}
      {post.handicapTags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-3">
          {post.handicapTags.map((tag) => (
            <HandicapBadge key={tag} type={tag} />
          ))}
        </div>
      )}

      {/* Location */}
      {post.location && (
        <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
          <MapPin className="size-3.5" />
          <span>{post.location}</span>
        </div>
      )}

      {/* Footer actions */}
      <div className="flex items-center gap-4 mt-4 pt-3 border-t border-border/50">
        <LikeButton postId={post.id} likesCount={post.likesCount} />

        <button
          type="button"
          onClick={() => setShowComments(!showComments)}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          aria-label={`Commentaires (${post.commentsCount})`}
        >
          <MessageCircle className="size-5" />
          {post.commentsCount > 0 && <span>{post.commentsCount}</span>}
        </button>

        <button
          type="button"
          onClick={handleShare}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Copier le lien"
        >
          <LinkIcon className="size-5" />
        </button>
      </div>

      {/* Comments section */}
      {(showComments || showFullContent) && (
        <CommentSection
          postId={post.id}
          commentsCount={post.commentsCount}
          expanded={showComments || showFullContent}
        />
      )}
    </article>
  );
}
