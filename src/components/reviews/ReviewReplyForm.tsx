"use client";

import { useState } from "react";
import { useApp } from "@/components/providers/AppProvider";

interface ReviewReplyFormProps {
  reviewId: string;
  onCancel: () => void;
  onSubmitted: () => void;
}

export function ReviewReplyForm({ reviewId, onCancel, onSubmitted }: ReviewReplyFormProps) {
  const { replyToReview } = useApp();
  const [reply, setReply] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = reply.trim();
    if (!trimmed) return;
    replyToReview(reviewId, trimmed);
    setReply("");
    onSubmitted();
  };

  return (
    <form onSubmit={handleSubmit} className="mt-3 ml-12 space-y-2">
      <textarea
        value={reply}
        onChange={(e) => setReply(e.target.value)}
        placeholder="Votre reponse..."
        rows={3}
        className="w-full rounded-lg border border-hc-border bg-hc-bg-secondary px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-hc-coral/40 resize-none"
      />
      <div className="flex items-center gap-2">
        <button
          type="submit"
          disabled={!reply.trim()}
          className="rounded-full gradient-warm px-4 py-1.5 text-sm font-medium text-white disabled:opacity-50 transition-opacity"
        >
          Publier
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="rounded-full px-4 py-1.5 text-sm font-medium text-hc-text-muted hover:text-hc-text transition-colors"
        >
          Annuler
        </button>
      </div>
    </form>
  );
}
