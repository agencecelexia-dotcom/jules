"use client";

import React, { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import type { UserWithProfile, Post, Comment, Like, Follow, Booking, Message, Review, Activity, Conversation } from "@/lib/types";
import { mockUsers } from "@/lib/mock-data/users";
import { mockPosts, mockComments, mockLikes } from "@/lib/mock-data/posts";
import { mockFollows } from "@/lib/mock-data/follows";
import { mockBookings } from "@/lib/mock-data/bookings";
import { mockConversations, mockMessages } from "@/lib/mock-data/conversations";
import { mockReviews } from "@/lib/mock-data/reviews";
import { mockActivities } from "@/lib/mock-data/activities";
import { generateId } from "@/lib/utils";

interface AppState {
  currentUser: UserWithProfile;
  users: UserWithProfile[];
  posts: Post[];
  comments: Comment[];
  likes: Like[];
  follows: Follow[];
  bookings: Booking[];
  conversations: Conversation[];
  messages: Message[];
  reviews: Review[];
  activities: Activity[];
}

interface AppActions {
  switchUser: (userId: string) => void;
  addPost: (post: Omit<Post, "id" | "createdAt" | "likesCount" | "commentsCount">) => void;
  toggleLike: (postId: string) => void;
  addComment: (postId: string, content: string) => void;
  toggleFollow: (targetUserId: string) => void;
  createBooking: (booking: Omit<Booking, "id" | "createdAt" | "status">) => void;
  cancelBooking: (bookingId: string) => void;
  sendMessage: (conversationId: string, content: string) => void;
  getOrCreateConversation: (otherUserId: string) => string;
  addReview: (review: Omit<Review, "id" | "createdAt">) => void;
  replyToReview: (reviewId: string, reply: string) => void;
  addActivity: (activity: Omit<Activity, "id">) => void;
  updateActivity: (activityId: string, updates: Partial<Activity>) => void;
  deleteActivity: (activityId: string) => void;
  isFollowing: (targetUserId: string) => boolean;
  isSubscribedTo: (businessId: string) => boolean;
  canMessage: (otherUserId: string) => boolean;
  isMutualFollow: (otherUserId: string) => boolean;
  hasLiked: (postId: string) => boolean;
  getUser: (userId: string) => UserWithProfile | undefined;
  getPostComments: (postId: string) => Comment[];
  getPostLikesCount: (postId: string) => number;
  getUserPosts: (userId: string) => Post[];
  getBusinessReviews: (businessId: string) => Review[];
  getBusinessActivities: (businessId: string) => Activity[];
  getUserBookings: () => Booking[];
  getBusinessBookings: () => Booking[];
  getFollowerCount: (userId: string) => number;
  getFollowingCount: (userId: string) => number;
}

type AppContextType = AppState & AppActions;

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<UserWithProfile>(mockUsers[0]);
  const [posts, setPosts] = useState<Post[]>(mockPosts);
  const [comments, setComments] = useState<Comment[]>(mockComments);
  const [likes, setLikes] = useState<Like[]>(mockLikes);
  const [follows, setFollows] = useState<Follow[]>(mockFollows);
  const [bookings, setBookings] = useState<Booking[]>(mockBookings);
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations);
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [reviews, setReviews] = useState<Review[]>(mockReviews);
  const [activities, setActivities] = useState<Activity[]>(mockActivities);

  const switchUser = useCallback((userId: string) => {
    const user = mockUsers.find((u) => u.id === userId);
    if (user) setCurrentUser(user);
  }, []);

  const addPost = useCallback(
    (post: Omit<Post, "id" | "createdAt" | "likesCount" | "commentsCount">) => {
      const newPost: Post = {
        ...post,
        id: `post-${generateId()}`,
        createdAt: new Date().toISOString(),
        likesCount: 0,
        commentsCount: 0,
      };
      setPosts((prev) => [newPost, ...prev]);
    },
    []
  );

  const toggleLike = useCallback(
    (postId: string) => {
      const existing = likes.find(
        (l) => l.postId === postId && l.userId === currentUser.id
      );
      if (existing) {
        setLikes((prev) => prev.filter((l) => l.id !== existing.id));
        setPosts((prev) =>
          prev.map((p) =>
            p.id === postId ? { ...p, likesCount: Math.max(0, p.likesCount - 1) } : p
          )
        );
      } else {
        setLikes((prev) => [
          ...prev,
          { id: `like-${generateId()}`, postId, userId: currentUser.id },
        ]);
        setPosts((prev) =>
          prev.map((p) =>
            p.id === postId ? { ...p, likesCount: p.likesCount + 1 } : p
          )
        );
      }
    },
    [likes, currentUser.id]
  );

  const addComment = useCallback(
    (postId: string, content: string) => {
      const newComment: Comment = {
        id: `comment-${generateId()}`,
        postId,
        authorId: currentUser.id,
        content,
        createdAt: new Date().toISOString(),
      };
      setComments((prev) => [...prev, newComment]);
      setPosts((prev) =>
        prev.map((p) =>
          p.id === postId ? { ...p, commentsCount: p.commentsCount + 1 } : p
        )
      );
    },
    [currentUser.id]
  );

  const toggleFollow = useCallback(
    (targetUserId: string) => {
      // Prevent BUSINESS from following other BUSINESS users
      const targetUser = mockUsers.find((u) => u.id === targetUserId);
      if (currentUser.role === "BUSINESS" && targetUser?.role === "BUSINESS") {
        return;
      }

      const existing = follows.find(
        (f) => f.followerId === currentUser.id && f.followingId === targetUserId
      );
      if (existing) {
        setFollows((prev) => prev.filter((f) => f.id !== existing.id));
      } else {
        setFollows((prev) => [
          ...prev,
          {
            id: `follow-${generateId()}`,
            followerId: currentUser.id,
            followingId: targetUserId,
            createdAt: new Date().toISOString(),
          },
        ]);
      }
    },
    [follows, currentUser.id]
  );

  const createBooking = useCallback(
    (booking: Omit<Booking, "id" | "createdAt" | "status">) => {
      const newBooking: Booking = {
        ...booking,
        id: `booking-${generateId()}`,
        status: "CONFIRMED",
        createdAt: new Date().toISOString(),
      };
      setBookings((prev) => [newBooking, ...prev]);
    },
    []
  );

  const cancelBooking = useCallback((bookingId: string) => {
    setBookings((prev) =>
      prev.map((b) =>
        b.id === bookingId ? { ...b, status: "CANCELLED" as const } : b
      )
    );
  }, []);

  const sendMessage = useCallback(
    (conversationId: string, content: string) => {
      const newMessage: Message = {
        id: `msg-${generateId()}`,
        conversationId,
        senderId: currentUser.id,
        content,
        createdAt: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, newMessage]);
    },
    [currentUser.id]
  );

  const getOrCreateConversation = useCallback(
    (otherUserId: string): string => {
      // Check if conversation already exists (check both participant orders)
      const existing = conversations.find(
        (c) =>
          (c.participant1Id === currentUser.id && c.participant2Id === otherUserId) ||
          (c.participant1Id === otherUserId && c.participant2Id === currentUser.id)
      );
      if (existing) return existing.id;

      // Create a new conversation
      const newConversation: Conversation = {
        id: `conv-${generateId()}`,
        participant1Id: currentUser.id,
        participant2Id: otherUserId,
        lastMessageAt: new Date().toISOString(),
      };
      setConversations((prev) => [newConversation, ...prev]);
      return newConversation.id;
    },
    [conversations, currentUser.id]
  );

  const addReview = useCallback(
    (review: Omit<Review, "id" | "createdAt">) => {
      const newReview: Review = {
        ...review,
        id: `review-${generateId()}`,
        createdAt: new Date().toISOString(),
      };
      setReviews((prev) => [newReview, ...prev]);
    },
    []
  );

  const replyToReview = useCallback(
    (reviewId: string, reply: string) => {
      setReviews((prev) =>
        prev.map((r) =>
          r.id === reviewId
            ? { ...r, businessReply: reply, businessReplyDate: new Date().toISOString() }
            : r
        )
      );
    },
    []
  );

  const addActivity = useCallback((activity: Omit<Activity, "id">) => {
    const newActivity: Activity = {
      ...activity,
      id: `activity-${generateId()}`,
    };
    setActivities((prev) => [...prev, newActivity]);
  }, []);

  const updateActivity = useCallback(
    (activityId: string, updates: Partial<Activity>) => {
      setActivities((prev) =>
        prev.map((a) => (a.id === activityId ? { ...a, ...updates } : a))
      );
    },
    []
  );

  const deleteActivity = useCallback((activityId: string) => {
    setActivities((prev) =>
      prev.map((a) => (a.id === activityId ? { ...a, isActive: false } : a))
    );
  }, []);

  const isFollowing = useCallback(
    (targetUserId: string) =>
      follows.some(
        (f) => f.followerId === currentUser.id && f.followingId === targetUserId
      ),
    [follows, currentUser.id]
  );

  const isSubscribedTo = useCallback(
    (businessId: string) =>
      follows.some(
        (f) => f.followerId === currentUser.id && f.followingId === businessId
      ),
    [follows, currentUser.id]
  );

  const canMessage = useCallback(
    (otherUserId: string) => {
      const otherUser = mockUsers.find((u) => u.id === otherUserId);
      if (!otherUser) return false;

      // Both are FAMILY: mutual follow required
      if (currentUser.role === "FAMILY" && otherUser.role === "FAMILY") {
        return (
          follows.some(
            (f) => f.followerId === currentUser.id && f.followingId === otherUserId
          ) &&
          follows.some(
            (f) => f.followerId === otherUserId && f.followingId === currentUser.id
          )
        );
      }

      // Current is FAMILY, other is BUSINESS: family must be subscribed to business
      if (currentUser.role === "FAMILY" && otherUser.role === "BUSINESS") {
        return follows.some(
          (f) => f.followerId === currentUser.id && f.followingId === otherUserId
        );
      }

      // Current is BUSINESS, other is FAMILY: family must be subscribed to current business
      if (currentUser.role === "BUSINESS" && otherUser.role === "FAMILY") {
        return follows.some(
          (f) => f.followerId === otherUserId && f.followingId === currentUser.id
        );
      }

      // BUSINESS→BUSINESS: cannot message
      return false;
    },
    [follows, currentUser.id, currentUser.role]
  );

  const isMutualFollow = useCallback(
    (otherUserId: string) => {
      const otherUser = mockUsers.find((u) => u.id === otherUserId);

      // For family→business subscription: one-way is enough for messaging
      if (currentUser.role === "FAMILY" && otherUser?.role === "BUSINESS") {
        return follows.some(
          (f) => f.followerId === currentUser.id && f.followingId === otherUserId
        );
      }

      // For business→family: check if family is subscribed to business
      if (currentUser.role === "BUSINESS" && otherUser?.role === "FAMILY") {
        return follows.some(
          (f) => f.followerId === otherUserId && f.followingId === currentUser.id
        );
      }

      // Family→Family: true mutual follow
      return (
        follows.some(
          (f) => f.followerId === currentUser.id && f.followingId === otherUserId
        ) &&
        follows.some(
          (f) => f.followerId === otherUserId && f.followingId === currentUser.id
        )
      );
    },
    [follows, currentUser.id, currentUser.role]
  );

  const hasLiked = useCallback(
    (postId: string) =>
      likes.some((l) => l.postId === postId && l.userId === currentUser.id),
    [likes, currentUser.id]
  );

  const getUser = useCallback(
    (userId: string) => mockUsers.find((u) => u.id === userId),
    []
  );

  const getPostComments = useCallback(
    (postId: string) =>
      comments
        .filter((c) => c.postId === postId)
        .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()),
    [comments]
  );

  const getPostLikesCount = useCallback(
    (postId: string) => likes.filter((l) => l.postId === postId).length,
    [likes]
  );

  const getUserPosts = useCallback(
    (userId: string) =>
      posts
        .filter((p) => p.authorId === userId)
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),
    [posts]
  );

  const getBusinessReviews = useCallback(
    (businessId: string) =>
      reviews
        .filter((r) => r.businessId === businessId)
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),
    [reviews]
  );

  const getBusinessActivities = useCallback(
    (businessId: string) => activities.filter((a) => a.businessId === businessId && a.isActive),
    [activities]
  );

  const getUserBookings = useCallback(
    () =>
      bookings
        .filter((b) => b.userId === currentUser.id)
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),
    [bookings, currentUser.id]
  );

  const getBusinessBookings = useCallback(() => {
    const businessProfile = currentUser.businessProfile;
    if (!businessProfile) return [];
    const businessActivityIds = activities
      .filter((a) => a.businessId === currentUser.id)
      .map((a) => a.id);
    return bookings
      .filter((b) => businessActivityIds.includes(b.activityId))
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [bookings, activities, currentUser]);

  const getFollowerCount = useCallback(
    (userId: string) => follows.filter((f) => f.followingId === userId).length,
    [follows]
  );

  const getFollowingCount = useCallback(
    (userId: string) => follows.filter((f) => f.followerId === userId).length,
    [follows]
  );

  const value: AppContextType = {
    currentUser,
    users: mockUsers,
    posts,
    comments,
    likes,
    follows,
    bookings,
    conversations,
    messages,
    reviews,
    activities,
    switchUser,
    addPost,
    toggleLike,
    addComment,
    toggleFollow,
    createBooking,
    cancelBooking,
    sendMessage,
    getOrCreateConversation,
    addReview,
    replyToReview,
    addActivity,
    updateActivity,
    deleteActivity,
    isFollowing,
    isSubscribedTo,
    canMessage,
    isMutualFollow,
    hasLiked,
    getUser,
    getPostComments,
    getPostLikesCount,
    getUserPosts,
    getBusinessReviews,
    getBusinessActivities,
    getUserBookings,
    getBusinessBookings,
    getFollowerCount,
    getFollowingCount,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
