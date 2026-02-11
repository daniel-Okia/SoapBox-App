
import React, { useState } from 'react';
import { getSpiritualReflection } from '../services/geminiService';
import type { TrendingItem, LeaderboardEntry, EnhancedPost, PostType, MoodOption } from '../types';

// ── Mock Data ──────────────────────────────────────────────────────────────

const MOOD_OPTIONS: MoodOption[] = [
  { id: 1, emoji: '🙏', name: 'Grateful' },
  { id: 2, emoji: '☮️', name: 'Peaceful' },
  { id: 3, emoji: '😊', name: 'Joyful' },
  { id: 4, emoji: '🌟', name: 'Hopeful' },
  { id: 5, emoji: '💭', name: 'Reflective' },
  { id: 6, emoji: '🔍', name: 'Seeking' },
];

const CHECKIN_TYPES = [
  { value: 'Devotional', icon: 'wb_sunny' },
  { value: 'Prayer', icon: 'volunteer_activism' },
  { value: 'Service', icon: 'groups' },
  { value: 'Check-In', icon: 'favorite' },
];

const MOCK_TRENDING: TrendingItem[] = [
  {
    id: 1,
    title: 'What does surrender really look like in 2026?',
    content: "I've been wrestling with this question all week...",
    author: 'Pastor John',
    type: 'discussion',
    engagement: { likes: 89, comments: 34, shares: 12, trendingScore: 156 },
    timeAgo: '2h',
  },
  {
    id: 2,
    title: 'Prayer for our city — join us Thursday',
    content: 'Calling all prayer warriors to come together...',
    author: 'City Church',
    type: 'prayer',
    engagement: { likes: 67, comments: 28, shares: 18, trendingScore: 132 },
    timeAgo: '4h',
  },
  {
    id: 3,
    title: 'New worship night series starting next month!',
    content: 'We are so excited to announce our new monthly...',
    author: 'Worship Band',
    type: 'announcement',
    engagement: { likes: 52, comments: 15, shares: 9, trendingScore: 98 },
    timeAgo: '6h',
  },
];

const MOCK_LEADERBOARD: LeaderboardEntry[] = [
  { rank: 1, id: '1', name: 'David Kim', avatar: 'https://picsum.photos/id/91/100/100', score: 2450, title: 'Community Champion' },
  { rank: 2, id: '2', name: 'Rachel Torres', avatar: 'https://picsum.photos/id/92/100/100', score: 2180, title: 'Engagement Leader' },
  { rank: 3, id: '3', name: 'James Wright', avatar: 'https://picsum.photos/id/93/100/100', score: 1920, title: 'Active Contributor' },
];

const INITIAL_POSTS: EnhancedPost[] = [
  {
    id: '1',
    author: 'Main Street Church',
    authorType: 'church',
    time: '2h ago',
    content: 'Join us this Sunday at 10 AM for a special communion service. We\'ll be welcoming our guest speaker, Dr. Sarah Evans.',
    image: 'https://picsum.photos/id/1018/800/600',
    likes: 24,
    comments: 8,
    isVerified: true,
    postType: 'announcement',
    isLiked: false,
    isPraying: false,
    isAmened: false,
    reactions: { like: 24, pray: 5, amen: 12 },
  },
  {
    id: '2',
    author: 'Michael Chen',
    time: '5h ago',
    content: 'Has anyone else been reading through Romans 8 this week? "There is therefore now no condemnation..." Such a powerful reminder of grace!',
    likes: 156,
    comments: 42,
    postType: 'discussion',
    isLiked: false,
    isPraying: false,
    isAmened: false,
    reactions: { like: 156, pray: 22, amen: 68 },
  },
  {
    id: '3',
    author: 'Grace Fellowship',
    authorType: 'church',
    time: '8h ago',
    content: 'Please keep the Johnson family in your prayers as they navigate a difficult season. God is faithful and we stand together in love.',
    likes: 89,
    comments: 31,
    isVerified: true,
    postType: 'prayer',
    isLiked: false,
    isPraying: false,
    isAmened: false,
    reactions: { like: 89, pray: 64, amen: 45 },
  },
  {
    id: '4',
    author: 'Daniel Okia',
    time: '12h ago',
    content: 'S.O.A.P. Journal — Philippians 4:6-7\n\nScripture: "Do not be anxious about anything..."\nObservation: Paul wrote this from prison, yet he had peace.\nApplication: I need to bring my worries to God before trying to solve them myself.\nPrayer: Lord, help me trust You with my anxieties today.',
    likes: 43,
    comments: 12,
    postType: 'soap',
    isLiked: false,
    isPraying: false,
    isAmened: false,
    reactions: { like: 43, pray: 18, amen: 30 },
  },
];

