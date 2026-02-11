
import React, { useState, useRef } from 'react';
import { startLivePrayerSession } from '../services/geminiService';
import { decodeBase64, decodeAudioData, createPcmBlob } from '../utils/audioUtils';

// ── Sub-module tabs ──

type WorshipTab = 'soap' | 'bible' | 'prayer' | 'audio' | 'saved';

const TABS: { key: WorshipTab; label: string; icon: string }[] = [
  { key: 'soap', label: 'S.O.A.P.', icon: 'edit_note' },
  { key: 'bible', label: 'Bible', icon: 'menu_book' },
  { key: 'prayer', label: 'Prayer Wall', icon: 'volunteer_activism' },
  { key: 'audio', label: 'Audio', icon: 'headphones' },
  { key: 'saved', label: 'Saved', icon: 'bookmark' },
];

// ── Mock Data ──

const PRAYER_REQUESTS = [
  {
    author: 'Sarah Jenkins',
    avatar: '1011',
    time: '20 minutes ago',
    content: 'Please pray for my mother\'s surgery tomorrow morning. We are trusting in God\'s healing hands.',
    prayingCount: 14,
  },
  {
    author: 'Michael Torres',
    avatar: '1012',
    time: '1 hour ago',
    content: 'Praying for wisdom in a career decision. God, lead me where You want me to go.',
    prayingCount: 8,
  },
  {
    author: 'Grace Community Church',
    avatar: '1025',
    time: '3 hours ago',
    content: 'Our church is praying for unity and revival in our city this season. Join us!',
    prayingCount: 32,
    isChurch: true,
  },
];

const READING_PLANS = [
  { title: 'Psalms of Comfort', progress: 65, days: '14 of 21 days', icon: 'spa' },
  { title: 'Gospel of John', progress: 30, days: '6 of 20 days', icon: 'auto_stories' },
];

const AUDIO_TRACKS = [
  { title: 'Morning Prayer Meditation', duration: '12:30', artist: 'Peaceful Worship', icon: 'self_improvement' },
  { title: 'Psalms Reading — Chapter 91', duration: '8:45', artist: 'Bible Audio', icon: 'menu_book' },
  { title: 'Worship Piano — Be Still', duration: '15:20', artist: 'Instrumental Praise', icon: 'piano' },
  { title: 'Evening Devotional', duration: '10:00', artist: 'Daily Reflections', icon: 'nights_stay' },
];

const SAVED_ITEMS = [
  { title: 'S.O.A.P. — Psalm 46:10', type: 'Journal', date: 'Oct 18', icon: 'edit_note' },
  { title: 'Prayer for the Johnson Family', type: 'Prayer', date: 'Oct 17', icon: 'volunteer_activism' },
  { title: 'Morning Meditation — Peace', type: 'Audio', date: 'Oct 15', icon: 'headphones' },
  { title: 'Romans 8 Discussion Notes', type: 'Note', date: 'Oct 14', icon: 'description' },
];

// ── Component ──

const Worship: React.FC = () => {
  const [activeTab, setActiveTab] = useState<WorshipTab>('soap');

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
        {activeTab === 'soap' && <SoapTab />}
        {activeTab === 'bible' && <BibleTab />}
        {activeTab === 'prayer' && <PrayerTab />}
        {activeTab === 'audio' && <AudioTab />}
        {activeTab === 'saved' && <SavedTab />}
      </div>
    </div>
  );
};

// ── Tab: S.O.A.P. ──

