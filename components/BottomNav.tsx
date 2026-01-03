
import React from 'react';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  GitBranch, 
  MessageSquare, 
  Wallet, 
  Settings 
} from 'lucide-react';
import { TabType, UserRole } from '../types';

interface BottomNavProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  role: UserRole;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeTab, setActiveTab, role }) => {
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
    <nav className="md:hidden fixed bottom-0 left-0 right-0 h-[72px] bg-white dark:bg-dark border-t border-[#E2E8F0] dark:border-dark-border flex items-center justify-around px-2 z-40 shadow-[0_-4px_12px_rgba(0,0,0,0.05)] transition-colors">
      {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() => setActiveTab(item.id as TabType)}
          className={`flex flex-col items-center gap-1.5 min-w-[64px] transition-all py-1 ${
            activeTab === item.id ? 'text-brand' : 'text-gray-400'
          }`}
        >
          <item.icon className={`w-5 h-5 ${activeTab === item.id ? 'stroke-[2.5px]' : 'stroke-[2px]'}`} />
          <span className={`text-[10px] font-bold tracking-tight uppercase ${activeTab === item.id ? 'opacity-100' : 'opacity-80'}`}>
            {item.label}
          </span>
        </button>
      ))}
    </nav>
  );
};

export default BottomNav;