const POST_TYPE_OPTIONS: { value: PostType; label: string; icon: string }[] = [
  { value: 'general', label: 'Community Post', icon: 'chat_bubble' },
  { value: 'discussion', label: 'Discussion', icon: 'forum' },
  { value: 'prayer', label: 'Prayer', icon: 'volunteer_activism' },
  { value: 'announcement', label: 'Announcement', icon: 'campaign' },
  { value: 'soap', label: 'S.O.A.P.', icon: 'menu_book' },
  { value: 'event', label: 'Event Update', icon: 'event' },
];

const TYPE_BADGE: Record<PostType, { icon: string; label: string; color: string }> = {
  prayer: { icon: 'volunteer_activism', label: 'Prayer', color: 'bg-pink-500/15 text-pink-400' },
  discussion: { icon: 'forum', label: 'Discussion', color: 'bg-blue-500/15 text-blue-400' },
  announcement: { icon: 'campaign', label: 'Announcement', color: 'bg-amber-500/15 text-amber-400' },
  event: { icon: 'event', label: 'Event', color: 'bg-green-500/15 text-green-400' },
  soap: { icon: 'menu_book', label: 'S.O.A.P.', color: 'bg-purple-500/15 text-purple-400' },
  general: { icon: '', label: '', color: '' },
};

const RANK_ICON: Record<number, { icon: string; color: string }> = {
  1: { icon: 'workspace_premium', color: '#facc15' },
  2: { icon: 'military_tech', color: '#94a3b8' },
  3: { icon: 'stars', color: '#c2855a' },
};

// ── Main Component ─────────────────────────────────────────────────────────

