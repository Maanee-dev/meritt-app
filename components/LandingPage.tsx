import React, { useEffect, useState, useRef } from 'react';
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
  Quote,
  Shield,
  Activity,
  Cpu,
  Target,
  ArrowUpRight,
  ExternalLink,
  // Added missing MessageSquare icon
  MessageSquare
} from 'lucide-react';

interface LandingPageProps {
  onExplore: () => void;
  onLogin: () => void;
  onJoin: () => void;
}

const FAQ_ITEMS = [
  { q: "How secure is the MVR Escrow?", a: "Extremely. When a project is initiated, funds are legally secured in a neutral clearing node. We only release payments to the freelancer once the milestone deliverables are cryptographically approved by the client or verified through our resolution protocol." },
  { q: "Is e-Faas mandatory for everyone?", a: "Yes. To maintain a high-trust professional ecosystem, all users must verify their identity via e-Faas. This ensures every project involves real individuals or legally registered entities in the Maldives." },
  { q: "What are the settlement times for BML?", a: "Standard clearing takes 24-48 hours. Users on our Professional and Elite tiers enjoy Priority Clearing, often resulting in same-day settlements for local bank accounts." },
  { q: "Can I use Meritt for long-term retainers?", a: "Absolutely. Meritt is designed for everything from 2-hour consultations to year-long resort rebrandings. Our pipeline tools specifically support complex milestone tracking." }
];

