import React, { useState, useEffect } from 'react';
import { 
  Search, 
  SlidersHorizontal, 
  UserPlus, 
  ArrowUpRight, 
  BadgeCheck, 
  Zap, 
  Briefcase, 
  Users, 
  MapPin, 
  Bookmark, 
  Share2, 
  Calendar,
  DollarSign,
  ChevronRight,
  Info,
  X
} from 'lucide-react';
import { UserRole } from '../types';

interface MarketplaceProps {
  role: UserRole;
  isPublic?: boolean;
  onAuthRequired?: () => void;
}

const MOCK_JOBS = [
  { id: 'j1', title: 'Senior Software Engineer', company: 'Oceanic Retail', location: 'Malé / Remote', price: 'MVR 1,800/hr', duration: '3 Months', description: 'Lead our e-commerce migration to Next.js. Must have experience with BML/MIB gateway integrations.', skills: ['React', 'Node.js', 'BML'], verified: true, isNew: true, posted: '2h ago' },
  { id: 'j2', title: 'Visual Designer', company: 'Boutique Maldives', location: 'Hulhumalé', price: 'MVR 15k/proj', duration: 'Fixed', description: 'Rebrand luxury resort chain. Deliverables include brand book and social templates.', skills: ['Branding', 'Illustrator'], verified: true, isNew: false, posted: '1d ago' },
  { id: 'j3', title: 'Social Media Strategist', company: 'Island Flavors', location: 'Remote', price: 'MVR 5k/mo', duration: 'Ongoing', description: 'Manage Instagram accounts for food startup. Dhivehi copywriting preferred.', skills: ['Instagram', 'Dhivehi'], verified: false, isNew: true, posted: '4h ago' }
];

const MOCK_TALENT = [
  { id: 't1', name: 'Ahmed Zayaan', title: 'Full-stack Architect', location: 'Malé, MV', price: 'MVR 450/hr', description: '8+ years experience building scalable apps. Specialized in fintech systems.', skills: ['Go', 'React', 'AWS'], rating: 4.9, projects: 42, verified: true, isNew: false },
  { id: 't2', name: 'Mariyam Safoora', title: 'UI/UX Designer', location: 'Addu City', price: 'MVR 350/hr', description: 'Clean, accessible interfaces for mobile and web apps.', skills: ['Figma', 'Prototyping'], rating: 5.0, projects: 28, verified: true, isNew: false }
];

