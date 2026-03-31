"use client";

import { useState, useMemo } from "react";
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
  const { users, currentUser } = useApp();
  const [filters, setFilters] = useState<ExploreFiltersState>(initialFilters);

  // Get all business users (exclude own business if current user is BUSINESS)
  const businesses = useMemo(() => {
    return users.filter(
      (u) => u.role === "BUSINESS" && u.businessProfile && u.id !== currentUser.id
    );
  }, [users, currentUser.id]);

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
      <div className="space-y-1">
        <h1 className="text-2xl font-extrabold text-hc-text">
          Explorer
        </h1>
        <p className="text-sm text-hc-text-muted">
          Decouvrez des lieux et activites accessibles
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
          {/* Result count */}
          <div className="mb-4">
            <p className="text-sm text-hc-text">
              <span className="font-bold text-lg">{filteredBusinesses.length}</span>{" "}
              {filteredBusinesses.length <= 1 ? "etablissement" : "etablissements"}
            </p>
          </div>

          <BusinessGrid businesses={filteredBusinesses} />
        </div>
      </div>
    </div>
  );
}
