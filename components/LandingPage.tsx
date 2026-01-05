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
  CreditCard,
  Rocket
} from 'lucide-react';

interface LandingPageProps {
  onExplore: () => void;
  onLogin: () => void;
  onJoin: () => void;
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
}

const FAQ_ITEMS = [
  { q: "Is the MVR Escrow actually safe?", a: "Yes, 100%. When you start a project, the money is held in a secure clearing account. We only release the payment to the freelancer once the client clicks 'Approve' or the milestone is reached. No more chasing clients for payments." },
  { q: "What is Meritt ID?", a: "Meritt ID is our custom built-in verification system. Since we don't rely on external third-party logins, Meritt ID uses encrypted local verification to ensure every professional on the platform is a real, vetted individual in the Maldives. It protects your reputation and payments." },
  { q: "How fast do I get my money in BML?", a: "Standard transfers take about 1-2 days. If you're on a Pro or Elite tier, we prioritize your clearing so you often get your MVR on the same day in your BML or MIB account." },
  { q: "Can I use this for long-term resort work?", a: "For sure. Meritt handles everything from one-day design gigs to year-long resort rebranding projects. You can set up multiple milestones and track everything in your pipeline." }
];

const CATEGORIES = [
  { name: 'Software & Dev', thaana: 'ސޮފްޓްވެއަރ އެންޑް ޑިވެލޮޕްމަންޓް', icon: Code2, count: '142 Gigs', color: 'bg-blue-500' },
  { name: 'Branding & Design', thaana: 'ބްރޭންޑިންގް އެންޑް ޑިޒައިން', icon: Palette, count: '210 Gigs', color: 'bg-purple-500' },
  { name: 'Digital Strategy', thaana: 'ޑިޖިޓަލް ސްޓްރެޓެޖީ', icon: LineChart, count: '89 Gigs', color: 'bg-emerald-500' },
  { name: 'Photography & Film', thaana: 'ފޮޓޯގްރަފީ އެންޑް ފިލްމް', icon: Camera, count: '64 Gigs', color: 'bg-rose-500' },
  { name: 'Translation & Copy', thaana: 'ތަރުޖަމާ އަދި ލިޔުންތެރިކަން', icon: Languages, count: '102 Gigs', color: 'bg-amber-500' },
  { name: 'Resort Operations', thaana: 'ރިސޯޓް އޮޕަރޭޝަންސް', icon: Anchor, count: '45 Gigs', color: 'bg-cyan-500' },
];

const TESTIMONIALS = [
  { name: 'Ibrahim Maiz', role: 'Founder, Oceanic Retail', text: 'Meritt changed how we hire local tech talent. The escrow system gives us the confidence to work with new freelancers without hesitation.', rating: 5 },
  { name: 'Aishath Hana', role: 'Visual Designer', text: 'Finally, a platform that understands Maldivian banking. Direct BML payouts mean I can focus on design, not chasing invoices.', rating: 5 },
  { name: 'Zayaan Ahmed', role: 'Product Manager', text: 'The Meritt ID verification ensures I’m only dealing with serious professionals. The quality of work here is unmatched in the local market.', rating: 5 },
];

const STATS = [
  { label: 'Active Talent', value: '1,200+', icon: Users },
  { label: 'Completed Projects', value: '4,500+', icon: CheckCircle2 },
  { label: 'MVR Disbursed', value: '18M+', icon: ShieldCheck },
  { label: 'Verified Businesses', value: '350+', icon: Briefcase },
];

