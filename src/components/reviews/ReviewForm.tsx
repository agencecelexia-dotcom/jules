"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useApp } from "@/components/providers/AppProvider";
import { StarRating } from "@/components/reviews/StarRating";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ReviewFormProps {
  businessId: string;
  onClose: () => void;
  open: boolean;
}

export function ReviewForm({ businessId, onClose, open }: ReviewFormProps) {
  const { addReview, currentUser } = useApp();
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState("");
  const [handicapContext, setHandicapContext] = useState("");
  const [errors, setErrors] = useState<{ rating?: string; content?: string }>({});

  function validate(): boolean {
    const newErrors: { rating?: string; content?: string } = {};
    if (rating < 1) {
      newErrors.rating = "Veuillez attribuer une note.";
    }
    if (content.trim().length < 10) {
      newErrors.content = "Votre avis doit contenir au moins 10 caracteres.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    addReview({
      businessId,
      authorId: currentUser.id,
      rating,
      content: content.trim(),
      handicapContext: handicapContext.trim(),
    });

    toast.success("Avis publie !");
    setRating(0);
    setContent("");
    setHandicapContext("");
    setErrors({});
    onClose();
  }

  function handleOpenChange(nextOpen: boolean) {
    if (!nextOpen) {
      onClose();
    }
  }

  // Business users cannot leave reviews
  if (currentUser.role === "BUSINESS") {
    return (
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Action non disponible</DialogTitle>
            <DialogDescription>
              Les etablissements ne peuvent pas laisser d&apos;avis sur d&apos;autres etablissements.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Fermer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Laisser un avis</DialogTitle>
          <DialogDescription>
            Partagez votre experience pour aider la communaute.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Rating */}
          <div className="space-y-2">
            <Label>Note</Label>
            <StarRating mode="interactive" value={rating} onChange={setRating} size="md" />
            {errors.rating && (
              <p className="text-xs text-destructive">{errors.rating}</p>
            )}
          </div>

          {/* Content */}
          <div className="space-y-2">
            <Label htmlFor="review-content">Votre avis</Label>
            <Textarea
              id="review-content"
              placeholder="Partagez votre experience..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={4}
              aria-invalid={!!errors.content}
            />
            {errors.content && (
              <p className="text-xs text-destructive">{errors.content}</p>
            )}
          </div>

          {/* Handicap context */}
          <div className="space-y-2">
            <Label htmlFor="review-handicap-context">
              Contexte handicap (optionnel)
            </Label>
            <Input
              id="review-handicap-context"
              placeholder="Ex: Visite en fauteuil roulant, enfant avec autisme..."
              value={handicapContext}
              onChange={(e) => setHandicapContext(e.target.value)}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button type="submit">Publier</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
