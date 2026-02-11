
import React, { useState } from 'react';

const Give: React.FC = () => {
  const [selectedAmount, setSelectedAmount] = useState(25);

  return (
    <div className="px-6 pb-24">
      <header className="py-4 flex items-center justify-between">
        <button className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
          <span className="material-icons-round">arrow_back_ios_new</span>
        </button>
        <h1 className="text-lg font-bold">Generous Giving</h1>
        <button className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
          <span className="material-icons-round">history</span>
        </button>
      </header>

      <main className="mt-4">
        <div className="mb-8">
          <h2 className="text-3xl font-extrabold tracking-tight">Support the <span className="text-primary">Mission.</span></h2>
          <p className="text-slate-400 mt-2 text-sm leading-relaxed italic">
            “Each of you should give what you have decided in your heart to give.” — 2 Cor 9:7
          </p>
        </div>

        <div className="bg-primary/5 p-1 rounded-xl flex mb-8">
          <button className="flex-1 py-3 text-sm font-bold rounded-lg bg-primary text-white shadow-sm">
            One-time
          </button>
          <button className="flex-1 py-3 text-sm font-bold rounded-lg text-slate-400">
            Monthly
          </button>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-6">
          {[25, 50, 100].map(amt => (
            <button 
              key={amt}
              onClick={() => setSelectedAmount(amt)}
              className={`py-4 rounded-xl border-2 transition-all ${selectedAmount === amt ? 'border-primary bg-primary/10' : 'border-transparent bg-white/5'}`}
            >
              <span className={`block text-[10px] font-semibold uppercase ${selectedAmount === amt ? 'text-primary' : 'text-slate-400'}`}>Preset</span>
              <span className={`text-xl font-bold ${selectedAmount === amt ? 'text-primary' : 'text-slate-100'}`}>${amt}</span>
            </button>
          ))}
        </div>

        <div className="relative mb-10">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <span className="text-2xl font-bold text-slate-400">$</span>
          </div>
          <input 
            className="w-full bg-white/5 border-none rounded-xl py-4 pl-10 pr-4 text-xl font-bold focus:ring-2 focus:ring-primary outline-none" 
            placeholder="Custom Amount" 
            type="number"
            value={selectedAmount}
            onChange={(e) => setSelectedAmount(Number(e.target.value))}
          />
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-lg">Your Impact</h3>
            <span className="text-xs font-semibold text-primary uppercase tracking-wider">How it's used</span>
          </div>
          <div className="space-y-4">
            <AllocationCard 
              label="Local Food Bank" 
              percent={40} 
              amount={(selectedAmount * 0.4).toFixed(2)} 
              icon="restaurant" 
            />
            <AllocationCard 
              label="Mission Trip Fund" 
              percent={60} 
              amount={(selectedAmount * 0.6).toFixed(2)} 
              icon="public" 
            />
          </div>
        </div>

        <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 mb-4 flex gap-4">
          <span className="material-icons-round text-primary">verified_user</span>
          <div>
            <h4 className="text-sm font-bold">100% Transparency</h4>
            <p className="text-xs text-slate-400 mt-1 leading-normal">Your donation is tax-deductible and 100% of it goes directly to the causes shown above.</p>
          </div>
        </div>
      </main>

      <div className="sticky bottom-0 p-6 bg-gradient-to-t from-background-dark via-background-dark to-transparent">
        <div className="flex items-center justify-between mb-4 px-2">
          <div className="flex items-center gap-2">
            <span className="material-icons-round text-slate-400 text-lg">payments</span>
            <span className="text-xs font-medium text-slate-500">**** 8829</span>
          </div>
          <button className="text-xs font-bold text-primary">Change</button>
        </div>
        <button className="w-full bg-primary hover:bg-primary/90 text-white font-extrabold py-4 rounded-xl shadow-lg shadow-primary/20 flex items-center justify-center gap-2 transition-transform active:scale-95">
          <span>Give ${selectedAmount.toFixed(2)}</span>
          <span className="material-icons-round text-[20px]">volunteer_activism</span>
        </button>
      </div>
    </div>
  );
};

const AllocationCard: React.FC<{ label: string, percent: number, amount: string, icon: string }> = ({ label, percent, amount, icon }) => (
  <div className="bg-white/5 p-4 rounded-xl shadow-sm border border-white/5">
    <div className="flex justify-between items-center mb-3">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
          <span className="material-icons-round text-primary">{icon}</span>
        </div>
        <div>
          <p className="font-bold text-sm">{label}</p>
          <p className="text-[10px] text-slate-400 uppercase font-bold">{percent}% Allocation</p>
        </div>
      </div>
      <span className="text-primary font-bold">${amount}</span>
    </div>
    <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
      <div className="bg-primary h-full transition-all duration-500" style={{ width: `${percent}%` }}></div>
    </div>
  </div>
);

export default Give;
