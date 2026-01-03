
import React, { useEffect, useState } from 'react';
import { 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  Star, 
  Smartphone, 
  Search, 
  Globe, 
  Users, 
  Lock,
  ChevronDown,
  Building2,
  Trophy,
  Crown,
  Layout,
  BarChart4,
  CreditCard,
  Menu,
  X,
  Coffee,
  Sparkles,
  TrendingUp,
  Briefcase,
  Layers,
  ShoppingBag
} from 'lucide-react';

interface LandingPageProps {
  onExplore: () => void;
  onLogin: () => void;
  onJoin: () => void;
}

const FAQ_ITEMS = [
  { q: "How does the escrow system work?", a: "When a project starts, the business deposits funds into a secure Meritt escrow. Funds are only released to the freelancer once the business approves the final milestone deliverables." },
  { q: "What is e-Faas verification?", a: "We integrate with the National Digital Identity platform to ensure every user on Meritt is a real, verified individual or entity in the Maldives." },
  { q: "Are there any hidden fees?", a: "No. We charge a flat commission based on your tier (12%, 7%, or 3%). There are no listing fees or subscription traps for the Standard plan." },
  { q: "How do payouts work for locals?", a: "Freelancers receive payouts directly to their BML or MIB accounts. We handle the local clearing process to ensure you get paid in MVR without international wire delays." }
];

const CATEGORIES = [
  "React Devs", "Dhivehi Copywriters", "UI Designer", "BML API Experts", 
  "Resort Marketing", "Legal Consultants", "Graphic Design", "Video Editors", 
  "Auditors", "Social Media", "App Dev", "SEO Specialists", "Illustrators"
];

