"use client";

import { useState } from "react";
import { Filter, RotateCcw, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { HANDICAP_LABELS, BUSINESS_CATEGORIES } from "@/lib/constants";
import type { HandicapType } from "@/lib/types";
import { cn } from "@/lib/utils";

export interface ExploreFiltersState {
  handicapTypes: HandicapType[];
  category: string;
  department: string;
  minRating: number;
}

interface ExploreFiltersProps {
  filters: ExploreFiltersState;
  onHandicapToggle: (type: HandicapType) => void;
  onCategoryChange: (category: string) => void;
  onDepartmentChange: (department: string) => void;
  onMinRatingChange: (rating: number) => void;
  onReset: () => void;
}

function FilterContent({
  filters,
  onHandicapToggle,
  onCategoryChange,
  onDepartmentChange,
  onMinRatingChange,
  onReset,
}: ExploreFiltersProps) {
  const handicapKeys = Object.keys(HANDICAP_LABELS) as HandicapType[];

  return (
    <div className="space-y-6">
      {/* Handicap type checkboxes */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-foreground">Type de handicap</h3>
        <div className="space-y-2">
          {handicapKeys.map((type) => (
            <label
              key={type}
              className="flex items-center gap-2 cursor-pointer text-sm"
            >
              <Checkbox
                checked={filters.handicapTypes.includes(type)}
                onCheckedChange={() => onHandicapToggle(type)}
              />
              <span className="text-foreground">{HANDICAP_LABELS[type]}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Category select */}
      <div className="space-y-2">
        <Label htmlFor="category-filter">Categorie</Label>
        <Select
          value={filters.category}
          onValueChange={(val) => onCategoryChange(val as string)}
        >
          <SelectTrigger className="w-full" id="category-filter">
            <SelectValue placeholder="Toutes les categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toutes les categories</SelectItem>
            {BUSINESS_CATEGORIES.map((cat) => (
              <SelectItem key={cat.value} value={cat.value}>
                {cat.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Department input */}
      <div className="space-y-2">
        <Label htmlFor="department-filter">Departement</Label>
        <Input
          id="department-filter"
          type="text"
          placeholder="Ex: 75, 13, 69..."
          value={filters.department}
          onChange={(e) => onDepartmentChange(e.target.value)}
          maxLength={3}
        />
      </div>

      {/* Min rating stars */}
      <div className="space-y-2">
        <Label>Note minimale</Label>
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() =>
                onMinRatingChange(filters.minRating === star ? 0 : star)
              }
              className="p-0.5 rounded transition-colors hover:bg-muted"
              aria-label={`${star} etoile${star > 1 ? "s" : ""} minimum`}
            >
              <Star
                className={cn(
                  "h-5 w-5",
                  star <= filters.minRating
                    ? "fill-yellow-400 text-yellow-400"
                    : "fill-none text-muted-foreground/30"
                )}
                aria-hidden="true"
              />
            </button>
          ))}
          {filters.minRating > 0 && (
            <span className="ml-1 text-xs text-muted-foreground">
              {filters.minRating}+
            </span>
          )}
        </div>
      </div>

      {/* Reset button */}
      <Button variant="outline" size="sm" onClick={onReset} className="w-full">
        <RotateCcw className="h-4 w-4" aria-hidden="true" />
        Reinitialiser
      </Button>
    </div>
  );
}

export function ExploreFilters(props: ExploreFiltersProps) {
  const [open, setOpen] = useState(false);

  const activeFilterCount =
    props.filters.handicapTypes.length +
    (props.filters.category && props.filters.category !== "all" ? 1 : 0) +
    (props.filters.department ? 1 : 0) +
    (props.filters.minRating > 0 ? 1 : 0);

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:block w-72 shrink-0">
        <div className="sticky top-20 bg-card rounded-2xl border border-border/50 p-5">
          <h2 className="text-base font-heading font-semibold text-foreground mb-4">
            Filtres
          </h2>
          <FilterContent {...props} />
        </div>
      </aside>

      {/* Mobile sheet trigger */}
      <div className="md:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            render={
              <Button variant="outline" size="sm" className="gap-1.5" />
            }
          >
            <Filter className="h-4 w-4" aria-hidden="true" />
            Filtres
            {activeFilterCount > 0 && (
              <span className="ml-1 inline-flex items-center justify-center h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs font-medium">
                {activeFilterCount}
              </span>
            )}
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>Filtres</SheetTitle>
              <SheetDescription>
                Affinez votre recherche d&apos;etablissements
              </SheetDescription>
            </SheetHeader>
            <div className="px-4 pb-4 overflow-y-auto">
              <FilterContent {...props} />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
