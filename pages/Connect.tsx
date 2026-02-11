
import React, { useState } from 'react';

// ── Sub-module tabs ──

type ConnectTab = 'communities' | 'events' | 'forums' | 'messages' | 'people';

const TABS: { key: ConnectTab; label: string; icon: string }[] = [
  { key: 'communities', label: 'Communities', icon: 'groups' },
  { key: 'events', label: 'Events', icon: 'event' },
  { key: 'forums', label: 'Forums', icon: 'forum' },
  { key: 'messages', label: 'Messages', icon: 'mail' },
  { key: 'people', label: 'People', icon: 'person_add' },
];

// ── Mock Data ──

const COMMUNITIES = [
  { name: 'Grace Community Church', img: '1025', active: true, members: 342 },
  { name: 'New Life Fellowship', img: '1026', members: 218 },
  { name: 'Bethel Worship Center', img: '1027', members: 156 },
  { name: 'Cornerstone Youth', img: '1028', members: 89 },
];

const DISCOVER_COMMUNITIES = [
  { name: 'Redeemer Chapel', img: '1033', members: 412, category: 'Church' },
  { name: 'Faith & Family Network', img: '1034', members: 267, category: 'Family' },
  { name: 'Praise Together', img: '1035', members: 189, category: 'Worship' },
];

const EVENTS = [
  { title: 'Young Adults Mixer', date: 'Oct 21', time: '7:00 PM', location: 'The Rooftop Garden', category: 'SOCIAL', img: '1029' },
  { title: 'Sunday Worship Service', date: 'Oct 22', time: '10:00 AM', location: 'Main Sanctuary', category: 'WORSHIP', img: '1030' },
  { title: 'Community Outreach', date: 'Oct 25', time: '9:00 AM', location: 'Downtown Park', category: 'SERVE', img: '1036' },
];

const FORUMS = [
  { title: 'Faith in the Modern Workplace', count: '128 active discussions', icon: 'work_outline', replies: 34 },
  { title: 'Deep Bible Study Tips', count: '45 new posts today', icon: 'menu_book', replies: 22 },
  { title: 'Parenting with Purpose', count: '67 members online', icon: 'family_restroom', replies: 15 },
  { title: 'Worship Music Recommendations', count: '89 threads this week', icon: 'music_note', replies: 41 },
];

const MESSAGES = [
  { name: 'Pastor David', avatar: '91', lastMessage: 'Looking forward to Sunday!', time: '2m ago', unread: 2 },
  { name: 'Grace Community', avatar: '1025', lastMessage: 'Welcome new members! Please...', time: '1h ago', unread: 5, isGroup: true },
  { name: 'Rachel Torres', avatar: '92', lastMessage: 'Thank you for your prayer!', time: '3h ago', unread: 0 },
  { name: 'Youth Leaders', avatar: '1028', lastMessage: 'Meeting moved to Wednesday', time: '5h ago', unread: 1, isGroup: true },
];

const PEOPLE = [
  { name: 'David Kim', avatar: '91', role: 'Community Champion', mutual: 12 },
  { name: 'Rachel Torres', avatar: '92', role: 'Worship Leader', mutual: 8 },
  { name: 'James Wright', avatar: '93', role: 'Youth Pastor', mutual: 5 },
  { name: 'Maria Johnson', avatar: '94', role: 'Small Group Leader', mutual: 3 },
];

// ── Component ──

const Connect: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ConnectTab>('communities');

  return (
    <div className="pb-4">
      {/* Search */}
      <div className="px-4 py-3">
        <div className="relative">
          <span className="material-icons-round absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-xl">search</span>
          <input
            className="w-full pl-10 pr-4 py-2.5 bg-surface-dark border border-white/5 rounded-xl text-sm focus:ring-1 focus:ring-primary/50 focus:outline-none text-slate-100 placeholder:text-slate-600"
            placeholder="Search communities, events, people..."
            type="text"
          />
        </div>
      </div>

      {/* Sub-module tabs */}
      <div className="flex gap-1.5 px-4 pb-3 overflow-x-auto hide-scrollbar">
        {TABS.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === tab.key
                ? 'bg-primary/15 text-primary border border-primary/20'
                : 'bg-surface-dark text-slate-500 border border-transparent'
            }`}
          >
            <span className="material-icons-round" style={{ fontSize: '14px' }}>{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="px-4">
        {activeTab === 'communities' && <CommunitiesTab />}
        {activeTab === 'events' && <EventsTab />}
        {activeTab === 'forums' && <ForumsTab />}
        {activeTab === 'messages' && <MessagesTab />}
        {activeTab === 'people' && <PeopleTab />}
      </div>
    </div>
  );
};

// ── Tab: Communities ──

const CommunitiesTab: React.FC = () => (
  <div className="space-y-6 animate-fade-in">
    {/* My Communities */}
    <section>
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-sm font-bold text-slate-300">My Communities</h2>
        <span className="text-xs text-primary font-semibold">{COMMUNITIES.length} Joined</span>
      </div>
      <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-2">
        {COMMUNITIES.map(com => (
          <div key={com.name} className="flex flex-col items-center gap-2 min-w-[72px]">
            <div className={`w-16 h-16 rounded-full p-1 border-2 ${com.active ? 'border-primary' : 'border-white/10'}`}>
              <img className="w-full h-full rounded-full object-cover" src={`https://picsum.photos/id/${com.img}/100/100`} alt="" />
            </div>
            <span className="text-[10px] font-medium text-center truncate w-16">{com.name}</span>
          </div>
        ))}
        <div className="flex flex-col items-center gap-2 min-w-[72px]">
          <div className="w-16 h-16 rounded-full flex items-center justify-center bg-surface-dark border-2 border-dashed border-white/10">
            <span className="material-icons-round text-slate-500">add</span>
          </div>
          <span className="text-[10px] font-medium text-center">Discover</span>
        </div>
      </div>
    </section>

    {/* Discover Communities */}
    <section>
      <h2 className="text-sm font-bold text-slate-300 mb-3">Discover</h2>
      <div className="space-y-3">
        {DISCOVER_COMMUNITIES.map(com => (
          <div key={com.name} className="flex items-center gap-3 p-3 rounded-xl bg-surface-dark/50 border border-white/5">
            <img className="w-12 h-12 rounded-full object-cover" src={`https://picsum.photos/id/${com.img}/100/100`} alt="" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate">{com.name}</p>
              <p className="text-[11px] text-slate-500">{com.members} members · {com.category}</p>
            </div>
            <button className="bg-primary/10 text-primary px-3 py-1.5 rounded-full text-xs font-bold active:scale-95 transition-transform">
              Join
            </button>
          </div>
        ))}
      </div>
    </section>
  </div>
);

// ── Tab: Events ──

const EventsTab: React.FC = () => (
  <div className="space-y-4 animate-fade-in">
    <div className="flex justify-between items-center">
      <h2 className="text-sm font-bold text-slate-300">Upcoming Events</h2>
      <button className="text-xs text-primary font-semibold flex items-center gap-1">
        Calendar <span className="material-icons-round text-sm">chevron_right</span>
      </button>
    </div>
    {EVENTS.map(event => (
      <div key={event.title} className="bg-surface-dark rounded-xl overflow-hidden border border-white/5">
        <div className="relative h-32">
          <img className="w-full h-full object-cover" src={`https://picsum.photos/id/${event.img}/600/300`} alt="" />
          <div className="absolute top-3 left-3 bg-background-dark/90 backdrop-blur-md rounded-lg px-3 py-1 flex flex-col items-center min-w-[44px]">
            <span className="text-[10px] font-bold text-primary uppercase">{event.date.split(' ')[0]}</span>
            <span className="text-lg font-black leading-tight">{event.date.split(' ')[1]}</span>
          </div>
          <span className="absolute top-3 right-3 bg-primary/20 text-primary text-[10px] px-2 py-0.5 rounded-full font-bold">{event.category}</span>
        </div>
        <div className="p-4">
          <h3 className="font-bold text-base mb-2">{event.title}</h3>
          <div className="flex items-center gap-4 text-xs text-slate-500 mb-3">
            <span className="flex items-center gap-1">
              <span className="material-icons-round text-sm">schedule</span>
              {event.time}
            </span>
            <span className="flex items-center gap-1">
              <span className="material-icons-round text-sm">location_on</span>
              {event.location}
            </span>
          </div>
          <button className="w-full py-2.5 bg-primary text-white font-bold rounded-xl text-sm active:scale-[0.98] transition-transform">
            Register
          </button>
        </div>
      </div>
    ))}
  </div>
);

