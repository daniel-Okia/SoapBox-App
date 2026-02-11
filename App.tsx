
import React, { useState } from 'react';
import { Page } from './types';
import Home from './pages/Home';
import Connect from './pages/Connect';
import Worship from './pages/Worship';
import Serve from './pages/Serve';
import Give from './pages/Give';
import Studio from './pages/Studio';
import Soul from './pages/Soul';
import Insights from './pages/Insights';

// ── Menu Navigation Config ─────────────────────────────────────────────────

const MENU_GROUPS = [
  {
    label: 'CONNECT',
    items: [
      { label: 'Communities', icon: 'groups', page: Page.CONNECT },
      { label: 'Forums', icon: 'forum', page: Page.CONNECT },
      { label: 'Contacts', icon: 'person_add', page: Page.CONNECT },
      { label: 'Messages', icon: 'mail', page: Page.CONNECT },
      { label: 'Events', icon: 'event', page: Page.CONNECT },
      { label: 'Engagement Board', icon: 'emoji_events', page: Page.CONNECT },
    ],
  },
  {
    label: 'WORSHIP',
    items: [
      { label: 'Bible Reading', icon: 'menu_book', page: Page.WORSHIP },
      { label: 'S.O.A.P. Journal', icon: 'edit_note', page: Page.WORSHIP },
      { label: 'Prayer Wall', icon: 'volunteer_activism', page: Page.WORSHIP },
      { label: 'Spiritual Audio', icon: 'headphones', page: Page.WORSHIP },
      { label: 'Saved', icon: 'bookmark', page: Page.WORSHIP },
    ],
  },
  {
    label: 'SERVE',
    items: [
      { label: 'Serve Hub (D.I.V.I.N.E.)', icon: 'auto_awesome', page: Page.SERVE },
      { label: 'Opportunities', icon: 'how_to_reg', page: Page.SERVE },
      { label: 'My Applications', icon: 'description', page: Page.SERVE },
    ],
  },
  {
    label: 'GIVE',
    items: [
      { label: 'Donate', icon: 'favorite', page: Page.GIVE },
      { label: 'My Giving', icon: 'credit_card', page: Page.GIVE },
      { label: 'Giving History', icon: 'attach_money', page: Page.GIVE },
    ],
  },
  {
    label: 'CREATE',
    items: [
      { label: 'Professional Studio', icon: 'movie', page: Page.STUDIO },
      { label: 'Media Management', icon: 'folder_open', page: Page.STUDIO },
    ],
  },
  {
    label: 'ACCOUNT',
    items: [
      { label: 'Profile', icon: 'person', page: Page.PROFILE },
      { label: 'Candles', icon: 'local_fire_department', page: Page.PROFILE },
      { label: 'Settings', icon: 'settings', page: Page.PROFILE },
    ],
  },
];

const PAGE_TITLES: Record<Page, string> = {
  [Page.HOME]: 'SoapBox',
  [Page.CONNECT]: 'Connect',
  [Page.WORSHIP]: 'Worship',
  [Page.SERVE]: 'Serve',
  [Page.GIVE]: 'Give',
  [Page.STUDIO]: 'Studio',
  [Page.PROFILE]: 'Profile',
  [Page.INSIGHTS]: 'Insights',
};