const Home: React.FC = () => {
  // Sub-tabs
  const [feedTab, setFeedTab] = useState<'foryou' | 'following'>('foryou');

  // Collapsible sections
  const [checkInExpanded, setCheckInExpanded] = useState(false);
  const [trendingExpanded, setTrendingExpanded] = useState(false);
  const [engagementExpanded, setEngagementExpanded] = useState(false);

  // Daily Bread / AI
  const [reflection, setReflection] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Check-in
  const [hasCheckedIn, setHasCheckedIn] = useState(false);
  const [checkInStreak, setCheckInStreak] = useState(7);
  const [selectedCheckInType, setSelectedCheckInType] = useState('Check-In');
  const [selectedMoods, setSelectedMoods] = useState<string[]>([]);
  const [candlesEarned, setCandlesEarned] = useState(0);

  // Feed
  const [posts, setPosts] = useState<EnhancedPost[]>(INITIAL_POSTS);

  // Post composer (inline)
  const [inlineExpanded, setInlineExpanded] = useState(false);
  const [inlinePostType, setInlinePostType] = useState<PostType>('general');
  const [inlineContent, setInlineContent] = useState('');

  // Toasts
  const [toasts, setToasts] = useState<Array<{ id: string; message: string; type: string }>>([]);

  // ── Helpers ──

  const showToast = (message: string, type: string = 'success') => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3000);
  };

  const toggleMood = (emoji: string) => {
    setSelectedMoods(prev =>
      prev.includes(emoji) ? prev.filter(e => e !== emoji) : [...prev, emoji]
    );
  };

  const performCheckIn = () => {
    setHasCheckedIn(true);
    setCandlesEarned(5);
    setCheckInStreak(s => s + 1);
    showToast('Checked in! +5 Candles');
  };

  const handleReflect = async () => {
    setLoading(true);
    const result = await getSpiritualReflection("Psalm 23:1-2: The Lord is my shepherd; I shall not want. He makes me lie down in green pastures.");
    setReflection(result);
    setLoading(false);
  };

  const createPost = (content: string, postType: PostType) => {
    if (!content.trim()) return;
    const newPost: EnhancedPost = {
      id: Date.now().toString(),
      author: 'Daniel Okia',
      time: 'Just now',
      content: content.trim(),
      likes: 0,
      comments: 0,
      postType,
      isLiked: false,
      isPraying: false,
      isAmened: false,
      reactions: { like: 0, pray: 0, amen: 0 },
    };
    setPosts(prev => [newPost, ...prev]);
    showToast('Post shared with your community!');
  };

  const handleInlinePost = () => {
    createPost(inlineContent, inlinePostType);
    setInlineContent('');
    setInlineExpanded(false);
    setInlinePostType('general');
  };

  // ── Render ──

  return (
    <div>
      {/* Toast Container */}
      <div className="absolute top-14 left-1/2 -translate-x-1/2 z-[70] w-full max-w-[400px] px-4 flex flex-col gap-2 pointer-events-none">
        {toasts.map(toast => (
          <div key={toast.id} className="bg-surface-dark border border-white/10 rounded-xl px-4 py-3 flex items-center gap-3 shadow-2xl animate-fade-in pointer-events-auto">
            <span className="material-icons-round text-green-400 text-sm">check_circle</span>
            <span className="text-sm font-medium">{toast.message}</span>
          </div>
        ))}
      </div>

      {/* Sub-tabs: For You / Following */}
      <div className="flex gap-1 px-4 py-2 border-b border-white/5">
        <button
          onClick={() => setFeedTab('foryou')}
          className={`px-4 py-1.5 rounded-full text-sm font-bold transition-all ${
            feedTab === 'foryou' ? 'bg-primary/15 text-primary' : 'text-slate-500'
          }`}
        >
          For You
        </button>
        <button
          onClick={() => setFeedTab('following')}
          className={`px-4 py-1.5 rounded-full text-sm font-bold transition-all ${
            feedTab === 'following' ? 'bg-primary/15 text-primary' : 'text-slate-500'
          }`}
        >
          Following
        </button>
      </div>

      {/* ── Check-In Widget (Collapsible) ── */}
      <section className="border-b border-white/5">
        <button
          onClick={() => setCheckInExpanded(!checkInExpanded)}
          className="w-full flex items-center justify-between px-4 py-3 active:bg-white/5 transition-colors"
        >
          <div className="flex items-center gap-2">
            <span className="material-icons-round text-primary text-sm">check_circle</span>
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Daily Check-In</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 bg-orange-500/10 px-2.5 py-1 rounded-full">
              <span className="material-icons-round text-orange-400 text-sm animate-pulse-soft">local_fire_department</span>
              <span className="text-sm font-bold text-orange-400">{checkInStreak}</span>
            </div>
            {!hasCheckedIn && (
              <span className="bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-full">Check In</span>
            )}
            <span className="material-icons-round text-slate-600 text-lg">
              {checkInExpanded ? 'expand_less' : 'expand_more'}
            </span>
          </div>
        </button>
        {checkInExpanded && (
          <div className="px-4 pb-4 animate-fade-in">
            {hasCheckedIn ? (
              <div className="flex items-center gap-3 p-3 rounded-xl bg-green-500/10 border border-green-500/20">
                <span className="material-icons-round text-green-400">task_alt</span>
                <div>
                  <p className="text-sm font-bold text-green-400">Checked in today!</p>
                  <p className="text-xs text-slate-500">+{candlesEarned} Candles earned</p>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex gap-2 mb-3 overflow-x-auto hide-scrollbar">
                  {MOOD_OPTIONS.map(mood => (
                    <button
                      key={mood.id}
                      onClick={() => toggleMood(mood.emoji)}
                      className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl shrink-0 transition-all active:scale-95 ${
                        selectedMoods.includes(mood.emoji)
                          ? 'bg-primary/15 border border-primary/30'
                          : 'bg-surface-dark border border-transparent'
                      }`}
                    >
                      <span className="text-xl">{mood.emoji}</span>
                      <span className="text-[9px] font-medium text-slate-400">{mood.name}</span>
                    </button>
                  ))}
                </div>
                <div className="flex items-center justify-between gap-2">
                  <div className="flex gap-1.5 overflow-x-auto hide-scrollbar flex-1">
                    {CHECKIN_TYPES.map(type => (
                      <button
                        key={type.value}
                        onClick={() => setSelectedCheckInType(type.value)}
                        className={`flex items-center gap-1 px-2.5 py-1.5 rounded-full text-[11px] font-semibold whitespace-nowrap transition-all active:scale-95 ${
                          selectedCheckInType === type.value
                            ? 'bg-primary/15 text-primary border border-primary/20'
                            : 'bg-surface-dark text-slate-500 border border-transparent'
                        }`}
                      >
                        <span className="material-icons-round" style={{ fontSize: '14px' }}>{type.icon}</span>
                        {type.value}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={performCheckIn}
                    className="bg-primary text-white px-4 py-2 rounded-full text-xs font-bold shrink-0 active:scale-95 transition-transform shadow-lg shadow-primary/20"
                  >
                    Check In
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </section>

      {/* ── Trending Section (Collapsible) ── */}
      <section className="border-b border-white/5">
        <button
          onClick={() => setTrendingExpanded(!trendingExpanded)}
          className="w-full flex items-center justify-between px-4 py-3 active:bg-white/5 transition-colors"
        >
          <div className="flex items-center gap-2">
            <span className="material-icons-round text-blue-400 text-sm">trending_up</span>
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Trending</span>
            <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
          </div>
          <span className="material-icons-round text-slate-600 text-lg">
            {trendingExpanded ? 'expand_less' : 'expand_more'}
          </span>
        </button>
        {trendingExpanded && (
          <div className="px-4 pb-4 animate-fade-in">
            <div className="space-y-2">
              {MOCK_TRENDING.map((item, i) => (
                <div key={item.id} className="flex items-center gap-3 p-2.5 rounded-xl bg-surface-dark/50 active:scale-[0.98] transition-transform cursor-pointer">
                  <span className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold ${
                    i === 0
                      ? 'bg-gradient-to-br from-amber-400 to-orange-500 text-white'
                      : 'bg-white/5 text-slate-500'
                  }`}>
                    {i + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold truncate">{item.title}</p>
                    <div className="flex items-center gap-2 text-[10px] text-slate-500">
                      <span>{item.author}</span>
                      <span className="opacity-40">·</span>
                      <span>{item.timeAgo}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5 text-[10px] text-slate-500 shrink-0">
                    <span className="flex items-center gap-0.5">
                      <span className="material-icons-round text-red-400" style={{ fontSize: '12px' }}>favorite</span>
                      {item.engagement.likes}
                    </span>
                    <span className="flex items-center gap-0.5">
                      <span className="material-icons-round text-blue-400" style={{ fontSize: '12px' }}>chat_bubble</span>
                      {item.engagement.comments}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* ── Engagement / Leaderboard (Collapsible) ── */}
      <section className="border-b border-white/5">
        <button
          onClick={() => setEngagementExpanded(!engagementExpanded)}
          className="w-full flex items-center justify-between px-4 py-3 active:bg-white/5 transition-colors"
        >
          <div className="flex items-center gap-2">
            <span className="material-icons-round text-yellow-400 text-sm">emoji_events</span>
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Top Members</span>
          </div>
          <span className="material-icons-round text-slate-600 text-lg">
            {engagementExpanded ? 'expand_less' : 'expand_more'}
          </span>
        </button>
        {engagementExpanded && (
          <div className="px-4 pb-4 animate-fade-in">
            <div className="rounded-xl overflow-hidden bg-gradient-to-br from-purple-900/20 to-indigo-900/10 border border-purple-500/10 p-4">
              <div className="space-y-3">
                {MOCK_LEADERBOARD.map(user => (
                  <div key={user.id} className="flex items-center gap-3">
                    <span
                      className="material-icons-round text-lg"
                      style={{ color: RANK_ICON[user.rank]?.color }}
                    >
                      {RANK_ICON[user.rank]?.icon}
                    </span>
                    <img className="w-8 h-8 rounded-full object-cover border border-purple-500/20" src={user.avatar} alt="" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold truncate">{user.name}</p>
                      <p className="text-[10px] text-slate-500">{user.title}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-bold text-purple-400">{user.score.toLocaleString()}</span>
                      <p className="text-[9px] text-slate-500">Candles</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </section>

      {/* ── Inline Post Composer ── */}
      <section className="px-4 py-4 border-b border-white/5">
        {!inlineExpanded ? (
          <button
            onClick={() => setInlineExpanded(true)}
            className="w-full flex items-center gap-3 p-3 rounded-xl bg-surface-dark border border-white/5 text-left"
          >
            <div className="w-9 h-9 rounded-full overflow-hidden shrink-0">
              <img className="w-full h-full object-cover" src="https://picsum.photos/id/64/100/100" alt="" />
            </div>
            <span className="text-sm text-slate-500">What's on your mind?</span>
          </button>
        ) : (
          <div className="rounded-xl bg-surface-dark border border-white/5 overflow-hidden animate-fade-in">
            <div className="flex gap-1.5 px-3 py-2.5 overflow-x-auto hide-scrollbar border-b border-white/5">
              {POST_TYPE_OPTIONS.map(opt => (
                <button
                  key={opt.value}
                  onClick={() => setInlinePostType(opt.value)}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold whitespace-nowrap transition-all ${
                    inlinePostType === opt.value
                      ? 'bg-primary/15 text-primary border border-primary/20'
                      : 'bg-white/5 text-slate-500 border border-transparent'
                  }`}
                >
                  <span className="material-icons-round" style={{ fontSize: '13px' }}>{opt.icon}</span>
                  {opt.label}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-3 px-3 pt-3">
              <div className="w-9 h-9 rounded-full overflow-hidden shrink-0">
                <img className="w-full h-full object-cover" src="https://picsum.photos/id/64/100/100" alt="" />
              </div>
              <div>
                <span className="font-semibold text-sm">Daniel Okia</span>
                <span className="text-[10px] text-slate-500 block">Posting publicly</span>
              </div>
            </div>
            <textarea
              value={inlineContent}
              onChange={e => setInlineContent(e.target.value)}
              placeholder="Share your thoughts, prayers, or reflections..."
              className="w-full px-3 py-3 bg-transparent text-slate-100 placeholder:text-slate-600 resize-none focus:outline-none text-[14px] leading-relaxed min-h-[80px]"
              autoFocus
            />
            <div className="flex items-center justify-between px-3 py-2 border-t border-white/5">
              <div className="flex items-center gap-3">
                <button className="text-slate-500"><span className="material-icons-round text-[20px]">image</span></button>
                <button className="text-slate-500"><span className="material-icons-round text-[20px]">mood</span></button>
                <button className="text-slate-500"><span className="material-icons-round text-[20px]">tag</span></button>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => { setInlineExpanded(false); setInlineContent(''); }}
                  className="px-3 py-1.5 rounded-full text-xs font-semibold text-slate-400"
                >
                  Cancel
                </button>
                <button
                  onClick={handleInlinePost}
                  disabled={!inlineContent.trim()}
                  className="bg-primary text-white px-4 py-1.5 rounded-full text-xs font-bold disabled:opacity-40 active:scale-95 transition-transform"
                >
                  Share
                </button>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* ── Daily Bread ── */}
      <section className="px-4 py-6">
        <div className="relative overflow-hidden rounded-xl p-6 bg-primary/5 border border-primary/10 ambient-glow">
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <span className="material-icons-round text-primary text-sm">auto_awesome</span>
              <h3 className="text-xs font-bold uppercase tracking-widest text-primary/80">Daily Bread</h3>
            </div>
            <p className="text-2xl font-extrabold mb-4 leading-tight italic">"The Lord is my shepherd; I shall not want. He makes me lie down in green pastures."</p>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium opacity-70">Psalm 23:1-2</span>
              <button
                onClick={handleReflect}
                disabled={loading}
                className="bg-primary text-white px-4 py-1.5 rounded-full text-xs font-bold active:scale-95 transition-transform disabled:opacity-50"
              >
                {loading ? 'Thinking...' : 'Reflect'}
              </button>
            </div>
            {reflection && (
              <div className="mt-4 p-4 bg-white/5 rounded-lg border border-white/5 animate-fade-in">
                <p className="text-sm text-slate-300 italic">"{reflection}"</p>
              </div>
            )}
          </div>
          <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-primary/5 rounded-full blur-3xl"></div>
        </div>
      </section>

      {/* ── Feed ── */}
      <div className="flex flex-col">
        {posts.map(post => (
          <EnhancedPostItem
            key={post.id}
            post={post}
            onUpdate={(updated) => setPosts(prev => prev.map(p => p.id === updated.id ? updated : p))}
          />
        ))}
      </div>
    </div>
  );
};

// ── Enhanced Post Item ─────────────────────────────────────────────────────

const EnhancedPostItem: React.FC<{
  post: EnhancedPost;
  onUpdate: (post: EnhancedPost) => void;
}> = ({ post, onUpdate }) => {
  const [liked, setLiked] = useState(post.isLiked);
  const [likeCount, setLikeCount] = useState(post.reactions.like);
  const [praying, setPraying] = useState(post.isPraying);
  const [prayCount, setPrayCount] = useState(post.reactions.pray);
  const [amened, setAmened] = useState(post.isAmened);
  const [amenCount, setAmenCount] = useState(post.reactions.amen);

  const toggleLike = () => {
    setLiked(!liked);
    setLikeCount(c => liked ? c - 1 : c + 1);
  };

  const togglePray = () => {
    setPraying(!praying);
    setPrayCount(c => praying ? c - 1 : c + 1);
  };

  const toggleAmen = () => {
    setAmened(!amened);
    setAmenCount(c => amened ? c - 1 : c + 1);
  };

  const badge = TYPE_BADGE[post.postType];

  return (
    <article className="p-4 border-b border-white/5">
      <div className="flex gap-3">
        <div className="shrink-0 w-11 h-11 rounded-lg overflow-hidden bg-surface-dark flex items-center justify-center">
          {post.isVerified ? (
            <span className="material-icons-round text-primary">church</span>
          ) : (
            <img src={`https://picsum.photos/seed/${post.author}/100/100`} className="w-full h-full object-cover" alt="" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2 min-w-0">
              <h4 className="font-bold truncate flex items-center gap-1">
                {post.author}
                {post.isVerified && <span className="material-icons-round text-blue-400 text-sm">verified</span>}
              </h4>
              {badge.label && (
                <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full flex items-center gap-0.5 shrink-0 ${badge.color}`}>
                  <span className="material-icons-round" style={{ fontSize: '10px' }}>{badge.icon}</span>
                  {badge.label}
                </span>
              )}
            </div>
            <span className="text-xs opacity-50 shrink-0 ml-2">{post.time}</span>
          </div>
          <p className="text-[15px] leading-relaxed mb-3 text-slate-300 whitespace-pre-line">{post.content}</p>
          {post.image && (
            <div className="rounded-xl overflow-hidden mb-4 border border-white/5">
              <img className="w-full h-52 object-cover" src={post.image} alt="Post" />
            </div>
          )}
          <div className="flex justify-between items-center px-1">
            <button
              onClick={toggleLike}
              className={`flex items-center gap-1.5 transition-all active:scale-90 ${liked ? 'text-red-400' : 'text-slate-500'}`}
            >
              <span className="material-icons-round text-[20px]">{liked ? 'favorite' : 'favorite_border'}</span>
              <span className="text-xs font-semibold">{likeCount}</span>
            </button>
            <button className="flex items-center gap-1.5 text-slate-500">
              <span className="material-icons-round text-[20px]">chat_bubble_outline</span>
              <span className="text-xs font-semibold">{post.comments}</span>
            </button>
            <button
              onClick={togglePray}
              className={`flex items-center gap-1.5 transition-all active:scale-90 ${praying ? 'text-blue-400' : 'text-slate-500'}`}
            >
              <span className="material-icons-round text-[20px]">back_hand</span>
              <span className="text-xs font-semibold">{prayCount}</span>
            </button>
            <button
              onClick={toggleAmen}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full active:scale-95 transition-all ${
                amened ? 'bg-primary text-white' : 'bg-primary/10 text-primary'
              }`}
            >
              <span className="material-icons-round text-[18px]">volunteer_activism</span>
              <span className="text-xs font-bold uppercase tracking-tight">Amen</span>
              {amenCount > 0 && <span className="text-[10px] font-semibold">{amenCount}</span>}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default Home;
