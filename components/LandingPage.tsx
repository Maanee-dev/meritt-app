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
  Smartphone,
  Star,
  Quote
} from 'lucide-react';

interface LandingPageProps {
  onExplore: () => void;
  onLogin: () => void;
  onJoin: () => void;
}

const FAQ_ITEMS = [
  { q: "How does the escrow system work?", a: "When a project starts, the business deposits funds into a secure Meritt escrow. Funds are only released to the freelancer once the business approves the final milestone deliverables." },
  { q: "What is e-Faas verification?", a: "We integrate with the National Digital Identity platform to ensure every user on Meritt is a real, verified individual or entity in the Maldives." },
  { q: "How do payouts work for locals?", a: "Freelancers receive payouts directly to their BML or MIB accounts. We handle the local clearing process to ensure you get paid in MVR without international wire delays." }
];

const CATEGORIES = [
  "React Devs", "Dhivehi Copywriters", "UI Designer", "BML API Experts", 
  "Resort Marketing", "Legal Consultants", "Graphic Design", "Video Editors"
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

    document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .fade-in, .stagger-child')
      .forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, [pricingType]);

  const freelancerPlans = [
    { id: 'ithibaaru', name: 'Ithibaaru', tagline: 'Standard Access', price: 'MVR 0', perk: '12% Commission', icon: Coffee, color: 'text-slate-400' },
    { id: 'muraaja', name: 'Muraaja', tagline: 'Expert Catalyst', price: 'MVR 49', perk: '7% Commission', icon: Zap, color: 'text-brand', featured: true },
    { id: 'kamiyaabu', name: 'Kamiyaabu', tagline: 'Elite Velocity', price: 'MVR 99', perk: '3% Commission', icon: Crown, color: 'text-yellow-500' }
  ];

  const businessPlans = [
    { id: 'maqaamu', name: 'Maqaamu', tagline: 'Market Presence', price: 'MVR 0', perk: '1 Active Posting', icon: Layers, color: 'text-slate-400' },
    { id: 'ithigaadh', name: 'Ithigaadh', tagline: 'Growth Partner', price: 'MVR 99', perk: 'Unlimited Postings', icon: TrendingUp, color: 'text-brand', featured: true },
    { id: 'sulthaan', name: 'Sulthaan', tagline: 'Enterprise Power', price: 'MVR 299', perk: 'Vetted Concierge', icon: Trophy, color: 'text-brand' }
  ];

  const currentPlans = pricingType === 'freelancer' ? freelancerPlans : businessPlans;

  return (
    <div className="landing-root bg-white overflow-x-hidden min-h-screen text-slate-900 selection:bg-brand selection:text-white">
      <style>{`
        .reveal { opacity: 0; transform: translateY(20px); transition: all 0.7s cubic-bezier(0.2, 0.8, 0.2, 1); }
        .reveal-left { opacity: 0; transform: translateX(-20px); transition: all 0.7s cubic-bezier(0.2, 0.8, 0.2, 1); }
        .reveal-right { opacity: 0; transform: translateX(20px); transition: all 0.7s cubic-bezier(0.2, 0.8, 0.2, 1); }
        .active { opacity: 1; transform: translate(0, 0); }
        .glass-nav { backdrop-filter: blur(12px) saturate(160%); background-color: rgba(255, 255, 255, 0.7); border-bottom: 1px solid rgba(226, 232, 240, 0.6); }
        @keyframes float { 0%, 100% { transform: translateY(0) rotate(0.5deg); } 50% { transform: translateY(-10px) rotate(1deg); } }
        .hero-float { animation: float 5s ease-in-out infinite; }
      `}</style>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 h-[64px] md:h-[72px] glass-nav z-[100] transition-all">
        <div className="container mx-auto px-4 md:px-6 h-full flex justify-between items-center">
          <div className="flex items-center cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <span className="brand-text text-xl md:text-2xl text-brand">meritt.</span>
          </div>

          <nav className="hidden lg:flex items-center gap-8 text-[11px] font-black uppercase tracking-widest text-slate-400">
            <button onClick={onExplore} className="hover:text-brand transition-colors">Marketplace</button>
            <a href="#features" className="hover:text-brand transition-colors">Why Meritt?</a>
            <a href="#pricing" className="hover:text-brand transition-colors">Pricing</a>
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <button onClick={onLogin} className="text-[12px] font-bold text-slate-500 hover:text-brand px-4">Log In</button>
            <button onClick={onJoin} className="bg-brand text-white px-6 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-widest shadow-xl shadow-brand/20 hover:translate-y-[-2px] transition-all">Join Marketplace</button>
          </div>

          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="lg:hidden p-2 text-slate-500">
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="lg:hidden fixed inset-x-0 top-[64px] bg-white border-b border-slate-100 p-6 flex flex-col gap-6 shadow-2xl animate-in slide-in-from-top-4">
            <nav className="flex flex-col gap-5 text-[14px] font-bold text-slate-600">
              <button onClick={() => { onExplore(); setIsMobileMenuOpen(false); }} className="text-left py-2 border-b border-slate-50">Explore Marketplace</button>
              <a href="#features" onClick={() => setIsMobileMenuOpen(false)} className="py-2 border-b border-slate-50">Why Meritt?</a>
              <a href="#pricing" onClick={() => setIsMobileMenuOpen(false)} className="py-2 border-b border-slate-50">Pricing Plans</a>
            </nav>
            <div className="flex flex-col gap-3 pt-4">
              <button onClick={onLogin} className="w-full py-4 text-slate-600 font-bold border border-slate-200 rounded-2xl">Log In</button>
              <button onClick={onJoin} className="w-full py-4 bg-brand text-white font-bold rounded-2xl shadow-lg shadow-brand/20">Get Started</button>
            </div>
          </div>
        )}
      </header>

      <div className="container mx-auto px-4 md:px-6 pt-20">
        {/* Hero Section */}
        <section className="py-16 lg:py-28 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="reveal-left text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand/5 border border-brand/10 rounded-full mb-6">
              <span className="w-1.5 h-1.5 bg-brand rounded-full animate-pulse"></span>
              <span className="text-[9px] font-black text-brand uppercase tracking-[0.2em]">Maldives Professional Hub</span>
            </div>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black leading-[1] tracking-tighter mb-6">
              Hire Elite <br className="hidden md:block" />
              <span className="text-brand">Vetted Talent.</span>
            </h1>
            <p className="text-base sm:text-lg text-slate-500 mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed font-medium">
              The professional ecosystem connecting elite specialists with ventures across the Maldives. MVR Escrow & e-Faas verified.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
              <button onClick={onJoin} className="w-full sm:w-auto px-8 py-4 bg-brand text-white rounded-2xl font-black text-[14px] shadow-2xl shadow-brand/30 hover:brightness-110 flex items-center justify-center gap-2 transition-all hover:translate-y-[-2px]">
                Start Working <ArrowRight className="w-4 h-4" />
              </button>
              <button onClick={onExplore} className="w-full sm:w-auto px-8 py-4 bg-white border-2 border-slate-100 rounded-2xl font-black text-[14px] text-slate-600 hover:border-brand hover:text-brand transition-all">
                Browse Talent
              </button>
            </div>
          </div>
          
          <div className="reveal-right flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[460px] hero-float">
               <div className="w-full aspect-[4/5] bg-white border border-slate-100 rounded-[48px] shadow-2xl relative overflow-hidden p-2 ring-8 ring-slate-50/50">
                  <div className="bg-slate-50 h-full rounded-[40px] p-6 flex flex-col">
                    <div className="flex items-center justify-between mb-10">
                      <span className="brand-text text-brand text-lg">meritt.</span>
                      <div className="flex gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-slate-200"></div>
                        <div className="w-2 h-2 rounded-full bg-slate-200"></div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      {[1,2,3].map(i => (
                        <div key={i} className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200"></div>
                            <div className="space-y-1.5">
                              <div className="w-20 h-2 bg-slate-100 rounded-full"></div>
                              <div className="w-12 h-1.5 bg-slate-50 rounded-full"></div>
                            </div>
                          </div>
                          <div className="px-2 py-0.5 bg-brand/5 rounded-full text-[8px] font-black text-brand uppercase">Verified</div>
                        </div>
                      ))}
                    </div>
                  </div>
               </div>
               {/* Ambient Blur */}
               <div className="absolute -z-10 -top-20 -right-20 w-80 h-80 bg-brand/5 blur-[100px] rounded-full"></div>
            </div>
          </div>
        </section>

        {/* Local Advantage Section */}
        <section id="features" className="py-20 md:py-32 border-t border-slate-50">
          <div className="text-center mb-16 reveal">
            <h2 className="text-[10px] font-black text-brand uppercase tracking-[0.4em] mb-4">Built for the Archipelago</h2>
            <h3 className="text-3xl md:text-5xl font-black tracking-tighter">The local advantage.</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'e-Faas Integration', desc: 'Secure identity verification via National Digital Identity (NDI) for absolute trust.', icon: ShieldCheck },
              { title: 'Direct MVR Clearing', desc: 'No complex wire transfers. Payouts directly to your BML or MIB accounts in local currency.', icon: CreditCard },
              { title: 'Local Compliance', desc: 'Automated tax reporting tools and MIRA-friendly invoicing built right into the platform.', icon: BarChart4 }
            ].map((feature, i) => (
              <div key={i} className="p-10 bg-slate-50/50 border border-slate-100 rounded-[32px] hover:bg-white hover:shadow-xl transition-all reveal stagger-child">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm border border-slate-100 mb-6">
                  <feature.icon className="w-6 h-6 text-brand" />
                </div>
                <h4 className="text-xl font-bold mb-3 tracking-tight">{feature.title}</h4>
                <p className="text-slate-500 text-[14px] leading-relaxed font-medium">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 bg-brand/5 rounded-[48px] px-8 md:px-16 reveal">
           <div className="flex flex-col lg:flex-row gap-12 items-center">
              <div className="lg:w-1/3">
                 <div className="flex gap-1 mb-4">
                    {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-brand text-brand" />)}
                 </div>
                 <h3 className="text-3xl font-black tracking-tight mb-4">Loved by local experts.</h3>
                 <p className="text-slate-500 font-medium leading-relaxed">Hear from the people building the future of work in the Maldives.</p>
              </div>
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
                 {[
                   { name: "Ahmed R.", role: "React Developer", text: "Meritt changed how I manage resort projects. The direct BML clearing is a lifesaver." },
                   { name: "Mariyam S.", role: "Brand Designer", text: "Verified profiles mean I only deal with real businesses. High-quality leads only." }
                 ].map((t, i) => (
                   <div key={i} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 relative">
                      <Quote className="absolute top-6 right-6 w-8 h-8 text-slate-100" />
                      <p className="text-slate-600 font-medium mb-6 relative z-10">"{t.text}"</p>
                      <div>
                         <p className="font-bold text-[14px]">{t.name}</p>
                         <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest">{t.role}</p>
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-24 md:py-32">
          <div className="text-center mb-12 md:mb-20 reveal">
             <h2 className="text-3xl md:text-6xl font-black tracking-tighter mb-10">Simple Tiers.</h2>
             <div className="flex justify-center items-center gap-2 p-1.5 bg-slate-100 w-fit mx-auto rounded-2xl">
                <button onClick={() => setPricingType('freelancer')} className={`px-6 py-2.5 rounded-xl font-black text-[12px] uppercase tracking-wider transition-all ${pricingType === 'freelancer' ? 'bg-white shadow-lg text-brand' : 'text-slate-400'}`}>Freelancer</button>
                <button onClick={() => setPricingType('business')} className={`px-6 py-2.5 rounded-xl font-black text-[12px] uppercase tracking-wider transition-all ${pricingType === 'business' ? 'bg-white shadow-lg text-brand' : 'text-slate-400'}`}>Business</button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
             {currentPlans.map((plan: any) => (
                <div key={plan.id} className={`group bg-white p-8 md:p-12 rounded-[40px] border-2 transition-all hover:translate-y-[-8px] flex flex-col reveal ${plan.featured ? 'border-brand shadow-2xl' : 'border-slate-100 shadow-sm'}`}>
                   <div className="mb-8">
                      <div className={`w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center mb-6 border border-slate-100 group-hover:scale-110 transition-transform ${plan.color}`}>
                         <plan.icon className="w-7 h-7" />
                      </div>
                      <h4 className="text-2xl font-black tracking-tight mb-2">{plan.name}</h4>
                      <div className="flex items-baseline gap-2">
                         <span className="text-4xl font-black text-slate-900">{plan.price}</span>
                         <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest">/mo</span>
                      </div>
                   </div>

                   <div className="space-y-4 mb-10 flex-1">
                      <div className="flex items-center gap-3 text-[13px] font-bold text-slate-600">
                         <CheckCircle2 className="w-4 h-4 text-brand" /> <span>{plan.tagline}</span>
                      </div>
                      <div className="flex items-center gap-3 text-[13px] font-bold text-slate-600">
                         <CheckCircle2 className="w-4 h-4 text-brand" /> <span>{plan.perk}</span>
                      </div>
                   </div>

                   <button onClick={onJoin} className={`w-full py-4 rounded-xl font-black text-[12px] uppercase tracking-widest transition-all ${plan.featured ? 'bg-brand text-white' : 'bg-slate-50 text-slate-900 border border-slate-200 hover:border-brand'}`}>
                     Select Plan
                   </button>
                </div>
             ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 text-center reveal">
           <div className="max-w-2xl mx-auto">
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-8 leading-[0.9]">Ready to work?</h2>
              <p className="text-slate-500 font-medium text-lg mb-10">Join thousands of Maldivian professionals building the new economy.</p>
              <button onClick={onJoin} className="px-10 py-5 bg-brand text-white rounded-2xl font-black uppercase tracking-widest shadow-2xl shadow-brand/30 hover:scale-105 transition-all">
                 Join meritt. today
              </button>
           </div>
        </section>

        {/* Footer */}
        <footer className="py-16 md:py-24 border-t border-slate-100">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-16">
             <div className="col-span-2">
                <span className="brand-text text-2xl text-brand block mb-6">meritt.</span>
                <p className="text-slate-400 font-medium text-[14px] leading-relaxed max-w-xs">The definitive professional engine for the archipelago. Made in the Maldives, for the Maldives.</p>
             </div>
             <div>
                <h5 className="font-black text-[11px] uppercase tracking-[0.3em] text-slate-400 mb-6">Platform</h5>
                <ul className="space-y-3 text-[13px] font-bold text-slate-500">
                   <li><a href="#" className="hover:text-brand transition-colors">Marketplace</a></li>
                   <li><a href="#" className="hover:text-brand transition-colors">Identity</a></li>
                </ul>
             </div>
             <div>
                <h5 className="font-black text-[11px] uppercase tracking-[0.3em] text-slate-400 mb-6">Support</h5>
                <ul className="space-y-3 text-[13px] font-bold text-slate-500">
                   <li><a href="#" className="hover:text-brand transition-colors">Help Center</a></li>
                   <li><a href="#" className="hover:text-brand transition-colors">Privacy</a></li>
                </ul>
             </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-10 border-t border-slate-50">
             <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">© 2024 Meritt Maldives Pvt Ltd.</p>
             <div className="flex items-center gap-2 text-[10px] font-black text-emerald-500 uppercase tracking-widest">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                Settlement Engine: Live
             </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default LandingPage;