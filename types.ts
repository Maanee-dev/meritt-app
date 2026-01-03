
export type TabType = 'dashboard' | 'marketplace' | 'pipeline' | 'messages' | 'wallet' | 'settings';
export type UserRole = 'freelancer' | 'business' | 'user';
export type PipelineType = 'hiring' | 'projects';

export interface User {
  id: string;
  name: string;
  role: UserRole;
  plan: string;
  gstNumber?: string;
  tinNumber?: string;
}

export interface Metric {
  label: string;
  value: string;
  change: string;
  isPositive: boolean;
}

export interface JobPost {
  id: string;
  title: string;
  client: string;
  category: string;
  price: string;
  verified: boolean;
  type: 'job' | 'talent';
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

export interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  isMe: boolean;
}

export interface Contact {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  unread?: number;
}
