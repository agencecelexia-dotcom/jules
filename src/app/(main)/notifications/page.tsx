"use client";

import { useMemo } from "react";
import Link from "next/link";
import { Bell, Heart, MessageCircle, UserPlus, Star, CalendarDays } from "lucide-react";
import { useApp } from "@/components/providers/AppProvider";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { getInitials, truncateText } from "@/lib/utils";
import { EmptyState } from "@/components/shared/EmptyState";

type NotificationType = "like" | "comment" | "follow" | "review" | "booking";

interface Notification {
  id: string;
  type: NotificationType;
  actorId: string;
  text: string;
  excerpt?: string;
  href: string;
  date: Date;
  isNew: boolean;
}

export default function NotificationsPage() {
  const {
    currentUser,
    posts,
    comments,
    likes,
    follows,
    reviews,
    bookings,
    activities,
    getUser,
  } = useApp();

  const notifications = useMemo(() => {
    const items: Notification[] = [];
    const now = new Date();

    // New followers: people who follow the current user
    follows
      .filter((f) => f.followingId === currentUser.id && f.followerId !== currentUser.id)
      .forEach((f) => {
        items.push({
          id: `notif-follow-${f.id}`,
          type: "follow",
          actorId: f.followerId,
          text: "vous suit",
          href: `/profil/${f.followerId}`,
          date: new Date(f.createdAt),
          isNew: daysDiff(now, new Date(f.createdAt)) < 1,
        });
      });

    // Likes on current user's posts
    const myPosts = posts.filter((p) => p.authorId === currentUser.id);
    const myPostIds = new Set(myPosts.map((p) => p.id));
    likes
      .filter((l) => myPostIds.has(l.postId) && l.userId !== currentUser.id)
      .forEach((l) => {
        const post = myPosts.find((p) => p.id === l.postId);
        items.push({
          id: `notif-like-${l.id}`,
          type: "like",
          actorId: l.userId,
          text: "a aime votre publication",
          excerpt: post ? truncateText(post.content, 50) : undefined,
          href: `/fil`,
          date: mockDateFromId(l.id, now, -2),
          isNew: false,
        });
      });

    // Comments on current user's posts
    comments
      .filter((c) => myPostIds.has(c.postId) && c.authorId !== currentUser.id)
      .forEach((c) => {
        items.push({
          id: `notif-comment-${c.id}`,
          type: "comment",
          actorId: c.authorId,
          text: "a commente votre publication",
          excerpt: truncateText(c.content, 50),
          href: `/fil`,
          date: new Date(c.createdAt),
          isNew: daysDiff(now, new Date(c.createdAt)) < 1,
        });
      });

    // New reviews (if business)
    if (currentUser.role === "BUSINESS") {
      reviews
        .filter((r) => r.businessId === currentUser.id)
        .forEach((r) => {
          items.push({
            id: `notif-review-${r.id}`,
            type: "review",
            actorId: r.authorId,
            text: "a laisse un avis",
            excerpt: truncateText(r.content, 50),
            href: `/tableau-de-bord/avis`,
            date: new Date(r.createdAt),
            isNew: daysDiff(now, new Date(r.createdAt)) < 1,
          });
        });

      // Bookings on activities owned by current user
      const myActivityIds = new Set(
        activities.filter((a) => a.businessId === currentUser.id).map((a) => a.id)
      );
      bookings
        .filter((b) => myActivityIds.has(b.activityId) && b.userId !== currentUser.id)
        .forEach((b) => {
          const activity = activities.find((a) => a.id === b.activityId);
          items.push({
            id: `notif-booking-${b.id}`,
            type: "booking",
            actorId: b.userId,
            text: "a reserve une activite",
            excerpt: activity ? activity.title : undefined,
            href: `/tableau-de-bord/reservations`,
            date: new Date(b.createdAt),
            isNew: daysDiff(now, new Date(b.createdAt)) < 1,
          });
        });
    }

    // Sort newest first
    items.sort((a, b) => b.date.getTime() - a.date.getTime());
    return items;
  }, [currentUser, posts, comments, likes, follows, reviews, bookings, activities]);

  // Group notifications
  const grouped = useMemo(() => {
    const now = new Date();
    const today: Notification[] = [];
    const thisWeek: Notification[] = [];
    const older: Notification[] = [];

    notifications.forEach((n) => {
      const days = daysDiff(now, n.date);
      if (days < 1) {
        today.push(n);
      } else if (days < 7) {
        thisWeek.push(n);
      } else {
        older.push(n);
      }
    });

    return { today, thisWeek, older };
  }, [notifications]);

  const iconMap: Record<NotificationType, typeof Heart> = {
    like: Heart,
    comment: MessageCircle,
    follow: UserPlus,
    review: Star,
    booking: CalendarDays,
  };

  const iconColorMap: Record<NotificationType, string> = {
    like: "text-red-500",
    comment: "text-hc-blue",
    follow: "text-hc-coral",
    review: "text-hc-gold",
    booking: "text-hc-green",
  };

  if (notifications.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="sr-only">Notifications</h1>
        <EmptyState
          icon={Bell}
          title="Aucune notification"
          description="Vous n'avez aucune notification pour le moment."
        />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <h1 className="sr-only">Notifications</h1>

      {grouped.today.length > 0 && (
        <NotificationGroup
          label="Aujourd'hui"
          items={grouped.today}
          iconMap={iconMap}
          iconColorMap={iconColorMap}
          getUser={getUser}
        />
      )}

      {grouped.thisWeek.length > 0 && (
        <NotificationGroup
          label="Cette semaine"
          items={grouped.thisWeek}
          iconMap={iconMap}
          iconColorMap={iconColorMap}
          getUser={getUser}
        />
      )}

      {grouped.older.length > 0 && (
        <NotificationGroup
          label="Plus ancien"
          items={grouped.older}
          iconMap={iconMap}
          iconColorMap={iconColorMap}
          getUser={getUser}
        />
      )}
    </div>
  );
}

