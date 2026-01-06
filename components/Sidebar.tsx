import React from 'react';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  GitBranch, 
  MessageSquare, 
  Wallet, 
  Settings,
  LogOut,
  Fingerprint
} from 'lucide-react';
import { TabType, UserRole } from '../types';

interface SidebarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  role: UserRole;
  userName: string;
  userPlan: string;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, role, userName, userPlan, onLogout }) => {
  const allNavItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, roles: ['freelancer', 'business', 'user'] },
    { id: 'marketplace', label: 'Marketplace', icon: ShoppingBag, roles: ['freelancer', 'business', 'user'] },
    { id: 'pipeline', label: 'Pipeline', icon: GitBranch, roles: ['freelancer', 'business'] },
    { id: 'messages', label: 'Messages', icon: MessageSquare, roles: ['freelancer', 'business'] },
    { id: 'wallet', label: 'Wallet', icon: Wallet, roles: ['freelancer'] },
    { id: 'settings', label: 'Settings', icon: Settings, roles: ['freelancer', 'business', 'user'] },
  ];

  const navItems = allNavItems.filter(item => item.roles.includes(role));

  return (
    <aside className="hidden md:flex w-[240px] h-full bg-[#F9FAFB] dark:bg-dark-surface flex-col border-r border-[#E2E8F0] dark:border-dark-border transition-colors">
      <div className="p-8 pb-6">
        <span className="brand-text text-2xl text-brand dark:text-white">meritt.</span>
      </div>

      <div className="px-8 py-2">
        <span className="text-[9px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.3em]">{role} Node</span>
      </div>

      <nav className="flex-1 px-4 mt-6 space-y-1" role="navigation">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id as TabType)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group ${
              activeTab === item.id 
              ? 'bg-white dark:bg-dark border border-[#E2E8F0] dark:border-dark-border shadow-sm text-brand dark:text-white font-bold' 
              : 'text-gray-500 hover:text-brand dark:hover:text-white hover:bg-white dark:hover:bg-dark/40'
            }`}
          >
            <item.icon className={`w-4 h-4 ${activeTab === item.id ? 'text-brand dark:text-white' : ''}`} />
            <span className="text-[12px] font-bold tracking-tight">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-[#E2E8F0] dark:border-dark-border">
        <div className="mb-4 px-2">
          <div className="flex items-center gap-2 px-3 py-2 bg-brand/5 dark:bg-brand/10 border border-brand/10 rounded-xl">
            <Fingerprint className="w-3.5 h-3.5 text-brand" />
            <span className="text-[9px] font-black text-brand uppercase tracking-widest">Meritt ID Sync</span>
          </div>
        </div>
        <div className="flex items-center justify-between gap-3 p-2 rounded-xl hover:bg-white dark:hover:bg-dark-surface group transition-all border border-transparent hover:border-[#E2E8F0]">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-8 h-8 rounded-full bg-brand flex items-center justify-center text-white font-black text-[10px] shadow-lg">
              {userName.charAt(0)}
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-bold text-[12px] truncate dark:text-white tracking-tight">{userName}</span>
              <span className="text-[9px] text-gray-400 font-black uppercase tracking-tighter">{userPlan} Plan</span>
            </div>
          </div>
          <button onClick={onLogout} className="text-gray-300 hover:text-red-500 transition-colors">
            <LogOut className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;