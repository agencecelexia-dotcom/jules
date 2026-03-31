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
        "inline-flex items-center rounded-full px-3 py-1 text-[11px] font-medium ring-1 ring-inset ring-current/10",
        colorClass,
        className
      )}
    >
      {label}
    </span>
  );
}
