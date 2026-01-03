
import React, { useState, useEffect } from 'react';
import { 
  Search, 
  SlidersHorizontal, 
  UserPlus, 
  ArrowUpRight, 
  BadgeCheck, 
  Zap, 
  Clock, 
  Briefcase, 
  Users, 
  MapPin, 
  Bookmark, 
  Share2, 
  Star,
  Calendar,
  DollarSign,
  ChevronRight,
  Info
} from 'lucide-react';
import { UserRole } from '../types';

interface MarketplaceProps {
  role: UserRole;
  isPublic?: boolean;
  onAuthRequired?: () => void;
}

const MOCK_JOBS = [
  { 
    id: 'j1', 
    title: 'Senior Software Engineer', 
    company: 'Oceanic Retail Group',
    location: 'Malé / Remote',
    price: 'MVR 1,800 / hr', 
    duration: '3 Months',
    description: 'Lead our e-commerce migration to Next.js. Must have experience with BML/MIB payment gateway integrations and high-concurrency Node.js environments.',
    skills: ['React', 'Node.js', 'BML Gateway'],
    verified: true,
    isNew: true,
    posted: '2h ago'
  },
  { 
    id: 'j2', 
    title: 'Visual Identity Designer', 
    company: 'Boutique Maldives',
    location: 'Hulhumalé',
    price: 'MVR 15,000 / project', 
    duration: 'Fixed Price',
    description: 'Rebrand our luxury resort chain. Deliverables include logo, brand book, stationery, and social media templates for the 2024 season.',
    skills: ['Branding', 'Illustrator', 'Marketing'],
    verified: true,
    isNew: false,
    posted: '1d ago'
  },
  { 
    id: 'j3', 
    title: 'Social Media Strategist', 
    company: 'Island Flavors',
    location: 'Remote',
    price: 'MVR 5,000 / mo', 
    duration: 'Ongoing',
    description: 'Manage 3 Instagram accounts for a local food startup. Knowledge of Dhivehi copywriting and local culture trends is highly preferred.',
    skills: ['Instagram', 'Dhivehi', 'Canva'],
    verified: false,
    isNew: true,
    posted: '4h ago'
  },
  { 
    id: 'j4', 
    title: 'Mobile App Developer', 
    company: 'TechWave MV',
    location: 'Remote',
    price: 'MVR 2,500 / hr', 
    duration: '6 Months',
    description: 'Develop a guest experience app for a new resort opening in Baa Atoll. Flutter or React Native experts preferred.',
    skills: ['Flutter', 'Firebase', 'Mobile'],
    verified: true,
    isNew: true,
    posted: '12h ago'
  },
  { 
    id: 'j5', 
    title: 'Motion Graphics Artist', 
    company: 'Pulse Media',
    location: 'Malé',
    price: 'MVR 12,000 / video', 
    duration: 'Per Video',
    description: 'Create high-impact 30-second promotional videos for local TV ads and social media campaigns.',
    skills: ['After Effects', 'Cinema 4D', 'Motion'],
    verified: true,
    isNew: false,
    posted: '2d ago'
  },
  { 
    id: 'j6', 
    title: 'Financial Auditor', 
    company: 'Maldives Logistics',
    location: 'Malé',
    price: 'MVR 8,000 / audit', 
    duration: 'Project-based',
    description: 'Perform internal audits for a mid-sized logistics firm. Must be familiar with MIRA tax regulations.',
    skills: ['Accounting', 'MIRA', 'Auditing'],
    verified: false,
    isNew: false,
    posted: '3d ago'
  }
];

