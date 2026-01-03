import React, { useState, useEffect } from 'react';
import { HashRouter as Router } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Marketplace from './components/Marketplace';
import Pipeline from './components/Pipeline';
import Messages from './components/Messages';
import Wallet from './components/Wallet';
import Settings from './components/Settings';
import CommandPalette from './components/CommandPalette';
import Auth from './components/Login';
import BottomNav from './components/BottomNav';
import LandingPage from './components/LandingPage';
import { TabType, UserRole, User } from './types';

type ViewState = 'landing' | 'public-marketplace' | 'login' | 'workspace';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [view, setView] = useState<ViewState>('landing');
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [isCommandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandPaletteOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleLogin = (role: UserRole) => {
    setUser({
      id: '1',
      name: role === 'freelancer' ? 'Jauzaf Dhonbe' : role === 'business' ? 'TechWave Maldives' : 'Standard Visitor',
      role: role,
      plan: role === 'freelancer' ? 'Professional' : 'Standard'
    });
    setView('workspace');
    if (role === 'user') setActiveTab('marketplace');
  };

  const handleLogout = () => {
    setUser(null);
    setView('landing');
    setActiveTab('dashboard');
  };

  const handleExploreMarketplace = () => {
    setView('public-marketplace');
  };

  const handleRequestAuth = () => {
    setView('login');
  };

  if (!user) {
    if (view === 'landing') {
      return (
        <LandingPage 
          onExplore={handleExploreMarketplace} 
          onLogin={() => setView('login')} 
          onJoin={() => setView('login')} 
        />
      );
    }
    if (view === 'public-marketplace') {
      return (
        <div className="min-h-screen bg-white dark:bg-dark">
          <header className="h-[64px] border-b border-[#E2E8F0] dark:border-dark-border bg-white dark:bg-dark flex items-center justify-between px-6">
            <div className="flex items-center cursor-pointer" onClick={() => setView('landing')}>
              <span className="brand-text text-2xl text-brand">meritt.</span>
            </div>
            <div className="flex gap-4">
               <button onClick={() => setView('login')} className="text-gray-500 font-bold text-sm hover:text-brand transition-colors">Log In</button>
               <button onClick={() => setView('login')} className="bg-brand text-white px-5 py-2 rounded-xl font-black text-xs uppercase tracking-widest shadow-lg shadow-brand/20">Join</button>
            </div>
          </header>
          <main className="p-4 md:p-8 max-w-7xl mx-auto">
             <Marketplace role="user" isPublic onAuthRequired={handleRequestAuth} />
          </main>
        </div>
      );
    }
    return <Auth onLogin={handleLogin} onBack={() => setView('landing')} />;
  }

  return (
    <Router>
      <div className="flex h-screen w-screen overflow-hidden bg-white dark:bg-dark text-[13px] transition-colors">
        <Sidebar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          role={user.role} 
          userName={user.name} 
          userPlan={user.plan}
          onLogout={handleLogout}
        />

        <div className="flex flex-col flex-1 min-w-0 md:border-l border-[#E2E8F0] dark:border-dark-border">
          <Header 
            onOpenCommandPalette={() => setCommandPaletteOpen(true)} 
            onLogout={handleLogout} 
            darkMode={darkMode}
            setDarkMode={setDarkMode}
          />
          
          <main className="flex-1 overflow-y-auto bg-white dark:bg-dark p-4 md:p-6 no-scrollbar pb-24 md:pb-6 transition-colors">
            {activeTab === 'dashboard' && <Dashboard role={user.role} />}
            {activeTab === 'marketplace' && <Marketplace role={user.role} />}
            {activeTab === 'pipeline' && <Pipeline />}
            {activeTab === 'messages' && <Messages />}
            {activeTab === 'wallet' && <Wallet />}
            {activeTab === 'settings' && <Settings user={user} />}
          </main>
        </div>

        <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} role={user.role} />

        <CommandPalette 
          isOpen={isCommandPaletteOpen} 
          onClose={() => setCommandPaletteOpen(false)} 
          onNavigate={(tab) => {
            setActiveTab(tab as TabType);
            setCommandPaletteOpen(false);
          }}
        />
      </div>
    </Router>
  );
};

export default App;