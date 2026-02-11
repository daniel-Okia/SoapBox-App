
import React from 'react';

const Serve: React.FC = () => {
  return (
    <div className="px-6 pb-24">
      <header className="pt-6 pb-2">
        <div className="flex justify-between items-center mb-1">
          <h1 className="text-3xl font-extrabold tracking-tight">Serve</h1>
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
            <img className="w-full h-full rounded-full object-cover" src="https://picsum.photos/id/1012/100/100" alt="Nathan" />
          </div>
        </div>
        <p className="text-primary font-medium">Welcome back, Nathan. Your light is shining.</p>
      </header>

      <section className="py-4">
        <div className="bg-primary/10 rounded-xl p-6 flex items-center justify-between border border-primary/10">
          <div className="relative w-32 h-32">
            <svg className="w-full h-full transform -rotate-90">
              <circle className="text-primary/10" cx="64" cy="64" fill="transparent" r="50" stroke="currentColor" strokeWidth="12" />
              <circle className="text-primary" cx="64" cy="64" fill="transparent" r="50" stroke="currentColor" strokeWidth="12" strokeDasharray="314" strokeDashoffset="62.8" strokeLinecap="round" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold">8.5</span>
              <span className="text-[10px] uppercase tracking-widest opacity-60">Hours</span>
            </div>
          </div>
          <div className="flex-1 ml-6 space-y-4">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="opacity-70">Impact Hours</span>
                <span className="font-bold text-primary">85%</span>
              </div>
              <div className="w-full bg-primary/10 h-1.5 rounded-full">
                <div className="bg-primary h-1.5 rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="opacity-70">People Reached</span>
                <span className="font-bold text-primary">12/20</span>
              </div>
              <div className="w-full bg-primary/10 h-1.5 rounded-full">
                <div className="bg-primary h-1.5 rounded-full opacity-60" style={{ width: '60%' }}></div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-icons-round text-primary text-sm">auto_awesome</span>
              <span className="text-xs font-semibold">24-Day Streak</span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-2 overflow-x-auto hide-scrollbar">
        <div className="flex gap-2 whitespace-nowrap">
          {['Tech-Savvy', 'Compassionate', 'Organized', 'Pianist'].map(tag => (
            <span key={tag} className="px-4 py-1.5 bg-primary/10 border border-primary/20 text-xs font-bold rounded-full text-primary">
              {tag}
            </span>
          ))}
        </div>
      </section>

      <section className="py-6">
        <div className="flex justify-between items-end mb-4">
          <div>
            <h2 className="text-xl font-bold">Best Matches for You</h2>
            <p className="text-sm opacity-60">Personalized by SoapBox AI</p>
          </div>
          <button className="text-primary text-sm font-bold">View All</button>
        </div>
        <div className="flex gap-4 overflow-x-auto hide-scrollbar">
          {[
            { title: 'Audio/Visual Team', match: '98%', img: '1031', time: 'Sun, 9:00 AM' },
            { title: "Children's Ministry", match: '92%', img: '1032', time: 'Wed, 6:30 PM' }
          ].map(match => (
            <div key={match.title} className="min-w-[280px] group relative rounded-xl overflow-hidden aspect-[4/5] bg-slate-800">
              <img className="w-full h-full object-cover opacity-80" src={`https://picsum.photos/id/${match.img}/400/500`} alt="" />
              <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent"></div>
              <div className="absolute top-4 left-4">
                <span className="bg-primary px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider text-white">
                  {match.match} Match
                </span>
              </div>
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-lg font-bold text-white mb-1">{match.title}</h3>
                <div className="flex items-center gap-2 text-white/70 text-xs">
                  <span className="material-icons-round text-sm">schedule</span>
                  <span>{match.time}</span>
                </div>
                <button className="mt-4 w-full bg-white text-background-dark py-2.5 rounded-lg text-sm font-bold active:scale-95">
                  Apply Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="pb-6">
        <h2 className="text-lg font-bold mb-4">Upcoming Service</h2>
        <div className="bg-white/5 border border-primary/10 rounded-xl p-5 shadow-2xl">
          <div className="flex gap-4">
            <div className="w-14 h-14 rounded-lg bg-primary/10 flex flex-col items-center justify-center text-primary">
              <span className="text-xs font-bold uppercase">Oct</span>
              <span className="text-xl font-black">24</span>
            </div>
            <div className="flex-1">
              <h4 className="font-bold">Greeter Team</h4>
              <p className="text-xs opacity-60">Main Entrance • Shift A</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="material-icons-round text-xs text-primary">place</span>
                <span className="text-xs">Main Sanctuary Lobby</span>
              </div>
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            <button className="flex-1 py-2 rounded-lg bg-primary text-white text-xs font-bold">Check-in</button>
            <button className="flex-1 py-2 rounded-lg bg-primary/10 text-primary text-xs font-bold">Directions</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Serve;
