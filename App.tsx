
import React, { useState } from 'react';
import { Page } from './types';
import Home from './pages/Home';
import Connect from './pages/Connect';
import Worship from './pages/Worship';
import Serve from './pages/Serve';
import Give from './pages/Give';
import Studio from './pages/Studio';
import Soul from './pages/Soul';
import Insights from './pages/Insights';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.HOME);

  const renderPage = () => {
    switch (currentPage) {
      case Page.HOME: return <Home />;
      case Page.CONNECT: return <Connect />;
      case Page.WORSHIP: return <Worship />;
      case Page.SERVE: return <Serve />;
      case Page.GIVE: return <Give />;
      case Page.STUDIO: return <Studio />;
      case Page.SOUL: return <Soul />;
      case Page.INSIGHTS: return <Insights />;
      default: return <Home />;
    }
  };

  return (
    <div className="max-w-[430px] mx-auto min-h-screen relative bg-background-light dark:bg-background-dark border-x border-primary/10 overflow-hidden shadow-2xl flex flex-col">
      {/* Status Bar Mock */}
      <div className="h-10 px-8 flex justify-between items-center bg-transparent shrink-0">
        <span className="text-sm font-bold">9:41</span>
        <div className="flex gap-1.5 items-center">
          <span className="material-icons-round text-[14px]">signal_cellular_alt</span>
          <span className="material-icons-round text-[14px]">wifi</span>
          <span className="material-icons-round text-[14px]">battery_full</span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto hide-scrollbar pb-24">
        {renderPage()}
      </div>

      {/* Bottom Tab Bar Navigation */}
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] h-20 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-xl border-t border-primary/10 px-6 flex justify-between items-center z-50">
        <TabButton 
          icon="home" 
          label="Home" 
          isActive={currentPage === Page.HOME} 
          onClick={() => setCurrentPage(Page.HOME)} 
        />
        <TabButton 
          icon="groups" 
          label="Connect" 
          isActive={currentPage === Page.CONNECT} 
          onClick={() => setCurrentPage(Page.CONNECT)} 
        />
        <TabButton 
          icon="auto_awesome" 
          label="Worship" 
          isActive={currentPage === Page.WORSHIP} 
          onClick={() => setCurrentPage(Page.WORSHIP)} 
        />
        <TabButton 
          icon="volunteer_activism" 
          label="Serve" 
          isActive={currentPage === Page.SERVE} 
          onClick={() => setCurrentPage(Page.SERVE)} 
        />
        <TabButton 
          icon="person" 
          label="Soul" 
          isActive={currentPage === Page.SOUL} 
          onClick={() => setCurrentPage(Page.SOUL)} 
        />
      </nav>

      {/* Admin/Studio Switcher Toggle (Hidden slightly for UI focus) */}
      <button 
        onClick={() => setCurrentPage(prev => prev === Page.STUDIO ? Page.HOME : Page.STUDIO)}
        className="fixed bottom-24 right-6 w-12 h-12 bg-primary/20 backdrop-blur rounded-full flex items-center justify-center text-primary z-40"
      >
        <span className="material-icons-round">{currentPage === Page.STUDIO ? 'close' : 'settings'}</span>
      </button>

      {/* Home Indicator */}
      <div className="fixed bottom-2 left-1/2 -translate-x-1/2 w-32 h-1.5 bg-slate-500/20 rounded-full z-50"></div>
    </div>
  );
};

interface TabButtonProps {
  icon: string;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const TabButton: React.FC<TabButtonProps> = ({ icon, label, isActive, onClick }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center gap-1 transition-colors ${isActive ? 'text-primary' : 'text-slate-400'}`}
  >
    <span className="material-icons-round">{icon}</span>
    <span className="text-[10px] font-bold uppercase tracking-tight">{label}</span>
  </button>
);

export default App;
