"use client";

import { useMemo } from "react";
import { useApp } from "@/components/providers/AppProvider";
import { ConversationList } from "@/components/messaging/ConversationList";
import { EmptyState } from "@/components/shared/EmptyState";
import { MessageCircle, MessageSquare } from "lucide-react";

export default function MessagesPage() {
  const { currentUser, conversations } = useApp();

  const userConversations = useMemo(
    () =>
      conversations.filter(
        (c) => c.participant1Id === currentUser.id || c.participant2Id === currentUser.id
      ),
    [currentUser.id, conversations]
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
          <div className="hidden flex-1 flex-col items-center justify-center gap-3 md:flex">
            <MessageSquare className="h-12 w-12 text-muted-foreground/40" aria-hidden="true" />
            <h2 className="text-lg font-semibold text-foreground">
              Selectionnez une conversation
            </h2>
            <p className="text-sm text-muted-foreground text-center max-w-[16rem]">
              Cliquez sur un contact a gauche pour commencer a discuter
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
