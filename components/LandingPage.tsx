import React, { useEffect, useState, useRef } from 'react';
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
  Waves,
  MapPin,
  CreditCard,
  ChevronRight,
  MousePointer2,
  MessageCircle,
  BarChart3,
  ShieldAlert
} from 'lucide-react';

interface LandingPageProps {
  onExplore: () => void;
  onLogin: () => void;
  onJoin: () => void;
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
}

const FAQ_ITEMS = [
  { q: "Is the MVR Escrow safe for Maldivian banks?", a: "Absolutely. We've built Meritt to work specifically with BML and MIB clearing cycles. Your MVR is held in a secure protocol vault and released instantly upon milestone approval. No more waiting weeks for local bank transfers to clear." },
  { q: "What is Meritt ID and why do I need it?", a: "Meritt ID is Raajje's first digital professional identity. It's a verified node that proves you are a real resident or registered business in the Maldives. This ensures accountability island-wide." },
  { q: "How do the BML Payouts work?", a: "Once a milestone is 'Approved', funds are released. For Pro tiers, we utilize priority clearing, meaning MVR usually hits your account within hours, even on weekends." },
  { q: "Can I use this for Resort-side projects?", a: "Yes. Many of our users are specialized in Resort branding, photography, and maintenance. Meritt supports long-term contracts with recurring milestones." }
];

const CATEGORIES = [
  { name: 'Software & Dev', thaana: 'ސޮފްޓްވެއަރ', icon: Code2, count: '142', color: 'bg-blue-600' },
  { name: 'Branding & Design', thaana: 'ޑިޒައިން', icon: Palette, count: '210', color: 'bg-indigo-600' },
  { name: 'Digital Strategy', thaana: 'ސްޓްރެޓެޖީ', icon: LineChart, count: '89', color: 'bg-emerald-600' },
  { name: 'Photography & Film', thaana: 'ފޮޓޯގްރަފީ', icon: Camera, count: '64', color: 'bg-rose-600' },
  { name: 'Translation', thaana: 'ތަރުޖަމާ', icon: Languages, count: '102', color: 'bg-amber-600' },
  { name: 'Resort Services', thaana: 'ރިސޯޓް', icon: Anchor, count: '45', color: 'bg-cyan-600' },
];

const STATS = [
  { label: 'Island Talent', value: '1.2K+', icon: Users },
  { label: 'Projects', value: '4.5K+', icon: CheckCircle2 },
  { label: 'MVR Cleared', value: '18M+', icon: ShieldCheck },
  { label: 'Local Firms', value: '350+', icon: Briefcase },
];

const PROCESS_STEPS = [
  { title: "Sync Identity", desc: "Initialize your Meritt ID node with local island verification.", icon: Fingerprint },
  { title: "Capture Gig", desc: "Discover high-density professional opportunities in the Maldives.", icon: MousePointer2 },
  { title: "Escrow Locked", desc: "Client locks MVR in the sovereign protocol before you start.", icon: ShieldCheck },
  { title: "Node Clear", desc: "Funds hit your BML/MIB account via priority clearing cycles.", icon: Zap }
];

const PARTNERS = [
  "Oceanic Retail", "Island Tech", "BML Authorized", "MIB Sync", "Male' Atoll Node", "Addu City Tech", "Hulhumale' Creative"
];

