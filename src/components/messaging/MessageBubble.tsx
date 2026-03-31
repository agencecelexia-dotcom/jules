"use client";

import type { Message } from "@/lib/types";
import { cn, formatDate } from "@/lib/utils";

interface MessageBubbleProps {
  message: Message;
  isOwn: boolean;
  senderName: string;
}

export function MessageBubble({ message, isOwn, senderName }: MessageBubbleProps) {
  return (
    <div
      className={cn("flex flex-col max-w-[75%] gap-1", isOwn ? "self-end items-end" : "self-start items-start")}
      aria-label={`Message de ${senderName} : ${message.content}`}
    >
      <div
        className={cn(
          "px-4 py-2.5 text-sm leading-relaxed break-words",
          isOwn
            ? "bg-hc-blue text-white rounded-2xl rounded-br-md"
            : "bg-hc-bg-secondary text-hc-text rounded-2xl rounded-bl-md"
        )}
      >
        {message.content}
      </div>
      <span className="text-xs text-muted-foreground px-1">
        {formatDate(message.createdAt)}
      </span>
    </div>
  );
}