const LandingPage: React.FC<LandingPageProps> = ({ onExplore, onLogin, onJoin }) => {
  const [pricingType, setPricingType] = useState<'freelancer' | 'business'>('freelancer');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    
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

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [pricingType]);

  const freelancerPlans = [
    { id: 'ithibaaru', name: 'Ithibaaru', tagline: 'Entry Tier', price: 'MVR 0', perk: '12% Commission', icon: Coffee, color: 'text-slate-400' },
    { id: 'muraaja', name: 'Muraaja', tagline: 'Professional Catalyst', price: 'MVR 49', perk: '7% Commission', icon: Zap, color: 'text-brand', featured: true },
    { id: 'kamiyaabu', name: 'Kamiyaabu', tagline: 'Elite Authority', price: 'MVR 99', perk: '3% Commission', icon: Crown, color: 'text-yellow-500' }
  ];

  const businessPlans = [
    { id: 'maqaamu', name: 'Maqaamu', tagline: 'Standard Hire', price: 'MVR 0', perk: '1 Active Listing', icon: Layers, color: 'text-slate-400' },
    { id: 'ithigaadh', name: 'Ithigaadh', tagline: 'Enterprise Scale', price: 'MVR 99', perk: 'Unlimited Postings', icon: TrendingUp, color: 'text-brand', featured: true },
    { id: 'sulthaan', name: 'Sulthaan', tagline: 'Concierge Elite', price: 'MVR 299', perk: 'Dedicated Manager', icon: Trophy, color: 'text-brand' }
  ];

  const currentPlans = pricingType === 'freelancer' ? freelancerPlans : businessPlans;

  return (
    <div className="landing-root bg-[#FDFDFF] overflow-x-hidden min-h-screen text-slate-900 selection:bg-brand selection:text-white">
      <style>{`
        .reveal { opacity: 0; transform: translateY(30px); transition: all 1s cubic-bezier(0.19, 1, 0.22, 1); }
        .reveal-left { opacity: 0; transform: translateX(-40px); transition: all 1.2s cubic-bezier(0.19, 1, 0.22, 1); }
        .reveal-right { opacity: 0; transform: translateX(40px); transition: all 1.2s cubic-bezier(0.19, 1, 0.22, 1); }
        .active { opacity: 1; transform: translate(0, 0); }
        .glass-card { background: rgba(255, 255, 255, 0.6); backdrop-filter: blur(24px); border: 1px solid rgba(255, 255, 255, 0.4); }
        @keyframes float { 0%, 100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-20px) rotate(2deg); } }
        .float-slow { animation: float 10s ease-in-out infinite; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .marquee { animation: marquee 40s linear infinite; }
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .blob { filter: blur(80px); opacity: 0.15; position: absolute; border-radius: 50%; z-index: 0; }
        .bento-grid { display: grid; grid-template-columns: repeat(12, 1fr); gap: 1.5rem; }
      `}</style>

      {/* Navigation */}
      <header className={`fixed top-0 inset-x-0 h-[72px] md:h-[90px] z-[100] transition-all duration-500 ${scrolled ? 'bg-white/80 backdrop-blur-xl border-b border-slate-100 shadow-sm' : 'bg-transparent'}`}>
        <div className="container mx-auto px-6 h-full flex justify-between items-center">
          <div className="flex items-center cursor-pointer group" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <span className="brand-text text-2xl md:text-3xl text-brand transition-all group-hover:tracking-widest">meritt.</span>
          </div>

          <nav className="hidden lg:flex items-center gap-12">
            {['Marketplace', 'Protocol', 'Tiers', 'About'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-brand transition-colors">
                {item}
              </a>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-8">
            <button onClick={onLogin} className="text-[12px] font-bold text-slate-500 hover:text-brand">Sign In</button>
            <button onClick={onJoin} className="bg-brand text-white px-10 py-4 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] shadow-2xl shadow-brand/30 hover:scale-105 active:scale-95 transition-all">
              Initialize Node
            </button>
          </div>

          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="lg:hidden p-3 bg-slate-50 rounded-2xl">
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Nav Overlay */}
        {isMobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 top-[72px] bg-white z-[100] p-8 flex flex-col gap-10 animate-in fade-in slide-in-from-top-4">
             <nav className="flex flex-col gap-8 text-3xl font-black tracking-tighter">
               <button onClick={() => { onExplore(); setIsMobileMenuOpen(false); }} className="text-left text-brand">Marketplace</button>
               <a href="#protocol" onClick={() => setIsMobileMenuOpen(false)}>Protocol</a>
               <a href="#tiers" onClick={() => setIsMobileMenuOpen(false)}>Pricing</a>
               <a href="#about" onClick={() => setIsMobileMenuOpen(false)}>About</a>
             </nav>
             <div className="mt-auto flex flex-col gap-4">
               <button onClick={onLogin} className="w-full py-6 text-slate-600 font-bold border-2 border-slate-100 rounded-3xl">Sign In</button>
               <button onClick={onJoin} className="w-full py-6 bg-brand text-white font-bold rounded-3xl shadow-2xl shadow-brand/30">Get Started</button>
             </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative min-h-[100vh] flex items-center pt-24 overflow-hidden">
        <div className="blob w-[600px] h-[600px] bg-brand top-[-10%] left-[-10%]"></div>
        <div className="blob w-[500px] h-[500px] bg-blue-300 bottom-[10%] right-[-5%]"></div>
        
        <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="reveal-left text-center lg:text-left max-w-2xl mx-auto lg:mx-0">
            <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-brand/5 border border-brand/10 rounded-full mb-10">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[10px] font-black text-brand uppercase tracking-[0.3em]">Node V1.0: Active & Vetted</span>
            </div>
            <h1 className="text-6xl sm:text-8xl lg:text-[120px] font-black leading-[0.85] tracking-tighter mb-10">
              The Island <br />
              Professional <br />
              <span className="text-brand">Engine.</span>
            </h1>
            <p className="text-lg sm:text-2xl text-slate-500 mb-12 leading-relaxed font-medium">
              A high-density workspace for elite Maldivian talent and ambitious resorts. Powered by direct MVR Clearing and e-Faas authentication.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-5">
              <button onClick={onJoin} className="w-full sm:w-auto px-12 py-6 bg-brand text-white rounded-[32px] font-black text-[15px] shadow-[0_20px_50px_rgba(0,71,255,0.3)] hover:translate-y-[-4px] active:translate-y-0 transition-all flex items-center justify-center gap-4">
                Join Ecosystem <ArrowRight className="w-5 h-5" />
              </button>
              <button onClick={onExplore} className="w-full sm:w-auto px-12 py-6 bg-white border-2 border-slate-100 rounded-[32px] font-black text-[15px] text-slate-600 hover:border-brand hover:text-brand transition-all">
                Browse Directory
              </button>
            </div>
          </div>

          <div className="reveal-right relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[580px] float-slow">
              {/* Overlapping Glass HUD Elements */}
              <div className="absolute -top-10 -left-10 z-20 glass-card p-6 rounded-[40px] shadow-2xl hidden md:block">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-emerald-500/20">
                    <ShieldCheck className="w-7 h-7" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Trust Index</p>
                    <p className="text-[18px] font-black">e-Faas Verified</p>
                  </div>
                </div>
              </div>

              <div className="w-full aspect-[4/5] bg-white rounded-[64px] p-4 shadow-[0_40px_100px_rgba(0,0,0,0.08)] ring-[20px] ring-slate-50">
                 <div className="h-full border border-slate-100 rounded-[50px] p-10 flex flex-col">
                   <div className="flex items-center justify-between mb-16">
                     <span className="brand-text text-brand text-3xl">meritt.</span>
                     <div className="flex gap-2.5">
                       <div className="w-3.5 h-3.5 rounded-full bg-slate-100"></div>
                       <div className="w-3.5 h-3.5 rounded-full bg-slate-100"></div>
                       <div className="w-3.5 h-3.5 rounded-full bg-brand/40"></div>
                     </div>
                   </div>
                   <div className="space-y-6 flex-1">
                     {[1, 2, 3].map(i => (
                       <div key={i} className="flex items-center justify-between p-6 border border-slate-50 rounded-[32px] bg-slate-50/40 hover:bg-white hover:border-slate-200 hover:shadow-xl transition-all group cursor-default">
                         <div className="flex items-center gap-5">
                            <div className="w-12 h-12 bg-brand/10 rounded-2xl flex items-center justify-center text-brand font-black text-xs">JD</div>
                            <div className="space-y-2">
                               <div className="w-32 h-2.5 bg-slate-200 rounded-full group-hover:bg-brand/20 transition-colors"></div>
                               <div className="w-20 h-2 bg-slate-100 rounded-full"></div>
                            </div>
                         </div>
                         <ArrowUpRight className="w-5 h-5 text-slate-300 group-hover:text-brand transition-all" />
                       </div>
                     ))}
                   </div>
                   <div className="mt-auto p-10 bg-slate-900 rounded-[48px] text-white">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-60">Escrow Node</span>
                        <div className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                          <span className="text-[10px] font-black uppercase tracking-widest">Synced</span>
                        </div>
                      </div>
                      <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                         <div className="h-full bg-brand w-[88%]"></div>
                      </div>
                   </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Trust Marquee */}
      <section className="py-24 bg-white overflow-hidden border-y border-slate-100">
        <div className="container mx-auto px-6 mb-16 reveal">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.5em] text-center">Powering Distributed Excellence Across Atolls</p>
        </div>
        <div className="flex marquee-container">
          <div className="flex gap-20 marquee items-center pr-20">
            {['Oceanic Retail', 'Boutique Maldives', 'Island Flavors', 'ResortGroup', 'Maldives Tech', 'Coral Ventures', 'Aqua Digital'].map((brand, idx) => (
              <span key={idx} className="text-4xl md:text-5xl font-black text-slate-200 hover:text-brand transition-colors cursor-default tracking-tighter shrink-0">{brand}.</span>
            ))}
          </div>
          <div className="flex gap-20 marquee items-center pr-20">
            {['Oceanic Retail', 'Boutique Maldives', 'Island Flavors', 'ResortGroup', 'Maldives Tech', 'Coral Ventures', 'Aqua Digital'].map((brand, idx) => (
              <span key={idx} className="text-4xl md:text-5xl font-black text-slate-200 hover:text-brand transition-colors cursor-default tracking-tighter shrink-0">{brand}.</span>
            ))}
          </div>
        </div>
      </section>

      {/* Bento Grid Features - ELIMINATING VERTICAL CARD FATIGUE */}
      <section id="protocol" className="py-32 md:py-48 bg-[#F9FBFF]">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mb-24 reveal">
            <h2 className="text-brand font-black text-[12px] uppercase tracking-[0.5em] mb-10">System Architecture</h2>
            <h3 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.85]">Engineered for <br /> High-Trust Work.</h3>
          </div>

          <div className="bento-grid grid-cols-1 md:grid-cols-12 md:grid-rows-2">
            {/* Feature 1 - Large */}
            <div className="md:col-span-8 md:row-span-1 bg-white border border-slate-100 rounded-[56px] p-12 hover:shadow-2xl transition-all reveal stagger-child flex flex-col md:flex-row gap-10 items-center overflow-hidden">
              <div className="flex-1">
                <div className="w-16 h-16 bg-brand rounded-3xl flex items-center justify-center text-white mb-8 shadow-xl shadow-brand/20">
                  <CreditCard className="w-8 h-8" />
                </div>
                <h4 className="text-3xl font-black mb-4 tracking-tight">Direct MVR Settlement</h4>
                <p className="text-slate-500 text-lg leading-relaxed font-medium">Native integration with BML and MIB ensure your funds land in your local account within 24 hours of milestone approval. No middlemen.</p>
              </div>
              <div className="w-full md:w-1/2 bg-slate-50 rounded-[40px] p-8 border border-slate-100 rotate-2 translate-x-10 translate-y-10">
                 <div className="space-y-4">
                    <div className="flex justify-between items-center text-[10px] font-black uppercase text-slate-400">
                      <span>Transaction Node</span>
                      <span>Verified</span>
                    </div>
                    <div className="h-2 w-full bg-brand/10 rounded-full"></div>
                    <div className="h-2 w-2/3 bg-brand/10 rounded-full"></div>
                 </div>
              </div>
            </div>

            {/* Feature 2 - Tall */}
            <div className="md:col-span-4 md:row-span-2 bg-slate-900 text-white border border-slate-800 rounded-[56px] p-12 hover:shadow-2xl transition-all reveal stagger-child flex flex-col relative overflow-hidden">
              <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand/20 blur-[100px] rounded-full"></div>
              <div className="relative z-10 h-full flex flex-col">
                <div className="w-16 h-16 bg-white/10 rounded-3xl flex items-center justify-center mb-10 border border-white/10">
                  <ShieldCheck className="w-8 h-8 text-brand" />
                </div>
                <h4 className="text-3xl font-black mb-6 tracking-tight">e-Faas Verified Node</h4>
                <p className="text-slate-400 text-lg leading-relaxed font-medium mb-12">Every professional identity is cryptographically anchored to the national digital identity system. Zero bots. Zero scams.</p>
                <div className="mt-auto pt-10 border-t border-white/10">
                  <div className="flex items-center gap-4 p-4 bg-white/5 rounded-3xl border border-white/10">
                    <div className="w-10 h-10 bg-brand rounded-xl"></div>
                    <div className="flex-1 h-3 bg-white/10 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature 3 - Small */}
            <div className="md:col-span-4 bg-white border border-slate-100 rounded-[56px] p-12 hover:shadow-2xl transition-all reveal stagger-child">
              <div className="w-14 h-14 bg-emerald-500 rounded-3xl flex items-center justify-center text-white mb-8 shadow-xl shadow-emerald-500/20">
                <Lock className="w-7 h-7" />
              </div>
              <h4 className="text-2xl font-black mb-4 tracking-tight">Escrow Protocol</h4>
              <p className="text-slate-500 font-medium">Funds are liberated only when the work is signed off. Absolute security for both sides.</p>
            </div>

            {/* Feature 4 - Small */}
            <div className="md:col-span-4 bg-white border border-slate-100 rounded-[56px] p-12 hover:shadow-2xl transition-all reveal stagger-child">
              <div className="w-14 h-14 bg-yellow-500 rounded-3xl flex items-center justify-center text-white mb-8 shadow-xl shadow-yellow-500/20">
                <Target className="w-7 h-7" />
              </div>
              <h4 className="text-2xl font-black mb-4 tracking-tight">Strategic Filters</h4>
              <p className="text-slate-500 font-medium">Find talent based on atoll, language proficiency, and specialized island expertise.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Network Horizontal Swiper - REPLACING VERTICAL STACK */}
      <section id="marketplace" className="py-32 md:py-48 bg-white overflow-hidden">
        <div className="container mx-auto px-6 mb-24 reveal">
          <div className="flex flex-col md:flex-row justify-between items-end gap-10">
             <div className="max-w-2xl">
                <h3 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.85] mb-8">Access the <br /> Professional Grid.</h3>
                <p className="text-xl md:text-2xl text-slate-400 font-medium">The archipelago's highest density professional directory is live and searchable.</p>
             </div>
             <button onClick={onExplore} className="px-14 py-6 bg-slate-900 text-white rounded-[32px] font-black text-[13px] uppercase tracking-widest shadow-2xl shadow-slate-900/20 hover:bg-brand transition-all flex items-center gap-4">
                Enter Market <ExternalLink className="w-5 h-5" />
             </button>
          </div>
        </div>

        {/* Horizontal Scroll on Mobile / Grid on Desktop */}
        <div className="px-6 md:px-0">
          <div className="flex md:grid md:grid-cols-3 gap-8 overflow-x-auto no-scrollbar pb-10 -mx-6 px-6 md:mx-0 md:container md:mx-auto">
             {[
               { cat: 'Software Development', count: '482 experts', icon: Cpu, color: 'bg-blue-500' },
               { cat: 'Creative Branding', count: '290 designers', icon: Target, color: 'bg-brand' },
               { cat: 'Strategic Marketing', count: '150 pros', icon: Globe, color: 'bg-emerald-500' },
               { cat: 'Event Management', count: '98 leads', icon: Star, color: 'bg-yellow-500' },
               { cat: 'Legal & Audit', count: '45 experts', icon: Shield, color: 'bg-slate-900' },
               { cat: 'Translation', count: '120 nodes', icon: MessageSquare, color: 'bg-indigo-600' }
             ].map((grid, i) => (
               <div key={i} className="min-w-[300px] md:min-w-0 group p-10 bg-slate-50 rounded-[48px] hover:bg-brand hover:translate-y-[-12px] transition-all duration-500 reveal stagger-child">
                  <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center mb-10 shadow-xl group-hover:scale-110 transition-transform">
                     <grid.icon className="w-8 h-8 text-brand" />
                  </div>
                  <h4 className="text-2xl font-black mb-2 group-hover:text-white transition-colors tracking-tight">{grid.cat}</h4>
                  <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest group-hover:text-white/70 transition-colors">{grid.count}</p>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* Pricing / Tiers - Integrated Layout */}
      <section id="tiers" className="py-32 md:py-48 bg-slate-50">
        <div className="container mx-auto px-6">
           <div className="max-w-4xl mx-auto text-center mb-24 reveal">
              <h2 className="text-[12px] font-black text-brand uppercase tracking-[0.6em] mb-10">Tier Selection</h2>
              <h3 className="text-5xl md:text-9xl font-black tracking-tighter mb-12 leading-[0.85]">Economic <br /> Velocity.</h3>
              <div className="inline-flex items-center gap-3 p-2 bg-white rounded-[32px] shadow-sm">
                <button onClick={() => setPricingType('freelancer')} className={`px-12 py-4 rounded-[26px] font-black text-[12px] uppercase tracking-widest transition-all ${pricingType === 'freelancer' ? 'bg-brand text-white shadow-2xl' : 'text-slate-400'}`}>Freelancer</button>
                <button onClick={() => setPricingType('business')} className={`px-12 py-4 rounded-[26px] font-black text-[12px] uppercase tracking-widest transition-all ${pricingType === 'business' ? 'bg-brand text-white shadow-2xl' : 'text-slate-400'}`}>Business</button>
              </div>
           </div>

           <div className="flex md:grid md:grid-cols-3 gap-8 overflow-x-auto no-scrollbar pb-10 -mx-6 px-6 md:mx-0">
             {currentPlans.map((plan: any) => (
               <div key={plan.id} className={`min-w-[320px] md:min-w-0 p-12 bg-white rounded-[64px] border-2 transition-all duration-500 reveal stagger-child flex flex-col ${plan.featured ? 'border-brand shadow-2xl scale-105 z-10' : 'border-slate-100 hover:border-brand/40 shadow-sm'}`}>
                  <div className="mb-14 text-center md:text-left">
                     <div className={`w-20 h-20 rounded-[32px] bg-slate-50 flex items-center justify-center mb-10 border border-slate-100 ${plan.color} mx-auto md:mx-0`}>
                        <plan.icon className="w-10 h-10" />
                     </div>
                     <h4 className="text-4xl font-black tracking-tighter mb-2">{plan.name}</h4>
                     <div className="flex items-baseline justify-center md:justify-start gap-2">
                        <span className="text-6xl font-black text-slate-900">{plan.price}</span>
                        <span className="text-slate-400 text-sm font-black uppercase tracking-widest opacity-60">/mo</span>
                     </div>
                  </div>
                  <div className="space-y-6 mb-16 flex-1">
                     <div className="flex items-center gap-4 text-[15px] font-bold text-slate-600">
                        <CheckCircle2 className="w-6 h-6 text-brand" /> <span>{plan.tagline}</span>
                     </div>
                     <div className="flex items-center gap-4 text-[15px] font-bold text-slate-600">
                        <CheckCircle2 className="w-6 h-6 text-brand" /> <span>{plan.perk}</span>
                     </div>
                     <div className="flex items-center gap-4 text-[15px] font-bold text-slate-600">
                        <CheckCircle2 className="w-6 h-6 text-brand" /> <span>Escrow Protected</span>
                     </div>
                  </div>
                  <button onClick={onJoin} className={`w-full py-6 rounded-[32px] font-black text-[14px] uppercase tracking-widest transition-all ${plan.featured ? 'bg-brand text-white shadow-2xl shadow-brand/30 hover:brightness-110' : 'bg-slate-50 text-slate-900 hover:border-brand hover:bg-white border border-slate-200'}`}>
                     Get Started
                  </button>
               </div>
             ))}
           </div>
        </div>
      </section>

      {/* Protocols / FAQ */}
      <section id="about" className="py-40 md:py-56 bg-white border-y border-slate-100">
        <div className="container mx-auto px-6 max-w-4xl">
           <div className="text-center mb-24 reveal">
              <h3 className="text-5xl md:text-8xl font-black tracking-tighter mb-10">Common Protocols.</h3>
              <p className="text-slate-400 font-medium text-xl">Technical insights for high-performance users.</p>
           </div>
           <div className="space-y-6">
              {FAQ_ITEMS.map((item, i) => (
                 <div key={i} className={`border border-slate-200 rounded-[40px] overflow-hidden transition-all duration-500 ${openFaq === i ? 'bg-white shadow-2xl ring-[16px] ring-brand/5' : 'bg-white shadow-sm hover:border-brand/40'}`}>
                    <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between p-10 text-left">
                       <span className="font-black text-xl md:text-2xl pr-8 tracking-tight">{item.q}</span>
                       <ChevronDown className={`w-8 h-8 text-slate-300 transition-transform duration-500 ${openFaq === i ? 'rotate-180 text-brand' : ''}`} />
                    </button>
                    {openFaq === i && (
                      <div className="px-10 pb-12 animate-in slide-in-from-top-4 duration-500">
                         <p className="text-slate-500 text-lg md:text-xl leading-relaxed font-medium">{item.a}</p>
                      </div>
                    )}
                 </div>
              ))}
           </div>
        </div>
      </section>

      {/* Final CTA Node */}
      <section className="py-40 md:py-60 bg-brand relative overflow-hidden text-center">
        <div className="blob w-[1000px] h-[1000px] bg-white opacity-5 top-[-50%] left-[-50%] blur-[150px]"></div>
        <div className="container mx-auto px-6 relative z-10">
          <h2 className="text-white/60 font-black text-[12px] uppercase tracking-[0.8em] mb-12">Initialize Deployment</h2>
          <h3 className="text-6xl md:text-[140px] font-black text-white leading-[0.8] tracking-tighter mb-20">Ready to <br /> scale work?</h3>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button onClick={onJoin} className="w-full sm:w-auto px-16 py-8 bg-white text-brand rounded-[40px] font-black text-[18px] shadow-2xl hover:scale-105 active:scale-95 transition-all">
              Initialize Account
            </button>
            <button onClick={onExplore} className="w-full sm:w-auto px-16 py-8 bg-transparent border-2 border-white/20 text-white rounded-[40px] font-black text-[18px] hover:bg-white/10 transition-all">
              Browse Grid
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="pt-40 pb-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-20 mb-32">
            <div className="lg:col-span-2">
               <span className="brand-text text-5xl text-brand block mb-12">meritt.</span>
               <p className="text-slate-400 font-medium text-xl leading-relaxed max-w-sm">Distributing professional excellence across the archipelago. Secure, sovereign, and domestic.</p>
            </div>
            <div className="lg:col-span-4 grid grid-cols-2 md:grid-cols-3 gap-12">
               <div>
                  <h5 className="font-black text-[11px] uppercase tracking-[0.5em] text-slate-300 mb-10">System</h5>
                  <ul className="space-y-5 text-[15px] font-bold text-slate-600">
                     <li><a href="#" className="hover:text-brand">Protocol Grid</a></li>
                     <li><a href="#" className="hover:text-brand">Escrow Node</a></li>
                     <li><a href="#" className="hover:text-brand">Identity Hub</a></li>
                  </ul>
               </div>
               <div>
                  <h5 className="font-black text-[11px] uppercase tracking-[0.5em] text-slate-300 mb-10">Network</h5>
                  <ul className="space-y-5 text-[15px] font-bold text-slate-600">
                     <li><a href="#" className="hover:text-brand">Expert Search</a></li>
                     <li><a href="#" className="hover:text-brand">Business Board</a></li>
                     <li><a href="#" className="hover:text-brand">Case Studies</a></li>
                  </ul>
               </div>
               <div>
                  <h5 className="font-black text-[11px] uppercase tracking-[0.5em] text-slate-300 mb-10">Entity</h5>
                  <ul className="space-y-5 text-[15px] font-bold text-slate-600">
                     <li><a href="#" className="hover:text-brand">Legal Board</a></li>
                     <li><a href="#" className="hover:text-brand">Status Node</a></li>
                     <li><a href="#" className="hover:text-brand">Terms</a></li>
                  </ul>
               </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-10 pt-16 border-t border-slate-100">
            <p className="text-[12px] font-black text-slate-300 uppercase tracking-widest">© 2024 Meritt Maldives Pvt Ltd. Distributed Professional Engine v2.0.1</p>
            <div className="flex items-center gap-10 text-[11px] font-black uppercase tracking-widest text-emerald-500">
               <span className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse shadow-lg shadow-emerald-500/40"></span>
                  BML: Online
               </span>
               <span className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse shadow-lg shadow-emerald-500/40"></span>
                  e-Faas: Online
               </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;