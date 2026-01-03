
import React, { useState, useRef, useEffect } from 'react';
import { Search, Bell, Sun, Moon, LogOut, User as UserIcon, Settings as SettingsIcon, ChevronDown } from 'lucide-react';

interface HeaderProps {
  onOpenCommandPalette: () => void;
  onLogout: () => void;
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
}

const MerittMLogo = () => (
  <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 32V12L20 22L32 12V32" stroke="#0047FF" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M8 12C8 9.79086 9.79086 8 12 8H28C30.2111 8 32 9.79086 32 12" stroke="#0047FF" strokeWidth="5.5" strokeLinecap="round"/>
  </svg>
);

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
    <header className="h-[72px] md:h-[60px] border-b border-[#E2E8F0] dark:border-dark-border bg-white dark:bg-dark flex items-center justify-between px-4 md:px-6 shrink-0 z-40 transition-colors sticky top-0">
      {/* Mobile Logo / Branding */}
      <div className="flex items-center gap-3 md:hidden">
        <MerittMLogo />
        <span className="font-extrabold text-xl text-brand tracking-tighter">meritt.</span>
      </div>

      {/* Desktop Command Palette Trigger */}
      <div className="hidden md:flex flex-1 max-w-md">
        <button 
          onClick={onOpenCommandPalette}
          className="w-full flex items-center gap-2 px-3 py-1.5 rounded-md border border-[#E2E8F0] dark:border-dark-border bg-[#F9FAFB] dark:bg-dark-surface text-gray-400 hover:border-brand dark:hover:border-brand transition-all text-left shadow-sm"
        >
          <Search className="w-3.5 h-3.5 shrink-0" />
          <span className="flex-1 truncate text-[12px]">Search or jump to...</span>
          <div className="flex items-center gap-1 shrink-0">
            <kbd className="px-1.5 py-0.5 rounded border border-[#E2E8F0] dark:border-dark-border bg-white dark:bg-dark text-[9px] font-sans">⌘</kbd>
            <kbd className="px-1.5 py-0.5 rounded border border-[#E2E8F0] dark:border-dark-border bg-white dark:bg-dark text-[9px] font-sans">K</kbd>
          </div>
        </button>
      </div>

      {/* Global Actions */}
      <div className="flex items-center gap-3 md:gap-4">
        <button 
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 text-gray-400 hover:text-brand transition-all rounded-md"
          title="Toggle Theme"
        >
          {darkMode ? <Sun className="w-5 h-5 md:w-4 md:h-4" /> : <Moon className="w-5 h-5 md:w-4 md:h-4" />}
        </button>
        
        <button className="text-gray-400 hover:text-brand transition-colors relative p-2">
          <Bell className="w-6 h-6 md:w-5 md:h-5" />
          <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white dark:border-dark"></span>
        </button>

        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-2 p-1 rounded-full md:rounded-lg hover:bg-slate-50 dark:hover:bg-dark-surface transition-all border border-transparent hover:border-[#E2E8F0] dark:hover:border-dark-border"
          >
            <div className="w-9 h-9 md:w-8 md:h-8 rounded-full bg-brand flex items-center justify-center text-white font-bold text-sm md:text-xs shadow-sm overflow-hidden">
              JD
            </div>
            <ChevronDown className={`hidden md:block w-3.5 h-3.5 text-slate-400 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
          </button>

          {isProfileOpen && (
            <div className="absolute right-0 mt-3 w-56 bg-white dark:bg-dark-surface border border-[#E2E8F0] dark:border-dark-border rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 z-50">
              <div className="p-4 border-b border-gray-100 dark:border-dark-border bg-[#F9FAFB] dark:bg-dark/20">
                <p className="text-[13px] font-bold dark:text-white">Jauzaf Dhonbe</p>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="w-1.5 h-1.5 bg-brand rounded-full"></span>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Professional</p>
                </div>
              </div>
              <div className="p-2">
                <button className="w-full flex items-center gap-3 px-3 py-2.5 text-[12px] text-gray-600 dark:text-gray-300 hover:bg-slate-50 dark:hover:bg-dark rounded-xl transition-colors text-left font-bold group">
                  <UserIcon className="w-4 h-4 group-hover:text-brand" /> Profile Overview
                </button>
                <button className="w-full flex items-center gap-3 px-3 py-2.5 text-[12px] text-gray-600 dark:text-gray-300 hover:bg-slate-50 dark:hover:bg-dark rounded-xl transition-colors text-left font-bold group">
                  <SettingsIcon className="w-4 h-4 group-hover:text-brand" /> Workspace Settings
                </button>
                <div className="h-px bg-gray-100 dark:bg-dark-border my-1" />
                <button 
                  onClick={onLogout}
                  className="w-full flex items-center gap-3 px-3 py-2.5 text-[12px] text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-xl transition-colors text-left font-extrabold uppercase tracking-widest"
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
