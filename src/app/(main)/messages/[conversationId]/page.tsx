"use client";

import { useMemo, use } from "react";
import { useApp } from "@/components/providers/AppProvider";
import { mockConversations } from "@/lib/mock-data/conversations";
import { ConversationList } from "@/components/messaging/ConversationList";
import { ChatWindow } from "@/components/messaging/ChatWindow";

interface ConversationPageProps {
  params: Promise<{ conversationId: string }>;
}

export default function ConversationPage({ params }: ConversationPageProps) {
  const { conversationId } = use(params);
  const { currentUser } = useApp();

  const userConversations = useMemo(
    () =>
      mockConversations.filter(
        (c) => c.participant1Id === currentUser.id || c.participant2Id === currentUser.id
      ),
    [currentUser.id]
  );

  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="sr-only">Conversation</h1>
      <div className="overflow-hidden rounded-xl border bg-card ring-1 ring-foreground/10">
        <div className="flex h-[600px]">
          {/* Conversation list - hidden on mobile */}
          <div className="hidden w-80 border-r md:block">
            <ConversationList
              conversations={userConversations}
              activeId={conversationId}
            />
          </div>

          {/* Chat window */}
          <div className="flex-1">
            <ChatWindow conversationId={conversationId} />
          </div>
        </div>
      </div>
    </div>
  );
}
