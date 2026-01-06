
export type TabType = 'dashboard' | 'marketplace' | 'pipeline' | 'messages' | 'wallet' | 'settings';
export type UserRole = 'freelancer' | 'business' | 'user';
export type PipelineType = 'hiring' | 'projects';

export interface User {
  id: string;
  name: string;
  role: UserRole;
  plan: string;
  referralCode?: string;
  referralCount?: number;
  gstNumber?: string;
  tinNumber?: string;
  // Sovereign Identity Fields
  isVerified: boolean;
  isHuman: boolean; // Proof of Human Status
  verificationTier: 'unverified' | 'standard' | 'biometric';
  merittId: string; // Unique Node ID
}

export interface ServiceTier {
  price: string;
  delivery: string;
  revisions: string;
  description: string;
}

export interface ServicePost {
  id: string;
  title: string;
  freelancer: string;
  category: string;
  description: string;
  tiers: {
    basic: ServiceTier;
    standard?: ServiceTier;
    premium?: ServiceTier;
  };
  skills: string[];
  rating: number;
}

export interface JobPost {
  id: string;
  title: string;
  client: string;
  category: string;
  price: string;
  description: string;
  verified: boolean;
  posted: string;
  skills: string[];
}

export interface Metric {
  label: string;
  value: string;
  change: string;
  isPositive: boolean;
}

export interface PipelineColumn {
  id: string;
  title: string;
  cards: PipelineCard[];
}

export interface PipelineCard {
  id: string;
  title: string;
  client: string;
  value: string;
  status?: string;
}

export interface Contact {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  unread?: number;
}

export interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  isMe: boolean;
}