const SoapTab: React.FC = () => {
  const [observation, setObservation] = useState('');
  const [application, setApplication] = useState('');
  const [prayer, setPrayer] = useState('');
  const [isPrayerActive, setIsPrayerActive] = useState(false);
  const [isLiveConnected, setIsLiveConnected] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const inputAudioContextRef = useRef<AudioContext | null>(null);
  const outputNodeRef = useRef<GainNode | null>(null);
  const nextStartTimeRef = useRef(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const sessionRef = useRef<any>(null);

  const startSanctuary = async () => {
    setIsPrayerActive(true);
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      outputNodeRef.current = audioContextRef.current.createGain();
      outputNodeRef.current.connect(audioContextRef.current.destination);
    }
    if (!inputAudioContextRef.current) {
      inputAudioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const sessionPromise = startLivePrayerSession({
        onopen: () => {
          setIsLiveConnected(true);
          const source = inputAudioContextRef.current!.createMediaStreamSource(stream);
          const scriptProcessor = inputAudioContextRef.current!.createScriptProcessor(4096, 1, 1);
          scriptProcessor.onaudioprocess = (e) => {
            const inputData = e.inputBuffer.getChannelData(0);
            const pcmBlob = createPcmBlob(inputData);
            sessionPromise.then(s => s.sendRealtimeInput({ media: pcmBlob }));
          };
          source.connect(scriptProcessor);
          scriptProcessor.connect(inputAudioContextRef.current!.destination);
        },
        onmessage: async (msg: any) => {
          const base64Audio = msg.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
          if (base64Audio && audioContextRef.current) {
            nextStartTimeRef.current = Math.max(nextStartTimeRef.current, audioContextRef.current.currentTime);
            const buffer = await decodeAudioData(decodeBase64(base64Audio), audioContextRef.current, 24000, 1);
            const source = audioContextRef.current.createBufferSource();
            source.buffer = buffer;
            source.connect(outputNodeRef.current!);
            source.start(nextStartTimeRef.current);
            nextStartTimeRef.current += buffer.duration;
            sourcesRef.current.add(source);
            source.onended = () => sourcesRef.current.delete(source);
          }
          if (msg.serverContent?.interrupted) {
            sourcesRef.current.forEach(s => s.stop());
            sourcesRef.current.clear();
            nextStartTimeRef.current = 0;
          }
        },
        onclose: () => setIsLiveConnected(false),
        onerror: (e: any) => console.error("Live Prayer Error", e)
      });
      sessionRef.current = await sessionPromise;
    } catch (err) {
      console.error("Mic access failed", err);
      setIsPrayerActive(false);
    }
  };

  const endSanctuary = () => {
    if (sessionRef.current) sessionRef.current.close();
    setIsPrayerActive(false);
    setIsLiveConnected(false);
    sourcesRef.current.forEach(s => s.stop());
  };

  return (
    <div className="py-4 space-y-5 animate-fade-in">
      {/* Prayer Sanctuary Overlay */}
      {isPrayerActive && (
        <div className="fixed inset-0 z-[100] bg-background-dark flex flex-col items-center justify-center p-8 animate-fade-in">
          <div className={`w-64 h-64 rounded-full bg-primary/20 flex items-center justify-center relative ${isLiveConnected ? 'animate-pulse' : ''}`}>
            <div className="absolute inset-0 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
            <span className="material-icons-round text-6xl text-primary">spa</span>
          </div>
          <div className="mt-12 text-center">
            <h2 className="text-2xl font-serif mb-2">Prayer Sanctuary</h2>
            <p className="text-slate-400 max-w-xs mx-auto italic">
              {isLiveConnected ? "Speak your heart. Your prayer partner is listening..." : "Connecting to sacred space..."}
            </p>
          </div>
          <button onClick={endSanctuary} className="mt-24 px-8 py-3 bg-white/5 border border-white/10 rounded-full text-white font-bold transition-all active:scale-95">
            Leave Sanctuary
          </button>
        </div>
      )}

      {/* Live Prayer button */}
      <button
        onClick={startSanctuary}
        className="w-full bg-primary/10 border border-primary/20 text-primary px-4 py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
      >
        <span className="material-icons-round text-sm">mic</span>
        Start Live Prayer Session
      </button>

      {/* Progress */}
      <div>
        <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">
          <span>Daily Progress</span>
          <span>2/4 Completed</span>
        </div>
        <div className="flex gap-2 h-1.5 w-full">
          <div className="flex-1 bg-primary rounded-full"></div>
          <div className="flex-1 bg-primary rounded-full"></div>
          <div className="flex-1 bg-primary/20 rounded-full"></div>
          <div className="flex-1 bg-primary/20 rounded-full"></div>
        </div>
      </div>

      {/* S.O.A.P. Cards */}
      <div className="space-y-4">
        <div className="glass rounded-xl p-5 border-l-4 border-l-primary">
          <div className="flex items-center gap-3 mb-3">
            <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">S</span>
            <h3 className="font-bold">Scripture</h3>
          </div>
          <blockquote className="font-serif italic text-lg leading-relaxed text-slate-200 mb-3">
            "Be still, and know that I am God; I will be exalted among the nations, I will be exalted in the earth."
          </blockquote>
          <p className="text-primary text-sm font-semibold">— Psalm 46:10</p>
        </div>

        <div className="glass rounded-xl p-5 border-l-4 border-l-primary">
          <div className="flex items-center gap-3 mb-3">
            <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">O</span>
            <h3 className="font-bold">Observation</h3>
          </div>
          <textarea
            className="w-full bg-transparent border-none focus:ring-0 text-slate-300 placeholder:text-slate-600 resize-none leading-relaxed focus:outline-none"
            placeholder="What caught your attention? What do you notice about God?"
            rows={3}
            value={observation}
            onChange={(e) => setObservation(e.target.value)}
          />
        </div>

        <div className="glass rounded-xl p-5 border-l-4 border-l-primary/50">
          <div className="flex items-center gap-3 mb-3">
            <span className="w-8 h-8 rounded-full bg-primary/50 text-white flex items-center justify-center font-bold text-sm">A</span>
            <h3 className="font-bold">Application</h3>
          </div>
          <textarea
            className="w-full bg-transparent border-none focus:ring-0 text-slate-300 placeholder:text-slate-600 resize-none leading-relaxed focus:outline-none"
            placeholder="How does this apply to your life today?"
            rows={3}
            value={application}
            onChange={(e) => setApplication(e.target.value)}
          />
        </div>

        <div className="glass rounded-xl p-5 border-l-4 border-l-primary/50">
          <div className="flex items-center gap-3 mb-3">
            <span className="w-8 h-8 rounded-full bg-primary/50 text-white flex items-center justify-center font-bold text-sm">P</span>
            <h3 className="font-bold">Prayer</h3>
          </div>
          <textarea
            className="w-full bg-transparent border-none focus:ring-0 text-slate-300 placeholder:text-slate-600 resize-none leading-relaxed focus:outline-none"
            placeholder="Write out your conversation with God..."
            rows={3}
            value={prayer}
            onChange={(e) => setPrayer(e.target.value)}
          />
        </div>
      </div>

      <button className="w-full py-3 bg-primary text-white rounded-xl font-bold text-sm active:scale-[0.98] transition-transform">
        Save Journal Entry
      </button>
    </div>
  );
};

