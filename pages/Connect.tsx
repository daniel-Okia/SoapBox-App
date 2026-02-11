
import React from 'react';

const Connect: React.FC = () => {
  return (
    <div className="px-6 pb-24">
      <header className="pt-6 pb-4 sticky top-0 bg-background-dark/80 backdrop-blur-md z-30">
        <div className="flex justify-between items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-primary mb-1">SoapBox</p>
            <h1 className="text-3xl font-extrabold tracking-tight">Connect</h1>
          </div>
          <div className="flex gap-3">
            <button className="w-10 h-10 rounded-full flex items-center justify-center bg-surface-dark border border-neutral-dark">
              <span className="material-icons-round text-gray-300">notifications_none</span>
            </button>
            <button className="w-10 h-10 rounded-full flex items-center justify-center bg-primary text-white shadow-lg shadow-primary/25 relative">
              <span className="material-icons-round">chat_bubble_outline</span>
              <span className="absolute top-0 right-0 w-3 h-3 bg-white border-2 border-primary rounded-full"></span>
            </button>
          </div>
        </div>
        <div className="mt-6 relative">
          <span className="material-icons-round absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400">search</span>
          <input className="w-full pl-12 pr-4 py-3.5 bg-surface-dark border-none rounded-xl text-sm focus:ring-2 focus:ring-primary shadow-sm text-slate-100" placeholder="Search communities or forums..." type="text"/>
        </div>
      </header>

      <main className="space-y-8 mt-4">
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">My Communities</h2>
            <button className="text-sm font-semibold text-primary">View All</button>
          </div>
          <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-2">
            {[
              { name: 'Worship Team', img: '1025', active: true },
              { name: 'Morning Prayer', img: '1026' },
              { name: 'Outreach', img: '1027' },
              { name: 'Young Adult', img: '1028' }
            ].map((com) => (
              <div key={com.name} className="flex flex-col items-center gap-2 min-w-[72px]">
                <div className={`w-16 h-16 rounded-full p-1 border-2 ${com.active ? 'border-primary' : 'border-transparent'}`}>
                  <img className="w-full h-full rounded-full object-cover" src={`https://picsum.photos/id/${com.img}/100/100`} alt="" />
                </div>
                <span className="text-[11px] font-medium text-center truncate w-full">{com.name}</span>
              </div>
            ))}
            <div className="flex flex-col items-center gap-2 min-w-[72px]">
              <div className="w-16 h-16 rounded-full flex items-center justify-center bg-surface-dark border-2 border-dashed border-neutral-dark">
                <span className="material-icons-round text-neutral-400">add</span>
              </div>
              <span className="text-[11px] font-medium text-center">Discover</span>
            </div>
          </div>
        </section>

        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">Upcoming Events</h2>
            <button className="text-sm font-semibold text-primary flex items-center gap-1">
              Calendar <span className="material-icons-round text-sm">chevron_right</span>
            </button>
          </div>
          <div className="space-y-4">
            <div className="bg-surface-dark rounded-2xl overflow-hidden shadow-xl border border-neutral-dark/50 group">
              <div className="relative h-36">
                <img className="w-full h-full object-cover" src="https://picsum.photos/id/1029/600/300" alt="Event" />
                <div className="absolute top-3 left-3 bg-surface-dark/90 backdrop-blur-md rounded-lg px-3 py-1 flex flex-col items-center min-w-[44px]">
                  <span className="text-[10px] font-bold text-primary uppercase">OCT</span>
                  <span className="text-lg font-black leading-tight">21</span>
                </div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors">Young Adults Mixer</h3>
                  <span className="bg-primary/10 text-primary text-[10px] px-2 py-0.5 rounded-full font-bold">SOCIAL</span>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                  <div className="flex items-center gap-1">
                    <span className="material-icons-round text-sm">schedule</span>
                    <span>7:00 PM</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="material-icons-round text-sm">location_on</span>
                    <span>The Rooftop Garden</span>
                  </div>
                </div>
                <button className="w-full py-2.5 bg-primary text-white font-bold rounded-xl text-sm shadow-md shadow-primary/20">Register Now</button>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-primary">Trending Forums</h2>
            <span className="material-icons-round text-neutral-400">trending_up</span>
          </div>
          <div className="space-y-3">
            {[
              { title: 'Faith in the Modern Workplace', count: '128 active discussions', icon: 'work_outline' },
              { title: 'Deep Bible Study Tips', count: '45 new posts today', icon: 'menu_book' }
            ].map(forum => (
              <div key={forum.title} className="bg-surface-dark/50 p-4 rounded-xl border border-neutral-dark flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <span className="material-icons-round">{forum.icon}</span>
                </div>
                <div className="flex-grow">
                  <h4 className="text-sm font-bold">{forum.title}</h4>
                  <p className="text-[11px] text-gray-400">{forum.count}</p>
                </div>
                <span className="material-icons-round text-neutral-dark">chevron_right</span>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Connect;
