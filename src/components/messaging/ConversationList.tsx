"use client";

import Link from "next/link";
import type { Conversation } from "@/lib/types";
import { useApp } from "@/components/providers/AppProvider";
import { cn, formatDate, truncateText, getInitials } from "@/lib/utils";
import { MessageCircle } from "lucide-react";

interface ConversationListProps {
  conversations: Conversation[];
  activeId?: string;
}

export function ConversationList({ conversations, activeId }: ConversationListProps) {
  const { currentUser, getUser, messages } = useApp();

  if (conversations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
        <div className="mb-4 rounded-full bg-muted p-4">
          <MessageCircle className="h-8 w-8 text-muted-foreground" aria-hidden="true" />
        </div>
        <h3 className="mb-2 text-lg font-semibold text-foreground">Aucune conversation</h3>
        <p className="max-w-sm text-sm text-muted-foreground">
          Commencez par suivre des personnes !
        </p>
      </div>
    );
  }

  return (
    <nav aria-label="Liste des conversations">
      <ul className="divide-y divide-border">
        {conversations.map((conversation) => {
          const otherUserId =
            conversation.participant1Id === currentUser.id
              ? conversation.participant2Id
              : conversation.participant1Id;
          const otherUser = getUser(otherUserId);

          const conversationMessages = messages
            .filter((m) => m.conversationId === conversation.id)
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
          const lastMessage = conversationMessages[0];

          if (!otherUser) return null;

          return (
            <li key={conversation.id}>
              <Link
                href={`/messages/${conversation.id}`}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 transition-colors hover:bg-muted/50",
                  activeId === conversation.id && "bg-muted"
                )}
                aria-current={activeId === conversation.id ? "page" : undefined}
              >
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-hc-blue/10 text-hc-blue text-sm font-semibold"
                  aria-hidden="true"
                >
                  {getInitials(otherUser.name)}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="truncate text-sm font-medium text-foreground">
                      {otherUser.name}
                    </span>
                    {lastMessage && (
                      <span className="shrink-0 text-xs text-muted-foreground">
                        {formatDate(lastMessage.createdAt)}
                      </span>
                    )}
                  </div>
                  {lastMessage && (
                    <p className="truncate text-xs text-muted-foreground mt-0.5">
                      {truncateText(lastMessage.content, 50)}
                    </p>
                  )}
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