// ── Tab: Bible ──

const BibleTab: React.FC = () => (
  <div className="py-4 space-y-6 animate-fade-in">
    {/* Daily Verse */}
    <div className="relative overflow-hidden rounded-xl p-5 bg-primary/5 border border-primary/10">
      <div className="flex items-center gap-2 mb-3">
        <span className="material-icons-round text-primary text-sm">auto_awesome</span>
        <h3 className="text-xs font-bold uppercase tracking-widest text-primary/80">Verse of the Day</h3>
      </div>
      <p className="text-lg font-serif italic leading-relaxed text-slate-200 mb-3">
        "Trust in the Lord with all your heart and lean not on your own understanding."
      </p>
      <p className="text-primary text-sm font-semibold">— Proverbs 3:5</p>
    </div>

    {/* Reading Plans */}
    <section>
      <h2 className="text-sm font-bold text-slate-300 mb-3">My Reading Plans</h2>
      <div className="space-y-3">
        {READING_PLANS.map(plan => (
          <div key={plan.title} className="bg-surface-dark/50 p-4 rounded-xl border border-white/5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                <span className="material-icons-round">{plan.icon}</span>
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-bold">{plan.title}</h4>
                <p className="text-[11px] text-slate-500">{plan.days}</p>
              </div>
              <span className="text-xs font-bold text-primary">{plan.progress}%</span>
            </div>
            <div className="w-full bg-white/5 h-1.5 rounded-full">
              <div className="bg-primary h-1.5 rounded-full transition-all" style={{ width: `${plan.progress}%` }}></div>
            </div>
          </div>
        ))}
      </div>
    </section>

    {/* Browse */}
    <button className="w-full py-3 bg-surface-dark border border-white/5 rounded-xl text-sm font-semibold text-slate-400 active:bg-white/5 transition-colors flex items-center justify-center gap-2">
      <span className="material-icons-round text-sm">search</span>
      Browse Bible Books
    </button>
  </div>
);

