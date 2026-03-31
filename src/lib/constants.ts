import type { HandicapType, PersonConcerned, PostType, BookingStatus } from "./types";

// --- Handicap labels & colors ---

export const HANDICAP_LABELS: Record<HandicapType, string> = {
  MOTEUR: "Moteur",
  VISUEL: "Visuel",
  AUDITIF: "Auditif",
  MENTAL: "Mental",
  PSYCHIQUE: "Psychique",
  COGNITIF: "Cognitif",
  POLYHANDICAP: "Polyhandicap",
  AUTRE: "Autre",
};

/** Tailwind classes for handicap badges — all pairs pass WCAG AA contrast */
export const HANDICAP_COLORS: Record<HandicapType, string> = {
  MOTEUR: "bg-blue-100 text-blue-800",
  VISUEL: "bg-purple-100 text-purple-800",
  AUDITIF: "bg-amber-100 text-amber-800",
  MENTAL: "bg-green-100 text-green-800",
  PSYCHIQUE: "bg-rose-100 text-rose-800",
  COGNITIF: "bg-cyan-100 text-cyan-800",
  POLYHANDICAP: "bg-orange-100 text-orange-800",
  AUTRE: "bg-gray-100 text-gray-800",
};

// --- Business categories ---

export const BUSINESS_CATEGORIES = [
  { value: "restaurant", label: "Restaurant" },
  { value: "sport", label: "Sport" },
  { value: "culture", label: "Culture" },
  { value: "hebergement", label: "Hébergement" },
  { value: "transport", label: "Transport" },
  { value: "education", label: "Éducation" },
  { value: "loisirs", label: "Loisirs" },
  { value: "sante", label: "Santé" },
] as const;

// --- Person concerned ---

export const PERSON_CONCERNED_LABELS: Record<PersonConcerned, string> = {
  SELF: "Moi-même",
  CHILD: "Mon enfant",
  PARENT: "Mon parent",
  SPOUSE: "Mon conjoint",
  OTHER: "Autre proche",
};

// --- Post types ---

export const POST_TYPE_LABELS: Record<PostType, string> = {
  EXPERIENCE: "Expérience",
  QUESTION: "Question",
  TIP: "Conseil",
  STORY: "Témoignage",
};

// --- Booking status ---

export const BOOKING_STATUS_LABELS: Record<BookingStatus, string> = {
  PENDING: "En attente",
  CONFIRMED: "Confirmée",
  CANCELLED: "Annulée",
  COMPLETED: "Terminée",
};

export const BOOKING_STATUS_COLORS: Record<BookingStatus, string> = {
  PENDING: "bg-yellow-100 text-yellow-800",
  CONFIRMED: "bg-green-100 text-green-800",
  CANCELLED: "bg-red-100 text-red-800",
  COMPLETED: "bg-blue-100 text-blue-800",
};

// --- Activity types (for post activity-type filter) ---

export const ACTIVITY_TYPES = [
  { value: "sport", label: "Sport adapté" },
  { value: "culture", label: "Sortie culturelle" },
  { value: "loisirs", label: "Loisirs" },
  { value: "vacances", label: "Vacances" },
  { value: "education", label: "Éducation" },
  { value: "sante", label: "Santé & bien-être" },
  { value: "administratif", label: "Démarches administratives" },
  { value: "quotidien", label: "Vie quotidienne" },
  { value: "technologie", label: "Aides techniques" },
  { value: "autre", label: "Autre" },
] as const;
