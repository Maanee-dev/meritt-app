import React, { useState, useEffect } from 'react';
import { Search, LayoutDashboard, ShoppingBag, GitBranch, MessageSquare, Wallet, Settings, Terminal, ArrowRight } from 'lucide-react';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (tab: string) => void;
}

const COMMANDS = [
  { id: 'dashboard', label: 'Go to Dashboard', icon: LayoutDashboard, shortcut: 'G D' },
  { id: 'marketplace', label: 'Search Marketplace', icon: ShoppingBag, shortcut: 'G M' },
  { id: 'pipeline', label: 'View Pipelines', icon: GitBranch, shortcut: 'G P' },
  { id: 'messages', label: 'Open Inbox', icon: MessageSquare, shortcut: 'G I' },
  { id: 'wallet', label: 'Wallet & Payouts', icon: Wallet, shortcut: 'G W' },
  { id: 'settings', label: 'Workspace Settings', icon: Settings, shortcut: 'G S' },
];

const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose, onNavigate }) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  const filteredCommands = COMMANDS.filter(cmd => 
    cmd.label.toLowerCase().includes(query.toLowerCase())
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
    if (e.key === 'ArrowDown') setSelectedIndex(s => Math.min(s + 1, filteredCommands.length - 1));
    if (e.key === 'ArrowUp') setSelectedIndex(s => Math.max(s - 1, 0));
    if (e.key === 'Enter') {
      if (filteredCommands[selectedIndex]) {
        onNavigate(filteredCommands[selectedIndex].id);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full max-w-xl bg-white dark:bg-dark-surface rounded-2xl shadow-2xl border border-[#E2E8F0] dark:border-dark-border overflow-hidden animate-in slide-in-from-top-4 duration-200">
        <div className="flex items-center px-4 border-b border-[#E2E8F0] dark:border-dark-border h-14 bg-white dark:bg-dark">
          <Search className="w-5 h-5 text-brand mr-3" />
          <input 
            autoFocus
            type="text" 
            placeholder="Type a command or jump to..." 
            className="flex-1 bg-transparent outline-none text-[15px] placeholder-gray-400 dark:text-white"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
          />
          <kbd className="px-2 py-0.5 rounded border border-[#E2E8F0] dark:border-dark-border bg-[#F9FAFB] dark:bg-dark-surface text-[10px] text-gray-400 font-bold uppercase">ESC</kbd>
        </div>

        <div className="p-2 max-h-[400px] overflow-y-auto no-scrollbar">
          {filteredCommands.length > 0 ? (
            filteredCommands.map((cmd, idx) => (
              <button
                key={cmd.id}
                onClick={() => onNavigate(cmd.id)}
                onMouseEnter={() => setSelectedIndex(idx)}
                className={`w-full flex items-center justify-between p-3 rounded-xl text-[13px] transition-all ${
                  idx === selectedIndex ? 'bg-brand text-white shadow-lg shadow-brand/20' : 'text-gray-500 dark:text-gray-400'
                }`}
              >
                <div className="flex items-center gap-3">
                  <cmd.icon className={`w-4 h-4 ${idx === selectedIndex ? 'text-white' : 'text-brand'}`} />
                  <span className="font-bold">{cmd.label}</span>
                </div>
                {idx === selectedIndex ? (
                   <ArrowRight className="w-4 h-4 text-white" />
                ) : (
                  <span className="text-[10px] text-gray-300 font-bold uppercase tracking-tighter">{cmd.shortcut}</span>
                )}
              </button>
            ))
          ) : (
            <div className="p-12 text-center">
              <Terminal className="w-10 h-10 text-brand/10 mx-auto mb-4" />
              <p className="text-gray-400 text-sm font-medium tracking-tight">No actions found for "{query}"</p>
            </div>
          )}
        </div>

        <div className="px-4 py-3 bg-[#F9FAFB] dark:bg-dark border-t border-[#E2E8F0] dark:border-dark-border flex items-center justify-between">
          <div className="flex gap-4">
             <div className="flex items-center gap-1.5 text-[9px] text-gray-400 uppercase font-bold tracking-widest">
                <kbd className="px-1.5 py-0.5 rounded border border-[#E2E8F0] dark:border-dark-border bg-white dark:bg-dark text-brand">↵</kbd>
                Enter
             </div>
             <div className="flex items-center gap-1.5 text-[9px] text-gray-400 uppercase font-bold tracking-widest">
                <kbd className="px-1.5 py-0.5 rounded border border-[#E2E8F0] dark:border-dark-border bg-white dark:bg-dark text-brand">↑↓</kbd>
                Navigate
             </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[9px] text-brand font-bold uppercase tracking-widest italic opacity-50">Meritt Hub v1.0.5</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommandPalette;