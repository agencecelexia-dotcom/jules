"use client";

import { useRef, useEffect, useMemo } from "react";
import Link from "next/link";
import { useApp } from "@/components/providers/AppProvider";
import { mockConversations } from "@/lib/mock-data/conversations";
import { getInitials } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import { MessageBubble } from "./MessageBubble";
import { MessageInput } from "./MessageInput";

interface ChatWindowProps {
  conversationId: string;
}

export function ChatWindow({ conversationId }: ChatWindowProps) {
  const { currentUser, messages, sendMessage, getUser } = useApp();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const conversation = mockConversations.find((c) => c.id === conversationId);

  const otherUserId = conversation
    ? conversation.participant1Id === currentUser.id
      ? conversation.participant2Id
      : conversation.participant1Id
    : undefined;
  const otherUser = otherUserId ? getUser(otherUserId) : undefined;

  const conversationMessages = useMemo(
    () =>
      messages
        .filter((m) => m.conversationId === conversationId)
        .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()),
    [messages, conversationId]
  );

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversationMessages.length]);

  const handleSend = (content: string) => {
    sendMessage(conversationId, content);
  };

  if (!conversation || !otherUser) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-muted-foreground">Conversation introuvable.</p>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex items-center gap-3 border-b bg-background px-4 py-3">
        <Link
          href="/messages"
          className="inline-flex items-center justify-center rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors md:hidden"
          aria-label="Retour aux conversations"
        >
          <ArrowLeft className="size-5" />
        </Link>
        <div
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-hc-blue/10 text-hc-blue text-sm font-semibold"
          aria-hidden="true"
        >
          {getInitials(otherUser.name)}
        </div>
        <span className="text-sm font-heading font-medium text-foreground">{otherUser.name}</span>
      </div>

      {/* Messages list */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        <div className="flex flex-col gap-3">
          {conversationMessages.map((msg) => {
            const isOwn = msg.senderId === currentUser.id;
            const sender = isOwn ? currentUser : otherUser;
            return (
              <MessageBubble
                key={msg.id}
                message={msg}
                isOwn={isOwn}
                senderName={sender.name}
              />
            );
          })}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <MessageInput onSend={handleSend} />
    </div>
  );
}