const Marketplace: React.FC<MarketplaceProps> = ({ role, isPublic = false, onAuthRequired }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewType, setViewType] = useState<'jobs' | 'talent'>('jobs');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [mobileDetailOpen, setMobileDetailOpen] = useState(false);

  const data = viewType === 'jobs' ? MOCK_JOBS : MOCK_TALENT;
  
  useEffect(() => {
    if (data.length > 0 && !selectedId) {
      setSelectedId(data[0].id);
    }
  }, [viewType, data, selectedId]);

  const selectedItem = data.find(item => item.id === selectedId) || (data.length > 0 ? data[0] : null);

  const handleAction = (e: React.MouseEvent) => {
    if (isPublic) {
      e.stopPropagation();
      onAuthRequired?.();
    }
  };

  const openDetails = (id: string) => {
    setSelectedId(id);
    setMobileDetailOpen(true);
  };

  return (
    <div className="flex flex-col h-full overflow-hidden animate-in fade-in duration-500">
      {/* Search Header */}
      <div className="flex flex-col gap-4 mb-6 shrink-0">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-1">
          <div>
            <h1 className="text-xl md:text-2xl font-black tracking-tight text-[#0F172A] dark:text-white uppercase">Marketplace Hub</h1>
            <p className="text-[11px] text-slate-500 font-bold uppercase tracking-[0.2em] mt-1">Discover island-wide professional opportunities.</p>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="flex bg-[#F1F5F9] dark:bg-dark-surface p-1 rounded-xl border border-[#E2E8F0] dark:border-dark-border shadow-sm">
              <button onClick={() => setViewType('jobs')} className={`flex items-center gap-2 px-4 py-1.5 text-[11px] font-black uppercase rounded-lg transition-all ${viewType === 'jobs' ? 'bg-white dark:bg-dark text-brand shadow-sm' : 'text-slate-500'}`}>
                 Jobs
              </button>
              <button onClick={() => setViewType('talent')} className={`flex items-center gap-2 px-4 py-1.5 text-[11px] font-black uppercase rounded-lg transition-all ${viewType === 'talent' ? 'bg-white dark:bg-dark text-brand shadow-sm' : 'text-slate-500'}`}>
                 Talent
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
            <input 
              type="text" 
              placeholder={`Search ${viewType}...`}
              className="w-full pl-10 pr-4 py-3 bg-white dark:bg-dark-surface border border-[#E2E8F0] dark:border-dark-border rounded-xl text-[13px] outline-none shadow-sm dark:text-white transition-all focus:ring-2 ring-brand/5"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="p-3 bg-white dark:bg-dark-surface border border-[#E2E8F0] dark:border-dark-border rounded-xl text-slate-400 hover:text-brand transition-colors shadow-sm">
            <SlidersHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex-1 flex gap-6 overflow-hidden min-h-0">
        {/* List Section */}
        <div className="flex-1 overflow-y-auto no-scrollbar pb-10 pr-1">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-3">
            {data.filter((item: any) => 
              (item.title || item.name).toLowerCase().includes(searchTerm.toLowerCase())
            ).map((item: any) => (
              <div 
                key={item.id}
                onClick={() => openDetails(item.id)}
                className={`p-5 bg-white dark:bg-dark-surface border rounded-3xl transition-all cursor-pointer group shadow-sm flex flex-col ${
                  selectedId === item.id 
                  ? 'border-brand bg-brand/[0.01] ring-8 ring-brand/5' 
                  : 'border-[#E2E8F0] dark:border-dark-border hover:border-brand/40'
                }`}
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-slate-900 dark:text-white truncate text-[15px]">
                        {item.title || item.name}
                      </h3>
                      {item.verified && <BadgeCheck className="w-4 h-4 text-brand shrink-0" />}
                    </div>
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] truncate">
                      {item.company || item.title}
                    </p>
                  </div>
                </div>

                <p className="text-[12px] text-slate-500 dark:text-slate-400 line-clamp-2 mb-4 leading-relaxed font-medium">
                  {item.description}
                </p>

                <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-50 dark:border-dark-border">
                  <span className="text-brand font-black text-[15px]">{item.price}</span>
                  <div className="flex items-center gap-1 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    <span>View</span>
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop Detail View */}
        <div className="hidden lg:block w-[380px] xl:w-[420px] h-full sticky top-0 bg-white dark:bg-dark-surface border border-[#E2E8F0] dark:border-dark-border rounded-[32px] overflow-hidden shadow-2xl animate-in slide-in-from-right-4 transition-all">
           {selectedItem && <DetailContent item={selectedItem} viewType={viewType} handleAction={handleAction} />}
        </div>
      </div>

      {/* Mobile Detail Overlay */}
      {mobileDetailOpen && selectedItem && (
        <div className="lg:hidden fixed inset-0 z-[100] flex items-end animate-in fade-in duration-300">
           <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={() => setMobileDetailOpen(false)}></div>
           <div className="w-full h-[88vh] bg-white dark:bg-dark-surface rounded-t-[40px] overflow-hidden relative z-10 animate-in slide-in-from-bottom-12">
              <div className="w-12 h-1 bg-slate-200 rounded-full mx-auto mt-4 mb-2" onClick={() => setMobileDetailOpen(false)}></div>
              <button onClick={() => setMobileDetailOpen(false)} className="absolute top-6 right-6 p-2 bg-slate-100 dark:bg-dark-border rounded-full z-20">
                <X className="w-4 h-4" />
              </button>
              <div className="h-full overflow-y-auto no-scrollbar pb-20">
                <DetailContent item={selectedItem} viewType={viewType} handleAction={handleAction} isMobile />
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

const DetailContent = ({ item, viewType, handleAction, isMobile = false }: any) => (
  <div className="flex flex-col h-full bg-white dark:bg-dark-surface">
    <div className={`shrink-0 relative ${isMobile ? 'h-48' : 'h-32'} bg-brand/[0.03] border-b border-slate-100 dark:border-dark-border`}>
      <div className={`absolute -bottom-10 ${isMobile ? 'left-8' : 'left-8'}`}>
        <div className="w-20 h-20 bg-brand rounded-3xl flex items-center justify-center text-white font-black text-3xl border-8 border-white dark:border-dark-surface shadow-2xl">
          {(item.title || item.name).charAt(0)}
        </div>
      </div>
    </div>
    <div className="p-8 pt-16 flex-1 flex flex-col">
      <div className="mb-8">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter mb-1.5 leading-tight">
          {item.title || item.name}
        </h2>
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-black text-brand uppercase tracking-[0.2em]">
            {item.company || item.title}
          </span>
          {item.verified && <BadgeCheck className="w-4 h-4 text-brand" />}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="p-4 bg-slate-50 dark:bg-dark rounded-[24px] border border-slate-100 dark:border-dark-border">
          <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest mb-1.5 flex items-center gap-1.5"><DollarSign className="w-3 h-3 text-brand" /> Budget</p>
          <p className="font-black text-[15px] dark:text-white tracking-tight">{item.price}</p>
        </div>
        <div className="p-4 bg-slate-50 dark:bg-dark rounded-[24px] border border-slate-100 dark:border-dark-border">
          <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest mb-1.5 flex items-center gap-1.5"><Calendar className="w-3 h-3 text-brand" /> Duration</p>
          <p className="font-black text-[15px] dark:text-white tracking-tight">{item.duration || item.projects}</p>
        </div>
      </div>

      <div className="mb-8 space-y-4">
        <div>
          <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
            <Info className="w-3.5 h-3.5 text-brand" /> Brief
          </h4>
          <p className="text-[14px] text-slate-600 dark:text-slate-400 leading-relaxed font-medium">{item.description}</p>
        </div>
      </div>

      <div className="mb-10">
        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Required Stack</h4>
        <div className="flex flex-wrap gap-2">
          {item.skills.map((s: string) => (
            <span key={s} className="px-4 py-2 bg-brand/[0.03] text-brand rounded-2xl text-[11px] font-black border border-brand/10 transition-colors hover:bg-brand/10 cursor-default">{s}</span>
          ))}
        </div>
      </div>
      
      <div className="mt-auto">
        <button onClick={handleAction} className="w-full py-5 bg-brand text-white rounded-[24px] font-black text-[14px] uppercase tracking-widest shadow-2xl shadow-brand/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-3 active:scale-95">
          <span>{viewType === 'jobs' ? 'Initialize Offer' : 'Hire Talent'}</span>
          <ArrowUpRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  </div>
);

export default Marketplace;