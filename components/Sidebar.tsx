import React from 'react';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  GitBranch, 
  MessageSquare, 
  Wallet, 
  Settings,
  LogOut
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
      {/* Logo Section */}
      <div className="p-8 pb-6 flex items-center justify-between">
        <div className="flex items-center gap-1 cursor-pointer">
          <span className="brand-text text-2xl text-brand">meritt.</span>
        </div>
      </div>

      {/* Workspace Label */}
      <div className="px-8 py-2">
        <span className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em]">{role}</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 mt-4 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id as TabType)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group ${
              activeTab === item.id 
              ? 'bg-white dark:bg-dark border border-[#E2E8F0] dark:border-dark-border shadow-sm text-brand font-bold' 
              : 'text-gray-500 hover:text-brand hover:bg-white dark:hover:bg-dark/40 border border-transparent'
            }`}
          >
            <item.icon className={`w-4 h-4 transition-colors ${activeTab === item.id ? 'text-brand' : 'group-hover:text-brand'}`} />
            <span className="text-[12px] font-semibold">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Bottom Profile Section */}
      <div className="p-4 border-t border-[#E2E8F0] dark:border-dark-border">
        <div className="flex items-center justify-between gap-3 p-2 rounded-xl hover:bg-white dark:hover:bg-dark-surface cursor-pointer group transition-all border border-transparent hover:border-[#E2E8F0] dark:hover:border-dark-border">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-8 h-8 rounded-full bg-brand flex items-center justify-center text-white font-bold text-xs shadow-md">
              {userName.charAt(0)}
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-bold text-[12px] truncate dark:text-white">{userName}</span>
              <span className="text-[10px] text-gray-400 truncate uppercase font-black tracking-tight">{userPlan}</span>
            </div>
          </div>
          <button 
            onClick={(e) => { e.stopPropagation(); onLogout(); }}
            className="opacity-0 group-hover:opacity-100 transition-all p-1 text-gray-400 hover:text-red-500"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;