const MOCK_TALENT = [
  { 
    id: 't1', 
    name: 'Ahmed Zayaan', 
    title: 'Full-stack Architect',
    location: 'Malé, MV',
    price: 'MVR 450 / hr', 
    description: '8+ years of experience building scalable apps. Specialized in fintech and real-time systems. Former CTO at Maldives Fast-Pay.',
    skills: ['Go', 'React', 'AWS'],
    rating: 4.9,
    projects: 42,
    verified: true,
    isNew: false
  },
  { 
    id: 't2', 
    name: 'Mariyam Safoora', 
    title: 'UI/UX Designer',
    location: 'Addu City',
    price: 'MVR 350 / hr', 
    description: 'Clean, accessible interfaces for mobile and web. I focus on user psychology and brand consistency for Maldives-based startups.',
    skills: ['Figma', 'Prototyping', 'User Research'],
    rating: 5.0,
    projects: 28,
    verified: true,
    isNew: false
  },
  { 
    id: 't3', 
    name: 'Ibrahim Rafeeq', 
    title: 'Dhivehi Copywriter',
    location: 'Remote',
    price: 'MVR 200 / hr', 
    description: 'Expert in local marketing and literary Dhivehi. I help brands communicate effectively with the Maldivian audience.',
    skills: ['Copywriting', 'SEO', 'Translation'],
    rating: 4.7,
    projects: 15,
    verified: false,
    isNew: true
  },
  { 
    id: 't4', 
    name: 'Nashid Mohamed', 
    title: 'DevOps Engineer',
    location: 'Malé',
    price: 'MVR 500 / hr', 
    description: 'Infrastructure automation and cloud security specialist. Expert in Kubernetes and Docker deployments for local enterprises.',
    skills: ['Docker', 'Kubernetes', 'Security'],
    rating: 4.8,
    projects: 19,
    verified: true,
    isNew: false
  }
];