const LandingPage: React.FC<LandingPageProps> = ({ onExplore, onLogin, onJoin, darkMode, setDarkMode }) => {
  const [pricingType, setPricingType] = useState<'freelancer' | 'business'>('freelancer');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());

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
    { name: 'Ithibaaru', price: '0', fee: '12%', icon: Coffee, desc: 'Side-gigs', perks: ['Public Marketplace', 'BML Payouts', 'Meritt ID Basic'] },
    { name: 'Muraaja', price: '49', fee: '7%', icon: Zap, desc: 'Pro Hub', featured: true, perks: ['Priority Clearing', 'Verified Badge', 'Custom Pipelines', '24/7 Support'] },
    { name: 'Kamiyaabu', price: '99', fee: '3%', icon: Crown, desc: 'Elite Network', perks: ['Direct MIB Sync', '0.5% Cashback', 'Portfolio Concierge'] }
  ] : [
    { name: 'Maqaamu', price: '0', fee: '1 Post', icon: Layers, desc: 'Solo Ventures', perks: ['1 Active Listing', 'Basic Screening', 'Unified Dashboard'] },
    { name: 'Ithigaadh', price: '99', fee: 'Unlimited', icon: TrendingUp, desc: 'Agencies', featured: true, perks: ['Unlimited Posts', 'Talent Search', 'BML Business Sync', 'Advanced Analytics'] },
    { name: 'Sulthaan', price: '299', fee: 'Concierge', icon: Trophy, desc: 'Enterprise', perks: ['Managed Recruitment', 'Priority Clearing', 'Custom Contracts'] }
  ];

  return (
    <div className="landing-root bg-white dark:bg-dark overflow-x-hidden min-h-screen text-slate-900 dark:text-slate-100 transition-colors duration-500 selection:bg-brand selection:text-white">
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          animation: marquee 40s linear infinite;
          width: max-content;
        }
        .reveal { 
          opacity: 0; 
          transform: translateY(30px); 
          transition: all 0.8s cubic-bezier(0.2, 1, 0.3, 1); 
        }
        .revealed .reveal { 
          opacity: 1; 
          transform: translateY(0); 
        }
        .thaana-font { direction: rtl; }
        
        .attio-card {
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(0, 0, 0, 0.05);
          transition: all 0.4s cubic-bezier(0.2, 0, 0, 1);
        }
        .dark .attio-card {
          background: rgba(24, 24, 27, 0.6);
          border-color: rgba(255, 255, 255, 0.05);
        }
        .attio-card:hover {
          border-color: #0047FF;
          transform: translateY(-2px);
          box-shadow: 0 12px 30px -10px rgba(0, 71, 255, 0.1);
        }
        
        .hero-grid {
          background-image: radial-gradient(circle at 1px 1px, rgba(0, 71, 255, 0.1) 1px, transparent 0);
          background-size: 40px 40px;
        }
        .dark .hero-grid {
          background-image: radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.03) 1px, transparent 0);
        }
        
        .noise-overlay {
          position: fixed;
          top: 0; left: 0; width: 100%; height: 100%;
          background-image: url('https://grainy-gradients.vercel.app/noise.svg');
          opacity: 0.03;
          pointer-events: none;
          z-index: 9999;
        }

        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <div className="noise-overlay" />

      {/* Navigation */}
      <nav className={`fixed top-0 inset-x-0 z-[100] transition-all duration-500 px-6 py-4 md:px-12 ${scrolled ? 'md:py-4' : 'md:py-8'}`}>
        <div className={`max-w-[1440px] mx-auto flex justify-between items-center px-4 md:px-8 h-16 rounded-full border transition-all duration-500 ${scrolled ? 'bg-white/80 dark:bg-dark-surface/80 backdrop-blur-xl border-slate-200 dark:border-dark-border shadow-lg' : 'bg-transparent border-transparent'}`}>
          <div className="flex items-center gap-12">
            <span className="brand-text text-xl md:text-2xl text-brand cursor-pointer" onClick={() => window.scrollTo({top:0, behavior:'smooth'})}>meritt.</span>
            <div className="hidden lg:flex items-center gap-8">
              {['Gigs', 'Features', 'Pricing', 'FAQ'].map(item => (
                <a key={item} href={`#${item.toLowerCase()}`} className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-brand transition-colors">{item}</a>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button onClick={() => setDarkMode(!darkMode)} className="p-2 text-slate-400 hover:text-brand transition-all">
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <div className="hidden sm:flex items-center gap-6 border-l border-slate-100 dark:border-dark-border pl-6">
              <button onClick={onLogin} className="text-[11px] font-bold text-slate-500 hover:text-brand transition-colors uppercase tracking-widest">Login</button>
              <button onClick={onJoin} className="bg-brand text-white px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl shadow-brand/20 hover:scale-105 active:scale-95 transition-all">Sync Node</button>
            </div>
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="lg:hidden p-2 text-slate-500">
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[110] bg-white dark:bg-dark p-8 flex flex-col justify-center animate-in fade-in duration-300">
           <button onClick={() => setIsMobileMenuOpen(false)} className="absolute top-8 right-8 p-3 bg-slate-100 dark:bg-dark-surface rounded-full"><X /></button>
           <div className="flex flex-col gap-6">
             {['Gigs', 'Features', 'Pricing', 'FAQ'].map(item => (
               <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setIsMobileMenuOpen(false)} className="text-4xl font-black tracking-tighter hover:text-brand">{item}</a>
             ))}
             <div className="h-px bg-slate-100 dark:bg-dark-border my-4"></div>
             <button onClick={onJoin} className="w-full bg-brand text-white py-4 rounded-2xl font-black uppercase tracking-widest">Get Synced</button>
           </div>
        </div>
      )}

      {/* Hero Section */}
      <section id="hero" className="relative pt-40 md:pt-60 pb-20 md:pb-40 hero-grid overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-brand/5 border border-brand/10 rounded-full mb-8 animate-in fade-in slide-in-from-top-4 duration-1000">
            <div className="w-1.5 h-1.5 bg-brand rounded-full animate-pulse"></div>
            <span className="text-[10px] font-black text-brand uppercase tracking-[0.3em]">Meritt Sovereign Node v2.0</span>
          </div>
          <h1 className="text-6xl md:text-[9rem] font-black tracking-tighter leading-[0.85] mb-10 text-slate-900 dark:text-white animate-in zoom-in-95 duration-1000">
            LOCAL CORE.<br/>
            <span className="text-brand">ISLAND SCALE.</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-500 dark:text-slate-400 font-medium mb-12 leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
            The Maldives' first high-density professional workspace. <br className="hidden md:block"/>
            Unified MVR clearing, sovereign identities, and island-wide gigs.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-400">
            <button onClick={onJoin} className="w-full sm:w-auto bg-brand text-white px-10 py-5 rounded-full font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-brand/30 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3">
              Sync Workspace <ArrowRight className="w-4 h-4" />
            </button>
            <button onClick={onExplore} className="w-full sm:w-auto bg-white dark:bg-dark-surface border border-slate-200 dark:border-dark-border px-10 py-5 rounded-full font-black text-xs uppercase tracking-[0.2em] hover:border-brand/40 transition-all">
              Explore Market
            </button>
          </div>
        </div>
        
        {/* Floating elements */}
        <div className="absolute top-20 -left-20 w-64 h-64 bg-brand/5 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-20 -right-20 w-96 h-96 bg-indigo-500/5 rounded-full blur-[120px] animate-pulse" style={{animationDelay: '1s'}}></div>
      </section>

      {/* Partner Marquee */}
      <div className="border-y border-slate-100 dark:border-dark-border py-8 overflow-hidden bg-slate-50/30 dark:bg-dark-surface/10">
        <div className="animate-marquee">
          {[...PARTNERS, ...PARTNERS].map((partner, i) => (
            <div key={i} className="flex items-center gap-4 px-12 opacity-30 dark:opacity-20 grayscale hover:grayscale-0 hover:opacity-100 transition-all cursor-default">
              <Sparkles className="w-4 h-4 text-brand" />
              <span className="text-[11px] font-black uppercase tracking-[0.4em] whitespace-nowrap">{partner}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Ribbon */}
      <section id="stats" className={`py-12 md:py-20 transition-all duration-1000 ${visibleSections.has('stats') ? 'revealed' : ''}`}>
        <div className="max-w-[1440px] mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-16">
          {STATS.map((stat, i) => (
            <div key={i} className="reveal flex flex-col items-center text-center group" style={{transitionDelay: `${i * 100}ms`}}>
              <div className="w-12 h-12 bg-brand/5 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                 <stat.icon className="w-6 h-6 text-brand" />
              </div>
              <h3 className="text-3xl md:text-5xl font-black tracking-tighter dark:text-white mb-2 tabular-nums">{stat.value}</h3>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Categories Horizontal Slider on Mobile */}
      <section id="gigs" className={`py-24 md:py-40 transition-all duration-1000 ${visibleSections.has('gigs') ? 'revealed' : ''}`}>
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 reveal">
            <div className="max-w-2xl">
              <h2 className="text-[11px] font-black text-brand uppercase tracking-[0.5em] mb-4">Gigs & Domains</h2>
              <h3 className="text-4xl md:text-7xl font-black tracking-tight leading-none uppercase">Born in the <br/><span className="text-brand">Islands.</span></h3>
            </div>
            <button onClick={onExplore} className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-slate-400 hover:text-brand transition-all">
              View All Nodes <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

          <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-x-auto md:overflow-visible no-scrollbar pb-10 md:pb-0 -mx-6 px-6 snap-x snap-mandatory">
            {CATEGORIES.map((cat, i) => (
              <div key={i} className="reveal attio-card p-10 rounded-[32px] group min-w-[300px] md:min-w-0 snap-center" style={{transitionDelay: `${i * 100}ms`}}>
                <div className="flex justify-between items-start mb-12">
                  <div className={`w-14 h-14 ${cat.color} rounded-2xl flex items-center justify-center text-white shadow-xl group-hover:scale-110 transition-transform`}>
                    <cat.icon className="w-7 h-7" />
                  </div>
                  <span className="text-[10px] font-black text-slate-300 dark:text-slate-600 uppercase tracking-widest">{cat.count} Active</span>
                </div>
                <div className="mb-8">
                   <h4 className="text-2xl font-black mb-1 dark:text-white">{cat.name}</h4>
                   <p className="thaana-font text-xl font-bold text-slate-400 opacity-60">{cat.thaana}</p>
                </div>
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-brand opacity-0 group-hover:opacity-100 translate-x-[-10px] group-hover:translate-x-0 transition-all">
                   Sync Category <ChevronRight className="w-3 h-3" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works / Process Section */}
      <section id="process" className={`py-24 md:py-40 bg-slate-50 dark:bg-dark-surface/20 transition-all duration-1000 ${visibleSections.has('process') ? 'revealed' : ''}`}>
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="text-center mb-24 reveal">
            <h2 className="text-[11px] font-black text-brand uppercase tracking-[0.5em] mb-6">The Meritt Protocol</h2>
            <h3 className="text-4xl md:text-7xl font-black tracking-tight leading-none uppercase">Synced in <br/><span className="text-brand">4 Steps.</span></h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {PROCESS_STEPS.map((step, i) => (
              <div key={i} className="reveal relative flex flex-col items-center text-center p-8 bg-white dark:bg-dark border border-slate-100 dark:border-dark-border rounded-[32px] hover:border-brand/40 transition-all group" style={{transitionDelay: `${i * 150}ms`}}>
                <div className="w-16 h-16 bg-brand/5 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                   <step.icon className="w-7 h-7 text-brand" />
                </div>
                <h4 className="text-xl font-black mb-3 dark:text-white">{step.title}</h4>
                <p className="text-[13px] text-slate-500 font-medium leading-relaxed">{step.desc}</p>
                {i < PROCESS_STEPS.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 -translate-y-1/2 z-10">
                    <ArrowRight className="w-6 h-6 text-slate-200" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Showcase */}
      <section id="features" className={`py-24 md:py-40 bg-slate-900 dark:bg-black rounded-[48px] md:rounded-[80px] mx-4 md:mx-10 overflow-hidden relative transition-all duration-1000 ${visibleSections.has('features') ? 'revealed' : ''}`}>
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(0,71,255,0.15),transparent)]"></div>
        <div className="max-w-[1440px] mx-auto px-10 relative z-10">
          <div className="text-center mb-20 md:mb-32 reveal">
            <h2 className="text-[11px] font-black text-brand uppercase tracking-[0.6em] mb-6">Protocol Integrity</h2>
            <h3 className="text-5xl md:text-9xl font-black text-white tracking-tighter leading-none uppercase">Vetted. <br/>Cored. <br/>Secured.</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-10">
            <div className="md:col-span-8 bg-white/5 border border-white/10 rounded-[48px] p-12 md:p-20 reveal hover:bg-white/10 transition-all" style={{transitionDelay: '100ms'}}>
              <div className="w-16 h-16 bg-brand/10 rounded-2xl flex items-center justify-center mb-10"><Fingerprint className="w-8 h-8 text-brand" /></div>
              <h4 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-8 leading-none">Meritt ID Node</h4>
              <p className="text-slate-400 text-lg md:text-2xl font-medium leading-relaxed mb-10 max-w-2xl">
                Cryptographically secured professional identity. Verified nodes ensure every history and payout is tied to real people.
              </p>
              <div className="flex flex-wrap gap-3">
                {['Encrypted', 'Local KYC', 'BML Sync'].map(tag => (
                  <span key={tag} className="px-5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black text-slate-300 uppercase tracking-widest">{tag}</span>
                ))}
              </div>
            </div>

            <div className="md:col-span-4 flex flex-col gap-6 lg:gap-10">
              <div className="flex-1 bg-white/5 border border-white/10 rounded-[48px] p-12 reveal hover:bg-white/10 transition-all" style={{transitionDelay: '200ms'}}>
                <Globe className="w-12 h-12 text-blue-400 mb-8" />
                <h4 className="text-2xl font-black text-white mb-4">MVR Clearing</h4>
                <p className="text-slate-400 leading-relaxed font-medium">Direct protocol clearing with local island banks. No middleman fees.</p>
              </div>
              <div className="flex-1 bg-white/5 border border-white/10 rounded-[48px] p-12 reveal hover:bg-white/10 transition-all" style={{transitionDelay: '300ms'}}>
                <ShieldCheck className="w-12 h-12 text-emerald-400 mb-8" />
                <h4 className="text-2xl font-black text-white mb-4">Escrow Core</h4>
                <p className="text-slate-400 leading-relaxed font-medium">Funds locked in secure nodes and released on milestone verification.</p>
              </div>
            </div>
            
            <div className="md:col-span-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { title: "Real-time Metrics", icon: BarChart3, desc: "Monitor your revenue streams across multiple island nodes." },
                  { title: "Sovereign Chat", icon: MessageCircle, desc: "Encrypted direct communication with local stakeholders." },
                  { title: "Risk Mitigation", icon: ShieldAlert, desc: "Automatic dispute resolution via community-vetted nodes." }
                ].map((feat, i) => (
                  <div key={i} className="bg-white/5 border border-white/10 rounded-[40px] p-10 reveal hover:bg-white/10 transition-all" style={{transitionDelay: `${i * 100}ms`}}>
                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-6">
                      <feat.icon className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="text-xl font-black text-white mb-3">{feat.title}</h4>
                    <p className="text-[14px] text-slate-400 font-medium leading-relaxed">{feat.desc}</p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section with Horizontal Slider on Mobile */}
      <section id="pricing" className={`py-24 md:py-40 transition-all duration-1000 ${visibleSections.has('pricing') ? 'revealed' : ''}`}>
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="text-center mb-24 reveal">
            <h2 className="text-[11px] font-black text-brand uppercase tracking-[0.5em] mb-6">Pricing Hub</h2>
            <h3 className="text-4xl md:text-7xl font-black tracking-tight mb-12">Scalable Sync.</h3>
            
            <div className="inline-flex p-1.5 bg-slate-100 dark:bg-dark-surface border border-slate-200 dark:border-dark-border rounded-full shadow-inner">
              <button 
                onClick={() => setPricingType('freelancer')}
                className={`px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${pricingType === 'freelancer' ? 'bg-white dark:bg-dark text-brand shadow-lg' : 'text-slate-400 hover:text-slate-600'}`}
              >
                Freelancers
              </button>
              <button 
                onClick={() => setPricingType('business')}
                className={`px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${pricingType === 'business' ? 'bg-white dark:bg-dark text-brand shadow-lg' : 'text-slate-400 hover:text-slate-600'}`}
              >
                Businesses
              </button>
            </div>
          </div>

          <div className="flex md:grid md:grid-cols-3 gap-8 overflow-x-auto md:overflow-visible no-scrollbar pb-10 md:pb-0 -mx-6 px-6 snap-x snap-mandatory">
            {currentPlans.map((plan, i) => (
              <div 
                key={plan.name} 
                className={`p-10 md:p-12 rounded-[40px] border transition-all flex flex-col reveal relative min-w-[320px] md:min-w-0 snap-center ${
                  plan.featured 
                  ? 'border-brand bg-white dark:bg-dark shadow-2xl z-10 md:-translate-y-4 scale-105' 
                  : 'border-slate-100 dark:border-dark-border bg-white/50 dark:bg-dark-surface/50 hover:border-brand/40'
                }`} 
                style={{transitionDelay: `${i * 100}ms`}}
              >
                {plan.featured && <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand text-white text-[9px] font-black uppercase px-6 py-2 rounded-full tracking-[0.2em] shadow-xl">Recommended</span>}
                <div className="mb-10">
                   <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-8 ${plan.featured ? 'bg-brand/10 text-brand' : 'bg-slate-100 dark:bg-dark text-slate-400'}`}>
                      <plan.icon className="w-6 h-6" />
                   </div>
                   <h4 className="text-3xl font-black dark:text-white uppercase mb-1">{plan.name}</h4>
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-8">{plan.desc}</p>
                   <div className="flex items-baseline gap-2">
                     <span className="text-sm font-bold text-slate-400 uppercase">MVR</span>
                     <span className="text-6xl font-black dark:text-white tabular-nums leading-none">{plan.price}</span>
                     <span className="text-sm font-medium text-slate-400">/mo</span>
                   </div>
                </div>
                <div className="space-y-4 mb-10 flex-1 pt-8 border-t border-slate-50 dark:border-dark-border">
                  <div className="text-[10px] font-black text-brand uppercase tracking-widest mb-6">{plan.fee} Clear Fee</div>
                  {plan.perks.map(perk => (
                    <div key={perk} className="flex items-center gap-3 text-slate-600 dark:text-slate-400 text-[14px] font-medium">
                      <Check className="w-4 h-4 text-brand" /> {perk}
                    </div>
                  ))}
                </div>
                <button onClick={onJoin} className={`w-full py-5 rounded-2xl font-black text-[11px] uppercase tracking-widest transition-all ${plan.featured ? 'bg-brand text-white shadow-xl shadow-brand/30 hover:brightness-110' : 'bg-slate-50 dark:bg-dark border border-slate-200 dark:border-dark-border text-slate-900 dark:text-white hover:border-brand'}`}>Sync Now</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className={`py-24 md:py-40 transition-all duration-1000 ${visibleSections.has('faq') ? 'revealed' : ''}`}>
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-24 reveal">
            <h2 className="text-[11px] font-black text-brand uppercase tracking-[0.5em] mb-6">Support Protocol</h2>
            <h3 className="text-4xl md:text-7xl font-black tracking-tight leading-none uppercase">The Meritt <br/><span className="text-brand">Guide.</span></h3>
          </div>
          <div className="space-y-4">
            {FAQ_ITEMS.map((item, i) => (
              <div key={i} className="reveal bg-white dark:bg-dark-surface border border-slate-100 dark:border-dark-border rounded-3xl overflow-hidden transition-all hover:border-brand/40" style={{transitionDelay: `${i * 100}ms`}}>
                <button 
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-8 text-left group"
                >
                  <span className="text-lg font-black dark:text-white group-hover:text-brand transition-colors">{item.q}</span>
                  <div className={`w-10 h-10 rounded-full border border-slate-100 dark:border-dark-border flex items-center justify-center transition-all ${openFaq === i ? 'bg-brand text-white border-brand rotate-45' : ''}`}>
                    <X className="w-4 h-4" />
                  </div>
                </button>
                {openFaq === i && (
                  <div className="px-8 pb-8 pt-0 animate-in fade-in duration-300">
                    <p className="text-[14px] text-slate-500 font-medium leading-relaxed max-w-2xl">{item.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta" className={`py-32 md:py-60 bg-brand mx-6 md:mx-12 rounded-[60px] md:rounded-[100px] text-center text-white mb-20 relative overflow-hidden transition-all duration-1000 ${visibleSections.has('cta') ? 'revealed' : ''}`}>
        <div className="relative z-10 px-8">
          <h2 className="text-5xl md:text-[9rem] font-black tracking-tighter leading-none mb-12 uppercase reveal">Sync your <br/>island ship.</h2>
          <p className="text-lg md:text-3xl text-white/80 font-medium mb-16 max-w-4xl mx-auto leading-relaxed reveal" style={{transitionDelay: '100ms'}}>Join the sovereign professional protocol powering the Maldives.</p>
          <button onClick={onJoin} className="reveal bg-white text-brand px-12 py-6 rounded-full font-black text-lg uppercase tracking-[0.2em] shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-4 mx-auto group" style={{transitionDelay: '200ms'}}>
            Join Node <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
          </button>
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-[120px] -mr-40 -mt-40"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/10 rounded-full blur-[100px] -ml-40 -mb-40"></div>
      </section>

      {/* Footer */}
      <footer className="py-24 border-t border-slate-100 dark:border-dark-border">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
            <div className="col-span-1 md:col-span-1">
              <span className="brand-text text-3xl text-brand mb-8 block">meritt.</span>
              <p className="text-slate-500 font-medium leading-relaxed">Sovereign workspace infrastructure for the island nation.</p>
            </div>
            <div>
              <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-8">Platform</h5>
              <ul className="space-y-4">
                {['Nodes', 'Marketplace', 'Meritt ID', 'Escrow'].map(item => (
                  <li key={item}><button className="text-[13px] font-medium text-slate-500 hover:text-brand transition-colors">{item}</button></li>
                ))}
              </ul>
            </div>
            <div>
              <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-8">Company</h5>
              <ul className="space-y-4">
                {['Island Success', 'Governance', 'Contact'].map(item => (
                  <li key={item}><button className="text-[13px] font-medium text-slate-500 hover:text-brand transition-colors">{item}</button></li>
                ))}
              </ul>
            </div>
            <div>
              <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-8">Newsletter</h5>
              <div className="flex gap-2 p-1 bg-slate-50 dark:bg-dark-surface border border-slate-100 dark:border-dark-border rounded-xl">
                <input className="bg-transparent text-xs px-3 outline-none flex-1" placeholder="Email" />
                <button className="bg-brand text-white px-4 py-2 rounded-lg text-[9px] font-black uppercase">Join</button>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between pt-12 border-t border-slate-50 dark:border-dark-border gap-6">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em]">© 2024 Meritt Workspace Protocol.</p>
            <div className="flex items-center gap-8">
               <div className="flex items-center gap-2">
                 <Globe className="w-4 h-4 text-slate-300" />
                 <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Malé, Maldives</span>
               </div>
               <div className="flex items-center gap-2">
                 <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                 <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Protocol Sync: Live</span>
               </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;