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

/** Tailwind classes for handicap badges — subtle Instagram-hashtag style */
export const HANDICAP_COLORS: Record<HandicapType, string> = {
  MOTEUR: "bg-blue-50 text-blue-500",
  VISUEL: "bg-purple-50 text-purple-500",
  AUDITIF: "bg-amber-50 text-amber-500",
  MENTAL: "bg-emerald-50 text-emerald-500",
  PSYCHIQUE: "bg-rose-50 text-rose-500",
  COGNITIF: "bg-cyan-50 text-cyan-500",
  POLYHANDICAP: "bg-orange-50 text-orange-500",
  AUTRE: "bg-neutral-100 text-neutral-500",
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
  PENDING: "bg-amber-50 text-amber-600",
  CONFIRMED: "bg-emerald-50 text-emerald-600",
  CANCELLED: "bg-red-50 text-red-600",
  COMPLETED: "bg-blue-50 text-blue-600",
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