const Marketplace: React.FC<MarketplaceProps> = ({ role, isPublic = false, onAuthRequired }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewType, setViewType] = useState<'jobs' | 'talent'>('jobs');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const data = viewType === 'jobs' ? MOCK_JOBS : MOCK_TALENT;
  
  useEffect(() => {
    if (data.length > 0) {
      setSelectedId(data[0].id);
    }
  }, [viewType]);

  const selectedItem = data.find(item => item.id === selectedId) || data[0];

  const handleAction = (e: React.MouseEvent) => {
    if (isPublic) {
      e.stopPropagation();
      onAuthRequired?.();
    }
  };

  return (
    <div className="flex flex-col h-full overflow-hidden animate-in fade-in duration-500">
      {/* Header & Controls */}
      <div className="flex flex-col gap-4 mb-6 shrink-0">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-1">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-[#0F172A] dark:text-white">Marketplace</h1>
            <p className="text-xs text-slate-500 font-medium">Find work or discover the best talent in the Maldives.</p>
          </div>
          
          <div className="flex items-center gap-3">
            {/* View Toggle */}
            <div className="flex bg-[#F1F5F9] dark:bg-dark-surface p-1 rounded-xl border border-[#E2E8F0] dark:border-dark-border shadow-sm">
              <button 
                onClick={() => setViewType('jobs')}
                className={`flex items-center gap-2 px-4 py-1.5 text-[12px] font-bold rounded-lg transition-all ${viewType === 'jobs' ? 'bg-white dark:bg-dark text-brand shadow-sm' : 'text-slate-500 hover:text-brand'}`}
              >
                <Briefcase className="w-3.5 h-3.5" />
                Jobs
              </button>
              <button 
                onClick={() => setViewType('talent')}
                className={`flex items-center gap-2 px-4 py-1.5 text-[12px] font-bold rounded-lg transition-all ${viewType === 'talent' ? 'bg-white dark:bg-dark text-brand shadow-sm' : 'text-slate-500 hover:text-brand'}`}
              >
                <Users className="w-3.5 h-3.5" />
                Talent
              </button>
            </div>
            
            <button 
              onClick={handleAction}
              className="flex items-center gap-2 px-5 py-2.5 bg-brand text-white rounded-xl font-bold text-[13px] shadow-lg shadow-brand/20 hover:brightness-110 transition-all"
            >
              <UserPlus className="w-4 h-4" />
              <span>Post {viewType === 'jobs' ? 'Job' : 'Profile'}</span>
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder={`Search ${viewType}...`}
              className="w-full pl-11 pr-4 py-3 bg-white dark:bg-dark-surface border border-[#E2E8F0] dark:border-dark-border rounded-xl text-[14px] focus:border-brand dark:focus:border-brand shadow-sm outline-none dark:text-white transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="p-3 bg-white dark:bg-dark-surface border border-[#E2E8F0] dark:border-dark-border rounded-xl text-slate-500 hover:text-brand transition-colors shadow-sm">
            <SlidersHorizontal className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Split View: List | Preview */}
      <div className="flex-1 flex gap-6 overflow-hidden min-h-0">
        {/* Left: Cards List */}
        <div className="flex-1 overflow-y-auto no-scrollbar pb-10 pr-1">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
            {/* Added explicit type casting to any for property access on union types */}
            {data.filter((item: any) => 
              (item.title || item.name).toLowerCase().includes(searchTerm.toLowerCase()) ||
              item.description.toLowerCase().includes(searchTerm.toLowerCase())
            ).map((item: any) => (
              <div 
                key={item.id}
                onClick={() => setSelectedId(item.id)}
                className={`p-5 bg-white dark:bg-dark-surface border-2 rounded-2xl transition-all cursor-pointer group shadow-sm flex flex-col ${
                  selectedId === item.id 
                  ? 'border-brand ring-2 ring-brand/5' 
                  : 'border-[#E2E8F0] dark:border-dark-border hover:border-brand/30'
                }`}
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-slate-900 dark:text-white group-hover:text-brand transition-colors truncate text-[15px]">
                        {item.title || item.name}
                      </h3>
                      {item.verified && <BadgeCheck className="w-4 h-4 text-brand shrink-0" />}
                    </div>
                    <p className="text-[11px] text-slate-500 font-bold uppercase tracking-tight truncate">
                      {item.company || item.title} • {item.location}
                    </p>
                  </div>
                  {item.isNew && (
                    <span className="bg-brand/10 text-brand px-2 py-0.5 rounded text-[9px] font-extrabold uppercase tracking-widest shrink-0">New</span>
                  )}
                </div>

                <p className="text-[13px] text-slate-600 dark:text-slate-400 line-clamp-2 mb-4 h-10 leading-relaxed font-medium">
                  {item.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {item.skills.slice(0, 3).map((skill: string) => (
                    <span key={skill} className="px-2.5 py-1 bg-slate-100 dark:bg-dark border border-slate-200 dark:border-dark-border text-slate-600 dark:text-slate-400 rounded-lg text-[10px] font-bold">
                      {skill}
                    </span>
                  ))}
                  {item.skills.length > 3 && (
                    <span className="px-2.5 py-1 bg-slate-50 dark:bg-dark border border-slate-100 dark:border-dark-border text-slate-400 rounded-lg text-[10px] font-bold">
                      +{item.skills.length - 3}
                    </span>
                  )}
                </div>

                <div className="mt-auto pt-4 border-t border-slate-100 dark:border-dark-border flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-brand font-extrabold text-[15px]">{item.price}</span>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">{item.posted ? `Posted ${item.posted}` : `${item.rating} Rating`}</span>
                  </div>
                  <ChevronRight className={`w-5 h-5 transition-all ${selectedId === item.id ? 'text-brand translate-x-1' : 'text-slate-300'}`} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Preview Panel (Sticky) */}
        <div className="hidden lg:block w-[380px] xl:w-[420px] h-full sticky top-0 bg-white dark:bg-dark-surface border border-[#E2E8F0] dark:border-dark-border rounded-3xl overflow-hidden shadow-xl animate-in slide-in-from-right-4 transition-colors">
          {selectedItem ? (
            <div className="flex flex-col h-full">
              <div className="h-32 bg-brand/5 dark:bg-brand/10 relative shrink-0">
                <div className="absolute -bottom-8 left-8">
                  {/* Added explicit type casting to any for property access on selectedItem */}
                  <div className="w-20 h-20 bg-brand rounded-2xl flex items-center justify-center text-white font-bold text-3xl border-4 border-white dark:border-dark-surface shadow-2xl">
                    {((selectedItem as any).title || (selectedItem as any).name).charAt(0)}
                  </div>
                </div>
              </div>

              <div className="p-8 pt-12 flex-1 overflow-y-auto no-scrollbar">
                <div className="flex justify-between items-start mb-8">
                  <div className="flex-1 min-w-0 pr-4">
                    {/* Added explicit type casting to any for property access on selectedItem */}
                    <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-1 leading-tight tracking-tight">
                      {(selectedItem as any).title || (selectedItem as any).name}
                    </h2>
                    <div className="flex items-center gap-2">
                      <span className="text-[13px] font-bold text-brand uppercase tracking-wider">
                        {(selectedItem as any).company || (selectedItem as any).title}
                      </span>
                      {selectedItem.verified && <BadgeCheck className="w-4 h-4 text-brand" />}
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-400 text-[11px] font-bold uppercase tracking-widest mt-3">
                      <MapPin className="w-3.5 h-3.5" />
                      {selectedItem.location}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2.5 border border-slate-200 dark:border-dark-border rounded-xl hover:bg-slate-50 dark:hover:bg-dark transition-all shadow-sm">
                      <Bookmark className="w-4 h-4 text-slate-400" />
                    </button>
                    <button className="p-2.5 border border-slate-200 dark:border-dark-border rounded-xl hover:bg-slate-50 dark:hover:bg-dark transition-all shadow-sm">
                      <Share2 className="w-4 h-4 text-slate-400" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="p-4 bg-slate-50 dark:bg-dark rounded-2xl border border-slate-100 dark:border-dark-border shadow-sm">
                    <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-extrabold uppercase mb-2">
                      <DollarSign className="w-3 h-3 text-brand" />
                      Budget / Rate
                    </div>
                    <p className="font-extrabold text-slate-900 dark:text-white text-base">{selectedItem.price}</p>
                  </div>
                  <div className="p-4 bg-slate-50 dark:bg-dark rounded-2xl border border-slate-100 dark:border-dark-border shadow-sm">
                    <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-extrabold uppercase mb-2">
                      <Calendar className="w-3 h-3 text-brand" />
                      {viewType === 'jobs' ? 'Duration' : 'Projects'}
                    </div>
                    {/* Added explicit type casting to any for property access on selectedItem */}
                    <p className="font-extrabold text-slate-900 dark:text-white text-base">{(selectedItem as any).duration || (selectedItem as any).projects}</p>
                  </div>
                </div>

                <div className="space-y-8 pb-8">
                  <div>
                    <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                      <Info className="w-3.5 h-3.5 text-brand" />
                      Full Description
                    </h4>
                    <p className="text-[14px] text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                      {selectedItem.description}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-4">Required Stack</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedItem.skills.map((skill: string) => (
                        <span key={skill} className="px-4 py-2 bg-brand/5 text-brand rounded-xl text-[12px] font-bold border border-brand/10">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-8 pt-0 shrink-0">
                <button 
                  onClick={handleAction}
                  className="w-full py-4 bg-brand text-white rounded-2xl font-bold text-[15px] shadow-2xl shadow-brand/30 hover:brightness-110 transition-all flex items-center justify-center gap-2 mb-3"
                >
                  <span>{viewType === 'jobs' ? 'Apply Now' : 'Hire Expert'}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
                <button className="w-full py-3 text-slate-400 font-bold text-[13px] hover:text-brand hover:bg-brand/5 rounded-xl transition-all">
                  View Public Profile
                </button>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center p-12 text-center text-slate-300 gap-4">
              <Zap className="w-16 h-16 opacity-10" />
              <div>
                <p className="text-sm font-bold uppercase tracking-widest opacity-30 mb-2">No selection</p>
                <p className="text-xs font-medium opacity-30">Click on a card to view detailed information.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Marketplace;
