
import React, { useState } from 'react';

// ── Sub-module tabs ──

type ServeTab = 'dashboard' | 'opportunities' | 'applications';

const TABS: { key: ServeTab; label: string; icon: string }[] = [
  { key: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
  { key: 'opportunities', label: 'Opportunities', icon: 'how_to_reg' },
  { key: 'applications', label: 'Applications', icon: 'description' },
];

// ── Mock Data ──

const SKILLS = ['Tech-Savvy', 'Compassionate', 'Organized', 'Pianist'];

const OPPORTUNITIES = [
  { title: 'Audio/Visual Team', match: '98%', img: '1031', time: 'Sun, 9:00 AM', location: 'Main Sanctuary', description: 'Help run sound and visuals for Sunday worship services.' },
  { title: "Children's Ministry", match: '92%', img: '1032', time: 'Wed, 6:30 PM', location: 'Kids Wing', description: 'Assist with children\'s church programs and activities.' },
  { title: 'Greeter Team', match: '87%', img: '1033', time: 'Sun, 9:30 AM', location: 'Main Lobby', description: 'Welcome guests and help them find their way around.' },
  { title: 'Worship Band', match: '85%', img: '1034', time: 'Thu, 7:00 PM', location: 'Worship Center', description: 'Join the worship band for practice and Sunday performances.' },
];

const APPLICATIONS = [
  { title: 'Audio/Visual Team', status: 'Accepted', date: 'Oct 15', icon: 'check_circle', statusColor: 'text-green-400 bg-green-500/10' },
  { title: 'Youth Mentorship', status: 'Pending', date: 'Oct 12', icon: 'schedule', statusColor: 'text-amber-400 bg-amber-500/10' },
  { title: 'Outreach Coordinator', status: 'Interview', date: 'Oct 8', icon: 'event', statusColor: 'text-blue-400 bg-blue-500/10' },
];

// ── Component ──

const Serve: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ServeTab>('dashboard');

  return (
    <div className="pb-4">
      {/* Sub-module tabs */}
      <div className="flex gap-1.5 px-4 py-3 overflow-x-auto hide-scrollbar border-b border-white/5">
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
        {activeTab === 'dashboard' && <DashboardTab />}
        {activeTab === 'opportunities' && <OpportunitiesTab />}
        {activeTab === 'applications' && <ApplicationsTab />}
      </div>
    </div>
  );
};

// ── Tab: Dashboard ──