// ── Tab: Prayer Wall ──

const PrayerTab: React.FC = () => (
  <div className="py-4 space-y-4 animate-fade-in">
    <div className="flex justify-between items-center">
      <h2 className="text-sm font-bold text-slate-300">Prayer Requests</h2>
      <button className="bg-primary/10 text-primary px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 active:scale-95 transition-transform">
        <span className="material-icons-round" style={{ fontSize: '14px' }}>add</span>
        Add Prayer
      </button>
    </div>
    {PRAYER_REQUESTS.map((req, i) => (
      <div key={i} className="bg-surface-dark/50 border border-white/5 rounded-xl p-4">
        <div className="flex items-start gap-3 mb-3">
          <div className="relative shrink-0">
            <img className="w-10 h-10 rounded-full object-cover" src={`https://picsum.photos/id/${req.avatar}/100/100`} alt="" />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-surface-dark rounded-full"></div>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h4 className="font-bold text-sm">{req.author}</h4>
              {req.isChurch && <span className="material-icons-round text-blue-400 text-sm">verified</span>}
            </div>
            <p className="text-[11px] text-slate-500">{req.time}</p>
          </div>
        </div>
        <p className="text-sm text-slate-300 leading-relaxed mb-4">{req.content}</p>
        <div className="flex items-center justify-between">
          <div className="flex -space-x-2">
            {[51, 52].map(id => (
              <img key={id} className="w-6 h-6 rounded-full border border-surface-dark" src={`https://picsum.photos/id/${id}/50/50`} alt="" />
            ))}
            <div className="w-6 h-6 rounded-full bg-primary/20 border border-surface-dark flex items-center justify-center text-[10px] font-bold text-primary">
              +{req.prayingCount}
            </div>
          </div>
          <button className="flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-xs font-bold active:scale-95 transition-transform">
            <span className="material-icons-round text-sm">favorite</span>
            Praying
          </button>
        </div>
      </div>
    ))}
  </div>
);

// ── Tab: Audio ──

const AudioTab: React.FC = () => (
  <div className="py-4 space-y-4 animate-fade-in">
    <h2 className="text-sm font-bold text-slate-300">Spiritual Audio</h2>
    {AUDIO_TRACKS.map(track => (
      <div key={track.title} className="flex items-center gap-3 p-3 rounded-xl bg-surface-dark/50 border border-white/5 active:scale-[0.98] transition-transform cursor-pointer">
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
          <span className="material-icons-round">{track.icon}</span>
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-bold truncate">{track.title}</h4>
          <p className="text-[11px] text-slate-500">{track.artist}</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs text-slate-500">{track.duration}</span>
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <span className="material-icons-round text-white text-lg">play_arrow</span>
          </div>
        </div>
      </div>
    ))}
  </div>
);

// ── Tab: Saved ──

const SavedTab: React.FC = () => (
  <div className="py-4 space-y-3 animate-fade-in">
    <h2 className="text-sm font-bold text-slate-300">Saved Items</h2>
    {SAVED_ITEMS.map(item => (
      <div key={item.title} className="flex items-center gap-3 p-3 rounded-xl bg-surface-dark/50 border border-white/5 active:scale-[0.98] transition-transform cursor-pointer">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
          <span className="material-icons-round">{item.icon}</span>
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-bold truncate">{item.title}</h4>
          <p className="text-[11px] text-slate-500">{item.type} · {item.date}</p>
        </div>
        <span className="material-icons-round text-slate-600 text-lg">chevron_right</span>
      </div>
    ))}
  </div>
);

export default Worship;
