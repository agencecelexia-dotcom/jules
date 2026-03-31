"use client";

import type { HandicapType } from "@/lib/types";
import { HANDICAP_LABELS } from "@/lib/constants";
import { cn } from "@/lib/utils";

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

interface FeedFiltersProps {
  activeFilter: HandicapType | null;
  onFilterChange: (filter: HandicapType | null) => void;
}

export function FeedFilters({ activeFilter, onFilterChange }: FeedFiltersProps) {
  return (
    <div
      role="group"
      aria-label="Filtrer par type de handicap"
      className="overflow-x-auto flex gap-2 pb-2 scrollbar-hide"
    >
      <button
        type="button"
        aria-pressed={activeFilter === null}
        onClick={() => onFilterChange(null)}
        className={cn(
          "rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors",
          activeFilter === null
            ? "gradient-warm text-white"
            : "bg-hc-bg-secondary text-hc-text-secondary border-none hover:bg-hc-border"
        )}
      >
        Tout
      </button>
      {HANDICAP_TYPES.map((type) => (
        <button
          key={type}
          type="button"
          aria-pressed={activeFilter === type}
          onClick={() => onFilterChange(activeFilter === type ? null : type)}
          className={cn(
            "rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors",
            activeFilter === type
              ? "gradient-warm text-white"
              : "bg-hc-bg-secondary text-hc-text-secondary border-none hover:bg-hc-border"
          )}
        >
          {HANDICAP_LABELS[type]}
        </button>
      ))}
    </div>
  );
}
