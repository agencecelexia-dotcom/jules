"use client";

import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { useApp } from "@/components/providers/AppProvider";
import {
  ExploreFilters,
  type ExploreFiltersState,
} from "@/components/explore/ExploreFilters";
import { BusinessGrid } from "@/components/explore/BusinessGrid";
import type { HandicapType } from "@/lib/types";

const initialFilters: ExploreFiltersState = {
  handicapTypes: [],
  category: "all",
  department: "",
  minRating: 0,
};

export default function ExplorerPage() {
  const { users } = useApp();
  const [filters, setFilters] = useState<ExploreFiltersState>(initialFilters);

  // Get all business users
  const businesses = useMemo(() => {
    return users.filter((u) => u.role === "BUSINESS" && u.businessProfile);
  }, [users]);

  // Apply filters
  const filteredBusinesses = useMemo(() => {
    return businesses.filter((business) => {
      const bp = business.businessProfile!;

      // Handicap type filter
      if (filters.handicapTypes.length > 0) {
        const hasMatch = filters.handicapTypes.some((type) =>
          bp.handicapTypesSupported.includes(type)
        );
        if (!hasMatch) return false;
      }

      // Category filter
      if (filters.category && filters.category !== "all") {
        if (!bp.categories.includes(filters.category)) return false;
      }

      // Department filter
      if (filters.department.trim()) {
        if (bp.department !== filters.department.trim()) return false;
      }

      // Min rating filter
      if (filters.minRating > 0) {
        if (bp.averageRating < filters.minRating) return false;
      }

      return true;
    });
  }, [businesses, filters]);

  const handleHandicapToggle = (type: HandicapType) => {
    setFilters((prev) => ({
      ...prev,
      handicapTypes: prev.handicapTypes.includes(type)
        ? prev.handicapTypes.filter((t) => t !== type)
        : [...prev.handicapTypes, type],
    }));
  };

  const handleCategoryChange = (category: string) => {
    setFilters((prev) => ({ ...prev, category }));
  };

  const handleDepartmentChange = (department: string) => {
    setFilters((prev) => ({ ...prev, department }));
  };

  const handleMinRatingChange = (minRating: number) => {
    setFilters((prev) => ({ ...prev, minRating }));
  };

  const handleReset = () => {
    setFilters(initialFilters);
  };

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="space-y-2">
        <h1 className="text-2xl font-heading font-bold text-foreground flex items-center gap-2">
          <Search className="h-6 w-6 text-primary" aria-hidden="true" />
          Explorer les etablissements
        </h1>
        <p className="text-sm text-muted-foreground">
          Decouvrez des lieux et activites accessibles adaptes a vos besoins
        </p>
      </div>

      {/* Layout: sidebar + grid */}
      <div className="flex gap-6 items-start">
        <ExploreFilters
          filters={filters}
          onHandicapToggle={handleHandicapToggle}
          onCategoryChange={handleCategoryChange}
          onDepartmentChange={handleDepartmentChange}
          onMinRatingChange={handleMinRatingChange}
          onReset={handleReset}
        />

        <div className="flex-1 min-w-0">
          {/* Mobile filter trigger is inside ExploreFilters, show above grid on mobile */}
          <div className="md:hidden mb-4">
            {/* The Sheet trigger renders itself here via ExploreFilters */}
          </div>
          <BusinessGrid businesses={filteredBusinesses} />
        </div>
      </div>
    </div>
  );
}
