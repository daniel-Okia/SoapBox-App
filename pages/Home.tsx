
import React, { useState } from 'react';
import { getSpiritualReflection } from '../services/geminiService';

const Home: React.FC = () => {
  const [reflection, setReflection] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleReflect = async () => {
    setLoading(true);
    const result = await getSpiritualReflection("Psalm 23:1-2: The Lord is my shepherd; I shall not want. He makes me lie down in green pastures.");
    setReflection(result);
    setLoading(false);
  };

  return (
    <div>
      <header className="px-4 py-3 flex justify-between items-center sticky top-0 bg-background-dark/80 backdrop-blur-md z-40 border-b border-primary/10">
        <div className="flex gap-6">
          <button className="relative py-1">
            <span className="text-lg font-extrabold tracking-tight">For You</span>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-1 bg-primary rounded-full"></div>
          </button>
          <button className="py-1">
            <span className="text-lg font-medium text-slate-500">Following</span>
          </button>
        </div>
        <div className="flex gap-4">
          <button className="p-2 rounded-full bg-primary/10 text-primary">
            <span className="material-icons-round text-xl">search</span>
          </button>
          <div className="w-10 h-10 rounded-full border-2 border-primary/30 p-0.5">
            <img className="w-full h-full rounded-full object-cover" src="https://picsum.photos/id/64/100/100" alt="User" />
          </div>
        </div>
      </header>

      <section className="py-4 border-b border-primary/5">
        <div className="flex gap-4 px-4 overflow-x-auto hide-scrollbar">
          <div className="flex flex-col items-center gap-1.5 shrink-0">
            <div className="relative w-16 h-16 rounded-full border-2 border-dashed border-primary/40 p-1 flex items-center justify-center">
              <span className="material-icons-round text-primary text-2xl">add</span>
            </div>
            <span className="text-[10px] font-medium opacity-60">My Story</span>
          </div>
          {['Pastor John', 'Youth Group', 'City Church', 'Worship Band'].map((name, i) => (
            <div key={name} className="flex flex-col items-center gap-1.5 shrink-0">
              <div className={`w-16 h-16 rounded-full p-0.5 ${i < 2 ? 'bg-gradient-to-tr from-primary to-indigo-500' : 'bg-slate-500/20'}`}>
                <div className="w-full h-full rounded-full bg-background-dark p-0.5">
                  <img className="w-full h-full rounded-full object-cover" src={`https://picsum.photos/id/${i+20}/100/100`} alt={name} />
                </div>
              </div>
              <span className={`text-[10px] ${i < 2 ? 'font-bold' : 'font-medium opacity-40'}`}>{name}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="px-4 py-6">
        <div className="relative overflow-hidden rounded-xl p-6 bg-primary/10 border border-primary/20 ambient-glow">
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <span className="material-icons-round text-primary text-sm">auto_awesome</span>
              <h3 className="text-xs font-bold uppercase tracking-widest text-primary/80">Daily Bread</h3>
            </div>
            <p className="text-2xl font-extrabold mb-4 leading-tight italic">"The Lord is my shepherd; I shall not want. He makes me lie down in green pastures."</p>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium opacity-70">Psalm 23:1-2</span>
              <button 
                onClick={handleReflect}
                disabled={loading}
                className="bg-primary text-white px-4 py-1.5 rounded-full text-xs font-bold active:scale-95 transition-transform disabled:opacity-50"
              >
                {loading ? 'Thinking...' : 'Reflect'}
              </button>
            </div>
            {reflection && (
              <div className="mt-4 p-4 bg-white/5 rounded-lg border border-primary/10 animate-fade-in">
                <p className="text-sm text-slate-300 italic">"{reflection}"</p>
              </div>
            )}
          </div>
          <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>
        </div>
      </section>

      <div className="flex flex-col">
        <PostItem 
          author="Main Street Church" 
          time="2h ago" 
          content="Join us this Sunday at 10 AM for a special communion service. We'll be welcoming our guest speaker, Dr. Sarah Evans."
          image="https://picsum.photos/id/1018/800/600"
          likes={24}
          comments={8}
          isVerified
        />
        <PostItem 
          author="Michael Chen" 
          time="5h ago" 
          content="Has anyone else been reading through Romans 8 this week? 'There is therefore now no condemnation...' Such a powerful reminder of grace! 🙏"
          likes={156}
          comments={42}
        />
      </div>
    </div>
  );
};

const PostItem: React.FC<{ author: string, time: string, content: string, image?: string, likes: number, comments: number, isVerified?: boolean }> = ({ author, time, content, image, likes, comments, isVerified }) => (
  <article className="p-4 border-b border-primary/5">
    <div className="flex gap-3">
      <div className="shrink-0 w-11 h-11 rounded-lg overflow-hidden bg-primary/20 flex items-center justify-center">
        {isVerified ? (
          <span className="material-icons-round text-primary">church</span>
        ) : (
          <img src={`https://picsum.photos/seed/${author}/100/100`} className="w-full h-full object-cover" alt="" />
        )}
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between mb-1">
          <h4 className="font-bold flex items-center gap-1">
            {author}
            {isVerified && <span className="material-icons-round text-blue-400 text-sm">verified</span>}
          </h4>
          <span className="text-xs opacity-50">{time}</span>
        </div>
        <p className="text-[15px] leading-relaxed mb-3 text-slate-300">{content}</p>
        {image && (
          <div className="rounded-xl overflow-hidden mb-4 border border-primary/10">
            <img className="w-full h-52 object-cover" src={image} alt="Post" />
          </div>
        )}
        <div className="flex justify-between items-center px-2">
          <button className="flex items-center gap-1.5 text-slate-500 hover:text-primary transition-colors">
            <span className="material-icons-round text-[20px]">favorite_border</span>
            <span className="text-xs font-semibold">{likes}</span>
          </button>
          <button className="flex items-center gap-1.5 text-slate-500">
            <span className="material-icons-round text-[20px]">chat_bubble_outline</span>
            <span className="text-xs font-semibold">{comments}</span>
          </button>
          <button className="flex items-center gap-1.5 text-slate-500">
            <span className="material-icons-round text-[20px]">ios_share</span>
          </button>
          <button className="flex items-center gap-1.5 text-primary bg-primary/10 px-3 py-1 rounded-full active:scale-95">
            <span className="material-icons-round text-[18px]">volunteer_activism</span>
            <span className="text-xs font-bold uppercase tracking-tight">Amen</span>
          </button>
        </div>
      </div>
    </div>
  </article>
);

export default Home;
