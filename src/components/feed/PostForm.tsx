"use client";

import { useState, useRef, useCallback } from "react";
import { useApp } from "@/components/providers/AppProvider";
import type { HandicapType, PostType } from "@/lib/types";
import { HANDICAP_LABELS, POST_TYPE_LABELS } from "@/lib/constants";
import { cn, getInitials } from "@/lib/utils";
import { toast } from "sonner";
import { ImageIcon, Tag, MapPin } from "lucide-react";

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
  const [showOptions, setShowOptions] = useState(false);
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
      setShowOptions(false);
      toast("Publication creee !");
    },
    [content, selectedTags, postType, currentUser.id, addPost]
  );

  const charCount = content.length;
  const showCounter = charCount >= 1800;

  return (
    <form
      onSubmit={handleSubmit}
      className="card-social p-4"
    >
      <div className="flex gap-3">
        {/* Avatar in gradient ring */}
        <div className="flex-shrink-0 avatar-ring" aria-hidden="true">
          <div className="w-8 h-8 rounded-full bg-hc-bg-secondary text-hc-text flex items-center justify-center text-xs font-semibold">
            {currentUser.avatar ? (
              <img
                src={currentUser.avatar}
                alt=""
                className="w-8 h-8 rounded-full object-cover"
              />
            ) : (
              getInitials(currentUser.name)
            )}
          </div>
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
            onFocus={() => setShowOptions(true)}
            placeholder="Quoi de neuf ?"
            className="w-full resize-none bg-transparent border-none outline-none text-sm placeholder:text-hc-text-muted min-h-[40px] field-sizing-content"
            rows={2}
            aria-label="Contenu de la publication"
          />

          {/* Character counter */}
          {showCounter && (
            <p
              className={cn(
                "text-xs text-right mt-1",
                charCount >= MAX_CHARS ? "text-hc-red" : "text-hc-text-muted"
              )}
            >
              {charCount} / {MAX_CHARS}
            </p>
          )}

          {/* Expanded options */}
          {showOptions && (
            <>
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
                        ? "gradient-warm text-white"
                        : "bg-hc-bg-secondary text-hc-text-secondary hover:bg-hc-border"
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
                      "rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors",
                      selectedTags.includes(type)
                        ? "gradient-warm text-white"
                        : "bg-hc-bg-secondary text-hc-text-muted hover:bg-hc-border"
                    )}
                  >
                    {HANDICAP_LABELS[type]}
                  </button>
                ))}
              </div>
            </>
          )}

          {/* Bottom row: action icons + submit */}
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-3">
              <button type="button" className="text-hc-text-muted hover:text-hc-text transition-colors" aria-label="Ajouter une image">
                <ImageIcon className="size-5" />
              </button>
              <button type="button" className="text-hc-text-muted hover:text-hc-text transition-colors" aria-label="Ajouter un tag">
                <Tag className="size-5" />
              </button>
              <button type="button" className="text-hc-text-muted hover:text-hc-text transition-colors" aria-label="Ajouter un lieu">
                <MapPin className="size-5" />
              </button>
            </div>

            <button
              type="submit"
              disabled={!content.trim()}
              className={cn(
                "rounded-full px-5 py-2 text-sm font-semibold transition-all",
                content.trim()
                  ? "gradient-warm text-white shadow-sm hover:shadow-md"
                  : "bg-hc-bg-secondary text-hc-text-muted cursor-not-allowed"
              )}
            >
              Publier
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
