"use client";

import { useState, useRef, useCallback } from "react";
import { useApp } from "@/components/providers/AppProvider";
import type { HandicapType, PostType } from "@/lib/types";
import { HANDICAP_LABELS, POST_TYPE_LABELS } from "@/lib/constants";
import { cn, getInitials } from "@/lib/utils";
import { toast } from "sonner";
import { Send } from "lucide-react";

const HANDICAP_TYPES: HandicapType[] = [
  "MOTEUR",
  "VISUEL",
  "AUDITIF",
  "MENTAL",
  "PSYCHIQUE",
  "COGNITIF",
  "POLYHANDICAP",
  "AUTRE",
];

const POST_TYPES: PostType[] = ["EXPERIENCE", "QUESTION", "TIP", "STORY"];

const MAX_CHARS = 2000;

export function PostForm() {
  const { currentUser, addPost } = useApp();
  const [content, setContent] = useState("");
  const [selectedTags, setSelectedTags] = useState<HandicapType[]>([]);
  const [postType, setPostType] = useState<PostType>("EXPERIENCE");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const toggleTag = useCallback((tag: HandicapType) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const trimmed = content.trim();
      if (!trimmed) return;

      addPost({
        authorId: currentUser.id,
        type: postType,
        content: trimmed,
        media: [],
        handicapTags: selectedTags,
      });

      setContent("");
      setSelectedTags([]);
      setPostType("EXPERIENCE");
      toast("Publication creee !");
    },
    [content, selectedTags, postType, currentUser.id, addPost]
  );

  const charCount = content.length;
  const showCounter = charCount >= 1800;

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-card rounded-2xl p-6 shadow-sm border border-border/50"
    >
      <div className="flex gap-3">
        {/* Avatar */}
        <div
          className="flex-shrink-0 w-10 h-10 rounded-full bg-hc-blue text-white flex items-center justify-center text-sm font-semibold"
          aria-hidden="true"
        >
          {currentUser.avatar ? (
            <img
              src={currentUser.avatar}
              alt=""
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            getInitials(currentUser.name)
          )}
        </div>

        {/* Content area */}
        <div className="flex-1 min-w-0">
          <textarea
            ref={textareaRef}
            value={content}
            onChange={(e) => {
              if (e.target.value.length <= MAX_CHARS) {
                setContent(e.target.value);
              }
            }}
            placeholder="Quoi de neuf ? Partagez votre experience..."
            className="w-full resize-none bg-transparent border-none outline-none text-sm placeholder:text-muted-foreground min-h-[60px] field-sizing-content"
            rows={2}
            aria-label="Contenu de la publication"
          />

          {/* Character counter */}
          {showCounter && (
            <p
              className={cn(
                "text-xs text-right mt-1",
                charCount >= MAX_CHARS ? "text-hc-error" : "text-muted-foreground"
              )}
            >
              {charCount} / {MAX_CHARS}
            </p>
          )}

          {/* Post type pills */}
          <div className="flex flex-wrap gap-1.5 mt-3">
            {POST_TYPES.map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setPostType(type)}
                className={cn(
                  "rounded-full px-3 py-1 text-xs font-medium transition-colors",
                  postType === type
                    ? "bg-hc-blue text-white"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                )}
              >
                {POST_TYPE_LABELS[type]}
              </button>
            ))}
          </div>

          {/* Handicap tag selector */}
          <div className="flex flex-wrap gap-1.5 mt-2">
            {HANDICAP_TYPES.map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => toggleTag(type)}
                aria-pressed={selectedTags.includes(type)}
                className={cn(
                  "rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors border",
                  selectedTags.includes(type)
                    ? "bg-hc-blue text-white border-hc-blue"
                    : "bg-white text-muted-foreground border-border hover:bg-muted"
                )}
              >
                {HANDICAP_LABELS[type]}
              </button>
            ))}
          </div>

          {/* Submit */}
          <div className="flex justify-end mt-3">
            <button
              type="submit"
              disabled={!content.trim()}
              className={cn(
                "inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium transition-colors",
                content.trim()
                  ? "bg-hc-blue text-white hover:bg-hc-blue-dark"
                  : "bg-muted text-muted-foreground cursor-not-allowed"
              )}
            >
              <Send className="size-4" />
              Publier
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
