"use client";

import Link from "next/link";
import { useApp } from "@/components/providers/AppProvider";
import { getInitials } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

interface FollowersModalProps {
  userId: string;
  mode: "followers" | "following";
  open: boolean;
  onClose: () => void;
}

export function FollowersModal({
  userId,
  mode,
  open,
  onClose,
}: FollowersModalProps) {
  const { follows, getUser } = useApp();

  // Build the list of user IDs depending on mode
  const userIds =
    mode === "followers"
      ? follows
          .filter((f) => f.followingId === userId)
          .map((f) => f.followerId)
      : follows
          .filter((f) => f.followerId === userId)
          .map((f) => f.followingId);

  const users = userIds
    .map((id) => getUser(id))
    .filter((u) => u !== undefined);

  const title = mode === "followers" ? "Abonnes" : "Abonnements";
  const emptyMessage =
    mode === "followers" ? "Aucun abonne" : "Aucun abonnement";

  const roleBadge = (role: string) => {
    if (role === "FAMILY")
      return (
        <span className="inline-flex items-center rounded-full bg-blue-50 text-blue-500 px-1.5 py-0.5 text-[10px] font-medium">
          Famille
        </span>
      );
    if (role === "BUSINESS")
      return (
        <span className="inline-flex items-center rounded-full bg-emerald-50 text-emerald-500 px-1.5 py-0.5 text-[10px] font-medium">
          Pro
        </span>
      );
    return null;
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        {users.length === 0 ? (
          <p className="text-sm text-hc-text-muted text-center py-8">
            {emptyMessage}
          </p>
        ) : (
          <ScrollArea className="max-h-80">
            <div className="space-y-1">
              {users.map((user) => {
                const city =
                  user.familyProfile?.city ?? user.businessProfile?.city;

                return (
                  <Link
                    key={user.id}
                    href={`/profil/${user.id}`}
                    onClick={onClose}
                    className="flex items-center gap-3 rounded-lg px-2 py-2 hover:bg-hc-bg-secondary transition-colors"
                  >
                    {/* Avatar with gradient ring */}
                    <div className="avatar-ring shrink-0">
                      <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center overflow-hidden">
                        {user.avatar ? (
                          <img
                            src={user.avatar}
                            alt={user.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <span className="text-xs font-semibold text-hc-text-muted">
                            {getInitials(user.name)}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="font-semibold text-sm text-hc-text truncate">
                          {user.name}
                        </span>
                        {roleBadge(user.role)}
                      </div>
                      {city && (
                        <span className="text-xs text-hc-text-muted truncate block">
                          {city}
                        </span>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          </ScrollArea>
        )}
      </DialogContent>
    </Dialog>
  );
}