const RECENT_ACTIVITY = [
  "New Gig: Logo Design for @ResortLink",
  "Verified: Product Manager #1042",
  "Payout Cleared: MVR 4,500 to BML",
  "Milestone Met: 'Alpha Testing' - Oceanic Retail",
  "New Talent: Senior Architect from Addu City",
  "Escrow Locked: MVR 12,000 for 'Brand Audit'",
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

  const freelancerPlans = [
    { id: 'ithibaaru', name: 'Ithibaaru', thaanaName: 'އިތިބާރު', tagline: 'For Beginners', price: 'MVR 0', perk: '12% Fee', icon: Coffee, color: 'text-slate-400' },
    { id: 'muraaja', name: 'Muraaja', thaanaName: 'މުރާޖާ', tagline: 'Full-time Freelancer', price: 'MVR 49', perk: '7% Fee', icon: Zap, color: 'text-brand', featured: true },
    { id: 'kamiyaabu', name: 'Kamiyaabu', thaanaName: 'ކާމިޔާބު', tagline: 'Top-tier Talent', price: 'MVR 99', perk: '3% Fee', icon: Crown, color: 'text-yellow-500' }
  ];

  const businessPlans = [
    { id: 'maqaamu', name: 'Maqaamu', thaanaName: 'މަޤާމު', tagline: 'Single Hires', price: 'MVR 0', perk: '1 Active Gig', icon: Layers, color: 'text-slate-400' },
    { id: 'ithigaadh', name: 'Ithigaadh', thaanaName: 'އިއުތިޤާދު', tagline: 'Growing Businesses', price: 'MVR 99', perk: 'Unlimited Gigs', icon: TrendingUp, color: 'text-brand', featured: true },
    { id: 'sulthaan', name: 'Sulthaan', thaanaName: 'ސުލްޠާން', tagline: 'Premium Support', price: 'MVR 299', perk: 'Dedicated Manager', icon: Trophy, color: 'text-brand' }
  ];

  const currentPlans = pricingType === 'freelancer' ? freelancerPlans : businessPlans;

  return (
    <div className="landing-root bg-[#FDFDFF] dark:bg-dark overflow-x-hidden min-h-screen text-slate-900 dark:text-slate-100 transition-colors duration-500">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes scan {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-shimmer { position: relative; overflow: hidden; }
        .animate-shimmer::after {
          content: '';
          position: absolute;
          top: 0; left: 0; width: 100%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          animation: shimmer 2s infinite;
        }
        .reveal-item { opacity: 0; transform: translateY(20px); transition: all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1); }
        .revealed .reveal-item { opacity: 1; transform: translateY(0); }
        .thaana-text { direction: rtl; font-family: 'Inter', sans-serif; }
        .ticker-scroll { display: flex; animation: ticker 40s linear infinite; width: max-content; }
        .scanner-line { 
          position: absolute; left: 0; width: 100%; height: 2px; 
          background: linear-gradient(90deg, transparent, #0047FF, transparent); 
          box-shadow: 0 0 15px #0047FF; 
          animation: scan 4s linear infinite; 
        }
      `}</style>

      {/* Navigation */}
      <header className={`fixed top-0 inset-x-0 h-[72px] md:h-[90px] z-[100] transition-all duration-500 ${isMobileMenuOpen ? 'bg-white dark:bg-dark border-b border-slate-100 dark:border-dark-border' : (scrolled ? 'bg-white/90 dark:bg-dark/90 backdrop-blur-2xl border-b border-slate-100 dark:border-dark-border shadow-sm' : 'bg-transparent')}`}>
        <div className="container mx-auto px-6 h-full flex justify-between items-center">
          <div className="flex items-center cursor-pointer group" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <span className="brand-text text-2xl md:text-3xl text-brand transition-all group-hover:tracking-widest">meritt.</span>
          </div>

          <nav className="hidden lg:flex items-center gap-12">
            {['Gigs', 'Features', 'Pricing', 'About'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-brand transition-colors">
                {item}
              </a>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-6">
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className="p-2.5 text-slate-400 hover:text-brand transition-all rounded-2xl hover:bg-slate-50 dark:hover:bg-dark-surface"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button onClick={onLogin} className="text-[12px] font-bold text-slate-500 dark:text-slate-400 hover:text-brand transition-colors">Login</button>
            <button onClick={onJoin} className="bg-brand text-white px-10 py-4 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] shadow-2xl shadow-brand/30 hover:scale-105 active:scale-95 transition-all">
              Sign Up
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
      <section id="hero" className={`relative pt-40 pb-20 md:pt-64 md:pb-40 overflow-hidden transition-all duration-1000 ${visibleSections.has('hero') ? 'opacity-100' : 'opacity-0'}`}>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand/5 dark:bg-brand/10 border border-brand/10 rounded-full mb-8 animate-float">
            <Fingerprint className="w-4 h-4 text-brand" />
            <span className="text-[10px] font-black text-brand uppercase tracking-[0.2em]">Verified Locally in Maldives</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-8 max-w-5xl mx-auto leading-[0.9]">
            THE MODERN HUB FOR <span className="text-brand">ISLAND TALENT.</span>
          </h1>
          <p className="text-lg md:text-2xl text-slate-500 dark:text-slate-400 font-medium max-w-2xl mx-auto mb-12 leading-relaxed">
            Direct MVR Payouts. Escrow Security. Vetted Local Talent. <br className="hidden md:block"/>
            The professional operating system for the Maldives.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button onClick={onJoin} className="w-full sm:w-auto bg-brand text-white px-12 py-5 rounded-3xl font-black text-sm uppercase tracking-[0.2em] shadow-2xl shadow-brand/30 hover:scale-105 transition-all flex items-center justify-center gap-3">
              Join Meritt <ArrowRight className="w-5 h-5" />
            </button>
            <button onClick={onExplore} className="w-full sm:w-auto bg-white dark:bg-dark-surface border border-slate-200 dark:border-dark-border px-12 py-5 rounded-3xl font-black text-sm uppercase tracking-[0.2em] hover:bg-slate-50 transition-all flex items-center justify-center gap-3">
              Browse Gigs
            </button>
          </div>
        </div>

        {/* Live Activity Ticker */}
        <div className="mt-20 border-y border-slate-100 dark:border-dark-border py-4 bg-white/50 dark:bg-dark/50 backdrop-blur-md overflow-hidden">
          <div className="ticker-scroll">
            {[...RECENT_ACTIVITY, ...RECENT_ACTIVITY].map((act, i) => (
              <div key={i} className="flex items-center gap-3 px-12 border-r border-slate-100 dark:border-dark-border">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest whitespace-nowrap">{act}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Decorative Blobs */}
        <div className="absolute top-20 -left-20 w-[600px] h-[600px] bg-brand/10 blur-[120px] rounded-full opacity-50 animate-float" style={{animationDelay: '-2s'}}></div>
        <div className="absolute bottom-0 -right-20 w-[400px] h-[400px] bg-blue-400/10 blur-[100px] rounded-full opacity-50 animate-float"></div>
      </section>

      {/* Stats Section */}
      <section id="stats" className={`py-20 bg-slate-50/50 dark:bg-dark-surface/30 transition-all duration-1000 ${visibleSections.has('stats') ? 'revealed' : ''}`}>
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {STATS.map((stat, i) => (
              <div key={i} className="flex flex-col items-center text-center reveal-item" style={{transitionDelay: `${i * 100}ms`}}>
                <div className="w-12 h-12 bg-brand/5 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <stat.icon className="w-6 h-6 text-brand" />
                </div>
                <h3 className="text-3xl font-black tracking-tight dark:text-white mb-1">{stat.value}</h3>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section id="gigs" className={`py-24 md:py-32 transition-all duration-1000 ${visibleSections.has('gigs') ? 'revealed' : ''}`}>
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div className="max-w-2xl">
              <h2 className="text-[11px] font-black text-brand uppercase tracking-[0.4em] mb-4">Marketplace Categories</h2>
              <h3 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">EXPLORE LOCAL <span className="text-brand">CRAFT.</span></h3>
            </div>
            <button onClick={onExplore} className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-brand transition-all flex items-center gap-2">
              See all categories <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CATEGORIES.map((cat, i) => (
              <div key={i} className="group bg-white dark:bg-dark-surface border border-slate-100 dark:border-dark-border p-8 rounded-[40px] hover:border-brand transition-all hover:shadow-2xl hover:shadow-brand/5 cursor-pointer reveal-item" style={{transitionDelay: `${i * 100}ms`}}>
                <div className={`w-14 h-14 ${cat.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-black/5 group-hover:scale-110 transition-transform`}>
                  <cat.icon className="w-7 h-7 text-white" />
                </div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xl font-black dark:text-white">{cat.name}</h4>
                  <span className="text-[10px] font-black text-slate-300 dark:text-slate-600 uppercase tracking-widest">{cat.count}</span>
                </div>
                <p className="thaana-text text-xl font-bold text-slate-400 dark:text-slate-500 mb-6">{cat.thaana}</p>
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-brand opacity-0 group-hover:opacity-100 transition-all">
                  Browse category <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works / Features */}
      <section id="features" className={`py-24 bg-slate-900 dark:bg-dark-surface rounded-[60px] mx-4 md:mx-8 transition-all duration-1000 ${visibleSections.has('features') ? 'revealed' : ''}`}>
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h3 className="text-[11px] font-black text-brand uppercase tracking-[0.4em] mb-4">Core Infrastructure</h3>
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight">VETTED & SECURE.</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 relative">
            {/* Visual connector line for desktop */}
            <div className="hidden lg:block absolute top-1/2 left-0 w-full h-px bg-white/5 -translate-y-1/2"></div>
            
            {[
              { icon: ShieldCheck, color: 'text-brand', title: 'Sovereign Identity', desc: 'Meritt ID is your cryptographically secured passport. Verify once, carry your reputation across every project.' },
              { icon: Globe, color: 'text-blue-400', title: 'Direct Clearing', desc: 'Integrated with BML and MIB gateways. Funds move instantly after approval, no heavy fees.' },
              { icon: Activity, color: 'text-emerald-400', title: 'Project Pipelines', desc: 'Professional-grade CRM boards to track every gig from brief to payout. Full transparency.' }
            ].map((feature, i) => (
              <div key={i} className="space-y-6 reveal-item relative z-10 bg-slate-900 dark:bg-dark-surface p-4" style={{transitionDelay: `${i * 200}ms`}}>
                <div className="w-16 h-16 bg-white/5 rounded-3xl flex items-center justify-center hover:rotate-6 transition-transform relative overflow-hidden">
                   <div className="scanner-line"></div>
                   <feature.icon className={`w-8 h-8 ${feature.color}`} />
                </div>
                <h4 className="text-2xl font-black text-white tracking-tight">{feature.title}</h4>
                <p className="text-slate-400 leading-relaxed font-medium">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className={`py-32 transition-all duration-1000 ${visibleSections.has('pricing') ? 'revealed' : ''}`}>
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h3 className="text-[11px] font-black text-brand uppercase tracking-[0.4em] mb-6">Transparent Tiers</h3>
            <div className="inline-flex p-1 bg-slate-100 dark:bg-dark-surface border border-slate-200 dark:border-dark-border rounded-3xl mb-12">
              <button 
                onClick={() => setPricingType('freelancer')}
                className={`px-8 py-3 rounded-[20px] text-[11px] font-black uppercase tracking-widest transition-all ${pricingType === 'freelancer' ? 'bg-white dark:bg-dark text-brand shadow-xl shadow-black/5' : 'text-slate-400'}`}
              >
                Freelancers
              </button>
              <button 
                onClick={() => setPricingType('business')}
                className={`px-8 py-3 rounded-[20px] text-[11px] font-black uppercase tracking-widest transition-all ${pricingType === 'business' ? 'bg-white dark:bg-dark text-brand shadow-xl shadow-black/5' : 'text-slate-400'}`}
              >
                Businesses
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {currentPlans.map((plan, i) => (
              <div key={plan.id} className={`p-10 rounded-[48px] bg-white dark:bg-dark-surface border transition-all flex flex-col reveal-item group ${plan.featured ? 'border-brand ring-4 ring-brand/5 shadow-2xl lg:scale-105 z-10' : 'border-slate-100 dark:border-dark-border hover:border-brand/40'}`} style={{transitionDelay: `${i * 150}ms`}}>
                <div className="mb-10">
                  <div className={`w-14 h-14 bg-brand/5 rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <plan.icon className={`w-7 h-7 ${plan.color}`} />
                  </div>
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="text-2xl font-black dark:text-white uppercase tracking-tighter">{plan.name}</h4>
                    <span className="thaana-text text-xl font-bold text-slate-400">{plan.thaanaName}</span>
                  </div>
                  <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-6">{plan.tagline}</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-black tracking-tighter dark:text-white">{plan.price}</span>
                    <span className="text-sm font-bold text-slate-400">/ month</span>
                  </div>
                </div>

                <div className="space-y-4 mb-10 flex-1">
                  <div className="flex items-center gap-3 text-brand font-black text-[11px] uppercase tracking-widest">
                    <Shield className="w-4 h-4" /> {plan.perk} Commission
                  </div>
                  {['Full Marketplace Access', 'Meritt ID Security', 'Instant BML Clearing'].map(perk => (
                    <div key={perk} className="flex items-center gap-3 text-slate-500 dark:text-slate-400 text-[13px] font-medium">
                      <div className="w-1.5 h-1.5 bg-brand rounded-full" /> {perk}
                    </div>
                  ))}
                </div>

                <button onClick={onJoin} className={`w-full py-5 rounded-3xl font-black text-[12px] uppercase tracking-widest transition-all animate-shimmer ${plan.featured ? 'bg-brand text-white shadow-2xl shadow-brand/30' : 'bg-slate-50 dark:bg-dark border border-slate-200 dark:border-dark-border text-slate-900 dark:text-white hover:border-brand'}`}>
                  Initialize {plan.name}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className={`py-24 bg-brand/5 dark:bg-brand/10 transition-all duration-1000 ${visibleSections.has('testimonials') ? 'revealed' : ''}`}>
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
             <h3 className="text-[11px] font-black text-brand uppercase tracking-[0.4em] mb-4">Community Voice</h3>
             <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">TRUSTED BY THE <span className="text-brand">ISLANDS.</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="bg-white dark:bg-dark-surface p-8 rounded-[40px] shadow-sm border border-slate-100 dark:border-dark-border reveal-item hover:shadow-xl transition-shadow" style={{transitionDelay: `${i * 150}ms`}}>
                <div className="flex gap-1 mb-6">
                  {[...Array(t.rating)].map((_, idx) => <Star key={idx} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
                </div>
                <Quote className="w-10 h-10 text-brand/10 mb-6" />
                <p className="text-[15px] text-slate-600 dark:text-slate-400 font-medium leading-relaxed mb-8 italic">"{t.text}"</p>
                <div>
                  <h5 className="font-black text-slate-900 dark:text-white text-[14px] uppercase">{t.name}</h5>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className={`py-32 transition-all duration-1000 ${visibleSections.has('faq') ? 'revealed' : ''}`}>
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-16">
            <h3 className="text-[11px] font-black text-brand uppercase tracking-[0.4em] mb-4">Frequently Asked Questions</h3>
            <h2 className="text-4xl font-black tracking-tight leading-tight">KNOW BEFORE YOU <span className="text-brand">SYNK.</span></h2>
          </div>
          <div className="space-y-4">
            {FAQ_ITEMS.map((item, i) => (
              <div key={i} className="bg-white dark:bg-dark-surface border border-slate-100 dark:border-dark-border rounded-[32px] overflow-hidden transition-all reveal-item" style={{transitionDelay: `${i * 100}ms`}}>
                <button 
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full px-8 py-6 text-left flex items-center justify-between group"
                >
                  <span className="text-[15px] font-black dark:text-white group-hover:text-brand transition-colors">{item.q}</span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${openFaq === i ? 'bg-brand text-white rotate-45' : 'bg-slate-50 dark:bg-dark'}`}>
                    {openFaq === i ? <X className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
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

      {/* CTA Footer Section */}
      <section id="cta" className={`py-32 bg-brand mx-4 md:mx-8 rounded-[60px] relative overflow-hidden text-center text-white mb-8 transition-all duration-1000 ${visibleSections.has('cta') ? 'revealed' : ''}`}>
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10 px-6">
          <h2 className="text-4xl md:text-7xl font-black tracking-tighter mb-8 leading-[0.9] reveal-item">READY TO START YOUR <br className="hidden md:block"/> NEW GIG?</h2>
          <p className="text-xl md:text-2xl text-white/70 font-medium mb-12 max-w-2xl mx-auto leading-relaxed reveal-item" style={{transitionDelay: '100ms'}}>Join 5,000+ professionals building the future of the local economy.</p>
          <button onClick={onJoin} className="bg-white text-brand px-12 py-6 rounded-3xl font-black text-sm uppercase tracking-[0.2em] shadow-2xl hover:scale-105 transition-all reveal-item" style={{transitionDelay: '200ms'}}>
            Join the Workspace Now
          </button>
        </div>
        {/* Floating elements */}
        <div className="absolute -top-10 -right-10 w-64 h-64 bg-white/10 blur-[80px] rounded-full animate-float"></div>
        <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-black/10 blur-[60px] rounded-full animate-float" style={{animationDelay: '-3s'}}></div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-slate-100 dark:border-dark-border bg-white dark:bg-dark">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
            <div className="col-span-1 md:col-span-1">
              <span className="brand-text text-3xl text-brand mb-6 block">meritt.</span>
              <p className="text-[13px] text-slate-500 leading-relaxed font-medium">The modern professional network for the Maldives. Secured by Meritt ID and powered by local talent.</p>
            </div>
            <div>
              <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Platform</h5>
              <ul className="space-y-4">
                <li><button className="text-[12px] font-bold text-slate-500 hover:text-brand transition-colors">Browse Gigs</button></li>
                <li><button className="text-[12px] font-bold text-slate-500 hover:text-brand transition-colors">Find Talent</button></li>
                <li><button className="text-[12px] font-bold text-slate-500 hover:text-brand transition-colors">Meritt ID Vault</button></li>
              </ul>
            </div>
            <div>
              <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Community</h5>
              <ul className="space-y-4">
                <li><button className="text-[12px] font-bold text-slate-500 hover:text-brand transition-colors">Success Stories</button></li>
                <li><button className="text-[12px] font-bold text-slate-500 hover:text-brand transition-colors">Local Events</button></li>
                <li><button className="text-[12px] font-bold text-slate-500 hover:text-brand transition-colors">Referral Program</button></li>
              </ul>
            </div>
            <div>
              <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Legal</h5>
              <ul className="space-y-4">
                <li><button className="text-[12px] font-bold text-slate-500 hover:text-brand transition-colors">Privacy Policy</button></li>
                <li><button className="text-[12px] font-bold text-slate-500 hover:text-brand transition-colors">Terms of Sync</button></li>
                <li><button className="text-[12px] font-bold text-slate-500 hover:text-brand transition-colors">Node Security</button></li>
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