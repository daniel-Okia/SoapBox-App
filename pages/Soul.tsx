
import React, { useState } from 'react';

// ── Sub-module tabs ──

type ProfileTab = 'profile' | 'candles' | 'settings';

const TABS: { key: ProfileTab; label: string; icon: string }[] = [
  { key: 'profile', label: 'Profile', icon: 'person' },
  { key: 'candles', label: 'Candles', icon: 'local_fire_department' },
  { key: 'settings', label: 'Settings', icon: 'settings' },
];

// ── Mock Data ──

const CANDLE_HISTORY = [
  { action: 'Daily Check-In', amount: '+5', date: 'Today', icon: 'check_circle', positive: true },
  { action: 'S.O.A.P. Journal', amount: '+10', date: 'Today', icon: 'edit_note', positive: true },
  { action: 'Prayer Wall Post', amount: '+3', date: 'Yesterday', icon: 'volunteer_activism', positive: true },
  { action: 'Community Post', amount: '+2', date: 'Yesterday', icon: 'chat_bubble', positive: true },
  { action: 'Profile Boost', amount: '-50', date: '2 days ago', icon: 'auto_awesome', positive: false },
];

const SPEND_OPTIONS = [
  { title: 'Profile Boost', cost: 50, icon: 'auto_awesome', description: 'Highlight your profile in the community' },
  { title: 'Custom Badge', cost: 100, icon: 'workspace_premium', description: 'Unlock a custom profile badge' },
  { title: 'Prayer Highlight', cost: 25, icon: 'volunteer_activism', description: 'Boost your prayer request visibility' },
];

// ── Component ──

const Soul: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ProfileTab>('profile');

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
        {activeTab === 'profile' && <ProfileTabContent />}
        {activeTab === 'candles' && <CandlesTab />}
        {activeTab === 'settings' && <SettingsTab />}
      </div>
    </div>
  );
};

// ── Tab: Profile ──

const ProfileTabContent: React.FC = () => (
  <div className="py-6 animate-fade-in">
    {/* Profile Header */}
    <div className="flex flex-col items-center mb-8">
      <div className="relative">
        <img
          className="w-24 h-24 rounded-full border-2 border-primary/30 object-cover"
          src="https://picsum.photos/id/64/200/200"
          alt="Profile"
        />
        <div className="absolute bottom-0 right-0 bg-gold-accent w-7 h-7 rounded-full border-4 border-background-dark flex items-center justify-center">
          <span className="material-icons-round text-[14px] text-background-dark font-bold">verified</span>
        </div>
      </div>
      <h1 className="mt-4 text-2xl font-extrabold tracking-tight">Daniel Okia</h1>
      <p className="text-primary font-medium text-sm mt-1 uppercase tracking-widest">Peace Seeker</p>
      <p className="mt-3 text-center text-slate-400 text-sm max-w-[280px] leading-relaxed italic">
        "Finding God in the small moments of every day."
      </p>
    </div>

    {/* Stats */}
    <div className="flex gap-8 justify-center mb-8">
      <StatItem value="14" label="Day Streak" />
      <div className="h-10 w-[1px] bg-white/10"></div>
      <StatItem value="128" label="Journals" />
      <div className="h-10 w-[1px] bg-white/10"></div>
      <StatItem value="42" label="Prayers" />
    </div>

    {/* Milestones */}
    <section className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-bold text-slate-300">Sacred Milestones</h2>
        <span className="text-xs text-primary font-semibold">View All</span>
      </div>
      <div className="flex overflow-x-auto gap-4 pb-4 hide-scrollbar">
        <MilestoneCandle day="1" icon="auto_awesome" isLit />
        <MilestoneCandle day="2" icon="favorite" isLit />
        <MilestoneCandle day="3" icon="lock" />
        <MilestoneCandle day="4" />
      </div>
    </section>

    {/* Badges */}
    <section>
      <h2 className="text-sm font-bold text-slate-300 mb-4">Badges</h2>
      <div className="grid grid-cols-4 gap-4">
        {['self_improvement', 'volunteer_activism', 'menu_book'].map((icon, i) => (
          <div key={i} className="aspect-square rounded-full bg-gold-accent/10 border border-gold-accent/30 flex items-center justify-center">
            <span className="material-icons-round text-gold-accent">{icon}</span>
          </div>
        ))}
        <div className="aspect-square rounded-full bg-white/5 border border-white/10 flex items-center justify-center opacity-40">
          <span className="material-icons-round text-slate-500">workspace_premium</span>
        </div>
      </div>
    </section>
  </div>
);

// ── Tab: Candles ──

