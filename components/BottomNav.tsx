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
    { id: 'dashboard', label: 'Dash', icon: LayoutDashboard, roles: ['freelancer', 'business', 'user'] },
    { id: 'marketplace', label: 'Market', icon: ShoppingBag, roles: ['freelancer', 'business', 'user'] },
    { id: 'pipeline', label: 'Pipe', icon: GitBranch, roles: ['freelancer', 'business'] },
    { id: 'messages', label: 'Inbox', icon: MessageSquare, roles: ['freelancer', 'business'] },
    { id: 'wallet', label: 'Wallet', icon: Wallet, roles: ['freelancer'] },
    { id: 'settings', label: 'Settings', icon: Settings, roles: ['freelancer', 'business', 'user'] },
  ];

  const navItems = allNavItems.filter(item => item.roles.includes(role));

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 h-[64px] bg-white dark:bg-dark border-t border-[#E2E8F0] dark:border-dark-border flex items-center justify-between px-1 z-40 shadow-[0_-4px_24px_rgba(0,0,0,0.06)] transition-colors">
      {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() => setActiveTab(item.id as TabType)}
          className={`flex flex-col items-center justify-center gap-1 h-full min-w-0 flex-1 transition-all relative ${
            activeTab === item.id ? 'text-brand' : 'text-gray-400'
          }`}
        >
          <div className={`p-1.5 rounded-xl transition-all ${activeTab === item.id ? 'bg-brand/5' : ''}`}>
             <item.icon className={`w-[18px] h-[18px] md:w-[20px] md:h-[20px] ${activeTab === item.id ? 'stroke-[2.5px]' : 'stroke-[2px]'}`} />
          </div>
          <span className={`text-[9px] font-bold tracking-tight text-center uppercase truncate w-full px-1 ${
            activeTab === item.id ? 'opacity-100' : 'opacity-60'
          }`}>
            {item.label}
          </span>
          {activeTab === item.id && (
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-[2px] bg-brand rounded-full"></div>
          )}
        </button>
      ))}
    </nav>
  );
};

export default BottomNav;