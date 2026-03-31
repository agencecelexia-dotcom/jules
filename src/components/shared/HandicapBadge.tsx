import type { HandicapType } from "@/lib/types";
import { HANDICAP_LABELS, HANDICAP_COLORS } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface HandicapBadgeProps {
  type: HandicapType;
  className?: string;
}

export function HandicapBadge({ type, className }: HandicapBadgeProps) {
  const label = HANDICAP_LABELS[type];
  const colorClass = HANDICAP_COLORS[type];

  return (
    <span
      role="img"
      aria-label={`Type de handicap : ${label}`}
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        colorClass,
        className
      )}
    >
      {label}
    </span>
  );
}
