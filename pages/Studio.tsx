
import React, { useState } from 'react';
import { generateSermonOutline, generateVisualAsset } from '../services/geminiService';

const Studio: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [outline, setOutline] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  
  // Image Gen State
  const [imagePrompt, setImagePrompt] = useState('');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);

  const handleGenerateOutline = async () => {
    if (!topic) return;
    setLoading(true);
    const result = await generateSermonOutline(topic);
    setOutline(result);
    setLoading(false);
  };

  const handleGenerateImage = async () => {
    if (!imagePrompt) return;
    setIsGeneratingImage(true);
    const result = await generateVisualAsset(imagePrompt);
    setGeneratedImage(result);
    setIsGeneratingImage(false);
  };

  return (
    <div className="px-6 pb-32">
      <header className="sticky top-0 z-50 pt-12 pb-4 bg-background-dark/80 backdrop-blur-md">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight">Creator Studio</h1>
            <p className="text-xs font-medium text-primary/80 uppercase tracking-widest mt-0.5">SoapBox Pro</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
              <span className="material-icons-round text-xl">notifications</span>
            </button>
            <div className="w-10 h-10 rounded-full border-2 border-primary overflow-hidden">
              <img className="w-full h-full object-cover" src="https://picsum.photos/id/1062/100/100" alt="Avatar" />
            </div>
          </div>
        </div>
      </header>

      <main className="space-y-12 mt-4">
        {/* Sermon Outliner */}
        <section className="space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500">Sermon Architect</h2>
          <div className="flex flex-col gap-3">
            <input 
              type="text" 
              placeholder="Topic or Scripture..."
              className="bg-white/5 border-primary/20 rounded-xl px-4 py-3 focus:ring-primary focus:border-primary text-white"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
            <button 
              onClick={handleGenerateOutline}
              disabled={loading}
              className="w-full bg-primary hover:bg-primary/90 text-white rounded-xl py-4 px-6 flex items-center justify-center gap-3 shadow-lg shadow-primary/20 transition-all active:scale-[0.98] disabled:opacity-50"
            >
              <span className="material-icons-round">{loading ? 'sync' : 'auto_awesome'}</span>
              <span className="font-bold text-lg">{loading ? 'AI Outlining...' : 'Generate AI Outline'}</span>
            </button>
          </div>

          {outline && (
            <div className="mt-6 glass p-6 rounded-2xl whitespace-pre-wrap text-sm text-slate-200 leading-relaxed font-serif animate-fade-in">
              <div className="flex justify-between mb-4">
                <span className="text-xs font-bold text-primary uppercase">Draft Generated</span>
                <button onClick={() => setOutline(null)} className="material-icons-round text-sm opacity-50">close</button>
              </div>
              {outline}
            </div>
          )}
        </section>

        {/* Visual Asset Generator */}
        <section className="space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500">Visual Creation</h2>
          <div className="glass p-6 rounded-2xl space-y-4">
            <div className="flex flex-col gap-3">
              <textarea 
                placeholder="Describe the aesthetic (e.g. Minimalist sunset over mountains with peace theme)..."
                className="bg-background-dark border-primary/10 rounded-xl px-4 py-3 focus:ring-primary focus:border-primary text-white text-sm resize-none"
                rows={3}
                value={imagePrompt}
                onChange={(e) => setImagePrompt(e.target.value)}
              />
              <button 
                onClick={handleGenerateImage}
                disabled={isGeneratingImage}
                className="w-full bg-white/10 hover:bg-white/15 text-white border border-white/10 rounded-xl py-3 px-6 flex items-center justify-center gap-3 transition-all active:scale-[0.98] disabled:opacity-50"
              >
                <span className="material-icons-round">{isGeneratingImage ? 'brush' : 'photo_library'}</span>
                <span className="font-bold">{isGeneratingImage ? 'Painting...' : 'Generate Visual Asset'}</span>
              </button>
            </div>
            
            {generatedImage && (
              <div className="mt-4 rounded-xl overflow-hidden border border-primary/20 relative animate-fade-in group">
                <img src={generatedImage} alt="Generated Asset" className="w-full aspect-square object-cover" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity gap-4">
                  <button className="bg-white text-background-dark p-3 rounded-full shadow-xl">
                    <span className="material-icons-round">download</span>
                  </button>
                  <button className="bg-primary text-white p-3 rounded-full shadow-xl">
                    <span className="material-icons-round">share</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Tools Grid */}
        <section className="space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500">AI Power Tools</h2>
          <div className="grid grid-cols-2 gap-4">
            <ToolCard icon="movie_filter" title="Clip Generator" desc="AI-driven vertical highlights for socials." />
            <ToolCard icon="history_edu" title="Script Assistant" desc="Refine your message with theological checks." />
            <ToolCard icon="analytics" title="Impact Insights" desc="Spiritual growth & engagement metrics." />
            <ToolCard icon="translate" title="Global Outreach" desc="Instant multi-language sermon translation." />
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500">Asset Library</h2>
          <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar">
            <AssetCard icon="mic" label="Recordings" count="14 files" />
            <AssetCard icon="video_library" label="Video Raw" count="8 projects" />
            <AssetCard icon="auto_stories" label="Transcripts" count="32 items" />
          </div>
        </section>
      </main>
    </div>
  );
};

const ToolCard: React.FC<{ icon: string, title: string, desc: string, active?: boolean }> = ({ icon, title, desc, active }) => (
  <div className={`glass p-5 rounded-xl space-y-3 relative overflow-hidden transition-all active:scale-95 ${active ? 'border-b-2 border-primary/40' : ''}`}>
    <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
      <span className="material-icons-round">{icon}</span>
    </div>
    <div>
      <h3 className="font-bold text-sm">{title}</h3>
      <p className="text-[10px] text-slate-400 leading-tight mt-1">{desc}</p>
    </div>
  </div>
);

const AssetCard: React.FC<{ icon: string, label: string, count: string }> = ({ icon, label, count }) => (
  <div className="min-w-[140px] aspect-[4/5] glass rounded-xl flex flex-col items-center justify-center gap-2">
    <span className="material-icons-round text-3xl text-primary/40">{icon}</span>
    <span className="text-xs font-semibold">{label}</span>
    <span className="text-[10px] text-slate-500">{count}</span>
  </div>
);

export default Studio;
