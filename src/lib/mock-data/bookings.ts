import type { Booking } from "@/lib/types";

export const mockBookings: Booking[] = [
  {
    id: "booking-1",
    activityId: "activity-1",
    userId: "user-1",
    date: "2026-04-15T10:00:00.000Z",
    participants: 2,
    totalPrice: 9000,
    status: "CONFIRMED",
    createdAt: "2026-03-25T14:00:00.000Z",
  },
  {
    id: "booking-2",
    activityId: "activity-3",
    userId: "user-3",
    date: "2026-04-20T14:30:00.000Z",
    participants: 1,
    totalPrice: 3000,
    status: "PENDING",
    createdAt: "2026-03-28T09:00:00.000Z",
  },
];
