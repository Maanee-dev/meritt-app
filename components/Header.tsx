import React, { useState, useRef, useEffect } from 'react';
import { Search, Bell, Sun, Moon, LogOut, User as UserIcon, Settings as SettingsIcon, ChevronDown, Fingerprint } from 'lucide-react';

interface HeaderProps {
  onOpenCommandPalette: () => void;
  onLogout: () => void;
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ onOpenCommandPalette, onLogout, darkMode, setDarkMode }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="h-[72px] border-b border-[#E2E8F0] dark:border-dark-border bg-white/80 dark:bg-dark/80 backdrop-blur-md flex items-center justify-between px-4 md:px-8 shrink-0 z-40 transition-all sticky top-0" role="banner">
      {/* Mobile Logo / Branding */}
      <div className="flex items-center md:hidden">
        <span className="brand-text text-2xl text-brand dark:text-white">meritt.</span>
      </div>

      {/* Desktop Command Palette Trigger */}
      <div className="hidden md:flex flex-1 max-w-lg">
        <button 
          onClick={onOpenCommandPalette}
          className="w-full flex items-center gap-3 px-5 py-2.5 rounded-2xl border border-[#E2E8F0] dark:border-dark-border bg-[#F1F5F9]/50 dark:bg-dark-surface/50 text-gray-400 hover:border-brand dark:hover:border-white/20 transition-all text-left shadow-sm group"
        >
          <Search className="w-4 h-4 shrink-0 group-hover:text-brand transition-colors" />
          <span className="flex-1 truncate text-[12px] font-medium tracking-tight">Search workspace or commands...</span>
          <div className="flex items-center gap-1 shrink-0 opacity-40 group-hover:opacity-100 transition-opacity">
            <kbd className="px-2 py-1 rounded-lg border border-[#E2E8F0] dark:border-dark-border bg-white dark:bg-dark text-[10px] font-black">⌘ K</kbd>
          </div>
        </button>
      </div>

      {/* Global Actions */}
      <div className="flex items-center gap-2 md:gap-5">
        <div className="flex items-center p-1 bg-slate-50 dark:bg-dark-surface border border-slate-100 dark:border-dark-border rounded-xl">
          <button 
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 text-gray-400 hover:text-brand dark:hover:text-white transition-all rounded-lg hover:bg-white dark:hover:bg-dark"
            title="Toggle Theme"
            aria-label="Toggle Dark Mode"
          >
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          
          <button className="text-gray-400 hover:text-brand transition-colors relative p-2 hover:bg-white dark:hover:bg-dark rounded-lg" aria-label="Notifications">
            <Bell className="w-4 h-4" />
            <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-brand rounded-full border-2 border-white dark:border-dark animate-pulse"></span>
          </button>
        </div>

        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-2 p-1.5 pr-2.5 rounded-2xl bg-slate-50 dark:bg-dark-surface border border-slate-100 dark:border-dark-border hover:border-brand dark:hover:border-white/20 transition-all group"
            aria-expanded={isProfileOpen}
            aria-haspopup="true"
          >
            <div className="w-8 h-8 rounded-xl bg-brand flex items-center justify-center text-white font-black text-xs shadow-lg shadow-brand/20">
              JD
            </div>
            <ChevronDown className={`hidden md:block w-3.5 h-3.5 text-slate-400 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
          </button>

          {isProfileOpen && (
            <div className="absolute right-0 mt-3 w-64 bg-white dark:bg-dark-surface border border-[#E2E8F0] dark:border-dark-border rounded-[24px] shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 z-50">
              <div className="p-6 border-b border-gray-100 dark:border-dark-border bg-[#F9FAFB] dark:bg-dark/20">
                <p className="text-[15px] font-black dark:text-white leading-none">Jauzaf Dhonbe</p>
                <div className="flex items-center gap-1.5 mt-2">
                  <Fingerprint className="w-3.5 h-3.5 text-brand" />
                  <p className="text-[10px] text-brand font-black uppercase tracking-widest">Meritt ID Verified</p>
                </div>
              </div>
              <div className="p-2.5">
                <button className="w-full flex items-center gap-3 px-3 py-2.5 text-[12px] text-gray-600 dark:text-gray-300 hover:bg-slate-50 dark:hover:bg-dark rounded-xl transition-all font-bold group">
                  <UserIcon className="w-4 h-4 group-hover:text-brand transition-colors" /> Identity Vault
                </button>
                <button className="w-full flex items-center gap-3 px-3 py-2.5 text-[12px] text-gray-600 dark:text-gray-300 hover:bg-slate-50 dark:hover:bg-dark rounded-xl transition-all font-bold group">
                  <SettingsIcon className="w-4 h-4 group-hover:text-brand transition-colors" /> Workspace Settings
                </button>
                <div className="h-px bg-gray-100 dark:bg-dark-border my-2 mx-3" />
                <button 
                  onClick={onLogout}
                  className="w-full flex items-center gap-3 px-3 py-2.5 text-[12px] text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-xl transition-all font-black uppercase tracking-widest"
                >
                  <LogOut className="w-4 h-4" /> End Session
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;