const CandlesTab: React.FC = () => (
  <div className="py-6 space-y-6 animate-fade-in">
    {/* Balance */}
    <div className="text-center py-6 bg-surface-dark/50 rounded-xl border border-white/5">
      <div className="flex items-center justify-center gap-2 mb-2">
        <span className="material-icons-round text-orange-400 text-2xl animate-pulse-soft">local_fire_department</span>
      </div>
      <p className="text-4xl font-black">248</p>
      <p className="text-xs text-slate-500 uppercase tracking-widest mt-1">Candles Balance</p>
    </div>

    {/* Spend Options */}
    <section>
      <h2 className="text-sm font-bold text-slate-300 mb-3">Spend Candles</h2>
      <div className="space-y-3">
        {SPEND_OPTIONS.map(opt => (
          <div key={opt.title} className="flex items-center gap-3 p-3 rounded-xl bg-surface-dark/50 border border-white/5">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
              <span className="material-icons-round">{opt.icon}</span>
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-bold">{opt.title}</h4>
              <p className="text-[11px] text-slate-500">{opt.description}</p>
            </div>
            <button className="bg-orange-500/10 text-orange-400 px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 shrink-0 active:scale-95 transition-transform">
              <span className="material-icons-round" style={{ fontSize: '12px' }}>local_fire_department</span>
              {opt.cost}
            </button>
          </div>
        ))}
      </div>
    </section>

    {/* History */}
    <section>
      <h2 className="text-sm font-bold text-slate-300 mb-3">Recent Activity</h2>
      <div className="space-y-1">
        {CANDLE_HISTORY.map((item, i) => (
          <div key={i} className="flex items-center gap-3 p-3 rounded-xl">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${item.positive ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
              <span className="material-icons-round text-lg">{item.icon}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{item.action}</p>
              <p className="text-[10px] text-slate-600">{item.date}</p>
            </div>
            <span className={`text-sm font-bold ${item.positive ? 'text-green-400' : 'text-red-400'}`}>{item.amount}</span>
          </div>
        ))}
      </div>
    </section>
  </div>
);

// ── Tab: Settings ──

const SettingsTab: React.FC = () => (
  <div className="py-6 animate-fade-in">
    <div className="bg-surface-dark/50 rounded-xl overflow-hidden border border-white/5">
      <SettingsButton icon="notifications" label="Spiritual Reminders" color="bg-primary/20" iconColor="text-primary" />
      <SettingsButton icon="lock" label="Privacy & Sanctity" color="bg-indigo-500/20" iconColor="text-indigo-400" />
      <SettingsButton icon="palette" label="Appearance" color="bg-slate-500/20" iconColor="text-slate-400" />
      <SettingsButton icon="language" label="Language" color="bg-blue-500/20" iconColor="text-blue-400" />
      <SettingsButton icon="help" label="Help & Support" color="bg-green-500/20" iconColor="text-green-400" />
      <SettingsButton icon="info" label="About SoapBox" color="bg-purple-500/20" iconColor="text-purple-400" />
      <button className="w-full flex items-center justify-between p-4 active:bg-red-500/10 transition-colors">
        <div className="flex items-center gap-3 text-red-400">
          <div className="w-8 h-8 rounded bg-red-500/20 flex items-center justify-center">
            <span className="material-icons-round text-xl">logout</span>
          </div>
          <span className="text-sm font-medium">Sign Out</span>
        </div>
      </button>
    </div>
  </div>
);

// ── Shared Components ──

const StatItem: React.FC<{ value: string; label: string }> = ({ value, label }) => (
  <div className="text-center">
    <p className="text-2xl font-bold">{value}</p>
    <p className="text-xs text-slate-500 uppercase tracking-tighter">{label}</p>
  </div>
);

const MilestoneCandle: React.FC<{ day: string; icon?: string; isLit?: boolean }> = ({ day, icon, isLit }) => (
  <div className={`flex-shrink-0 flex flex-col items-center ${!isLit ? 'opacity-40' : ''}`}>
    <div className={`relative w-16 h-28 ${isLit ? 'bg-gradient-to-t from-primary/20 to-primary/40 candle-glow border-primary/30' : 'bg-surface-dark border-white/10'} rounded-t-full rounded-b-lg border flex items-end pb-2`}>
      {isLit && <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-4 h-8 bg-gradient-to-t from-primary to-transparent rounded-full blur-[2px] animate-pulse"></div>}
      <span className={`material-icons-round ${isLit ? 'text-primary/80' : 'text-slate-500'} mx-auto text-xl`}>{icon || ''}</span>
    </div>
    <span className={`mt-3 text-[10px] font-bold uppercase tracking-widest ${isLit ? 'text-primary' : 'text-slate-500'}`}>Day {day}</span>
  </div>
);

const SettingsButton: React.FC<{ icon: string; label: string; color: string; iconColor: string }> = ({ icon, label, color, iconColor }) => (
  <button className="w-full flex items-center justify-between p-4 border-b border-white/5 active:bg-white/5 transition-colors">
    <div className="flex items-center gap-3">
      <div className={`w-8 h-8 rounded ${color} flex items-center justify-center`}>
        <span className={`material-icons-round ${iconColor} text-xl`}>{icon}</span>
      </div>
      <span className="text-sm font-medium">{label}</span>
    </div>
    <span className="material-icons-round text-slate-600 text-lg">chevron_right</span>
  </button>
);

export default Soul;