// ── Tab: Forums ──

const ForumsTab: React.FC = () => (
  <div className="space-y-3 animate-fade-in">
    <div className="flex justify-between items-center">
      <h2 className="text-sm font-bold text-slate-300">Trending Forums</h2>
      <span className="material-icons-round text-slate-500 text-lg">trending_up</span>
    </div>
    {FORUMS.map(forum => (
      <div key={forum.title} className="bg-surface-dark/50 p-4 rounded-xl border border-white/5 flex items-center gap-3 active:scale-[0.98] transition-transform cursor-pointer">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
          <span className="material-icons-round">{forum.icon}</span>
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-bold truncate">{forum.title}</h4>
          <p className="text-[11px] text-slate-500">{forum.count}</p>
        </div>
        <div className="flex items-center gap-1 text-slate-500 shrink-0">
          <span className="material-icons-round text-sm">chat_bubble_outline</span>
          <span className="text-xs font-semibold">{forum.replies}</span>
        </div>
      </div>
    ))}
    <button className="w-full py-3 bg-surface-dark border border-white/5 rounded-xl text-sm font-semibold text-slate-400 active:bg-white/5 transition-colors flex items-center justify-center gap-2">
      <span className="material-icons-round text-sm">add</span>
      Start a Discussion
    </button>
  </div>
);

// ── Tab: Messages ──

const MessagesTab: React.FC = () => (
  <div className="space-y-1 animate-fade-in">
    <div className="flex justify-between items-center mb-3">
      <h2 className="text-sm font-bold text-slate-300">Recent Messages</h2>
      <button className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
        <span className="material-icons-round text-lg">edit</span>
      </button>
    </div>
    {MESSAGES.map(msg => (
      <div key={msg.name} className="flex items-center gap-3 p-3 rounded-xl active:bg-white/5 transition-colors cursor-pointer">
        <div className="relative shrink-0">
          <img className="w-12 h-12 rounded-full object-cover" src={`https://picsum.photos/id/${msg.avatar}/100/100`} alt="" />
          {msg.isGroup && (
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-surface-dark rounded-full flex items-center justify-center border border-white/10">
              <span className="material-icons-round text-slate-400" style={{ fontSize: '12px' }}>groups</span>
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h4 className={`text-sm truncate ${msg.unread > 0 ? 'font-bold' : 'font-medium'}`}>{msg.name}</h4>
            <span className="text-[10px] text-slate-500 shrink-0 ml-2">{msg.time}</span>
          </div>
          <p className={`text-xs truncate ${msg.unread > 0 ? 'text-slate-300' : 'text-slate-500'}`}>{msg.lastMessage}</p>
        </div>
        {msg.unread > 0 && (
          <span className="w-5 h-5 bg-primary rounded-full flex items-center justify-center text-[10px] font-bold text-white shrink-0">
            {msg.unread}
          </span>
        )}
      </div>
    ))}
  </div>
);

// ── Tab: People ──

const PeopleTab: React.FC = () => (
  <div className="space-y-3 animate-fade-in">
    <div className="flex justify-between items-center mb-1">
      <h2 className="text-sm font-bold text-slate-300">People You May Know</h2>
    </div>
    {PEOPLE.map(person => (
      <div key={person.name} className="flex items-center gap-3 p-3 rounded-xl bg-surface-dark/50 border border-white/5">
        <img className="w-12 h-12 rounded-full object-cover" src={`https://picsum.photos/id/${person.avatar}/100/100`} alt="" />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold truncate">{person.name}</p>
          <p className="text-[11px] text-slate-500">{person.role}</p>
          <p className="text-[10px] text-slate-600">{person.mutual} mutual connections</p>
        </div>
        <button className="bg-primary/10 text-primary px-3 py-1.5 rounded-full text-xs font-bold active:scale-95 transition-transform">
          Connect
        </button>
      </div>
    ))}
  </div>
);

export default Connect;