const LandingPage: React.FC<LandingPageProps> = ({ onExplore, onLogin, onJoin }) => {
  const [pricingType, setPricingType] = useState<'freelancer' | 'business'>('freelancer');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    document
      .querySelectorAll('.reveal, .reveal-left, .reveal-right, .fade-in, .stagger-child')
      .forEach(el => {
        el.classList.remove('active');
        observer.observe(el);
      });

    return () => observer.disconnect();
  }, [pricingType]);

  const freelancerPlans = [
    { 
      id: 'ithibaaru', 
      name: 'Ithibaaru', 
      tagline: 'Standard Access', 
      description: 'Standard access for establishing your professional footprint in the archipelago.',
      price: 'MVR 0',
      perk: '12% Commission',
      bestFor: 'New Professionals',
      pipeline: 'Standard Pipelines',
      icon: Coffee,
      color: 'text-slate-400'
    },
    { 
      id: 'muraaja', 
      name: 'Muraaja', 
      tagline: 'Expert Catalyst', 
      description: 'Optimized for high-volume specialists and consultants who need lower fees.',
      price: 'MVR 49',
      perk: '7% Commission',
      bestFor: 'Full-time Legends',
      pipeline: 'Custom Workflow Stages',
      icon: Zap,
      color: 'text-brand',
      featured: true
    },
    { 
      id: 'kamiyaabu', 
      name: 'Kamiyaabu', 
      tagline: 'Elite Velocity', 
      description: 'The premier tier for island market leaders and top-tier established talent.',
      price: 'MVR 99',
      perk: '3% Commission',
      bestFor: 'Industry Leaders',
      pipeline: 'Templates & API Access',
      icon: Crown,
      color: 'text-yellow-500'
    }
  ];

  const businessPlans = [
    { 
      id: 'maqaamu', 
      name: 'Maqaamu', 
      tagline: 'Market Presence', 
      description: 'Post jobs and hire vetted local talent for single-objective projects.',
      price: 'MVR 0',
      perk: '1 Active Posting',
      bestFor: 'SMEs & Startups',
      support: 'Standard Support',
      icon: Layers,
      color: 'text-slate-400'
    },
    { 
      id: 'ithigaadh', 
      name: 'Ithigaadh', 
      tagline: 'Growth Partner', 
      description: 'Scale your workforce with unlimited postings and advanced management.',
      price: 'MVR 99',
      perk: 'Unlimited Postings',
      bestFor: 'Fast-Growing Teams',
      support: 'Priority Response',
      icon: TrendingUp,
      color: 'text-brand',
      featured: true
    },
    { 
      id: 'sulthaan', 
      name: 'Sulthaan', 
      tagline: 'Enterprise Power', 
      description: 'Total professional control for resorts and large corporate conglomerates.',
      price: 'MVR 299',
      perk: 'Vetted Concierge',
      bestFor: 'Resorts & Agencies',
      support: 'Dedicated Manager',
      icon: Trophy,
      color: 'text-brand'
    }
  ];

  const currentPlans = pricingType === 'freelancer' ? freelancerPlans : businessPlans;

  return (
    <div className="landing-root bg-white overflow-x-hidden min-h-screen text-slate-900 selection:bg-brand selection:text-white">
      <style>{`
        @keyframes float { 0%, 100% { transform: translateY(0) rotate(1deg); } 50% { transform: translateY(-15px) rotate(1.5deg); } }
        @keyframes mini-float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        @keyframes shimmer { 100% { left: 125%; } }
        
        .reveal { opacity: 0; transform: translateY(20px); transition: all 0.7s cubic-bezier(0.2, 0.8, 0.2, 1); }
        .reveal-left { opacity: 0; transform: translateX(-20px); transition: all 0.7s cubic-bezier(0.2, 0.8, 0.2, 1); }
        .reveal-right { opacity: 0; transform: translateX(20px); transition: all 0.7s cubic-bezier(0.2, 0.8, 0.2, 1); }
        .active { opacity: 1; transform: translate(0, 0); }
        
        .btn-shimmer { position: relative; overflow: hidden; }
        .btn-shimmer::after {
          content: ''; position: absolute; top: -50%; left: -50%; width: 20%; height: 200%;
          background: rgba(255,255,255,0.2); transform: rotate(30deg);
          animation: shimmer 4s infinite;
        }

        .glass-nav {
          backdrop-filter: blur(16px) saturate(180%);
          background-color: rgba(255, 255, 255, 0.7);
          border-bottom: 1px solid rgba(226, 232, 240, 0.8);
        }

        .hero-mockup-float { animation: float 6s ease-in-out infinite; }
        .mini-float { animation: mini-float 4s ease-in-out infinite; }
      `}</style>

      {/* Ambient Background */}
      <div className="fixed inset-0 z-[-1] pointer-events-none opacity-50">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-brand/10 blur-[120px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-200/20 blur-[120px] rounded-full"></div>
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 h-[72px] glass-nav z-[100]">
        <div className="container mx-auto px-4 md:px-6 h-full flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <div className="w-9 h-9 bg-brand rounded-xl flex items-center justify-center shadow-lg shadow-brand/20 transition-transform hover:scale-105 active:scale-95">
               <Zap className="w-5 h-5 text-white fill-current" />
            </div>
            <span className="font-black text-2xl tracking-tighter text-brand">meritt.</span>
          </div>

          <nav className="hidden lg:flex items-center gap-10 text-[11px] font-black uppercase tracking-widest text-slate-400">
            <button onClick={onExplore} className="hover:text-brand transition-colors flex items-center gap-2">
              <ShoppingBag className="w-3.5 h-3.5" /> Marketplace
            </button>
            <a href="#process" className="hover:text-brand transition-colors">Process</a>
            <a href="#directory" className="hover:text-brand transition-colors">Talent</a>
            <a href="#pricing" className="hover:text-brand transition-colors">Pricing</a>
            <a href="#faq" className="hover:text-brand transition-colors">FAQ</a>
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <button onClick={onLogin} className="text-[12px] font-bold text-slate-500 hover:text-brand px-4 transition-colors">Log In</button>
            <button onClick={onJoin} className="btn-shimmer bg-brand text-white px-6 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-xl shadow-brand/20 hover:translate-y-[-2px] active:translate-y-[0px] transition-all">Join Marketplace</button>
          </div>

          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="lg:hidden p-2 text-slate-500 hover:text-brand transition-colors">
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-[72px] left-0 right-0 bg-white border-b border-slate-100 p-6 flex flex-col gap-6 shadow-2xl animate-in slide-in-from-top-4">
            <nav className="flex flex-col gap-4 text-[13px] font-bold text-slate-600">
              <button onClick={() => { onExplore(); setIsMobileMenuOpen(false); }} className="text-left flex items-center gap-3 py-2 hover:text-brand">
                <ShoppingBag className="w-4 h-4 text-brand" /> Marketplace
              </button>
              <a href="#process" onClick={() => setIsMobileMenuOpen(false)} className="py-2">Process</a>
              <a href="#directory" onClick={() => setIsMobileMenuOpen(false)} className="py-2">Talent</a>
              <a href="#pricing" onClick={() => setIsMobileMenuOpen(false)} className="py-2">Pricing</a>
              <a href="#faq" onClick={() => setIsMobileMenuOpen(false)} className="py-2">FAQ</a>
            </nav>
            <div className="flex flex-col gap-3">
              <button onClick={onLogin} className="w-full py-4 text-slate-600 font-bold border border-slate-200 rounded-2xl">Log In</button>
              <button onClick={onJoin} className="w-full py-4 bg-brand text-white font-bold rounded-2xl shadow-lg">Get Started</button>
            </div>
          </div>
        )}
      </header>

      <div className="container mx-auto px-4 md:px-6 pt-24">
        {/* Hero Section */}
        <section className="py-20 lg:py-32 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className="reveal-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand/5 border border-brand/10 rounded-full mb-8">
              <span className="w-2 h-2 bg-brand rounded-full animate-pulse"></span>
              <span className="text-[10px] font-black text-brand uppercase tracking-[0.2em]">Archipelago-wide Network</span>
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-8xl font-black leading-[0.95] tracking-tighter mb-8">
              Unlock Elite <br className="hidden md:block" />
              <span className="text-brand">Vetted Talent.</span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-500 mb-12 max-w-lg leading-relaxed font-medium">
              The professional ecosystem connecting elite specialists with ventures across the Maldives. MVR Escrow & e-Faas verified.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <button onClick={onJoin} className="w-full sm:w-auto px-10 py-5 bg-brand text-white rounded-[24px] font-black text-[15px] shadow-2xl shadow-brand/30 hover:brightness-110 flex items-center justify-center gap-3 transition-all hover:translate-y-[-4px]">
                Start Working <ArrowRight className="w-5 h-5" />
              </button>
              <button onClick={onExplore} className="w-full sm:w-auto px-10 py-5 bg-white border-2 border-slate-100 rounded-[24px] font-black text-[15px] text-slate-600 hover:border-brand hover:text-brand transition-all">
                Browse Talent
              </button>
            </div>
          </div>
          
          <div className="reveal-right relative flex justify-center items-center">
            {/* Integrated Container for Hero Graphics */}
            <div className="relative w-full max-w-[500px]">
               {/* Main Mockup Card */}
               <div className="w-full h-[540px] bg-white border-2 border-slate-100 rounded-[56px] shadow-2xl relative overflow-hidden hero-mockup-float p-3 z-10">
                  <div className="bg-[#F8FAFC] h-full rounded-[48px] p-8 flex flex-col">
                    <div className="flex items-center justify-between mb-8">
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-xl bg-brand/10 flex items-center justify-center">
                          <BarChart4 className="w-5 h-5 text-brand" />
                        </div>
                        <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Workspace</span>
                      </div>
                      <div className="w-12 h-6 bg-slate-200 rounded-full"></div>
                    </div>
                    <div className="space-y-4">
                      {[1,2,3].map(i => (
                        <div key={i} className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 font-bold text-xs border border-slate-100">JD</div>
                            <div>
                              <div className="w-24 h-2.5 bg-slate-100 rounded-full mb-2"></div>
                              <div className="w-16 h-2 bg-slate-50 rounded-full"></div>
                            </div>
                          </div>
                          <div className="px-3 py-1 bg-brand/5 border border-brand/10 rounded-full text-[9px] font-black text-brand uppercase">Active</div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-auto p-6 bg-white border border-slate-100 rounded-3xl shadow-lg">
                       <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">BML Clearing Engine</span>
                          <span className="text-[10px] font-bold text-emerald-500">Live</span>
                       </div>
                       <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div className="w-[75%] h-full bg-brand"></div>
                       </div>
                    </div>
                  </div>
               </div>

               {/* HUD Overlays - Inside the same coordinate space */}
               <div className="absolute -top-6 -left-10 bg-white p-6 rounded-3xl shadow-2xl border border-slate-100 z-20 mini-float transition-all hover:scale-110">
                  <div className="flex items-center gap-2 mb-2">
                     <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse"></span>
                     <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Live Payout</span>
                  </div>
                  <p className="text-xl font-black text-slate-900 tracking-tight">MVR 12,450.00</p>
                  <div className="flex items-center gap-1.5 mt-2">
                     <CreditCard className="w-4 h-4 text-brand" />
                     <span className="text-[10px] font-bold text-brand uppercase">BML Clearing</span>
                  </div>
               </div>

               <div className="absolute bottom-10 -right-10 bg-white p-6 rounded-3xl shadow-2xl border border-slate-100 z-20 mini-float transition-all hover:scale-110" style={{animationDelay: '1s'}}>
                  <div className="flex items-center gap-4 mb-4">
                     <div className="w-12 h-12 bg-brand rounded-2xl flex items-center justify-center text-white shadow-xl shadow-brand/20">
                        <ShieldCheck className="w-7 h-7" />
                     </div>
                     <div>
                        <span className="text-[10px] font-black text-brand uppercase tracking-[0.2em] block mb-0.5">Identity Verified</span>
                        <p className="text-sm font-bold text-slate-900">e-Faas Official</p>
                     </div>
                  </div>
                  <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
                    <div className="w-full h-full bg-brand"></div>
                  </div>
               </div>
            </div>
          </div>
        </section>

        {/* Network Pulse Stats */}
        <section className="py-20 border-y border-slate-100">
           <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { label: 'Active Talent', value: '2.5k+' },
                { label: 'Clearing Done', value: 'MVR 12M+' },
                { label: 'Trust Score', value: '4.9/5.0' },
                { label: 'Vetted Badges', value: '840' }
              ].map((stat, i) => (
                <div key={i} className="text-center reveal stagger-child">
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-2">{stat.label}</p>
                   <p className="text-3xl md:text-5xl font-black text-brand tracking-tighter">{stat.value}</p>
                </div>
              ))}
           </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-24">
          <div className="text-center mb-16 reveal">
             <h3 className="text-[11px] font-black text-brand uppercase tracking-[0.4em] mb-4">Tiered Investment</h3>
             <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-10">Professional Velocity.</h2>
             
             <div className="flex justify-center items-center gap-2 p-1.5 bg-slate-50 w-fit mx-auto rounded-[24px] border border-slate-200 shadow-inner">
                <button 
                  onClick={() => setPricingType('freelancer')} 
                  className={`px-8 py-3.5 rounded-[20px] font-black text-[12px] uppercase tracking-wider transition-all flex items-center gap-2 ${pricingType === 'freelancer' ? 'bg-white shadow-xl text-brand scale-105' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  <Users className="w-4 h-4" /> Freelancer
                </button>
                <button 
                  onClick={() => setPricingType('business')} 
                  className={`px-8 py-3.5 rounded-[20px] font-black text-[12px] uppercase tracking-wider transition-all flex items-center gap-2 ${pricingType === 'business' ? 'bg-white shadow-xl text-brand scale-105' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  <Building2 className="w-4 h-4" /> Business
                </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
             {currentPlans.map((plan) => (
                <div 
                  key={plan.id}
                  className={`group bg-white p-12 rounded-[56px] border-2 transition-all hover:translate-y-[-12px] flex flex-col reveal stagger-child ${
                    plan.featured 
                    ? 'border-brand shadow-2xl shadow-brand/10 ring-8 ring-brand/5 relative' 
                    : 'border-slate-100 hover:border-brand/40 shadow-sm'
                  }`}
                >
                   {plan.featured && (
                      <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-brand text-white px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl">Recommended</div>
                   )}

                   <div className="mb-10">
                      <div className={`w-16 h-16 rounded-[24px] bg-slate-50 flex items-center justify-center mb-8 border border-slate-100 group-hover:scale-110 transition-transform ${plan.color}`}>
                         <plan.icon className="w-9 h-9" />
                      </div>
                      <h4 className="text-3xl font-black tracking-tight mb-2">{plan.name}</h4>
                      <p className="text-brand font-black text-[11px] uppercase tracking-widest italic mb-6 opacity-60">{plan.tagline}</p>
                      <div className="flex items-baseline gap-2">
                         <span className="text-5xl font-black text-slate-900">{plan.price}</span>
                         <span className="text-slate-400 text-sm font-bold uppercase">/mo</span>
                      </div>
                   </div>

                   <p className="text-[15px] text-slate-500 font-medium leading-relaxed mb-12 h-14 overflow-hidden">{plan.description}</p>

                   <div className="space-y-6 mb-12 flex-1">
                      <div className="flex items-center gap-4">
                         <div className="w-6 h-6 rounded-full bg-brand/5 flex items-center justify-center text-brand shrink-0">
                            <CheckCircle2 className="w-4 h-4" />
                         </div>
                         <span className="text-[14px] font-bold text-slate-600">Best for: {plan.bestFor}</span>
                      </div>
                      <div className="flex items-center gap-4">
                         <div className="w-6 h-6 rounded-full bg-brand/5 flex items-center justify-center text-brand shrink-0">
                            <CheckCircle2 className="w-4 h-4" />
                         </div>
                         <span className="text-[14px] font-bold text-slate-600">{plan.perk}</span>
                      </div>
                      <div className="flex items-center gap-4">
                         <div className="w-6 h-6 rounded-full bg-brand/5 flex items-center justify-center text-brand shrink-0">
                            <CheckCircle2 className="w-4 h-4" />
                         </div>
                         <span className="text-[14px] font-bold text-slate-600">
                           {pricingType === 'freelancer' ? plan.pipeline : plan.support}
                         </span>
                      </div>
                   </div>

                   <button 
                    onClick={onJoin}
                    className={`w-full py-5 rounded-[24px] font-black text-[13px] uppercase tracking-widest transition-all ${
                      plan.featured 
                      ? 'bg-brand text-white shadow-2xl shadow-brand/30 hover:brightness-110 hover:scale-[1.02]' 
                      : 'bg-slate-50 text-slate-900 hover:bg-brand hover:text-white border-2 border-slate-100 hover:border-brand'
                    }`}
                   >
                     Initialize Tier
                   </button>
                </div>
             ))}
          </div>
        </section>

        {/* Process Section */}
        <section id="process" className="py-24 border-t border-slate-100">
           <div className="text-center mb-20 reveal">
              <h2 className="text-[11px] font-black text-brand uppercase tracking-[0.4em] mb-4">Integrity Framework</h2>
              <h3 className="text-4xl md:text-5xl font-black tracking-tighter">Vetted from start to finish.</h3>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
              {[
                { icon: Globe, title: '1. e-Faas Sync', desc: 'Secure login via National Digital Identity. No shadow accounts, pure professional accountability.' },
                { icon: Search, title: '2. Curated Review', desc: 'Portfolio and local track record audited by our island-based curators before granting badges.' },
                { icon: Lock, title: '3. Secure Escrow', desc: 'Payments held in MVR clearing. Released only when milestone deliverables meet your criteria.' }
              ].map((step, i) => (
                <div key={i} className="group p-10 bg-slate-50 rounded-[48px] border border-slate-100 transition-all hover:bg-white hover:shadow-2xl hover:translate-y-[-8px] reveal stagger-child">
                  <div className="w-16 h-16 bg-brand rounded-[24px] flex items-center justify-center text-white mb-8 group-hover:rotate-6 transition-transform shadow-xl shadow-brand/20">
                    <step.icon className="w-8 h-8" />
                  </div>
                  <h4 className="text-2xl font-black mb-4 tracking-tight">{step.title}</h4>
                  <p className="text-slate-500 text-[15px] leading-relaxed font-medium">{step.desc}</p>
                </div>
              ))}
           </div>
        </section>

        {/* Coming Soon Mobile Section */}
        <section className="py-24 reveal">
           <div className="bg-slate-900 text-white rounded-[64px] p-12 md:p-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center overflow-hidden relative">
              <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand/10 blur-[150px] rounded-full"></div>
              <div className="relative z-10">
                 <div className="flex items-center gap-3 mb-8">
                    <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center"><Smartphone className="w-6 h-6 text-brand" /></div>
                    <span className="text-[11px] font-black uppercase tracking-[0.4em] text-brand">Next Evolution</span>
                 </div>
                 <h3 className="text-4xl md:text-6xl font-black leading-[0.9] tracking-tighter mb-8">Work from <br/> any Atoll.</h3>
                 <p className="text-slate-400 text-lg md:text-xl font-medium leading-relaxed mb-12 max-w-md">Finalizing the native experience. Manage your pipeline, approve payouts, and respond to inquiries from anywhere in the archipelago.</p>
                 <button className="flex items-center gap-3 text-brand font-black text-sm uppercase tracking-widest hover:translate-x-2 transition-transform">
                    Join Mobile Waitlist <ArrowRight className="w-5 h-5" />
                 </button>
              </div>
              <div className="relative flex justify-center">
                 <div className="w-[300px] h-[600px] bg-slate-800 rounded-[3.5rem] border-8 border-slate-700 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-700 rounded-b-2xl z-20"></div>
                    <div className="p-8 h-full bg-slate-950 flex flex-col gap-6">
                       <div className="w-full h-12 bg-slate-900 rounded-2xl"></div>
                       <div className="flex-1 flex flex-col gap-4">
                          {[1,2,3,4].map(i => <div key={i} className="w-full h-24 bg-slate-900 rounded-3xl border border-slate-800/50"></div>)}
                       </div>
                    </div>
                 </div>
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-brand/5 blur-[120px] rounded-full pointer-events-none"></div>
              </div>
           </div>
        </section>

        {/* Talent Categories */}
        <section id="directory" className="py-24 reveal">
           <div className="text-center max-w-4xl mx-auto">
              <h3 className="text-3xl md:text-5xl font-black mb-12 leading-[1.1] tracking-tighter">Elite local vetted expertise <br className="hidden md:block"/> across every niche.</h3>
              <div className="flex flex-wrap justify-center gap-3 md:gap-4">
                 {CATEGORIES.map((cat, i) => (
                    <span key={i} className="px-7 py-3.5 bg-slate-50 hover:bg-brand text-slate-500 hover:text-white border border-slate-100 rounded-full text-[13px] font-black tracking-widest transition-all cursor-default shadow-sm uppercase">
                       {cat}
                    </span>
                 ))}
              </div>
              <div className="mt-20 flex flex-wrap items-center justify-center gap-10 text-[11px] font-black uppercase tracking-[0.4em] text-slate-400">
                 <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> BML Settlement</span>
                 <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> MIRA Ready</span>
                 <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> e-Faas Core</span>
              </div>
           </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-24 max-w-4xl mx-auto reveal">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-black tracking-tighter mb-4">Common Enquiries</h3>
            <p className="text-slate-500 font-medium text-lg">Everything you need to know about island professional life.</p>
          </div>
          <div className="space-y-4">
             {FAQ_ITEMS.map((item, i) => (
                <div key={i} className={`border border-slate-200 rounded-[32px] transition-all overflow-hidden ${openFaq === i ? 'bg-slate-50 ring-4 ring-brand/5' : 'bg-white shadow-sm'}`}>
                   <button 
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-8 text-left"
                   >
                      <span className="font-black text-[17px] pr-6">{item.q}</span>
                      <ChevronDown className={`w-6 h-6 text-slate-300 transition-transform ${openFaq === i ? 'rotate-180 text-brand' : ''}`} />
                   </button>
                   {openFaq === i && (
                     <div className="px-8 pb-8 animate-in slide-in-from-top-4 duration-500">
                        <p className="text-slate-500 text-[16px] leading-relaxed font-medium">{item.a}</p>
                     </div>
                   )}
                </div>
             ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="py-24 border-t border-slate-100 reveal">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 mb-24">
             <div className="lg:col-span-2">
                <div className="flex items-center gap-2 mb-8">
                   <Zap className="w-8 h-8 text-brand fill-current" />
                   <span className="font-black text-3xl tracking-tighter text-brand">meritt.</span>
                </div>
                <p className="text-slate-500 font-medium text-lg leading-relaxed max-w-md mb-10">The definitive professional engine for the archipelago. Made in the Maldives, for the Maldives.</p>
                <div className="flex gap-4">
                   <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center hover:bg-brand hover:text-white transition-all cursor-pointer shadow-sm"><Globe className="w-5 h-5" /></div>
                   <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center hover:bg-brand hover:text-white transition-all cursor-pointer shadow-sm"><Users className="w-5 h-5" /></div>
                </div>
             </div>
             <div>
                <h5 className="font-black text-[12px] uppercase tracking-[0.3em] text-slate-400 mb-8">Ecosystem</h5>
                <ul className="space-y-4 text-[14px] font-bold text-slate-600">
                   <li><a href="#" className="hover:text-brand transition-colors">Talent Grid</a></li>
                   <li><a href="#" className="hover:text-brand transition-colors">BML Node</a></li>
                   <li><a href="#" className="hover:text-brand transition-colors">e-Faas Auth</a></li>
                </ul>
             </div>
             <div>
                <h5 className="font-black text-[12px] uppercase tracking-[0.3em] text-slate-400 mb-8">Support</h5>
                <ul className="space-y-4 text-[14px] font-bold text-slate-600">
                   <li><a href="#" className="hover:text-brand transition-colors">Help Terminal</a></li>
                   <li><a href="#" className="hover:text-brand transition-colors">Safety Board</a></li>
                </ul>
             </div>
             <div>
                <h5 className="font-black text-[12px] uppercase tracking-[0.3em] text-slate-400 mb-8">Company</h5>
                <ul className="space-y-4 text-[14px] font-bold text-slate-600">
                   <li><a href="#" className="hover:text-brand transition-colors">Terms</a></li>
                   <li><a href="#" className="hover:text-brand transition-colors">Privacy</a></li>
                </ul>
             </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-12 border-t border-slate-100">
             <p className="text-[12px] font-black text-slate-400 uppercase tracking-widest">© 2024 Meritt Maldives Pvt Ltd.</p>
             <div className="flex items-center gap-10">
                <span className="flex items-center gap-2 text-[11px] font-black text-emerald-500 uppercase tracking-widest">
                  <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_#10b981]"></span>
                  Banking Engine: Active
                </span>
             </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default LandingPage;
