"use client";

import { Suspense, useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { useApp } from "@/components/providers/AppProvider";
import { useDebounce } from "@/hooks/useDebounce";
import { SearchBar } from "@/components/search/SearchBar";
import { SearchResults } from "@/components/search/SearchResults";

function RechercheContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") ?? "";
  const [query, setQuery] = useState(initialQuery);
  const debouncedQuery = useDebounce(query, 300);

  const { users, posts, activities } = useApp();

  const filteredUsers = useMemo(() => {
    if (debouncedQuery.length < 2) return [];
    const q = debouncedQuery.toLowerCase();
    return users.filter((user) => user.name.toLowerCase().includes(q));
  }, [users, debouncedQuery]);

  const filteredPosts = useMemo(() => {
    if (debouncedQuery.length < 2) return [];
    const q = debouncedQuery.toLowerCase();
    return posts.filter((post) => post.content.toLowerCase().includes(q));
  }, [posts, debouncedQuery]);

  const filteredActivities = useMemo(() => {
    if (debouncedQuery.length < 2) return [];
    const q = debouncedQuery.toLowerCase();
    return activities.filter(
      (activity) =>
        activity.title.toLowerCase().includes(q) ||
        activity.description.toLowerCase().includes(q)
    );
  }, [activities, debouncedQuery]);

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-heading font-bold text-foreground">
        Recherche
      </h1>

      <SearchBar value={query} onChange={setQuery} />

      {debouncedQuery.length < 2 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="mb-4 rounded-full bg-muted p-4">
            <Search
              className="h-8 w-8 text-muted-foreground"
              aria-hidden="true"
            />
          </div>
          <p className="text-sm text-muted-foreground">
            Entrez au moins 2 caracteres pour rechercher
          </p>
        </div>
      ) : (
        <SearchResults
          query={debouncedQuery}
          users={filteredUsers}
          posts={filteredPosts}
          activities={filteredActivities}
        />
      )}
    </div>
  );
}

export default function RecherchePage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-2xl mx-auto space-y-6">
          <h1 className="text-2xl font-heading font-bold text-foreground">
            Recherche
          </h1>
          <div className="h-12 w-full animate-pulse rounded-xl bg-muted" />
        </div>
      }
    >
      <RechercheContent />
    </Suspense>
  );
}