function NotificationGroup({
  label,
  items,
  iconMap,
  iconColorMap,
  getUser,
}: {
  label: string;
  items: Notification[];
  iconMap: Record<NotificationType, typeof Heart>;
  iconColorMap: Record<NotificationType, string>;
  getUser: (id: string) => ReturnType<ReturnType<typeof useApp>["getUser"]>;
}) {
  return (
    <section className="mb-6">
      <h2 className="text-xs font-semibold text-hc-text-muted uppercase tracking-wider mb-2 px-1">
        {label}
      </h2>
      <div className="card-social rounded-xl overflow-hidden">
        {items.map((notif) => {
          const actor = getUser(notif.actorId);
          const Icon = iconMap[notif.type];
          return (
            <Link
              key={notif.id}
              href={notif.href}
              className="flex items-center gap-3 py-3 px-4 border-b border-hc-border last:border-0 hover:bg-hc-bg-secondary transition"
            >
              {/* Unread dot */}
              <div className="w-2 shrink-0 flex justify-center">
                {notif.isNew && (
                  <span className="block w-2 h-2 rounded-full bg-hc-coral" />
                )}
              </div>

              {/* Avatar with type icon overlay */}
              <div className="relative shrink-0">
                <div className="avatar-ring">
                  <Avatar size="sm" className="w-8 h-8">
                    {actor?.avatar && (
                      <AvatarImage src={actor.avatar} alt={actor?.name ?? ""} />
                    )}
                    <AvatarFallback className="text-[10px]">
                      {actor ? getInitials(actor.name) : "?"}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <span
                  className={`absolute -bottom-1 -right-1 flex items-center justify-center w-4 h-4 rounded-full bg-white shadow ${iconColorMap[notif.type]}`}
                >
                  <Icon className="size-2.5" />
                </span>
              </div>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <p className="text-sm leading-snug">
                  <span className="font-semibold text-hc-text">
                    {actor?.name ?? "Quelqu'un"}
                  </span>{" "}
                  <span className="text-hc-text-muted">{notif.text}</span>
                </p>
                {notif.excerpt && (
                  <p className="text-xs text-hc-text-muted truncate mt-0.5">
                    {notif.excerpt}
                  </p>
                )}
              </div>

              {/* Timestamp */}
              <span className="text-xs text-hc-text-muted shrink-0">
                {formatRelative(notif.date)}
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

// Helpers

function daysDiff(now: Date, date: Date): number {
  return (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24);
}

/** Generate a deterministic mock date from a string id, offset by days from now */
function mockDateFromId(id: string, now: Date, offsetDays: number): Date {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = (hash << 5) - hash + id.charCodeAt(i);
    hash |= 0;
  }
  const hoursOffset = Math.abs(hash % 48) + Math.abs(offsetDays) * 24;
  return new Date(now.getTime() - hoursOffset * 60 * 60 * 1000);
}

function formatRelative(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  if (diffMin < 1) return "a l'instant";
  if (diffMin < 60) return `${diffMin}min`;
  const diffH = Math.floor(diffMin / 60);
  if (diffH < 24) return `${diffH}h`;
  const diffD = Math.floor(diffH / 24);
  if (diffD < 7) return `${diffD}j`;
  return date.toLocaleDateString("fr-FR", { day: "numeric", month: "short" });
}
