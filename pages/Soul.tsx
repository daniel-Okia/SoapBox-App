
import React from 'react';

const Soul: React.FC = () => {
  return (
    <div className="pb-24">
      <nav className="sticky top-0 z-50 bg-background-dark/80 backdrop-blur-md border-b border-primary/10 px-6 py-4 flex items-center justify-between">
        <button className="p-2 -ml-2 text-primary">
          <span className="material-icons-round">arrow_back_ios</span>
        </button>
        <span className="text-lg font-bold tracking-tight">Soul</span>
        <button className="p-2 -mr-2 text-primary">
          <span className="material-icons-round">share</span>
        </button>
      </nav>

      <main className="max-w-md mx-auto">
        <section className="flex flex-col items-center pt-8 pb-10 px-6">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/30 blur-2xl rounded-full scale-110"></div>
            <img className="relative w-24 h-24 rounded-full border-2 border-primary object-cover z-10" src="https://picsum.photos/id/1027/200/200" alt="Profile" />
            <div className="absolute bottom-0 right-0 bg-gold-accent w-7 h-7 rounded-full border-4 border-background-dark flex items-center justify-center z-20">
              <span className="material-icons-round text-[14px] text-background-dark font-bold">verified</span>
            </div>
          </div>
          <h1 className="mt-4 text-2xl font-extrabold tracking-tight">Sarah Mitchell</h1>
          <p className="text-primary font-medium text-sm mt-1 uppercase tracking-widest">Peace Seeker</p>
          <p className="mt-3 text-center text-slate-400 text-sm max-w-[280px] leading-relaxed italic">
            "Finding God in the small moments of every day."
          </p>

          <div className="mt-8 flex gap-8 w-full justify-center">
            <StatItem value="14" label="Day Streak" />
            <div className="h-10 w-[1px] bg-primary/20"></div>
            <StatItem value="128" label="Journals" />
            <div className="h-10 w-[1px] bg-primary/20"></div>
            <StatItem value="42" label="Prayers" />
          </div>
        </section>

        <section className="mt-4">
          <div className="px-6 flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold tracking-tight">Sacred Milestones</h2>
            <span className="text-xs font-bold text-primary/60 uppercase">View All</span>
          </div>
          <div className="flex overflow-x-auto gap-5 px-6 pb-6 hide-scrollbar">
            <MilestoneCandle day="1" icon="auto_awesome" isLit />
            <MilestoneCandle day="2" icon="favorite" isLit />
            <MilestoneCandle day="3" icon="lock" />
            <MilestoneCandle day="4" />
          </div>

          <div className="px-6 grid grid-cols-4 gap-4 mt-4">
            {['self_improvement', 'volunteer_activism', 'menu_book'].map((icon, i) => (
              <div key={i} className="aspect-square rounded-full bg-gold-accent/10 border border-gold-accent/30 flex items-center justify-center shadow-lg shadow-gold-accent/5">
                <span className="material-icons-round text-gold-accent">{icon}</span>
              </div>
            ))}
            <div className="aspect-square rounded-full bg-slate-800/30 border border-slate-700 flex items-center justify-center grayscale opacity-50">
              <span className="material-icons-round text-slate-400">workspace_premium</span>
            </div>
          </div>
        </section>

        <section className="mt-12 px-6">
          <h2 className="text-lg font-bold tracking-tight mb-4">Settings</h2>
          <div className="bg-white/5 rounded-xl overflow-hidden border border-white/10">
            <SettingsButton icon="notifications" label="Spiritual Reminders" color="bg-primary/20" iconColor="text-primary" />
            <SettingsButton icon="lock" label="Privacy & Sanctity" color="bg-indigo-500/20" iconColor="text-indigo-400" />
            <SettingsButton icon="palette" label="Appearance" color="bg-slate-500/20" iconColor="text-slate-400" />
            <button className="w-full flex items-center justify-between p-4 active:bg-red-500/10 transition-colors">
              <div className="flex items-center gap-3 text-red-400">
                <div className="w-8 h-8 rounded bg-red-500/20 flex items-center justify-center">
                  <span className="material-icons-round text-xl">logout</span>
                </div>
                <span className="text-sm font-medium">Sign Out</span>
              </div>
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

const StatItem: React.FC<{ value: string, label: string }> = ({ value, label }) => (
  <div className="text-center">
    <p className="text-2xl font-bold">{value}</p>
    <p className="text-xs text-slate-500 uppercase tracking-tighter">{label}</p>
  </div>
);

const MilestoneCandle: React.FC<{ day: string, icon?: string, isLit?: boolean }> = ({ day, icon, isLit }) => (
  <div className={`flex-shrink-0 flex flex-col items-center ${!isLit ? 'opacity-40' : ''}`}>
    <div className={`relative w-16 h-28 ${isLit ? 'bg-gradient-to-t from-primary/20 to-primary/40 candle-glow border-primary/30' : 'bg-slate-800/50 border-slate-700/50'} rounded-t-full rounded-b-lg border flex items-end pb-2`}>
      {isLit && <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-4 h-8 bg-gradient-to-t from-primary to-transparent rounded-full blur-[2px] animate-pulse"></div>}
      <span className={`material-icons-round ${isLit ? 'text-primary/80' : 'text-slate-500'} mx-auto text-xl`}>{icon || ''}</span>
    </div>
    <span className={`mt-3 text-[10px] font-bold uppercase tracking-widest ${isLit ? 'text-primary' : 'text-slate-500'}`}>Day {day}</span>
  </div>
);

const SettingsButton: React.FC<{ icon: string, label: string, color: string, iconColor: string }> = ({ icon, label, color, iconColor }) => (
  <button className="w-full flex items-center justify-between p-4 border-b border-white/5 active:bg-white/10 transition-colors">
    <div className="flex items-center gap-3">
      <div className={`w-8 h-8 rounded ${color} flex items-center justify-center`}>
        <span className={`material-icons-round ${iconColor} text-xl`}>{icon}</span>
      </div>
      <span className="text-sm font-medium">{label}</span>
    </div>
    <span className="material-icons-round text-slate-500 text-lg">chevron_right</span>
  </button>
);

export default Soul;
