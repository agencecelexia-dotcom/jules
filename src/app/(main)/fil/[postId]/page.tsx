"use client";

import { use } from "react";
import Link from "next/link";
import { useApp } from "@/components/providers/AppProvider";
import { PostCard } from "@/components/feed/PostCard";
import { CommentSection } from "@/components/feed/CommentSection";
import { ChevronRight } from "lucide-react";

interface PostDetailPageProps {
  params: Promise<{ postId: string }>;
}

export default function PostDetailPage({ params }: PostDetailPageProps) {
  const { postId } = use(params);
  const { posts, getUser } = useApp();

  const post = posts.find((p) => p.id === postId);

  if (!post) {
    return (
      <div className="max-w-2xl mx-auto text-center py-16">
        <h1 className="text-xl font-semibold mb-4">Publication introuvable</h1>
        <p className="text-muted-foreground mb-6">
          Cette publication n&apos;existe pas ou a ete supprimee.
        </p>
        <Link
          href="/fil"
          className="inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium bg-hc-blue text-white hover:bg-hc-blue-dark transition-colors"
        >
          Retour au fil
        </Link>
      </div>
    );
  }

  const author = getUser(post.authorId);

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Breadcrumb */}
      <nav aria-label="Fil d'Ariane" className="flex items-center gap-1 text-sm">
        <Link href="/fil" className="text-muted-foreground hover:text-foreground transition-colors">
          Fil
        </Link>
        <ChevronRight className="size-4 text-muted-foreground" />
        <span className="text-foreground font-medium">
          Post de {author?.name ?? "Utilisateur"}
        </span>
      </nav>

      {/* Full post card */}
      <PostCard post={post} showFullContent />

      {/* Full comments section */}
      <div className="bg-card rounded-2xl p-6 shadow-sm border border-border/50">
        <h2 className="text-sm font-semibold mb-4">
          Commentaires ({post.commentsCount})
        </h2>
        <CommentSection
          postId={post.id}
          commentsCount={post.commentsCount}
          expanded
        />
      </div>
    </div>
  );
}
