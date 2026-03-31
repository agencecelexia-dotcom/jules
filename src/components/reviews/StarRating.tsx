"use client";

import { useState, useCallback } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingInteractiveProps {
  mode: "interactive";
  value: number;
  onChange: (value: number) => void;
  size?: "sm" | "md";
}

interface StarRatingReadonlyProps {
  mode: "readonly";
  value: number;
  size?: "sm" | "md";
}

type StarRatingProps = StarRatingInteractiveProps | StarRatingReadonlyProps;

export function StarRating(props: StarRatingProps) {
  const { mode, value, size = "sm" } = props;
  const iconSize = size === "md" ? "h-5 w-5" : "h-4 w-4";

  if (mode === "readonly") {
    return (
      <div
        className="flex items-center gap-0.5"
        aria-label={`Note : ${value} sur 5`}
        role="img"
      >
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            className={cn(
              iconSize,
              i <= Math.round(value)
                ? "fill-yellow-400 text-yellow-400"
                : "fill-none text-muted-foreground/30"
            )}
            aria-hidden="true"
          />
        ))}
      </div>
    );
  }

  return (
    <InteractiveStarRating
      value={value}
      onChange={props.onChange}
      iconSize={iconSize}
    />
  );
}

function InteractiveStarRating({
  value,
  onChange,
  iconSize,
}: {
  value: number;
  onChange: (value: number) => void;
  iconSize: string;
}) {
  const [hovered, setHovered] = useState<number>(0);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, starValue: number) => {
      if (e.key === "ArrowRight" || e.key === "ArrowUp") {
        e.preventDefault();
        const next = Math.min(starValue + 1, 5);
        onChange(next);
        // Focus the next star button
        const parent = (e.target as HTMLElement).parentElement;
        const nextBtn = parent?.querySelector(
          `[data-star="${next}"]`
        ) as HTMLElement | null;
        nextBtn?.focus();
      } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
        e.preventDefault();
        const prev = Math.max(starValue - 1, 1);
        onChange(prev);
        const parent = (e.target as HTMLElement).parentElement;
        const prevBtn = parent?.querySelector(
          `[data-star="${prev}"]`
        ) as HTMLElement | null;
        prevBtn?.focus();
      }
    },
    [onChange]
  );

  const displayValue = hovered || value;

  return (
    <div className="flex items-center gap-0.5" role="radiogroup" aria-label="Note">
      {[1, 2, 3, 4, 5].map((i) => (
        <button
          key={i}
          type="button"
          data-star={i}
          role="radio"
          aria-checked={value === i}
          aria-label={`${i} etoile${i > 1 ? "s" : ""}`}
          className="rounded-sm p-0.5 transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          onClick={() => onChange(i)}
          onMouseEnter={() => setHovered(i)}
          onMouseLeave={() => setHovered(0)}
          onKeyDown={(e) => handleKeyDown(e, i)}
        >
          <Star
            className={cn(
              iconSize,
              i <= displayValue
                ? "fill-yellow-400 text-yellow-400"
                : "fill-none text-muted-foreground/30"
            )}
            aria-hidden="true"
          />
        </button>
      ))}
    </div>
  );
}
