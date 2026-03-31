import type { Follow } from "@/lib/types";

export const mockFollows: Follow[] = [
  // Sophie <-> Karim (mutual)
  {
    id: "follow-1",
    followerId: "user-1",
    followingId: "user-2",
    createdAt: "2025-06-10T08:00:00.000Z",
  },
  {
    id: "follow-2",
    followerId: "user-2",
    followingId: "user-1",
    createdAt: "2025-06-11T09:30:00.000Z",
  },

  // Sophie <-> Claire (mutual)
  {
    id: "follow-3",
    followerId: "user-1",
    followingId: "user-3",
    createdAt: "2025-07-05T12:00:00.000Z",
  },
  {
    id: "follow-4",
    followerId: "user-3",
    followingId: "user-1",
    createdAt: "2025-07-06T14:00:00.000Z",
  },

  // Sophie -> Les Ecuries (one-way)
  {
    id: "follow-5",
    followerId: "user-1",
    followingId: "user-6",
    createdAt: "2026-03-28T19:00:00.000Z",
  },

  // Karim -> Musee Tactile (one-way)
  {
    id: "follow-6",
    followerId: "user-2",
    followingId: "user-7",
    createdAt: "2026-02-15T10:00:00.000Z",
  },

  // Claire <-> Thomas (mutual)
  {
    id: "follow-7",
    followerId: "user-3",
    followingId: "user-4",
    createdAt: "2025-09-20T16:00:00.000Z",
  },
  {
    id: "follow-8",
    followerId: "user-4",
    followingId: "user-3",
    createdAt: "2025-09-21T08:00:00.000Z",
  },

  // Thomas -> AquaAdapt (one-way)
  {
    id: "follow-9",
    followerId: "user-4",
    followingId: "user-8",
    createdAt: "2026-03-12T11:00:00.000Z",
  },

  // Amina -> Sophie (one-way)
  {
    id: "follow-10",
    followerId: "user-5",
    followingId: "user-1",
    createdAt: "2025-10-01T07:30:00.000Z",
  },

  // Amina <-> Le Jardin Sensoriel (mutual)
  {
    id: "follow-11",
    followerId: "user-5",
    followingId: "user-9",
    createdAt: "2026-01-10T13:00:00.000Z",
  },
  {
    id: "follow-12",
    followerId: "user-9",
    followingId: "user-5",
    createdAt: "2026-01-11T09:00:00.000Z",
  },

  // Les Ecuries -> AquaAdapt (one-way)
  {
    id: "follow-13",
    followerId: "user-6",
    followingId: "user-8",
    createdAt: "2025-11-15T15:00:00.000Z",
  },

  // TechKids -> Amina (one-way)
  {
    id: "follow-14",
    followerId: "user-10",
    followingId: "user-5",
    createdAt: "2026-02-10T10:00:00.000Z",
  },
];