const DashboardTab: React.FC = () => (
  <div className="py-4 space-y-6 animate-fade-in">
    {/* Welcome */}
    <div>
      <p className="text-slate-400 text-sm">Welcome back, <span className="text-primary font-semibold">Daniel Okia</span></p>
      <p className="text-xs text-slate-600">Your light is shining.</p>
    </div>

    {/* Impact Stats */}
    <div className="bg-surface-dark/50 rounded-xl p-5 border border-white/5">
      <div className="flex items-center justify-between">
        <div className="relative w-28 h-28">
          <svg className="w-full h-full transform -rotate-90">
            <circle className="text-white/5" cx="56" cy="56" fill="transparent" r="46" stroke="currentColor" strokeWidth="10" />
            <circle className="text-primary" cx="56" cy="56" fill="transparent" r="46" stroke="currentColor" strokeWidth="10" strokeDasharray="289" strokeDashoffset="43" strokeLinecap="round" />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-xl font-bold">8.5</span>
            <span className="text-[9px] uppercase tracking-widest text-slate-500">Hours</span>
          </div>
        </div>
        <div className="flex-1 ml-5 space-y-3">
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-500">Impact Hours</span>
              <span className="font-bold text-primary">85%</span>
            </div>
            <div className="w-full bg-white/5 h-1.5 rounded-full">
              <div className="bg-primary h-1.5 rounded-full" style={{ width: '85%' }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-500">People Reached</span>
              <span className="font-bold text-primary">12/20</span>
            </div>
            <div className="w-full bg-white/5 h-1.5 rounded-full">
              <div className="bg-primary h-1.5 rounded-full" style={{ width: '60%' }}></div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="material-icons-round text-primary text-sm">auto_awesome</span>
            <span className="text-xs font-semibold">24-Day Streak</span>
          </div>
        </div>
      </div>
    </div>

    {/* Skills */}
    <div className="flex gap-2 overflow-x-auto hide-scrollbar">
      {SKILLS.map(tag => (
        <span key={tag} className="px-3 py-1.5 bg-primary/10 border border-primary/20 text-xs font-bold rounded-full text-primary whitespace-nowrap">
          {tag}
        </span>
      ))}
    </div>

    {/* Upcoming Service */}
    <section>
      <h2 className="text-sm font-bold text-slate-300 mb-3">Upcoming Service</h2>
      <div className="bg-surface-dark/50 border border-white/5 rounded-xl p-4">
        <div className="flex gap-3">
          <div className="w-14 h-14 rounded-lg bg-primary/10 flex flex-col items-center justify-center text-primary shrink-0">
            <span className="text-[10px] font-bold uppercase">Oct</span>
            <span className="text-xl font-black">24</span>
          </div>
          <div className="flex-1">
            <h4 className="font-bold text-sm">Greeter Team</h4>
            <p className="text-xs text-slate-500">Main Entrance · Shift A</p>
            <div className="flex items-center gap-1.5 mt-1.5">
              <span className="material-icons-round text-xs text-slate-500">place</span>
              <span className="text-xs text-slate-500">Main Sanctuary Lobby</span>
            </div>
          </div>
        </div>
        <div className="mt-4 flex gap-2">
          <button className="flex-1 py-2.5 rounded-xl bg-primary text-white text-xs font-bold active:scale-[0.98] transition-transform">Check-in</button>
          <button className="flex-1 py-2.5 rounded-xl bg-primary/10 text-primary text-xs font-bold active:scale-[0.98] transition-transform">Directions</button>
        </div>
      </div>
    </section>
  </div>
);

// ── Tab: Opportunities ──

const OpportunitiesTab: React.FC = () => (
  <div className="py-4 space-y-4 animate-fade-in">
    <div className="flex justify-between items-center">
      <div>
        <h2 className="text-sm font-bold text-slate-300">Best Matches for You</h2>
        <p className="text-[11px] text-slate-500">Personalized by SoapBox AI</p>
      </div>
    </div>
    {OPPORTUNITIES.map(opp => (
      <div key={opp.title} className="bg-surface-dark/50 rounded-xl overflow-hidden border border-white/5">
        <div className="relative h-32">
          <img className="w-full h-full object-cover opacity-80" src={`https://picsum.photos/id/${opp.img}/600/300`} alt="" />
          <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent"></div>
          <span className="absolute top-3 left-3 bg-primary px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider text-white">
            {opp.match} Match
          </span>
        </div>
        <div className="p-4">
          <h3 className="font-bold text-base mb-1">{opp.title}</h3>
          <p className="text-xs text-slate-500 mb-3">{opp.description}</p>
          <div className="flex items-center gap-4 text-xs text-slate-500 mb-3">
            <span className="flex items-center gap-1">
              <span className="material-icons-round text-sm">schedule</span>
              {opp.time}
            </span>
            <span className="flex items-center gap-1">
              <span className="material-icons-round text-sm">location_on</span>
              {opp.location}
            </span>
          </div>
          <button className="w-full py-2.5 bg-primary text-white font-bold rounded-xl text-sm active:scale-[0.98] transition-transform">
            Apply Now
          </button>
        </div>
      </div>
    ))}
  </div>
);

// ── Tab: Applications ──

const ApplicationsTab: React.FC = () => (
  <div className="py-4 space-y-3 animate-fade-in">
    <h2 className="text-sm font-bold text-slate-300 mb-1">My Applications</h2>
    {APPLICATIONS.map(app => (
      <div key={app.title} className="flex items-center gap-3 p-4 rounded-xl bg-surface-dark/50 border border-white/5">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${app.statusColor}`}>
          <span className="material-icons-round">{app.icon}</span>
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-bold truncate">{app.title}</h4>
          <p className="text-[11px] text-slate-500">Applied {app.date}</p>
        </div>
        <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${app.statusColor}`}>
          {app.status}
        </span>
      </div>
    ))}
    <div className="text-center py-6">
      <p className="text-sm text-slate-500">Looking for more ways to serve?</p>
      <button className="mt-2 text-primary text-sm font-bold">Browse Opportunities</button>
    </div>
  </div>
);

export default Serve;
