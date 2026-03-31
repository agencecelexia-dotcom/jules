import type { BookingStatus } from "@/lib/types";
import { BOOKING_STATUS_LABELS, BOOKING_STATUS_COLORS } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface BookingStatusBadgeProps {
  status: BookingStatus;
  className?: string;
}

export function BookingStatusBadge({ status, className }: BookingStatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        BOOKING_STATUS_COLORS[status],
        className
      )}
    >
      {BOOKING_STATUS_LABELS[status]}
    </span>
  );
}
