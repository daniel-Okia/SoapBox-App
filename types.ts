
export enum Page {
  HOME = 'home',
  CONNECT = 'connect',
  WORSHIP = 'worship',
  SERVE = 'serve',
  GIVE = 'give',
  STUDIO = 'studio',
  SOUL = 'soul',
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
