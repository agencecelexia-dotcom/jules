"use client";

import { useState, useMemo } from "react";
import type { HandicapType } from "@/lib/types";
import { useApp } from "@/components/providers/AppProvider";
import { FeedFilters } from "@/components/feed/FeedFilters";
import { PostForm } from "@/components/feed/PostForm";
import { PostCard } from "@/components/feed/PostCard";

export default function FeedPage() {
  const { posts } = useApp();
  const [activeFilter, setActiveFilter] = useState<HandicapType | null>(null);

  const filteredPosts = useMemo(() => {
    const sorted = [...posts].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    if (!activeFilter) return sorted;
    return sorted.filter((post) => post.handicapTags.includes(activeFilter));
  }, [posts, activeFilter]);

  return (
    <div className="max-w-lg mx-auto space-y-4">
      <h1 className="sr-only">Fil d&apos;actualite</h1>

      <PostForm />

      <FeedFilters activeFilter={activeFilter} onFilterChange={setActiveFilter} />

      <div>
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => <PostCard key={post.id} post={post} />)
        ) : (
          <div className="text-center py-12">
            <p className="text-hc-text-muted text-sm">
              Aucune publication pour ce filtre.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
