import React, { useEffect, useState, useRef } from 'react';
import { 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  Globe, 
  Lock,
  Trophy,
  Crown,
  Menu,
  X,
  Coffee,
  TrendingUp,
  Layers,
  Star,
  Quote,
  Shield,
  Activity,
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
  Sparkles,
  MousePointer2,
  ChevronRight,
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
  { q: "Is the MVR Escrow actually safe?", a: "Yes, 100%. When you start a project, the money is held in a secure clearing account. We only release the payment once the client clicks 'Approve' or a verified milestone is achieved." },
  { q: "What is Meritt ID?", a: "Meritt ID is our custom built-in verification system. It uses encrypted local verification to ensure every professional on the platform is a real, vetted individual in the Maldives. No more bots or fake profiles." },
  { q: "How fast do I get my money in BML?", a: "Standard transfers take about 1-2 days. If you're on a Pro or Elite tier, we prioritize your clearing so you often get your MVR on the same day in your BML or MIB account." },
  { q: "Can I use this for long-term resort work?", a: "Absolutely. Meritt handles everything from one-day creative gigs to multi-year resort rebranding and infrastructure projects. You can set up multiple milestones and track everything in your pipeline." }
];

const CATEGORIES = [
  { name: 'Software & Dev', thaana: 'ސޮފްޓްވެއަރ އެންޑް ޑިވެލޮޕްމަންޓް', icon: Code2, count: '142 Gigs', color: 'bg-blue-500' },
  { name: 'Branding & Design', thaana: 'ބްރޭންޑިންގް އެންޑް ޑިޒައިން', icon: Palette, count: '210 Gigs', color: 'bg-purple-500' },
  { name: 'Digital Strategy', thaana: 'ޑިޖިޓަލް ސްޓްރެޓެޖީ', icon: LineChart, count: '89 Gigs', color: 'bg-emerald-500' },
  { name: 'Photography & Film', thaana: 'ފޮޓޯގްރަފީ އެންޑް ފިލްމް', icon: Camera, count: '64 Gigs', color: 'bg-rose-500' },
  { name: 'Translation & Copy', thaana: 'ތަރުޖަމާ އަދި ލިޔުންތެރިކަން', icon: Languages, count: '102 Gigs', color: 'bg-amber-500' },
  { name: 'Resort Operations', thaana: 'ރިސޯޓް އޮޕަރޭޝަންސް', icon: Anchor, count: '45 Gigs', color: 'bg-cyan-500' },
];

const STATS = [
  { label: 'Active Talent', value: '1,200+', icon: Users },
  { label: 'Completed Projects', value: '4,500+', icon: CheckCircle2 },
  { label: 'MVR Disbursed', value: '18M+', icon: ShieldCheck },
  { label: 'Verified Firms', value: '350+', icon: Briefcase },
];

