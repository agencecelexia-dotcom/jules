// Enums
export type Role = "FAMILY" | "BUSINESS" | "ADMIN";
export type HandicapType = "MOTEUR" | "VISUEL" | "AUDITIF" | "MENTAL" | "PSYCHIQUE" | "COGNITIF" | "POLYHANDICAP" | "AUTRE";
export type PostType = "EXPERIENCE" | "QUESTION" | "TIP" | "STORY";
export type BookingStatus = "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED";
export type PersonConcerned = "SELF" | "CHILD" | "PARENT" | "SPOUSE" | "OTHER";

// Core models
export interface User {
  id: string;
  email: string;
  name: string;
  avatar: string;
  bio: string;
  role: Role;
  createdAt: string;
}

export interface FamilyProfile {
  id: string;
  userId: string;
  handicapTypes: HandicapType[];
  personConcerned: PersonConcerned;
  city: string;
  department: string;
  region: string;
  childAge?: number;
  familyComposition?: string;
}

export interface BusinessProfile {
  id: string;
  userId: string;
  companyName: string;
  siret: string;
  description: string;
  website?: string;
  address: string;
  city: string;
  department: string;
  handicapTypesSupported: HandicapType[];
  categories: string[];
  photos: string[];
  isVerified: boolean;
  averageRating: number;
  totalReviews: number;
}

export interface Post {
  id: string;
  authorId: string;
  type: PostType;
  content: string;
  media: string[];
  handicapTags: HandicapType[];
  activityType?: string;
  location?: string;
  linkedBusinessId?: string;
  likesCount: number;
  commentsCount: number;
  createdAt: string;
}

export interface Comment {
  id: string;
  postId: string;
  authorId: string;
  content: string;
  createdAt: string;
}

export interface Like {
  id: string;
  postId: string;
  userId: string;
}

export interface Review {
  id: string;
  businessId: string;
  authorId: string;
  rating: number;
  content: string;
  handicapContext: string;
  visitDate?: string;
  createdAt: string;
  businessReply?: string;
  businessReplyDate?: string;
}

export interface Activity {
  id: string;
  businessId: string;
  title: string;
  description: string;
  price: number; // in cents
  duration: string;
  handicapTypesCompatible: HandicapType[];
  maxParticipants: number;
  photos: string[];
  isActive: boolean;
}

export interface Booking {
  id: string;
  activityId: string;
  userId: string;
  date: string;
  participants: number;
  totalPrice: number; // in cents
  status: BookingStatus;
  createdAt: string;
}

export interface Conversation {
  id: string;
  participant1Id: string;
  participant2Id: string;
  lastMessageAt: string;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  readAt?: string;
  createdAt: string;
}

export interface Follow {
  id: string;
  followerId: string;
  followingId: string;
  createdAt: string;
}

// Composite types for UI
export interface UserWithProfile extends User {
  familyProfile?: FamilyProfile;
  businessProfile?: BusinessProfile;
}
