
import React, { useEffect, useState } from 'react';
import { 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  Globe, 
  Crown,
  Menu,
  X,
  Coffee,
  TrendingUp,
  Layers,
  Trophy,
  ArrowUpRight,
  Sun,
  Moon,
  Fingerprint,
  Code2,
  Palette,
  Camera,
  LineChart,
  Languages,
  Anchor,
  CheckCircle2,
  Briefcase,
  Users,
  Shield,
  Check,
  Sparkles,
  ChevronRight,
  BarChart3,
  Activity,
  LayoutDashboard,
  Bell,
  Search,
  ChevronDown,
  Cpu,
  Info
} from 'lucide-react';

interface LandingPageProps {
  onExplore: () => void;
  onLogin: () => void;
  onJoin: () => void;
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
}

const FAQ_ITEMS = [
  { q: "Is it safe to get paid through Meritt?", a: "Yes. We hold the client's money safely and only release it to you once the work is approved. We work with BML and MIB accounts for quick MVR transfers." },
  { q: "What is Meritt ID?", a: "It is your digital work profile. It proves you are a real freelancer or business in the Maldives, which helps you build trust with clients across any island." },
  { q: "How fast will I get my money?", a: "Once a milestone is marked as finished, the money is released. Pro users usually see the MVR in their bank account within a few hours." },
  { q: "Can I use this for resort projects?", a: "Yes! Many locals use Meritt for resort photography, design, or maintenance work. It makes handling resort contracts and payments much easier." }
];

const CATEGORIES = [
  { name: 'Apps & Websites', thaana: 'ސޮފްޓްވެއަރ', icon: Code2, count: '142', color: 'bg-blue-600' },
  { name: 'Design & Logos', thaana: 'ޑިޒައިން', icon: Palette, count: '210', color: 'bg-indigo-600' },
  { name: 'Social Media', thaana: 'ސްޓްރެޓެޖީ', icon: LineChart, count: '89', color: 'bg-emerald-600' },
  { name: 'Photo & Video', thaana: 'ފޮޓޯގްރަފީ', icon: Camera, count: '64', color: 'bg-rose-600' },
  { name: 'Writing & Trans', thaana: 'ތަރުޖަމާ', icon: Languages, count: '102', color: 'bg-amber-600' },
  { name: 'Resort Gigs', thaana: 'ރިސޯޓް', icon: Anchor, count: '45', color: 'bg-cyan-600' },
];

const STATS = [
  { label: 'Island Talent', value: '1.2K+', icon: Users },
  { label: 'Jobs Completed', value: '4.5K+', icon: CheckCircle2 },
  { label: 'MVR Paid Out', value: '18M+', icon: ShieldCheck },
  { label: 'Local Clients', value: '350+', icon: Briefcase },
];

const PARTNERS = [
  "BML Compatible", "MIB Ready", "Male' Creative Node", "Addu Tech", "Hulhumale' Hub", "Oceanic Retail", "Island Tech"
];