const LandingPage: React.FC<LandingPageProps> = ({ onExplore, onLogin, onJoin, darkMode, setDarkMode }) => {
  const [pricingType, setPricingType] = useState<'freelancer' | 'business'>('freelancer');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set(prev).add(entry.target.id));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('section[id]').forEach((section) => observer.observe(section));

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const currentPlans = pricingType === 'freelancer' ? [
    { name: 'Ithibaaru', thaana: 'އިތިބާރު', price: 'MVR 0', fee: '12%', icon: Coffee, desc: 'Casual Gigs' },
    { name: 'Muraaja', thaana: 'މުރާޖާ', price: 'MVR 49', fee: '7%', icon: Zap, desc: 'Pro Freelancer', featured: true },
    { name: 'Kamiyaabu', thaana: 'ކާމިޔާބު', price: 'MVR 99', fee: '3%', icon: Crown, desc: 'Elite Talent' }
  ] : [
    { name: 'Maqaamu', thaana: 'މަޤާމު', price: 'MVR 0', fee: '1 Gig', icon: Layers, desc: 'Small Business' },
    { name: 'Ithigaadh', thaana: 'އިއުތިޤާދު', price: 'MVR 99', fee: 'Unlimited', icon: TrendingUp, desc: 'Growing Firms', featured: true },
    { name: 'Sulthaan', thaana: 'ސުލްޠާން', price: 'MVR 299', fee: 'Priority', icon: Trophy, desc: 'Enterprise' }
  ];

  return (
    <div className="landing-root bg-[#FDFDFF] dark:bg-dark overflow-x-hidden min-h-screen text-slate-900 dark:text-slate-100 transition-colors duration-500 selection:bg-brand selection:text-white">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(3deg); }
        }
        @keyframes scan {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-shimmer {
          background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0) 100%);
          background-size: 200% 100%;
          animation: shimmer 3s infinite;
        }
        .reveal { opacity: 0; transform: translateY(30px); transition: all 1s cubic-bezier(0.2, 0.8, 0.2, 1); }
        .revealed .reveal { opacity: 1; transform: translateY(0); }
        .thaana-text { direction: rtl; font-family: 'Inter', sans-serif; }
        .mobile-slider { 
          display: flex; 
          overflow-x: auto; 
          scroll-snap-type: x mandatory; 
          gap: 1.25rem; 
          padding: 1rem;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .mobile-slider::-webkit-scrollbar { display: none; }
        .mobile-slider > * { flex: 0 0 85%; scroll-snap-align: center; }
        
        .glass-card {
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(226, 232, 240, 0.5);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .dark .glass-card {
          background: rgba(24, 24, 27, 0.8);
          border-color: rgba(39, 39, 42, 0.5);
        }
        .scanner-line { 
          position: absolute; left: 0; width: 100%; height: 2px; 
          background: linear-gradient(90deg, transparent, #0047FF, transparent); 
          box-shadow: 0 0 15px #0047FF; 
          animation: scan 4s linear infinite; 
        }
        .activity-marquee {
          display: flex;
          animation: marquee 40s linear infinite;
          width: max-content;
        }
      `}</style>

      {/* Navigation */}
      <header className={`fixed top-0 inset-x-0 h-[72px] md:h-[90px] z-[100] transition-all duration-500 ${scrolled ? 'bg-white/80 dark:bg-dark/80 backdrop-blur-2xl border-b border-slate-100 dark:border-dark-border shadow-sm' : 'bg-transparent'}`}>
        <div className="container mx-auto px-6 h-full flex justify-between items-center">
          <div className="flex items-center cursor-pointer group" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <span className="brand-text text-2xl md:text-3xl text-brand transition-all group-hover:tracking-widest">meritt.</span>
          </div>

          <nav className="hidden lg:flex items-center gap-10">
            {['Gigs', 'Features', 'Pricing', 'About'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-brand transition-colors">
                {item}
              </a>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-6">
            <button onClick={() => setDarkMode(!darkMode)} className="p-2.5 text-slate-400 hover:text-brand transition-all rounded-2xl hover:bg-slate-50 dark:hover:bg-dark-surface">
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button onClick={onLogin} className="text-[12px] font-bold text-slate-500 dark:text-slate-400 hover:text-brand transition-colors">Login</button>
            <button onClick={onJoin} className="bg-brand text-white px-10 py-4 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] shadow-2xl shadow-brand/30 hover:scale-105 active:scale-95 transition-all overflow-hidden relative group">
              <span className="relative z-10">Join Meritt</span>
              <div className="absolute inset-0 animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </button>
          </div>

          <div className="lg:hidden flex items-center gap-3">
             <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-3 rounded-2xl border border-slate-100 dark:border-dark-border dark:text-white">
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="hero" className="relative pt-32 pb-16 md:pt-64 md:pb-40 overflow-hidden">
        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-brand/5 dark:bg-brand/10 border border-brand/10 rounded-full mb-8 animate-float shadow-sm">
            <Fingerprint className="w-4 h-4 text-brand" />
            <span className="text-[9px] md:text-[10px] font-black text-brand uppercase tracking-[0.3em]">Verified Local Infrastructure</span>
          </div>
          <h1 className="text-4xl md:text-9xl font-black tracking-tighter mb-8 max-w-6xl mx-auto leading-[0.9] text-slate-900 dark:text-white">
            THE HUB FOR <br className="hidden md:block"/> <span className="text-brand">ISLAND TALENT.</span>
          </h1>
          <p className="text-base md:text-2xl text-slate-500 dark:text-slate-400 font-medium max-w-2xl mx-auto mb-12 leading-relaxed">
            Direct MVR Payouts. Escrow Security. Vetted Local Talent. <br className="hidden md:block"/>
            The professional operating system built for the Maldives.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button onClick={onJoin} className="w-full sm:w-auto bg-brand text-white px-12 py-5 rounded-3xl font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-brand/30 hover:scale-105 transition-all flex items-center justify-center gap-3">
              Join Workspace <ArrowRight className="w-5 h-5" />
            </button>
            <button onClick={onExplore} className="w-full sm:w-auto bg-white dark:bg-dark-surface border border-slate-200 dark:border-dark-border px-12 py-5 rounded-3xl font-black text-xs uppercase tracking-[0.2em] hover:shadow-xl transition-all dark:text-white">
              Browse Marketplace
            </button>
          </div>
        </div>

        {/* Live Activity Marquee */}
        <div className="mt-20 md:mt-32 border-y border-slate-100 dark:border-dark-border py-4 bg-white/50 dark:bg-dark/50 backdrop-blur-md overflow-hidden">
          <div className="activity-marquee">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex items-center gap-12 px-6">
                {[
                  "New Gig: Logo Design for @ResortLink",
                  "Verified: Product Manager #1042",
                  "Payout Cleared: MVR 4,500 to BML",
                  "Milestone Met: 'Alpha Testing' - Oceanic Retail",
                  "New Talent: Senior Architect from Addu City",
                  "Escrow Locked: MVR 12,000 for 'Brand Audit'"
                ].map((text, idx) => (
                  <div key={idx} className="flex items-center gap-3 whitespace-nowrap">
                    <div className="w-1.5 h-1.5 bg-brand rounded-full"></div>
                    <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">{text}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-20 -left-20 w-[600px] h-[600px] bg-brand/10 blur-[120px] rounded-full opacity-50 animate-float" style={{animationDelay: '-2s'}}></div>
        <div className="absolute bottom-0 -right-20 w-[400px] h-[400px] bg-blue-400/10 blur-[100px] rounded-full opacity-50 animate-float"></div>
      </section>

      {/* Stats Section */}
      <section id="stats" className={`py-20 bg-slate-50/50 dark:bg-dark-surface/30 transition-all duration-1000 ${visibleSections.has('stats') ? 'revealed' : ''}`}>
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {STATS.map((stat, i) => (
              <div key={i} className="reveal flex flex-col items-center text-center group" style={{transitionDelay: `${i * 100}ms`}}>
                <div className="w-14 h-14 bg-brand/5 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <stat.icon className="w-6 h-6 text-brand" />
                </div>
                <h3 className="text-3xl md:text-4xl font-black tracking-tight dark:text-white mb-2">{stat.value}</h3>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gigs/Categories Section */}
      <section id="gigs" className={`py-24 md:py-32 transition-all duration-1000 ${visibleSections.has('gigs') ? 'revealed' : ''}`}>
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div className="max-w-2xl reveal">
              <h2 className="text-[11px] font-black text-brand uppercase tracking-[0.5em] mb-4">Local Marketplace</h2>
              <h3 className="text-4xl md:text-6xl font-black tracking-tighter leading-tight">EXPLORE LOCAL <span className="text-brand">CRAFT.</span></h3>
            </div>
            <button onClick={onExplore} className="reveal text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-brand transition-all flex items-center gap-3">
              See all categories <ArrowUpRight className="w-5 h-5" />
            </button>
          </div>

          {/* Desktop Grid */}
          <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-8">
            {CATEGORIES.map((cat, i) => (
              <div key={i} className="reveal glass-card p-10 rounded-[48px] hover:border-brand cursor-pointer group" style={{transitionDelay: `${i * 100}ms`}}>
                <div className={`w-16 h-16 ${cat.color} rounded-3xl flex items-center justify-center mb-8 shadow-lg shadow-black/5 group-hover:scale-110 transition-transform`}>
                  <cat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-2xl font-black dark:text-white tracking-tight">{cat.name}</h4>
                  <span className="text-[11px] font-black text-slate-300 dark:text-slate-600 uppercase tracking-widest">{cat.count}</span>
                </div>
                <p className="thaana-text text-2xl font-bold text-slate-400 dark:text-slate-500 mb-8">{cat.thaana}</p>
                <div className="flex items-center gap-3 text-[11px] font-black uppercase tracking-widest text-brand opacity-0 group-hover:opacity-100 transition-all">
                  Browse category <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Slider */}
          <div className="md:hidden mobile-slider">
            {CATEGORIES.map((cat, i) => (
              <div key={i} className="glass-card p-8 rounded-[40px] shadow-sm">
                <div className={`w-14 h-14 ${cat.color} rounded-2xl flex items-center justify-center mb-6`}>
                  <cat.icon className="w-7 h-7 text-white" />
                </div>
                <h4 className="text-xl font-black dark:text-white mb-1">{cat.name}</h4>
                <p className="thaana-text text-xl font-bold text-slate-400 mb-6">{cat.thaana}</p>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{cat.count}</span>
                  <ArrowRight className="w-4 h-4 text-brand" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features - ONLY Bento Box here */}
      <section id="features" className={`py-32 bg-slate-900 dark:bg-dark-surface rounded-[60px] mx-4 md:mx-8 transition-all duration-1000 ${visibleSections.has('features') ? 'revealed' : ''}`}>
        <div className="container mx-auto px-6">
          <div className="text-center mb-24 reveal">
            <h3 className="text-[11px] font-black text-brand uppercase tracking-[0.5em] mb-6">Our Protocol Infrastructure</h3>
            <h2 className="text-4xl md:text-7xl font-black text-white tracking-tight">VETTED & SECURE.</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Main Feature - Bento Large */}
            <div className="md:col-span-8 bg-white/5 p-12 rounded-[48px] border border-white/10 reveal group overflow-hidden relative" style={{transitionDelay: '100ms'}}>
              <div className="relative z-10">
                <div className="w-20 h-20 bg-brand/10 rounded-3xl flex items-center justify-center mb-10 relative overflow-hidden">
                  <div className="scanner-line"></div>
                  <Fingerprint className="w-10 h-10 text-brand" />
                </div>
                <h4 className="text-4xl font-black text-white tracking-tight mb-6">Sovereign identity via Meritt ID</h4>
                <p className="text-slate-400 text-lg leading-relaxed font-medium mb-10 max-w-xl">
                  Meritt ID is your cryptographically secured digital passport. It ensures that every professional history, rating, and wallet is tied to a real person.
                </p>
                <div className="flex flex-wrap gap-4">
                  {['Encrypted Vault', 'Local Verification', 'Reputation Score'].map(tag => (
                    <span key={tag} className="px-6 py-2.5 bg-white/5 border border-white/10 rounded-2xl text-[11px] font-black text-slate-300 uppercase tracking-widest">{tag}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Side Features - Bento Column */}
            <div className="md:col-span-4 flex flex-col gap-8">
              <div className="flex-1 bg-white/5 p-10 rounded-[48px] border border-white/10 reveal hover:bg-white/10 transition-colors" style={{transitionDelay: '200ms'}}>
                <Globe className="w-12 h-12 text-blue-400 mb-8" />
                <h4 className="text-2xl font-black text-white tracking-tight mb-4">BML Clearing</h4>
                <p className="text-slate-400 leading-relaxed font-medium">Integrated gateways ensure funds move directly to your account. No intermediate processors.</p>
              </div>
              <div className="flex-1 bg-white/5 p-10 rounded-[48px] border border-white/10 reveal hover:bg-white/10 transition-colors" style={{transitionDelay: '300ms'}}>
                <ShieldCheck className="w-12 h-12 text-emerald-400 mb-8" />
                <h4 className="text-2xl font-black text-white tracking-tight mb-4">Escrow Nodes</h4>
                <p className="text-slate-400 leading-relaxed font-medium">Automatic project clearing. Secure funds held until milestones are met.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className={`py-32 transition-all duration-1000 ${visibleSections.has('pricing') ? 'revealed' : ''}`}>
        <div className="container mx-auto px-6">
          <div className="text-center mb-20 reveal">
            <h3 className="text-[11px] font-black text-brand uppercase tracking-[0.5em] mb-6">Transparent Tiers</h3>
            <div className="inline-flex p-1.5 bg-slate-100 dark:bg-dark-surface border border-slate-200 dark:border-dark-border rounded-3xl mb-12">
              <button 
                onClick={() => setPricingType('freelancer')}
                className={`px-10 py-3.5 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all ${pricingType === 'freelancer' ? 'bg-white dark:bg-dark text-brand shadow-xl' : 'text-slate-400'}`}
              >
                Freelancers
              </button>
              <button 
                onClick={() => setPricingType('business')}
                className={`px-10 py-3.5 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all ${pricingType === 'business' ? 'bg-white dark:bg-dark text-brand shadow-xl' : 'text-slate-400'}`}
              >
                Businesses
              </button>
            </div>
          </div>

          <div className="mobile-slider md:grid md:grid-cols-3 md:gap-8 max-w-6xl mx-auto">
            {currentPlans.map((plan, i) => (
              <div key={plan.name} className={`p-10 rounded-[48px] border transition-all flex flex-col reveal group ${plan.featured ? 'border-brand ring-4 ring-brand/5 shadow-2xl lg:scale-105 z-10 glass-card' : 'border-slate-100 dark:border-dark-border hover:border-brand/40 bg-white dark:bg-dark-surface'}`} style={{transitionDelay: `${i * 150}ms`}}>
                <div className="mb-10">
                  <div className="w-14 h-14 bg-brand/5 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <plan.icon className="w-7 h-7 text-brand" />
                  </div>
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="text-2xl font-black dark:text-white uppercase tracking-tighter">{plan.name}</h4>
                    <span className="thaana-text text-xl font-bold text-slate-400">{plan.thaana}</span>
                  </div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-8">{plan.desc}</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-black tracking-tighter dark:text-white">{plan.price}</span>
                    <span className="text-sm font-bold text-slate-400">/ mo</span>
                  </div>
                </div>

                <div className="space-y-4 mb-10 flex-1">
                  <div className="flex items-center gap-3 text-brand font-black text-[11px] uppercase tracking-widest">
                    <Shield className="w-4 h-4" /> {plan.fee} Commission
                  </div>
                  {['Unlimited Gigs', 'Meritt ID Security', 'Instant Payouts'].map(perk => (
                    <div key={perk} className="flex items-center gap-3 text-slate-500 dark:text-slate-400 text-[13px] font-medium">
                      <div className="w-1.5 h-1.5 bg-brand rounded-full" /> {perk}
                    </div>
                  ))}
                </div>

                <button onClick={onJoin} className={`w-full py-5 rounded-3xl font-black text-[11px] uppercase tracking-widest transition-all ${plan.featured ? 'bg-brand text-white shadow-2xl' : 'bg-slate-50 dark:bg-dark border border-slate-200 dark:border-dark-border text-slate-900 dark:text-white hover:border-brand'}`}>
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className={`py-32 transition-all duration-1000 ${visibleSections.has('faq') ? 'revealed' : ''}`}>
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-20 reveal">
            <h3 className="text-[11px] font-black text-brand uppercase tracking-[0.5em] mb-4">Support Hub</h3>
            <h2 className="text-4xl font-black tracking-tight leading-tight">KNOW BEFORE YOU <span className="text-brand">SYNC.</span></h2>
          </div>
          <div className="space-y-4">
            {FAQ_ITEMS.map((item, i) => (
              <div key={i} className="glass-card rounded-[32px] overflow-hidden transition-all reveal" style={{transitionDelay: `${i * 100}ms`}}>
                <button 
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full px-8 py-7 text-left flex items-center justify-between group"
                >
                  <span className="text-[14px] md:text-[16px] font-black dark:text-white group-hover:text-brand transition-colors pr-6">{item.q}</span>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all shrink-0 ${openFaq === i ? 'bg-brand text-white rotate-45' : 'bg-slate-50 dark:bg-dark'}`}>
                    <X className="w-4 h-4" />
                  </div>
                </button>
                {openFaq === i && (
                  <div className="px-8 pb-8 animate-in slide-in-from-top-2">
                    <p className="text-[14px] text-slate-500 dark:text-slate-400 leading-relaxed font-medium">{item.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta" className={`py-32 bg-brand mx-4 md:mx-8 rounded-[60px] relative overflow-hidden text-center text-white mb-8 transition-all duration-1000 ${visibleSections.has('cta') ? 'revealed' : ''}`}>
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10 px-6">
          <h2 className="text-4xl md:text-8xl font-black tracking-tighter mb-10 leading-[0.9] reveal">READY TO START YOUR <br className="hidden md:block"/> NEW GIG?</h2>
          <p className="text-lg md:text-2xl text-white/70 font-medium mb-12 max-w-2xl mx-auto leading-relaxed reveal" style={{transitionDelay: '100ms'}}>Join 5,000+ professionals building the future of the local economy.</p>
          <button onClick={onJoin} className="bg-white text-brand px-12 py-6 rounded-3xl font-black text-sm uppercase tracking-[0.2em] shadow-2xl hover:scale-105 transition-all reveal" style={{transitionDelay: '200ms'}}>
            Join Workspace Now
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-slate-100 dark:border-dark-border bg-white dark:bg-dark transition-colors">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
            <div className="col-span-1 md:col-span-1">
              <span className="brand-text text-3xl text-brand mb-6 block">meritt.</span>
              <p className="text-[13px] text-slate-500 leading-relaxed font-medium">The modern professional network for the Maldives. Secured by Meritt ID and powered by local talent.</p>
            </div>
            <div>
              <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Platform</h5>
              <ul className="space-y-4">
                {['Browse Gigs', 'Find Talent', 'Identity Vault'].map(item => (
                  <li key={item}><button className="text-[12px] font-bold text-slate-500 hover:text-brand transition-colors">{item}</button></li>
                ))}
              </ul>
            </div>
            <div>
              <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Community</h5>
              <ul className="space-y-4">
                {['Success Stories', 'Local Events', 'Referral Program'].map(item => (
                  <li key={item}><button className="text-[12px] font-bold text-slate-500 hover:text-brand transition-colors">{item}</button></li>
                ))}
              </ul>
            </div>
            <div>
              <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Legal</h5>
              <ul className="space-y-4">
                {['Privacy Policy', 'Terms of Sync', 'Node Security'].map(item => (
                  <li key={item}><button className="text-[12px] font-bold text-slate-500 hover:text-brand transition-colors">{item}</button></li>
                ))}
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between pt-12 border-t border-slate-50 dark:border-dark-border gap-6">
            <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">© 2024 Meritt Workspace Protocol. All Rights Reserved.</p>
            <div className="flex items-center gap-6">
               <Globe className="w-4 h-4 text-slate-300" />
               <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Maldives Standard Time</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;