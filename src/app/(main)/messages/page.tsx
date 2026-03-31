"use client";

import { useMemo } from "react";
import { useApp } from "@/components/providers/AppProvider";
import { mockConversations } from "@/lib/mock-data/conversations";
import { ConversationList } from "@/components/messaging/ConversationList";
import { EmptyState } from "@/components/shared/EmptyState";
import { MessageCircle } from "lucide-react";

export default function MessagesPage() {
  const { currentUser } = useApp();

  const userConversations = useMemo(
    () =>
      mockConversations.filter(
        (c) => c.participant1Id === currentUser.id || c.participant2Id === currentUser.id
      ),
    [currentUser.id]
  );

  if (userConversations.length === 0) {
    return (
      <EmptyState
        icon={MessageCircle}
        title="Aucune conversation"
        description="Commencez par suivre des personnes !"
      />
    );
  }

  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="mb-6 text-2xl font-bold text-foreground">Messages</h1>
      <div className="overflow-hidden rounded-xl border bg-card ring-1 ring-foreground/10">
        <div className="flex h-[600px]">
          {/* Conversation list */}
          <div className="w-full border-r md:w-80">
            <ConversationList conversations={userConversations} />
          </div>

          {/* Placeholder for desktop */}
          <div className="hidden flex-1 items-center justify-center md:flex">
            <p className="text-muted-foreground">Selectionnez une conversation</p>
          </div>
        </div>
      </div>
    </div>
  );
}