// ── App Component ──────────────────────────────────────────────────────────

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.HOME);
  const [menuOpen, setMenuOpen] = useState(false);
  const [expandedGroup, setExpandedGroup] = useState<string | null>(null);
  const [showComposer, setShowComposer] = useState(false);

  const navigateTo = (page: Page) => {
    setCurrentPage(page);
    setMenuOpen(false);
  };

  const toggleGroup = (label: string) => {
    setExpandedGroup(prev => prev === label ? null : label);
  };

  const renderPage = () => {
    switch (currentPage) {
      case Page.HOME: return <Home />;
      case Page.CONNECT: return <Connect />;
      case Page.WORSHIP: return <Worship />;
      case Page.SERVE: return <Serve />;
      case Page.GIVE: return <Give />;
      case Page.STUDIO: return <Studio />;
      case Page.PROFILE: return <Soul />;
      case Page.INSIGHTS: return <Insights />;
      default: return <Home />;
    }
  };

  return (
    <div className="max-w-[430px] mx-auto h-dvh relative bg-background-light dark:bg-background-dark border-x border-white/5 overflow-hidden shadow-2xl flex flex-col">
      {/* Global Header */}
      <header className="px-4 py-2.5 flex items-center justify-between bg-background-dark/80 backdrop-blur-md z-40 border-b border-white/5 shrink-0">
        <button onClick={() => setMenuOpen(true)} className="p-1.5 -ml-1">
          <span className="material-icons-round text-slate-300">menu</span>
        </button>
        <span className="text-base font-bold tracking-tight">{PAGE_TITLES[currentPage]}</span>
        <div className="flex items-center gap-1">
          <button className="p-1.5">
            <span className="material-icons-round text-slate-300">search</span>
          </button>
          <button className="p-1.5 -mr-1 relative">
            <span className="material-icons-round text-slate-300">notifications</span>
            <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto hide-scrollbar relative">
        {renderPage()}

        {/* FAB — only on Home, inside the scrollable area */}
        {currentPage === Page.HOME && !showComposer && (
          <button
            onClick={() => setShowComposer(true)}
            className="sticky bottom-4 float-right mr-4 w-14 h-14 bg-primary/80 backdrop-blur-md shadow-lg shadow-primary/15 rounded-full flex items-center justify-center text-white z-40 active:scale-90 transition-all hover:bg-primary/90"
          >
            <span className="material-icons-round text-2xl">add</span>
          </button>
        )}
      </div>

      {/* Bottom Tab Bar Navigation */}
      <nav className="shrink-0 h-20 bg-background-dark border-t border-white/5 px-6 flex justify-between items-center z-50 relative">
        <TabButton icon="home" label="Home" isActive={currentPage === Page.HOME} onClick={() => setCurrentPage(Page.HOME)} />
        <TabButton icon="groups" label="Connect" isActive={currentPage === Page.CONNECT} onClick={() => setCurrentPage(Page.CONNECT)} />
        <TabButton icon="auto_awesome" label="Worship" isActive={currentPage === Page.WORSHIP} onClick={() => setCurrentPage(Page.WORSHIP)} />
        <TabButton icon="volunteer_activism" label="Serve" isActive={currentPage === Page.SERVE} onClick={() => setCurrentPage(Page.SERVE)} />
        <TabButton icon="person" label="Profile" isActive={currentPage === Page.PROFILE} onClick={() => setCurrentPage(Page.PROFILE)} />
        {/* Home Indicator */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1.5 bg-slate-500/20 rounded-full"></div>
      </nav>

      {/* ── Menu Drawer Overlay ── */}
      {menuOpen && (
        <div className="absolute inset-0 z-[80] flex">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60" onClick={() => setMenuOpen(false)} />
          {/* Drawer */}
          <div className="relative w-[85%] max-w-[360px] h-full bg-background-dark border-r border-white/5 overflow-y-auto animate-slide-in hide-scrollbar">
            {/* Drawer Header */}
            <div className="px-5 pt-6 pb-4 border-b border-white/5">
              <div className="flex items-center gap-3">
                <img className="w-12 h-12 rounded-full object-cover border-2 border-primary/30" src="https://picsum.photos/id/64/100/100" alt="Profile" />
                <div>
                  <p className="font-bold text-sm">Daniel Okia</p>
                  <p className="text-xs text-slate-500">Peace Seeker</p>
                </div>
              </div>
            </div>

            {/* Home */}
            <button
              onClick={() => navigateTo(Page.HOME)}
              className={`w-full flex items-center gap-3 px-5 py-3.5 text-left transition-colors ${currentPage === Page.HOME ? 'bg-primary/10 text-primary' : 'text-slate-300 active:bg-white/5'}`}
            >
              <span className="material-icons-round text-xl">home</span>
              <span className="text-sm font-semibold">Home</span>
            </button>

            {/* Navigation Groups */}
            {MENU_GROUPS.map(group => (
              <div key={group.label} className="border-t border-white/5">
                <button
                  onClick={() => toggleGroup(group.label)}
                  className="w-full flex items-center justify-between px-5 py-3 active:bg-white/5"
                >
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{group.label}</span>
                  <span className="material-icons-round text-slate-600 text-lg">
                    {expandedGroup === group.label ? 'expand_less' : 'expand_more'}
                  </span>
                </button>
                {expandedGroup === group.label && (
                  <div className="pb-2 animate-fade-in">
                    {group.items.map(item => (
                      <button
                        key={item.label}
                        onClick={() => navigateTo(item.page)}
                        className="w-full flex items-center gap-3 px-5 py-2.5 text-left text-slate-400 active:bg-white/5 transition-colors"
                      >
                        <span className="material-icons-round text-lg">{item.icon}</span>
                        <span className="text-sm">{item.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Bottom spacer */}
            <div className="h-8" />
          </div>
        </div>
      )}

      {/* ── FAB Composer Modal ── */}
      {showComposer && (
        <FabComposer onClose={() => setShowComposer(false)} />
      )}
    </div>
  );
};

// ── FAB Composer ───────────────────────────────────────────────────────────

const POST_TYPE_OPTIONS = [
  { value: 'general', label: 'Community Post', icon: 'chat_bubble' },
  { value: 'discussion', label: 'Discussion', icon: 'forum' },
  { value: 'prayer', label: 'Prayer', icon: 'volunteer_activism' },
  { value: 'announcement', label: 'Announcement', icon: 'campaign' },
  { value: 'soap', label: 'S.O.A.P.', icon: 'menu_book' },
  { value: 'event', label: 'Event Update', icon: 'event' },
];

const FabComposer: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [postType, setPostType] = useState('general');
  const [content, setContent] = useState('');

  const handleShare = () => {
    if (!content.trim()) return;
    // In a real app this would dispatch to feed state
    onClose();
  };

  return (
    <div className="absolute inset-0 z-[60] flex items-end justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* Bottom Sheet */}
      <div className="relative w-full bg-surface-dark rounded-t-2xl border-t border-white/10 shadow-2xl animate-slide-up max-h-[75%] flex flex-col">
        {/* Drag handle */}
        <div className="flex justify-center pt-3 pb-1 shrink-0">
          <div className="w-10 h-1 bg-slate-600 rounded-full"></div>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-4 pb-3 border-b border-white/5 shrink-0">
          <button onClick={onClose}>
            <span className="material-icons-round text-slate-400">close</span>
          </button>
          <span className="font-bold text-sm">Create Post</span>
          <button
            onClick={handleShare}
            disabled={!content.trim()}
            className="bg-primary text-white px-4 py-1.5 rounded-full text-xs font-bold disabled:opacity-40 active:scale-95 transition-transform"
          >
            Share
          </button>
        </div>

        {/* Post type pills */}
        <div className="flex gap-2 px-4 py-2.5 overflow-x-auto hide-scrollbar border-b border-white/5 shrink-0">
          {POST_TYPE_OPTIONS.map(opt => (
            <button
              key={opt.value}
              onClick={() => setPostType(opt.value)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                postType === opt.value
                  ? 'bg-primary/15 text-primary border border-primary/20'
                  : 'bg-white/5 text-slate-500 border border-transparent'
              }`}
            >
              <span className="material-icons-round" style={{ fontSize: '14px' }}>{opt.icon}</span>
              {opt.label}
            </button>
          ))}
        </div>

        {/* Author row */}
        <div className="flex items-center gap-3 px-4 py-2.5 shrink-0">
          <img className="w-9 h-9 rounded-full object-cover" src="https://picsum.photos/id/64/100/100" alt="" />
          <div>
            <span className="font-semibold text-sm">Daniel Okia</span>
            <span className="text-[10px] text-slate-500 block">Posting publicly</span>
          </div>
        </div>

        {/* Content */}
        <textarea
          value={content}
          onChange={e => setContent(e.target.value)}
          placeholder="Share your thoughts, prayers, or reflections..."
          className="flex-1 min-h-[120px] px-4 py-2 bg-transparent text-slate-100 placeholder:text-slate-600 resize-none focus:outline-none text-[15px] leading-relaxed"
          autoFocus
        />

        {/* Bottom toolbar */}
        <div className="flex items-center gap-4 px-4 py-3 border-t border-white/5 shrink-0">
          <button className="text-slate-500"><span className="material-icons-round text-xl">image</span></button>
          <button className="text-slate-500"><span className="material-icons-round text-xl">mood</span></button>
          <button className="text-slate-500"><span className="material-icons-round text-xl">tag</span></button>
          <button className="text-slate-500"><span className="material-icons-round text-xl">location_on</span></button>
        </div>
      </div>
    </div>
  );
};

// ── Tab Button ─────────────────────────────────────────────────────────────

interface TabButtonProps {
  icon: string;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const TabButton: React.FC<TabButtonProps> = ({ icon, label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`flex flex-col items-center gap-1 transition-colors ${isActive ? 'text-primary' : 'text-slate-400'}`}
  >
    <span className="material-icons-round">{icon}</span>
    <span className="text-[10px] font-bold uppercase tracking-tight">{label}</span>
  </button>
);

export default App;