const LandingPage: React.FC<LandingPageProps> = ({ onExplore, onLogin, onJoin, darkMode, setDarkMode }) => {
  const [pricingType, setPricingType] = useState<'freelancer' | 'business'>('freelancer');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set(['hero']));

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set(prev).add(entry.target.id));
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    document.querySelectorAll('section[id]').forEach((section) => observer.observe(section));

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const currentPlans = pricingType === 'freelancer' ? [
    { name: 'Basic', price: '0', fee: '12%', icon: Coffee, desc: 'For beginners', perks: ['Open Marketplace', 'Standard Payouts'] },
    { name: 'Pro', price: '49', fee: '7%', icon: Zap, desc: 'Most popular', featured: true, perks: ['Priority Clearing', 'Verified Badge', '24/7 Support'] },
    { name: 'Elite', price: '99', fee: '3%', icon: Crown, desc: 'For top experts', perks: ['Bank Sync', 'Lower Fees'] }
  ] : [
    { name: 'Solo', price: '0', fee: '1 Job', icon: Layers, desc: 'Single hire', perks: ['1 Active Post', 'Basic Filters'] },
    { name: 'Growth', price: '99', fee: 'Unlimited', icon: TrendingUp, desc: 'For teams', featured: true, perks: ['Unlimited Posts', 'Advanced Search', 'Business Sync'] },
    { name: 'Company', price: '299', fee: 'Custom', icon: Trophy, desc: 'For large firms', perks: ['Managed Hiring', 'Priority Support'] }
  ];

  return (
    <div className="landing-root bg-white dark:bg-dark overflow-x-hidden min-h-screen text-slate-900 dark:text-slate-100 transition-colors duration-500 selection:bg-brand selection:text-white relative">
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          animation: marquee 50s linear infinite;
          width: max-content;
        }
        .reveal { 
          opacity: 0; 
          transform: translateY(30px); 
          transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1); 
        }
        .revealed .reveal { 
          opacity: 1; 
          transform: translateY(0); 
        }
        .thaana-font { 
          direction: rtl; 
          font-family: 'Inter', sans-serif;
        }
        .glass-header {
          backdrop-filter: blur(20px);
          background: rgba(255, 255, 255, 0.8);
        }
        .dark .glass-header {
          background: rgba(9, 9, 11, 0.8);
        }
        .hero-mockup-wrapper {
          perspective: 2500px;
          margin-top: 2rem;
        }
        .hero-mockup {
          transform-style: preserve-3d;
          transform: rotateX(8deg) rotateY(-5deg);
          transition: transform 1.2s cubic-bezier(0.16, 1, 0.3, 1);
        }
        @media (max-width: 1024px) {
          .hero-mockup {
            transform: rotateX(4deg) rotateY(-2deg) scale(0.95);
          }
        }
        @media (max-width: 768px) {
          .hero-mockup {
            transform: rotateX(0deg) rotateY(0deg) scale(0.92);
          }
        }
        .hero-mockup:hover {
          transform: rotateX(0deg) rotateY(0deg) scale(1.02);
        }
        .scanner-line {
          height: 2px;
          background: linear-gradient(90deg, transparent, #0047FF, transparent);
          animation: scan 4s ease-in-out infinite;
        }
        @keyframes scan {
          0%, 100% { transform: translateY(-150%); }
          50% { transform: translateY(150%); }
        }
        .float { animation: float 6s ease-in-out infinite; }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        
        .hero-title {
          font-size: clamp(2.5rem, 8vw, 7.5rem);
        }
        .hero-grid {
          background-image: radial-gradient(circle at 2px 2px, rgba(0, 71, 255, 0.05) 1px, transparent 0);
          background-size: 64px 64px;
        }
        @media (max-width: 640px) {
          .hero-grid { background-size: 40px 40px; }
        }
        .dark .hero-grid {
          background-image: radial-gradient(circle at 2px 2px, rgba(255, 255, 255, 0.02) 1px, transparent 0);
        }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

        /* Modern Gradients restricted to hero */
        .ambient-glow {
          position: absolute;
          filter: blur(140px);
          border-radius: 100%;
          opacity: 0.35;
          z-index: 0;
          pointer-events: none;
        }
        .dark .ambient-glow { opacity: 0.12; }

        .glass-card {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(24px);
        }
        .dark .glass-card {
          background: rgba(24, 24, 27, 0.9);
        }
      `}</style>

      {/* Header */}
      <header className={`fixed top-0 inset-x-0 z-[100] transition-all duration-700 border-b ${scrolled ? 'glass-header border-slate-200/50 dark:border-dark-border/50 h-16 shadow-lg shadow-black/5' : 'bg-transparent border-transparent h-20 md:h-28'}`}>
        <div className="max-w-[1440px] mx-auto h-full flex items-center justify-between px-6 md:px-12 relative">
          <span className="brand-text text-xl md:text-2xl text-brand cursor-pointer z-20" onClick={() => window.scrollTo({top:0, behavior:'smooth'})}>meritt.</span>
          
          <nav className="hidden lg:flex items-center gap-10 absolute left-1/2 -translate-x-1/2 z-10">
            {['Gigs', 'Features', 'Pricing', 'FAQ'].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-brand transition-all">{item}</a>
            ))}
          </nav>

          <div className="flex items-center gap-4 md:gap-6 z-20">
            <button onClick={() => setDarkMode(!darkMode)} className="p-2 text-slate-400 hover:text-brand transition-all">
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <div className="hidden sm:flex items-center gap-6 md:gap-8 border-l border-slate-200 dark:border-dark-border pl-6 md:pl-8">
              <button onClick={onLogin} className="text-[11px] font-bold text-slate-500 hover:text-brand transition-colors uppercase tracking-widest">Login</button>
              <button onClick={onJoin} className="bg-brand text-white px-6 md:px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-brand/30 hover:scale-105 active:scale-95 transition-all">Join Now</button>
            </div>
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="lg:hidden p-2 text-slate-500">
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[110] bg-white dark:bg-dark p-6 flex flex-col justify-center animate-in fade-in duration-300">
           <button onClick={() => setIsMobileMenuOpen(false)} className="absolute top-6 right-6 p-4 bg-slate-100 dark:bg-dark-surface rounded-full"><X className="w-6 h-6" /></button>
           <div className="flex flex-col gap-8 text-center">
             {['Gigs', 'Features', 'Pricing', 'FAQ'].map(item => (
               <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setIsMobileMenuOpen(false)} className="text-4xl font-black tracking-tighter hover:text-brand transition-colors uppercase">{item}</a>
             ))}
             <div className="h-px bg-slate-100 dark:bg-dark-border my-4"></div>
             <button onClick={onJoin} className="w-full bg-brand text-white py-6 rounded-2xl font-black uppercase tracking-widest text-sm">Join Marketplace</button>
           </div>
        </div>
      )}

      {/* Hero Section - AMBIENT BLUE GRADIENTS ARE ONLY HERE */}
      <section id="hero" className={`relative pt-32 md:pt-56 pb-20 md:pb-48 hero-grid overflow-hidden transition-all duration-1000 ${visibleSections.has('hero') ? 'revealed' : ''}`}>
        {/* Ambient Gradient Mesh for Hero Only */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div className="ambient-glow bg-brand w-[800px] h-[800px] -top-96 -left-48 animate-pulse" style={{ animationDuration: '8s' }}></div>
          <div className="ambient-glow bg-brand w-[600px] h-[600px] top-[15%] -right-48 opacity-20" style={{ animationDuration: '10s' }}></div>
          <div className="ambient-glow bg-brand w-[700px] h-[700px] top-[40%] left-1/4 opacity-15 dark:opacity-5"></div>
        </div>

        <div className="max-w-[1440px] mx-auto px-6 text-center relative z-10">
          <div className="reveal inline-flex items-center gap-3 px-5 py-2 bg-brand/5 border border-brand/10 rounded-full mb-8 md:mb-12 backdrop-blur-md">
            <div className="w-2 h-2 bg-brand rounded-full animate-pulse"></div>
            <span className="text-[9px] font-black text-brand uppercase tracking-[0.3em]">Built for the Maldives</span>
          </div>
          
          <h1 className="reveal hero-title font-black tracking-tighter leading-[1.0] mb-8 md:mb-10 text-slate-900 dark:text-white uppercase relative">
            FIND WORK.<br/>
            <span className="text-brand drop-shadow-sm">GET PAID IN MVR.</span>
          </h1>
          
          <p className="reveal max-w-3xl mx-auto text-base md:text-xl lg:text-2xl text-slate-500 dark:text-slate-400 font-medium mb-12 md:mb-16 leading-relaxed delay-100">
            The easiest way for Maldivian freelancers to find work, <br className="hidden md:block"/> manage projects, and get safe bank payments in MVR.
          </p>

          <div className="reveal flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 mb-20 md:mb-32 delay-200">
            <button onClick={onJoin} className="w-full sm:w-auto bg-brand text-white px-10 md:px-14 py-4 md:py-6 rounded-2xl font-black text-[13px] uppercase tracking-widest shadow-2xl shadow-brand/30 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-4">
              Start Earning <ArrowRight className="w-5 h-5" />
            </button>
            <button onClick={onExplore} className="w-full sm:w-auto glass-card border-2 border-slate-200/50 dark:border-dark-border/50 px-10 md:px-14 py-4 md:py-6 rounded-2xl font-black text-[13px] uppercase tracking-widest hover:border-brand/40 transition-all dark:text-white shadow-sm">
              See All Jobs
            </button>
          </div>

          {/* Hero UI Mockup */}
          <div className="reveal hero-mockup-wrapper max-w-[1100px] mx-auto delay-300 px-2 md:px-4 lg:px-0 relative">
             <div className="hero-mockup glass-card border border-white dark:border-dark-border/50 rounded-[24px] md:rounded-[48px] p-2 md:p-4 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.15)] relative overflow-visible group">
                <div className="bg-slate-50/50 dark:bg-dark rounded-[18px] md:rounded-[36px] overflow-hidden border border-slate-200 dark:border-dark-border aspect-[16/10] md:aspect-[16/9] relative shadow-inner">
                  <div className="h-10 md:h-16 border-b border-slate-200/50 dark:border-dark-border/50 bg-white/80 dark:bg-dark-surface/80 backdrop-blur-md flex items-center justify-between px-6 md:px-10">
                     <div className="flex items-center gap-6">
                        <div className="w-7 h-7 md:w-10 md:h-10 rounded-xl bg-brand/10 text-brand flex items-center justify-center shadow-inner"><LayoutDashboard className="w-5 h-5"/></div>
                        <div className="hidden sm:flex gap-6">
                           <div className="h-2 w-20 bg-slate-200 dark:bg-dark-border rounded-full"></div>
                           <div className="h-2 w-28 bg-slate-100 dark:bg-dark-border rounded-full"></div>
                        </div>
                     </div>
                     <div className="flex items-center gap-6">
                        <Bell className="w-5 h-5 text-slate-300" />
                        <div className="w-7 h-7 md:w-10 md:h-10 rounded-full bg-slate-200 dark:bg-dark-border ring-4 ring-slate-50 dark:ring-dark"></div>
                     </div>
                  </div>
                  <div className="p-4 md:p-10 grid grid-cols-12 gap-6 md:gap-10 h-full">
                     <div className="col-span-12 md:col-span-8 space-y-6 md:space-y-10">
                        <div className="bg-white/80 dark:bg-dark-surface/80 border border-slate-200/50 dark:border-dark-border/50 rounded-[20px] md:rounded-[40px] p-6 md:p-10 flex flex-col justify-between h-[150px] md:h-[280px] shadow-sm">
                           <div className="flex justify-between items-start">
                              <div>
                                 <div className="text-[8px] md:text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2 md:mb-4">Earnings</div>
                                 <div className="text-xl md:text-5xl font-black text-brand tracking-tighter">MVR 42,500.00</div>
                              </div>
                              <BarChart3 className="w-6 h-6 text-slate-300" />
                           </div>
                           <div className="flex items-end gap-2 md:gap-4 h-12 md:h-24">
                              {[35, 50, 25, 65, 45, 85, 60, 95, 70, 40, 55, 65].map((h, i) => (
                                <div key={i} className="flex-1 bg-brand/10 dark:bg-brand/20 rounded-t-lg group-hover:bg-brand transition-all duration-700" style={{height: `${h}%`}}></div>
                              ))}
                           </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 md:gap-8">
                           <div className="bg-white/80 dark:bg-dark-surface/80 border border-slate-200/50 dark:border-dark-border/50 rounded-[20px] md:rounded-[32px] p-6 md:p-8 shadow-sm">
                              <div className="text-lg md:text-3xl font-black dark:text-white uppercase tracking-tighter">12 Active</div>
                              <div className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">Projects</div>
                           </div>
                           <div className="bg-white/80 dark:bg-dark-surface/80 border border-slate-200/50 dark:border-dark-border/50 rounded-[20px] md:rounded-[32px] p-6 md:p-8 shadow-sm">
                              <div className="text-lg md:text-3xl font-black dark:text-white uppercase tracking-tighter">100%</div>
                              <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-2">Verified</div>
                           </div>
                        </div>
                     </div>
                     <div className="hidden md:block col-span-4 h-full">
                        <div className="bg-brand rounded-[32px] md:rounded-[40px] p-8 md:p-10 text-white h-[85%] flex flex-col justify-between overflow-hidden relative shadow-xl">
                           <div className="relative z-10">
                              <Fingerprint className="w-12 h-12 md:w-16 md:h-16 mb-8 opacity-60" />
                              <div className="text-2xl font-black mb-4 uppercase tracking-tighter leading-none">Your Local <br/>Identity</div>
                              <div className="text-[10px] font-black uppercase tracking-widest opacity-60">Verified Member</div>
                           </div>
                           <div className="scanner-line absolute top-1/2 left-0 right-0"></div>
                        </div>
                     </div>
                  </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Partners Marquee - CLEAN BACKGROUND */}
      <div className="border-y border-slate-200/50 dark:border-dark-border/50 py-8 md:py-12 overflow-hidden bg-white dark:bg-dark relative z-10">
        <div className="animate-marquee">
          {[...PARTNERS, ...PARTNERS].map((partner, i) => (
            <div key={i} className="flex items-center gap-10 px-16 md:px-24 opacity-30 dark:opacity-20 grayscale hover:grayscale-0 hover:opacity-100 transition-all cursor-default">
              <Sparkles className="w-4 h-4 text-brand" />
              <span className="text-[11px] md:text-[13px] font-black uppercase tracking-[0.5em] whitespace-nowrap">{partner}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Section - CLEAN BACKGROUND */}
      <section id="stats" className={`py-16 md:py-32 bg-white dark:bg-dark relative z-10 ${visibleSections.has('stats') ? 'revealed' : ''}`}>
        <div className="max-w-[1440px] mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16">
          {STATS.map((stat, i) => (
            <div key={i} className="reveal flex flex-col items-center text-center group" style={{transitionDelay: `${i * 100}ms`}}>
              <div className="w-16 h-16 md:w-20 md:h-20 bg-slate-50 dark:bg-dark-surface border border-slate-200 dark:border-dark-border rounded-[24px] md:rounded-[32px] flex items-center justify-center mb-6 group-hover:bg-brand group-hover:text-white transition-all shadow-sm">
                 <stat.icon className="w-7 h-7 md:w-8 md:h-8" />
              </div>
              <h3 className="text-4xl md:text-7xl font-black tracking-tighter dark:text-white mb-2 uppercase">{stat.value}</h3>
              <p className="text-[10px] md:text-[12px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Domains Section - CLEAN BACKGROUND */}
      <section id="gigs" className={`py-20 md:py-48 bg-white dark:bg-dark relative z-10 ${visibleSections.has('gigs') ? 'revealed' : ''}`}>
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-16 md:mb-24 reveal">
            <div className="max-w-4xl">
              <h2 className="text-[11px] md:text-[13px] font-black text-brand uppercase tracking-[0.6em] mb-6">Work Areas</h2>
              <h3 className="text-4xl md:text-[6rem] font-black tracking-tighter leading-[1.0] uppercase">What's your <br/><span className="text-brand">superpower?</span></h3>
            </div>
            <button onClick={onExplore} className="flex items-center gap-4 text-[11px] md:text-[13px] font-black uppercase tracking-widest text-slate-400 hover:text-brand transition-all group">
              See All Domains <ArrowUpRight className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>

          <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-12 overflow-x-auto md:overflow-visible no-scrollbar -mx-6 px-6 pb-8 md:pb-0 snap-x snap-mandatory">
            {CATEGORIES.map((cat, i) => (
              <div key={i} className="reveal p-8 md:p-14 bg-slate-50 dark:bg-dark-surface border border-slate-200 dark:border-dark-border rounded-[40px] md:rounded-[56px] group hover:border-brand/40 transition-all shadow-sm min-w-[280px] md:min-w-0 snap-center" style={{transitionDelay: `${i * 80}ms`}}>
                <div className="flex justify-between items-start mb-12 md:mb-16">
                  <div className={`w-16 h-16 ${cat.color} rounded-[24px] flex items-center justify-center text-white shadow-xl group-hover:rotate-12 transition-transform`}>
                    <cat.icon className="w-8 h-8" />
                  </div>
                  <span className="text-[10px] md:text-[12px] font-black text-slate-300 dark:text-slate-600 uppercase tracking-widest">{cat.count} Units</span>
                </div>
                <div className="mb-8 md:mb-12">
                   <h4 className="text-2xl md:text-4xl font-black mb-2 dark:text-white tracking-tight uppercase">{cat.name}</h4>
                   <p className="thaana-font text-2xl md:text-4xl font-bold text-slate-400 opacity-70">{cat.thaana}</p>
                </div>
                <div className="flex items-center gap-4 text-[10px] md:text-[12px] font-black uppercase tracking-widest text-brand md:opacity-0 md:group-hover:opacity-100 md:translate-x-[-15px] md:group-hover:translate-x-0 transition-all">
                   Explore Category <ChevronRight className="w-5 h-5" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section - CLEAN BACKGROUND */}
      <section id="features" className={`py-20 md:py-48 bg-white dark:bg-dark relative z-10 ${visibleSections.has('features') ? 'revealed' : ''}`}>
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16">
            <div className="lg:col-span-7 bg-slate-900 dark:bg-brand/10 border border-white/10 dark:border-brand/10 rounded-[48px] md:rounded-[72px] p-10 md:p-20 reveal overflow-hidden relative group shadow-2xl">
              <div className="relative z-10">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-brand/30 rounded-[24px] flex items-center justify-center mb-10 md:mb-14">
                  <ShieldCheck className="w-10 h-10 md:w-12 md:h-12 text-white" />
                </div>
                <h3 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-8 md:mb-12 uppercase leading-tight">Safe payments <br className="hidden md:block"/>for everyone.</h3>
                <p className="text-slate-400 text-lg md:text-2xl font-medium leading-relaxed mb-10 md:mb-16 max-w-xl">
                  We hold client payments in a safe vault. Freelancers get paid immediately after the work is approved. No risk, no stress.
                </p>
                <div className="flex flex-wrap gap-4">
                  {['Safe MVR Transfer', 'Local Bank Sync', 'Verified Profiles'].map(tag => (
                    <span key={tag} className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-[10px] md:text-[12px] font-black text-slate-300 uppercase tracking-widest">{tag}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col gap-10 md:gap-16">
              <div className="flex-1 bg-slate-50 dark:bg-dark-surface border border-slate-200 dark:border-dark-border rounded-[40px] md:rounded-[64px] p-10 md:p-14 reveal group shadow-sm hover:border-brand/40 transition-colors" style={{transitionDelay: '100ms'}}>
                <Globe className="w-12 h-12 md:w-16 md:h-16 text-brand mb-10 transition-transform group-hover:rotate-12" />
                <h4 className="text-3xl font-black dark:text-white mb-4 uppercase tracking-tight">Across All Atolls</h4>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed font-medium text-lg md:text-xl">Hire talent from Male' to the furthest islands. We connect the whole country.</p>
              </div>
              <div className="flex-1 bg-slate-50 dark:bg-dark-surface border border-slate-200 dark:border-dark-border rounded-[40px] md:rounded-[64px] p-10 md:p-14 reveal group shadow-sm hover:border-brand/40 transition-colors" style={{transitionDelay: '200ms'}}>
                <Fingerprint className="w-12 h-12 md:w-16 md:h-16 text-brand mb-10 transition-transform group-hover:scale-110" />
                <h4 className="text-3xl font-black dark:text-white mb-4 uppercase tracking-tight">Verified Locals</h4>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed font-medium text-lg md:text-xl">Every user is a verified Maldivian resident or business. Trust is our core.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section - NO MESH GRADIENT */}
      <section id="faq" className={`py-20 md:py-48 bg-white dark:bg-dark transition-all duration-1000 relative z-10 ${visibleSections.has('faq') ? 'revealed' : ''}`}>
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16 md:mb-28 reveal">
            <h2 className="text-[11px] md:text-[13px] font-black text-brand uppercase tracking-[0.6em] mb-6">Simple Help</h2>
            <h3 className="text-4xl md:text-[6rem] font-black tracking-tighter leading-none uppercase">Clear <br/><span className="text-brand">Answers.</span></h3>
          </div>

          <div className="space-y-6 reveal delay-100">
            {FAQ_ITEMS.map((item, i) => (
              <div 
                key={i} 
                className={`border rounded-[32px] overflow-hidden transition-all duration-500 ${
                  openFaq === i 
                  ? 'bg-slate-50 dark:bg-dark-surface border-brand shadow-lg' 
                  : 'bg-white dark:bg-dark border-slate-200 dark:border-dark-border hover:border-brand/40 shadow-sm'
                }`}
              >
                <button 
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full px-8 py-7 md:py-10 flex items-center justify-between text-left group"
                >
                  <span className={`text-lg md:text-2xl font-black uppercase tracking-tight transition-colors ${openFaq === i ? 'text-brand' : 'text-slate-900 dark:text-white'}`}>
                    {item.q}
                  </span>
                  <div className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${openFaq === i ? 'bg-brand border-brand text-white rotate-180' : 'border-slate-200 dark:border-dark-border text-slate-300'}`}>
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </button>
                <div className={`overflow-hidden transition-all duration-500 ease-in-out ${openFaq === i ? 'max-h-[300px]' : 'max-h-0'}`}>
                  <div className="px-8 pb-8 md:pb-12 pt-0">
                    <p className="text-slate-500 dark:text-slate-400 text-lg md:text-xl font-medium leading-relaxed max-w-2xl border-t border-slate-100 dark:border-dark-border/50 pt-6 md:pt-10">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section - NO MESH GRADIENT */}
      <section id="pricing" className={`py-24 md:py-64 bg-white dark:bg-dark transition-all duration-1000 relative z-10 ${visibleSections.has('pricing') ? 'revealed' : ''}`}>
        <div className="max-w-[1440px] mx-auto px-6 overflow-visible">
          <div className="text-center mb-20 md:mb-40 reveal">
            <h2 className="text-[11px] md:text-[13px] font-black text-brand uppercase tracking-[0.7em] mb-10">Pricing</h2>
            <h3 className="text-4xl md:text-[8rem] font-black tracking-tighter mb-16 md:mb-24 uppercase leading-none">Simple Plans.</h3>
            
            <div className="inline-flex p-2 md:p-3 bg-slate-50 dark:bg-dark-surface border border-slate-200 dark:border-dark-border rounded-[28px] mb-16 shadow-sm">
              <button onClick={() => setPricingType('freelancer')} className={`px-10 md:px-14 py-4 md:py-5 rounded-[20px] md:rounded-[24px] text-[10px] md:text-[12px] font-black uppercase tracking-widest transition-all ${pricingType === 'freelancer' ? 'bg-white dark:bg-dark text-brand shadow-md' : 'text-slate-400 hover:text-slate-600'}`}>Freelancer</button>
              <button onClick={() => setPricingType('business')} className={`px-10 md:px-14 py-4 md:py-5 rounded-[20px] md:rounded-[24px] text-[10px] md:text-[12px] font-black uppercase tracking-widest transition-all ${pricingType === 'business' ? 'bg-white dark:bg-dark text-brand shadow-md' : 'text-slate-400 hover:text-slate-600'}`}>Business</button>
            </div>
          </div>

          <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-14 overflow-x-auto md:overflow-visible no-scrollbar -mx-6 px-6 pb-12 md:pb-0 snap-x snap-mandatory">
            {currentPlans.map((plan, i) => (
              <div key={plan.name} className={`p-10 md:p-16 rounded-[48px] md:rounded-[64px] border-2 transition-all flex flex-col reveal relative min-w-[300px] md:min-w-0 snap-center ${plan.featured ? 'border-brand bg-white dark:bg-dark shadow-2xl z-10 lg:-translate-y-12 lg:scale-105' : 'bg-slate-50 dark:bg-dark-surface border-slate-100 dark:border-dark-border hover:border-brand/40 shadow-sm'}`} style={{transitionDelay: `${i * 100}ms`}}>
                {plan.featured && <span className="absolute -top-5 md:-top-7 left-1/2 -translate-x-1/2 bg-brand text-white text-[10px] md:text-[12px] font-black uppercase px-12 py-3 rounded-full tracking-widest shadow-2xl border-4 border-white dark:border-dark">Popular</span>}
                <div className="mb-12">
                   <div className={`w-16 h-16 md:w-20 md:h-20 rounded-[24px] md:rounded-[32px] flex items-center justify-center mb-10 shadow-inner ${plan.featured ? 'bg-brand/10 text-brand' : 'bg-white dark:bg-dark text-slate-400'}`}><plan.icon className="w-8 h-8 md:w-10 md:h-10" /></div>
                   <h4 className="text-3xl md:text-5xl font-black dark:text-white uppercase mb-2 tracking-tighter">{plan.name}</h4>
                   <p className="text-[10px] md:text-[12px] font-black text-slate-400 uppercase tracking-widest mb-10">{plan.desc}</p>
                   <div className="flex items-baseline gap-4">
                     <span className="text-lg md:text-xl font-black text-slate-400 uppercase tracking-widest">MVR</span>
                     <span className="text-5xl md:text-[6rem] font-black dark:text-white tabular-nums leading-none tracking-tighter">{plan.price}</span>
                     <span className="text-lg md:text-xl font-bold text-slate-400">/mo</span>
                   </div>
                </div>
                <div className="space-y-6 md:space-y-8 mb-12 flex-1 pt-12 border-t-2 border-slate-100 dark:border-dark-border/50">
                  <div className="text-[11px] md:text-[13px] font-black text-brand uppercase tracking-widest mb-8 flex items-center gap-4"><Shield className="w-6 h-6" /> {plan.fee} Clear Fee</div>
                  {plan.perks.map(perk => (
                    <div key={perk} className="flex items-center gap-5 text-slate-600 dark:text-slate-400 text-lg md:text-xl font-medium group">
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-all ${plan.featured ? 'bg-brand/10 text-brand' : 'bg-white dark:bg-dark text-slate-300'}`}><Check className="w-5 h-5" /></div>
                      <span className="group-hover:translate-x-4 transition-transform">{perk}</span>
                    </div>
                  ))}
                </div>
                <button onClick={onJoin} className={`w-full py-6 md:py-8 rounded-[36px] md:rounded-[48px] font-black text-[14px] uppercase tracking-widest transition-all active:scale-95 shadow-2xl ${plan.featured ? 'bg-brand text-white shadow-brand/40' : 'bg-white dark:bg-dark border-2 border-slate-200 dark:border-dark-border text-slate-900 dark:text-white hover:border-brand shadow-sm'}`}>Start Now</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - LOCAL ACCENTS ONLY */}
      <section id="cta" className={`py-24 md:py-32 bg-brand mx-6 md:mx-16 lg:mx-24 rounded-[60px] md:rounded-[100px] text-center text-white mb-24 md:mb-48 relative overflow-hidden shadow-[0_40px_120px_-20px_rgba(0,71,255,0.4)] transition-all duration-1000 ${visibleSections.has('cta') ? 'revealed' : ''}`}>
        <div className="relative z-10 px-8">
          <h2 className="text-4xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-10 md:mb-12 uppercase reveal">Ready to <br className="md:hidden"/>get started?</h2>
          <p className="text-lg md:text-2xl text-white/80 font-medium mb-12 md:mb-16 max-w-3xl mx-auto leading-relaxed reveal delay-100">Join over 1,000 Maldivians already working and earning on Meritt. Safe, fast, and local.</p>
          <button onClick={onJoin} className="reveal bg-white text-brand px-12 md:px-16 py-6 md:py-8 rounded-[36px] md:rounded-[48px] font-black text-lg uppercase tracking-widest shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-6 mx-auto group delay-200">
            Create Profile <ArrowRight className="w-8 h-8 group-hover:translate-x-4 transition-transform" />
          </button>
        </div>
        <div className="absolute top-0 right-0 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-white/10 rounded-full blur-[100px] md:blur-[140px] -mr-48 md:-mr-64 -mt-48 md:-mt-64"></div>
        <div className="absolute bottom-0 left-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-white/10 rounded-full blur-[80px] md:blur-[120px] -ml-32 md:-ml-48 -mb-32 md:-mb-48"></div>
      </section>

      {/* Footer - CLEAN NO MESH */}
      <footer className="py-24 md:py-48 border-t border-slate-200/50 dark:border-dark-border/50 bg-white dark:bg-dark">
        <div className="max-w-[1440px] mx-auto px-10 md:px-12 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 md:gap-24 mb-24 md:mb-32">
            <div className="lg:col-span-5">
              <span className="brand-text text-4xl md:text-6xl text-brand mb-10 block">meritt.</span>
              <p className="text-xl md:text-2xl text-slate-500 font-medium leading-relaxed max-w-lg">Sovereign workspace infrastructure for the Maldives. Redefining how we connect, work, and get paid locally.</p>
            </div>
            <div className="lg:col-span-2">
              <h5 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.7em] mb-12">Apps</h5>
              <ul className="space-y-6 md:space-y-8">
                {['Jobs', 'Market', 'Identity', 'Payments'].map(item => (
                  <li key={item}><button className="text-lg md:text-xl font-bold text-slate-500 hover:text-brand transition-all hover:translate-x-4">{item}</button></li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-2">
              <h5 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.7em] mb-12">Company</h5>
              <ul className="space-y-6 md:space-y-8">
                {['Success', 'Safety', 'Terms', 'Support'].map(item => (
                  <li key={item}><button className="text-lg md:text-xl font-bold text-slate-500 hover:text-brand transition-all hover:translate-x-4">{item}</button></li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-3">
              <h5 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.7em] mb-12">Newsletter</h5>
              <div className="flex gap-2 p-2 bg-slate-50 dark:bg-dark-surface border-2 border-slate-200 dark:border-dark-border rounded-[28px] shadow-sm">
                <input className="bg-transparent text-sm px-6 outline-none flex-1 font-bold dark:text-white" placeholder="Email Address" />
                <button className="bg-brand text-white px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-brand/30">Join</button>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between pt-24 border-t border-slate-100 dark:border-dark-border/50 gap-12">
            <p className="text-[11px] md:text-[13px] font-black text-slate-300 uppercase tracking-[0.6em] text-center md:text-left">© 2024 Meritt Workspace Protocol. <br className="md:hidden"/>Sovereign Maldives Node.</p>
            <div className="flex flex-col sm:flex-row items-center gap-12 md:gap-20">
               <div className="flex items-center gap-5">
                 <Globe className="w-8 h-8 text-slate-300" />
                 <span className="text-[11px] md:text-[13px] font-black text-slate-400 uppercase tracking-[0.6em]">Malé, MV</span>
               </div>
               <div className="flex items-center gap-4">
                 <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_15px_#10b981]"></div>
                 <span className="text-[11px] md:text-[13px] font-black text-slate-400 uppercase tracking-[0.6em]">Status: Live</span>
               </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
