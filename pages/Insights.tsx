
import React from 'react';
import { BarChart, Bar, ResponsiveContainer, XAxis, Tooltip, Cell } from 'recharts';

const data = [
  { name: 'Mon', value: 400 },
  { name: 'Tue', value: 300 },
  { name: 'Wed', value: 600 },
  { name: 'Thu', value: 450 },
  { name: 'Fri', value: 500 },
  { name: 'Sat', value: 900 },
  { name: 'Sun', value: 700 },
];

const Insights: React.FC = () => {
  return (
    <div className="px-6 pb-24">
      <header className="p-6 pt-12 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
            <img className="w-8 h-8 rounded-full object-cover" src="https://picsum.photos/id/1074/100/100" alt="Julian" />
          </div>
          <div>
            <h1 className="text-xs font-bold text-primary uppercase tracking-widest">Admin Insights</h1>
            <p className="text-lg font-extrabold text-white">Pastor Julian</p>
          </div>
        </div>
        <button className="w-10 h-10 rounded-full glass flex items-center justify-center text-white">
          <span className="material-icons-round text-xl">notifications_none</span>
        </button>
      </header>

      <section className="mb-8">
        <div className="glass rounded-xl p-6 flex items-center gap-6 overflow-hidden">
          <div className="relative w-32 h-32 shrink-0">
             <svg className="w-full h-full transform -rotate-90">
              <circle className="text-primary/10" cx="64" cy="64" fill="transparent" r="50" stroke="currentColor" strokeWidth="8" />
              <circle className="text-primary" cx="64" cy="64" fill="transparent" r="50" stroke="currentColor" strokeWidth="8" strokeDasharray="314" strokeDashoffset="70" strokeLinecap="round" />
              
              <circle className="text-indigo-500/10" cx="64" cy="64" fill="transparent" r="38" stroke="currentColor" strokeWidth="8" />
              <circle className="text-indigo-500" cx="64" cy="64" fill="transparent" r="38" stroke="currentColor" strokeWidth="8" strokeDasharray="238" strokeDashoffset="80" strokeLinecap="round" />
              
              <circle className="text-emerald-500/10" cx="64" cy="64" fill="transparent" r="26" stroke="currentColor" strokeWidth="8" />
              <circle className="text-emerald-500" cx="64" cy="64" fill="transparent" r="26" stroke="currentColor" strokeWidth="8" strokeDasharray="163" strokeDashoffset="30" strokeLinecap="round" />
            </svg>
          </div>
          <div className="flex flex-col gap-3 justify-center">
            <InsightRingStat color="bg-primary" label="Giving" value="$12.4k / $15k" />
            <InsightRingStat color="bg-indigo-500" label="Attendance" value="842 / 1.1k" />
            <InsightRingStat color="bg-emerald-400" label="Engagement" value="82%" />
          </div>
        </div>
      </section>

      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400">Giving Trends</h2>
          <div className="flex gap-2">
            <button className="text-[10px] font-bold px-2 py-1 rounded bg-primary text-white">WEEK</button>
            <button className="text-[10px] font-bold px-2 py-1 rounded glass text-slate-400">MONTH</button>
          </div>
        </div>
        <div className="glass rounded-xl p-4 h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={index === 5 ? '#db2979' : 'rgba(219, 41, 121, 0.3)'} />
                ))}
              </Bar>
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} />
              <Tooltip 
                cursor={{ fill: 'transparent' }}
                contentStyle={{ backgroundColor: '#25161c', border: 'none', borderRadius: '8px', fontSize: '10px' }}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="grid grid-cols-2 gap-4 mb-8">
        <BentoStat icon="favorite" label="Community Health" value="94" change="+4.2%" color="text-emerald-400" bgColor="bg-emerald-500/20" />
        <BentoStat icon="groups" label="Small Groups" value="42" change="Active" color="text-indigo-400" bgColor="bg-indigo-500/20" />
        
        <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-xl p-5 col-span-2 shadow-xl relative overflow-hidden">
          <div className="absolute top-[-20px] right-[-20px] w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="material-icons-round text-white">campaign</span>
                <h3 className="text-white font-bold text-sm tracking-wide">Communication Hub</h3>
              </div>
              <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full text-white font-bold">2 NEW</span>
            </div>
            <p className="text-indigo-100 text-xs mb-4 leading-relaxed">Broadcast a message to your entire congregation instantly via Push and SMS.</p>
            <button className="w-full py-3 bg-white text-indigo-700 rounded-lg font-bold text-sm shadow-sm flex items-center justify-center gap-2">
              <span className="material-icons-round text-sm">send</span>
              Create Broadcast
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

const InsightRingStat: React.FC<{ color: string, label: string, value: string }> = ({ color, label, value }) => (
  <div className="flex items-center gap-2">
    <div className={`w-2 h-2 rounded-full ${color}`}></div>
    <div className="text-sm">
      <span className="block text-xs opacity-60 uppercase font-bold tracking-tight">{label}</span>
      <span className="text-white font-bold">{value}</span>
    </div>
  </div>
);

const BentoStat: React.FC<{ icon: string, label: string, value: string, change: string, color: string, bgColor: string }> = ({ icon, label, value, change, color, bgColor }) => (
  <div className="glass rounded-xl p-4 col-span-1">
    <div className={`w-8 h-8 rounded-lg ${bgColor} flex items-center justify-center mb-3`}>
      <span className={`material-icons-round ${color} text-sm`}>{icon}</span>
    </div>
    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">{label}</p>
    <div className="flex items-baseline gap-1 mt-1">
      <span className="text-2xl font-extrabold text-white">{value}</span>
      <span className={`text-xs font-bold ${color}`}>{change}</span>
    </div>
  </div>
);

export default Insights;
