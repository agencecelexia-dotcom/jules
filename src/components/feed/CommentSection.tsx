"use client";

import { useState, useCallback } from "react";
import { useApp } from "@/components/providers/AppProvider";
import { cn, formatDate, getInitials } from "@/lib/utils";
import { toast } from "sonner";
import { MessageCircle, Send } from "lucide-react";

interface CommentSectionProps {
  postId: string;
  commentsCount: number;
  expanded?: boolean;
}

export function CommentSection({
  postId,
  commentsCount,
  expanded = false,
}: CommentSectionProps) {
  const { getPostComments, addComment, getUser, currentUser } = useApp();
  const [isExpanded, setIsExpanded] = useState(expanded);
  const [newComment, setNewComment] = useState("");

  const comments = getPostComments(postId);

  const handleSubmit = useCallback(
    (e?: React.FormEvent) => {
      e?.preventDefault();
      const trimmed = newComment.trim();
      if (!trimmed) return;

      addComment(postId, trimmed);
      setNewComment("");
      toast("Commentaire ajoute");
    },
    [newComment, postId, addComment]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSubmit();
      }
    },
    [handleSubmit]
  );

  if (!isExpanded) {
    return (
      <button
        type="button"
        onClick={() => setIsExpanded(true)}
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <MessageCircle className="size-5" />
        {commentsCount > 0 && <span>{commentsCount}</span>}
      </button>
    );
  }

  return (
    <div className="mt-4 space-y-3">
      {/* Comments list */}
      {comments.length > 0 && (
        <div className="space-y-3">
          {comments.map((comment) => {
            const author = getUser(comment.authorId);
            return (
              <div key={comment.id} className="flex gap-2">
                {/* Small avatar */}
                <div
                  className="flex-shrink-0 w-7 h-7 rounded-full bg-hc-blue/10 text-hc-blue flex items-center justify-center text-xs font-semibold"
                  aria-hidden="true"
                >
                  {author?.avatar ? (
                    <img
                      src={author.avatar}
                      alt=""
                      className="w-7 h-7 rounded-full object-cover"
                    />
                  ) : (
                    getInitials(author?.name ?? "??")
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2">
                    <span className="text-sm font-bold">{author?.name ?? "Utilisateur"}</span>
                    <span className="text-xs text-muted-foreground">
                      {formatDate(comment.createdAt)}
                    </span>
                  </div>
                  <p className="text-sm text-foreground mt-0.5">{comment.content}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add comment form */}
      <form onSubmit={handleSubmit} className="flex gap-2 items-center">
        <div
          className="flex-shrink-0 w-7 h-7 rounded-full bg-hc-blue text-white flex items-center justify-center text-xs font-semibold"
          aria-hidden="true"
        >
          {currentUser.avatar ? (
            <img
              src={currentUser.avatar}
              alt=""
              className="w-7 h-7 rounded-full object-cover"
            />
          ) : (
            getInitials(currentUser.name)
          )}
        </div>
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ecrire un commentaire..."
          className="flex-1 h-8 rounded-full border border-border bg-muted/50 px-3 text-sm placeholder:text-muted-foreground outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50"
          aria-label="Ecrire un commentaire"
        />
        <button
          type="submit"
          disabled={!newComment.trim()}
          className={cn(
            "inline-flex items-center justify-center rounded-full p-1.5 transition-colors",
            newComment.trim()
              ? "text-hc-blue hover:bg-hc-blue/10"
              : "text-muted-foreground cursor-not-allowed"
          )}
          aria-label="Envoyer le commentaire"
        >
          <Send className="size-4" />
        </button>
      </form>
    </div>
  );
}
