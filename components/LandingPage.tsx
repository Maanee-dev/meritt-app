import React, { useEffect, useState } from 'react';
import { 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  Search, 
  Globe, 
  Users, 
  Lock,
  ChevronDown,
  Building2,
  Trophy,
  Crown,
  BarChart4,
  CreditCard,
  Menu,
  X,
  Coffee,
  TrendingUp,
  Layers,
  ShoppingBag,
  Smartphone
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
  "Auditors", "Social Media", "App Dev", "SEO Specialists"
];

const LandingPage: React.FC<LandingPageProps> = ({ onExplore, onLogin, onJoin }) => {
  const [pricingType, setPricingType] = useState<'freelancer' | 'business'>('freelancer');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
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
    { id: 'ithibaaru', name: 'Ithibaaru', tagline: 'Standard Access', price: 'MVR 0', perk: '12% Commission', bestFor: 'New Professionals', pipeline: 'Standard', icon: Coffee, color: 'text-slate-400' },
    { id: 'muraaja', name: 'Muraaja', tagline: 'Expert Catalyst', price: 'MVR 49', perk: '7% Commission', bestFor: 'Full-time Legends', pipeline: 'Custom Workflow', icon: Zap, color: 'text-brand', featured: true },
    { id: 'kamiyaabu', name: 'Kamiyaabu', tagline: 'Elite Velocity', price: 'MVR 99', perk: '3% Commission', bestFor: 'Industry Leaders', pipeline: 'API Access', icon: Crown, color: 'text-yellow-500' }
  ];

  const businessPlans = [
    { id: 'maqaamu', name: 'Maqaamu', tagline: 'Market Presence', price: 'MVR 0', perk: '1 Active Posting', bestFor: 'SMEs & Startups', support: 'Standard', icon: Layers, color: 'text-slate-400' },
    { id: 'ithigaadh', name: 'Ithigaadh', tagline: 'Growth Partner', price: 'MVR 99', perk: 'Unlimited Postings', bestFor: 'Fast-Growing Teams', support: 'Priority', icon: TrendingUp, color: 'text-brand', featured: true },
    { id: 'sulthaan', name: 'Sulthaan', tagline: 'Enterprise Power', price: 'MVR 299', perk: 'Vetted Concierge', bestFor: 'Resorts & Agencies', support: 'Dedicated Manager', icon: Trophy, color: 'text-brand' }
  ];

  const currentPlans = pricingType === 'freelancer' ? freelancerPlans : businessPlans;

  return (
    <div className="landing-root bg-white overflow-x-hidden min-h-screen text-slate-900 selection:bg-brand selection:text-white">
      <style>{`
        .reveal { opacity: 0; transform: translateY(20px); transition: all 0.7s cubic-bezier(0.2, 0.8, 0.2, 1); }
        .reveal-left { opacity: 0; transform: translateX(-20px); transition: all 0.7s cubic-bezier(0.2, 0.8, 0.2, 1); }
        .reveal-right { opacity: 0; transform: translateX(20px); transition: all 0.7s cubic-bezier(0.2, 0.8, 0.2, 1); }
        .active { opacity: 1; transform: translate(0, 0); }
        .glass-nav { backdrop-filter: blur(16px) saturate(180%); background-color: rgba(255, 255, 255, 0.8); border-bottom: 1px solid rgba(226, 232, 240, 0.8); }
        .hero-mockup-float { animation: float 6s ease-in-out infinite; }
        @keyframes float { 0%, 100% { transform: translateY(0) rotate(1deg); } 50% { transform: translateY(-15px) rotate(1.5deg); } }
      `}</style>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 h-[72px] glass-nav z-[100]">
        <div className="container mx-auto px-6 h-full flex justify-between items-center">
          <div className="flex items-center cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <span className="brand-text text-2xl text-brand">meritt.</span>
          </div>

          <nav className="hidden lg:flex items-center gap-10 text-[11px] font-black uppercase tracking-widest text-slate-400">
            <button onClick={onExplore} className="hover:text-brand transition-colors">Marketplace</button>
            <a href="#process" className="hover:text-brand transition-colors">Process</a>
            <a href="#directory" className="hover:text-brand transition-colors">Talent</a>
            <a href="#pricing" className="hover:text-brand transition-colors">Pricing</a>
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <button onClick={onLogin} className="text-[12px] font-bold text-slate-500 hover:text-brand px-4">Log In</button>
            <button onClick={onJoin} className="bg-brand text-white px-8 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-xl shadow-brand/20 hover:translate-y-[-2px] transition-all">Join Marketplace</button>
          </div>

          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="lg:hidden p-2 text-slate-500 hover:text-brand transition-colors">
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-[72px] left-0 right-0 bg-white border-b border-slate-100 p-8 flex flex-col gap-8 shadow-2xl animate-in slide-in-from-top-4">
            <nav className="flex flex-col gap-6 text-[15px] font-bold text-slate-600">
              <button onClick={() => { onExplore(); setIsMobileMenuOpen(false); }} className="text-left">Marketplace</button>
              <a href="#process" onClick={() => setIsMobileMenuOpen(false)}>Process</a>
              <a href="#directory" onClick={() => setIsMobileMenuOpen(false)}>Talent</a>
              <a href="#pricing" onClick={() => setIsMobileMenuOpen(false)}>Pricing</a>
            </nav>
            <div className="flex flex-col gap-3">
              <button onClick={onLogin} className="w-full py-5 text-slate-600 font-bold border border-slate-200 rounded-2xl">Log In</button>
              <button onClick={onJoin} className="w-full py-5 bg-brand text-white font-bold rounded-2xl shadow-lg">Get Started</button>
            </div>
          </div>
        )}
      </header>

      <div className="container mx-auto px-6 pt-24">
        {/* Hero Section */}
        <section className="py-20 lg:py-32 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="reveal-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand/5 border border-brand/10 rounded-full mb-8">
              <span className="w-2 h-2 bg-brand rounded-full animate-pulse"></span>
              <span className="text-[10px] font-black text-brand uppercase tracking-[0.2em]">National Digital Network</span>
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
            <div className="relative w-full max-w-[500px]">
               <div className="w-full h-[400px] md:h-[540px] bg-white border-2 border-slate-100 rounded-[56px] shadow-2xl relative overflow-hidden hero-mockup-float p-3">
                  <div className="bg-[#F8FAFC] h-full rounded-[48px] p-8 flex flex-col">
                    <div className="flex items-center justify-between mb-8">
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-xl bg-brand/10 flex items-center justify-center">
                          <BarChart4 className="w-5 h-5 text-brand" />
                        </div>
                        <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Workspace</span>
                      </div>
                    </div>
                    <div className="space-y-4">
                      {[1,2,3].map(i => (
                        <div key={i} className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200"></div>
                            <div className="w-24 h-2 bg-slate-100 rounded-full"></div>
                          </div>
                          <div className="px-3 py-1 bg-brand/5 border border-brand/10 rounded-full text-[9px] font-black text-brand uppercase">Active</div>
                        </div>
                      ))}
                    </div>
                  </div>
               </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-24">
          <div className="text-center mb-16 reveal">
             <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-10">Professional Tiers.</h2>
             <div className="flex justify-center items-center gap-2 p-1.5 bg-slate-100 w-fit mx-auto rounded-3xl">
                <button onClick={() => setPricingType('freelancer')} className={`px-8 py-3 rounded-2xl font-black text-[12px] uppercase tracking-wider transition-all ${pricingType === 'freelancer' ? 'bg-white shadow-lg text-brand' : 'text-slate-400'}`}>Freelancer</button>
                <button onClick={() => setPricingType('business')} className={`px-8 py-3 rounded-2xl font-black text-[12px] uppercase tracking-wider transition-all ${pricingType === 'business' ? 'bg-white shadow-lg text-brand' : 'text-slate-400'}`}>Business</button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
             {currentPlans.map((plan: any) => (
                <div key={plan.id} className={`group bg-white p-10 md:p-12 rounded-[48px] border-2 transition-all hover:translate-y-[-10px] flex flex-col reveal ${plan.featured ? 'border-brand shadow-2xl' : 'border-slate-100 shadow-sm'}`}>
                   <div className="mb-10">
                      <div className={`w-16 h-16 rounded-[24px] bg-slate-50 flex items-center justify-center mb-8 border border-slate-100 group-hover:scale-110 transition-transform ${plan.color}`}>
                         <plan.icon className="w-9 h-9" />
                      </div>
                      <h4 className="text-3xl font-black tracking-tight mb-2">{plan.name}</h4>
                      <div className="flex items-baseline gap-2">
                         <span className="text-5xl font-black text-slate-900">{plan.price}</span>
                         <span className="text-slate-400 text-sm font-bold uppercase">/mo</span>
                      </div>
                   </div>

                   <div className="space-y-6 mb-12 flex-1">
                      <div className="flex items-center gap-4 text-[14px] font-bold text-slate-600">
                         <CheckCircle2 className="w-5 h-5 text-brand" /> <span>{plan.bestFor}</span>
                      </div>
                      <div className="flex items-center gap-4 text-[14px] font-bold text-slate-600">
                         <CheckCircle2 className="w-5 h-5 text-brand" /> <span>{plan.perk}</span>
                      </div>
                      <div className="flex items-center gap-4 text-[14px] font-bold text-slate-600">
                         <CheckCircle2 className="w-5 h-5 text-brand" /> <span>{pricingType === 'freelancer' ? plan.pipeline : plan.support}</span>
                      </div>
                   </div>

                   <button onClick={onJoin} className={`w-full py-5 rounded-[24px] font-black text-[13px] uppercase tracking-widest transition-all ${plan.featured ? 'bg-brand text-white' : 'bg-slate-50 text-slate-900 border border-slate-200 hover:border-brand'}`}>
                     Initialize Tier
                   </button>
                </div>
             ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="py-24 border-t border-slate-100 reveal">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-16 mb-24">
             <div className="lg:col-span-2">
                <div className="flex items-center mb-8">
                   <span className="brand-text text-3xl text-brand">meritt.</span>
                </div>
                <p className="text-slate-500 font-medium text-lg leading-relaxed max-w-md">The definitive professional engine for the archipelago. Made in the Maldives, for the Maldives.</p>
             </div>
             <div>
                <h5 className="font-black text-[12px] uppercase tracking-[0.3em] text-slate-400 mb-8">Platform</h5>
                <ul className="space-y-4 text-[14px] font-bold text-slate-600">
                   <li><a href="#" className="hover:text-brand">Marketplace</a></li>
                   <li><a href="#" className="hover:text-brand">Escrow Node</a></li>
                </ul>
             </div>
             <div>
                <h5 className="font-black text-[12px] uppercase tracking-[0.3em] text-slate-400 mb-8">Support</h5>
                <ul className="space-y-4 text-[14px] font-bold text-slate-600">
                   <li><a href="#" className="hover:text-brand">Help Desk</a></li>
                   <li><a href="#" className="hover:text-brand">Safety Center</a></li>
                </ul>
             </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-12 border-t border-slate-100">
             <p className="text-[12px] font-black text-slate-400 uppercase tracking-widest">© 2024 Meritt Maldives Pvt Ltd.</p>
             <div className="flex items-center gap-2 text-[11px] font-black text-emerald-500 uppercase tracking-widest">
                <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse"></span>
                Clearing Engine: Active
             </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default LandingPage;