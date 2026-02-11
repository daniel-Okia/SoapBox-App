
export enum Page {
  HOME = 'home',
  CONNECT = 'connect',
  WORSHIP = 'worship',
  SERVE = 'serve',
  GIVE = 'give',
  STUDIO = 'studio',
  PROFILE = 'profile',
  INSIGHTS = 'insights'
}

export interface Post {
  id: string;
  author: string;
  authorType?: 'church' | 'user' | 'group';
  time: string;
  content: string;
  image?: string;
  videoUrl?: string;
  likes: number;
  comments: number;
  isVerified?: boolean;
}

export interface Community {
  id: string;
  name: string;
  image: string;
  isNew?: boolean;
}

export interface Event {
  id: string;
  name: string;
  date: string;
  time: string;
  location: string;
  category: string;
  image: string;
}

// Check-in system
export type CheckInType = 'Sunday Service' | 'Daily Devotional' | 'Prayer Time' | 'Spiritual Check-In';

export interface MoodOption {
  id: number;
  emoji: string;
  name: string;
}

// Trending
export interface TrendingItem {
  id: number;
  title: string;
  content: string;
  author: string;
  authorAvatar?: string;
  type: 'discussion' | 'prayer' | 'announcement' | 'general';
  engagement: {
    likes: number;
    comments: number;
    shares: number;
    trendingScore: number;
  };
  timeAgo: string;
}

// Leaderboard
export interface LeaderboardEntry {
  rank: number;
  id: string;
  name: string;
  avatar: string;
  score: number;
  title: string;
}

// Post types
export type PostType = 'general' | 'discussion' | 'prayer' | 'announcement' | 'event' | 'soap';

export interface EnhancedPost extends Post {
  postType: PostType;
  isLiked: boolean;
  isPraying: boolean;
  isAmened: boolean;
  reactions: {
    like: number;
    pray: number;
    amen: number;
  };
}
