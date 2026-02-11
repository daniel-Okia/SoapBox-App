
import React, { useState, useRef, useEffect } from 'react';
import { startLivePrayerSession } from '../services/geminiService';
import { decodeBase64, decodeAudioData, createPcmBlob } from '../utils/audioUtils';

const Worship: React.FC = () => {
  const [observation, setObservation] = useState('');
  const [isPrayerActive, setIsPrayerActive] = useState(false);
  const [isLiveConnected, setIsLiveConnected] = useState(false);
  
  // Live API Refs
  const audioContextRef = useRef<AudioContext | null>(null);
  const inputAudioContextRef = useRef<AudioContext | null>(null);
  const outputNodeRef = useRef<GainNode | null>(null);
  const nextStartTimeRef = useRef(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const sessionRef = useRef<any>(null);

  const startSanctuary = async () => {
    setIsPrayerActive(true);
    
    // Initialize contexts
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
    <div className="px-6 pb-24">
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
          
          <button 
            onClick={endSanctuary}
            className="mt-24 px-8 py-3 bg-white/5 border border-white/10 rounded-full text-white font-bold hover:bg-white/10 transition-all"
          >
            Leave Sanctuary
          </button>
        </div>
      )}

      <header className="py-8 flex justify-between items-start">
        <div>
          <h2 className="font-serif text-4xl mb-2">Worship</h2>
          <p className="text-primary/70 font-medium">Daily Reflection & S.O.A.P. Journaling</p>
        </div>
        <button 
          onClick={startSanctuary}
          className="bg-primary/10 border border-primary/20 text-primary px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2 hover:bg-primary/20 transition-all active:scale-95"
        >
          <span className="material-icons-round text-sm">mic</span>
          LIVE PRAYER
        </button>
      </header>

      <div className="mb-10">
        <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-primary/40 mb-3">
          <span>Daily Progress</span>
          <span>2/4 Completed</span>
        </div>
        <div className="flex gap-2 h-1.5 w-full">
          <div className="flex-1 bg-primary rounded-full shadow-[0_0_8px_rgba(219,41,121,0.5)]"></div>
          <div className="flex-1 bg-primary rounded-full shadow-[0_0_8px_rgba(219,41,121,0.5)]"></div>
          <div className="flex-1 bg-primary/20 rounded-full"></div>
          <div className="flex-1 bg-primary/20 rounded-full"></div>
        </div>
      </div>

      <section className="space-y-6 mb-12">
        <div className="glass rounded-xl p-6 border-l-4 border-l-primary">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">S</span>
            <h3 className="font-bold text-lg">Scripture</h3>
          </div>
          <blockquote className="font-serif italic text-xl leading-relaxed text-slate-200 mb-4">
            "Be still, and know that I am God; I will be exalted among the nations, I will be exalted in the earth."
          </blockquote>
          <p className="text-primary text-sm font-semibold">— Psalm 46:10</p>
        </div>

        <div className="glass rounded-xl p-6 border-l-4 border-l-primary">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">O</span>
            <h3 className="font-bold text-lg">Observation</h3>
          </div>
          <textarea 
            className="w-full bg-transparent border-none focus:ring-0 text-slate-300 placeholder:text-slate-600 resize-none leading-relaxed" 
            placeholder="What caught your attention? What do you notice about God?" 
            rows={3}
            value={observation}
            onChange={(e) => setObservation(e.target.value)}
          />
          <div className="flex justify-end mt-2">
            <span className={`material-icons text-sm transition-colors ${observation ? 'text-primary' : 'text-primary/40'}`}>check_circle</span>
          </div>
        </div>

        {['Application', 'Prayer'].map((step, i) => (
          <div key={step} className="glass rounded-xl p-6 opacity-60">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-8 rounded-full bg-primary/30 text-white/50 flex items-center justify-center font-bold text-sm">
                {step.charAt(0)}
              </span>
              <h3 className="font-bold text-lg">{step}</h3>
            </div>
            <p className="text-slate-500 italic text-sm">
              {i === 0 ? "How does this apply to your life today?" : "Write out your conversation with God..."}
            </p>
          </div>
        ))}
      </section>

      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-serif text-2xl">Prayer Wall</h3>
          <button className="text-primary text-sm font-bold flex items-center gap-1">
            VIEW ALL <span className="material-icons text-sm">arrow_forward</span>
          </button>
        </div>
        <div className="space-y-4">
          <div className="bg-primary/5 border border-primary/10 rounded-xl p-5 shadow-lg shadow-primary/5">
            <div className="flex items-start gap-3 mb-3">
              <div className="relative">
                <img className="w-10 h-10 rounded-full object-cover" src="https://picsum.photos/id/1011/100/100" alt="Sarah" />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-background-dark rounded-full"></div>
              </div>
              <div>
                <h4 className="font-bold text-sm">Sarah Jenkins</h4>
                <p className="text-xs text-primary/50">20 minutes ago</p>
              </div>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed mb-4">
              Please pray for my mother's surgery tomorrow morning. We are trusting in God's healing hands.
            </p>
            <div className="flex items-center justify-between">
              <div className="flex -space-x-2">
                {[1, 2].map(id => (
                  <img key={id} className="w-6 h-6 rounded-full border border-background-dark" src={`https://picsum.photos/id/${id+50}/50/50`} alt="" />
                ))}
                <div className="w-6 h-6 rounded-full bg-primary/20 border border-background-dark flex items-center justify-center text-[10px] font-bold">+12</div>
              </div>
              <button className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-full text-xs font-bold transition-all active:scale-95 shadow-lg shadow-primary/20">
                <span className="material-icons text-sm">favorite</span>
                PRAYING FOR YOU
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Worship;
