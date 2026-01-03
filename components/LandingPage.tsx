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
  Quote,
  Shield,
  Activity,
  Cpu,
  Target
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
    <div className="landing-root bg-white overflow-x-hidden min-h-screen text-slate-900 selection:bg-brand selection:text-white">
      <style>{`
        .reveal { opacity: 0; transform: translateY(30px); transition: all 0.9s cubic-bezier(0.16, 1, 0.3, 1); }
        .reveal-left { opacity: 0; transform: translateX(-30px); transition: all 0.9s cubic-bezier(0.16, 1, 0.3, 1); }
        .reveal-right { opacity: 0; transform: translateX(30px); transition: all 0.9s cubic-bezier(0.16, 1, 0.3, 1); }
        .active { opacity: 1; transform: translate(0, 0); }
        .glass-card { background: rgba(255, 255, 255, 0.8); backdrop-filter: blur(20px); border: 1px solid rgba(226, 232, 240, 0.8); }
        @keyframes float { 0%, 100% { transform: translateY(0) rotate(0.2deg); } 50% { transform: translateY(-15px) rotate(0.5deg); } }
        .float-fast { animation: float 4s ease-in-out infinite; }
        .float-slow { animation: float 7s ease-in-out infinite; }
        .text-gradient { background: linear-gradient(135deg, #0047FF, #00C2FF); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
      `}</style>

      {/* Modern Fixed Nav */}
      <header className="fixed top-0 inset-x-0 h-[64px] md:h-[80px] z-[100] transition-all bg-white/70 backdrop-blur-xl border-b border-slate-100">
        <div className="container mx-auto px-6 h-full flex justify-between items-center">
          <div className="flex items-center cursor-pointer group" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <span className="brand-text text-2xl text-brand group-hover:scale-105 transition-transform">meritt.</span>
          </div>

          <nav className="hidden lg:flex items-center gap-10">
            {['Marketplace', 'Security', 'Pricing', 'Network'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-brand transition-colors">
                {item}
              </a>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-6">
            <button onClick={onLogin} className="text-[12px] font-bold text-slate-500 hover:text-brand transition-colors">Sign In</button>
            <button onClick={onJoin} className="bg-brand text-white px-8 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-2xl shadow-brand/20 hover:translate-y-[-2px] hover:shadow-brand/40 transition-all">
              Initialize
            </button>
          </div>

          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="lg:hidden p-2 text-slate-500 rounded-xl hover:bg-slate-50 transition-colors">
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Nav Overlay */}
        {isMobileMenuOpen && (
          <div className="lg:hidden fixed inset-x-0 top-[64px] bg-white border-b border-slate-200 p-8 flex flex-col gap-8 shadow-2xl animate-in fade-in slide-in-from-top-4">
             <nav className="flex flex-col gap-6 text-[16px] font-bold text-slate-600">
               <button onClick={() => { onExplore(); setIsMobileMenuOpen(false); }} className="text-left py-3 border-b border-slate-50">Marketplace</button>
               <a href="#security" onClick={() => setIsMobileMenuOpen(false)} className="py-3 border-b border-slate-50">Security</a>
               <a href="#pricing" onClick={() => setIsMobileMenuOpen(false)} className="py-3 border-b border-slate-50">Pricing</a>
               <a href="#network" onClick={() => setIsMobileMenuOpen(false)} className="py-3">Talent Network</a>
             </nav>
             <div className="flex flex-col gap-3">
               <button onClick={onLogin} className="w-full py-5 text-slate-600 font-bold border border-slate-200 rounded-2xl">Log In</button>
               <button onClick={onJoin} className="w-full py-5 bg-brand text-white font-bold rounded-2xl shadow-xl shadow-brand/30">Get Started</button>
             </div>
          </div>
        )}
      </header>

      {/* Main Content Wrap */}
      <div className="pt-20">
        {/* Dynamic Hero Section */}
        <section className="relative min-h-[90vh] flex items-center overflow-hidden">
           <div className="absolute inset-0 z-0">
             <div className="absolute top-[10%] left-[10%] w-96 h-96 bg-brand/10 blur-[120px] rounded-full animate-pulse"></div>
             <div className="absolute bottom-[20%] right-[10%] w-80 h-80 bg-blue-300/10 blur-[120px] rounded-full"></div>
           </div>

           <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10 py-20">
              <div className="reveal-left text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand/5 border border-brand/10 rounded-full mb-8">
                  <Activity className="w-3.5 h-3.5 text-brand" />
                  <span className="text-[10px] font-black text-brand uppercase tracking-[0.2em]">Live: MVR 12.4M Settlement Node</span>
                </div>
                <h1 className="text-5xl sm:text-7xl lg:text-[100px] font-black leading-[0.85] tracking-tighter mb-8">
                  The Island <br className="hidden md:block" />
                  <span  className="text-5xl sm:text-7xl lg:text-[100px] font-blue leading-[0.85] tracking-tighter mb-8">Professional Engine.</span>
                </h1>
                <p className="text-lg sm:text-xl text-slate-500 mb-12 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
                  Architecture for the high-end gig economy. Vetted specialists, instant MVR clearing, and e-Faas identity at the core of every venture.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                  <button onClick={onJoin} className="w-full sm:w-auto px-12 py-5 bg-brand text-white rounded-[24px] font-black text-[15px] shadow-2xl shadow-brand/30 hover:scale-105 transition-all">
                    Initialize Workspace
                  </button>
                  <button onClick={onExplore} className="w-full sm:w-auto px-12 py-5 bg-white border-2 border-slate-100 rounded-[24px] font-black text-[15px] text-slate-600 hover:border-brand hover:text-brand transition-all">
                    Talent Grid
                  </button>
                </div>
              </div>

              <div className="reveal-right relative flex justify-center lg:justify-end">
                <div className="relative w-full max-w-[500px]">
                   {/* Main Product Frame */}
                   <div className="w-full aspect-[4/5] glass-card rounded-[64px] p-3 shadow-2xl float-slow ring-[12px] ring-slate-50/50">
                      <div className="bg-white h-full rounded-[52px] p-8 flex flex-col shadow-inner">
                        <div className="flex items-center justify-between mb-12">
                          <span className="brand-text text-brand text-2xl">meritt.</span>
                          <div className="flex gap-2">
                             <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></div>
                             <div className="w-3 h-3 rounded-full bg-slate-100"></div>
                          </div>
                        </div>
                        <div className="space-y-6">
                           {[1, 2, 3, 4].map(i => (
                             <div key={i} className={`h-16 rounded-[24px] border border-slate-100 p-4 flex items-center justify-between shadow-sm transition-all hover:scale-[1.02] ${i === 1 ? 'bg-brand/[0.02] border-brand/20' : ''}`}>
                               <div className="flex items-center gap-4">
                                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white font-black text-[10px] ${i === 1 ? 'bg-brand' : 'bg-slate-100 text-slate-400'}`}>JD</div>
                                  <div className="space-y-1.5">
                                     <div className="w-24 h-2 bg-slate-100 rounded-full"></div>
                                     <div className="w-16 h-1.5 bg-slate-50 rounded-full"></div>
                                  </div>
                               </div>
                               <div className="w-12 h-6 bg-slate-50 rounded-full flex items-center px-1">
                                  <div className={`w-4 h-4 rounded-full ${i === 1 ? 'bg-brand ml-auto' : 'bg-slate-200'}`}></div>
                                </div>
                             </div>
                           ))}
                        </div>
                        <div className="mt-auto p-6 bg-brand/[0.03] border border-brand/10 rounded-[32px]">
                           <div className="flex justify-between items-center mb-2">
                              <span className="text-[10px] font-black text-brand uppercase tracking-widest">Active Escrow</span>
                              <span className="text-[10px] font-black text-slate-400">98% Progress</span>
                           </div>
                           <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                              <div className="h-full bg-brand w-[98%]"></div>
                           </div>
                        </div>
                      </div>
                   </div>
                   {/* Extra Floating HUD elements */}
                   <div className="absolute -top-12 -left-12 p-6 glass-card rounded-[32px] shadow-2xl float-fast hidden md:block border-brand/10">
                      <div className="flex items-center gap-3 mb-2">
                         <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-emerald-500/30">
                            <ShieldCheck className="w-6 h-6" />
                         </div>
                         <div>
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Verification</p>
                            <p className="text-[14px] font-black">e-Faas Verified</p>
                         </div>
                      </div>
                   </div>
                </div>
              </div>
           </div>
        </section>

        {/* Pulse Bar / Social Proof */}
        <section className="py-12 border-y border-slate-100 bg-slate-50/30 overflow-hidden whitespace-nowrap">
           <div className="flex items-center gap-24 animate-marquee">
              {[1, 2, 3].map(set => (
                <div key={set} className="flex items-center gap-24">
                  <span className="brand-text text-xl text-slate-300">ResortGroup.</span>
                  <span className="brand-text text-xl text-slate-300">IslandDigital.</span>
                  <span className="brand-text text-xl text-slate-300">CoralMedia.</span>
                  <span className="brand-text text-xl text-slate-300">TechWave.</span>
                  <span className="brand-text text-xl text-slate-300">OceanicVentures.</span>
                </div>
              ))}
           </div>
        </section>

        {/* Modern Workflow / Features Section */}
        <section id="security" className="py-32 bg-white relative">
           <div className="container mx-auto px-6">
              <div className="max-w-3xl mb-24 reveal">
                 <h2 className="text-[12px] font-black text-brand uppercase tracking-[0.5em] mb-6">Integrity Architecture</h2>
                 <h3 className="text-4xl md:text-6xl font-black tracking-tighter mb-10 leading-[0.9]">Built for high-trust <br/> professional ventures.</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                 {[
                   { icon: Shield, title: 'Identity Layer', desc: 'Native e-Faas verification for every user node.', color: 'bg-brand' },
                   { icon: Cpu, title: 'Clearing Engine', desc: 'Direct MVR settlements without third-party fees.', color: 'bg-emerald-500' },
                   { icon: Target, title: 'Precision Hires', desc: 'Vetted skill badges audited by local experts.', color: 'bg-yellow-500' },
                   { icon: Lock, title: 'Escrow Node', desc: 'Milestone-based fund locking and liberation.', color: 'bg-indigo-600' }
                 ].map((feat, i) => (
                   <div key={i} className="group p-10 bg-slate-50 border border-slate-100 rounded-[48px] hover:bg-white hover:shadow-2xl transition-all reveal stagger-child">
                      <div className={`w-14 h-14 ${feat.color} rounded-[20px] flex items-center justify-center text-white mb-8 group-hover:scale-110 transition-transform shadow-xl`}>
                         <feat.icon className="w-7 h-7" />
                      </div>
                      <h4 className="text-2xl font-black mb-4 tracking-tight">{feat.title}</h4>
                      <p className="text-slate-500 text-[15px] font-medium leading-relaxed">{feat.desc}</p>
                   </div>
                 ))}
              </div>
           </div>
        </section>

        {/* Dynamic Talents / Projects Preview */}
        <section id="network" className="py-32 bg-slate-900 text-white rounded-[80px] mx-4 md:mx-10 relative overflow-hidden">
           <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand/10 blur-[200px] rounded-full"></div>
           <div className="container mx-auto px-10 relative z-10">
              <div className="flex flex-col lg:flex-row justify-between items-end gap-10 mb-24 reveal">
                 <div className="max-w-2xl">
                    <h3 className="text-4xl md:text-7xl font-black leading-[0.9] tracking-tighter mb-8">Access the <br className="hidden md:block" /> Island Elite.</h3>
                    <p className="text-slate-400 text-lg md:text-xl font-medium leading-relaxed">From Malé developers to Addu designers. The most sophisticated talent network in the archipelago is live.</p>
                 </div>
                 <button onClick={onExplore} className="px-10 py-5 border-2 border-white/10 hover:border-brand rounded-[24px] font-black text-[13px] uppercase tracking-widest transition-all">
                    View Network Grid
                 </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                 {[
                   { name: 'Senior React Arch', rate: 'MVR 850/hr', status: 'Available' },
                   { name: 'UI/UX Lead', rate: 'MVR 12k/proj', status: 'Booked' },
                   { name: 'Dhivehi Copy Pro', rate: 'MVR 450/hr', status: 'Available' }
                 ].map((card, i) => (
                   <div key={i} className="p-8 bg-white/5 border border-white/10 rounded-[40px] hover:bg-white/10 transition-all reveal stagger-child">
                      <div className="flex justify-between items-start mb-10">
                         <div className="w-14 h-14 bg-brand rounded-2xl flex items-center justify-center font-black text-xl">
                            {card.name.charAt(0)}
                         </div>
                         <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${card.status === 'Available' ? 'bg-emerald-500/20 text-emerald-500' : 'bg-white/10 text-white/50'}`}>
                            {card.status}
                         </span>
                      </div>
                      <h4 className="text-2xl font-bold mb-2 tracking-tight">{card.name}</h4>
                      <p className="text-brand font-black text-lg">{card.rate}</p>
                   </div>
                 ))}
              </div>
           </div>
        </section>

        {/* Pricing Tiers Refined */}
        <section id="pricing" className="py-40">
          <div className="container mx-auto px-6">
            <div className="text-center mb-24 reveal">
               <h2 className="text-[12px] font-black text-brand uppercase tracking-[0.6em] mb-6">Capital Allocation</h2>
               <h3 className="text-5xl md:text-8xl font-black tracking-tighter mb-12">Universal Professional Access.</h3>
               
               <div className="inline-flex items-center gap-2 p-1.5 glass-card rounded-[24px]">
                  <button onClick={() => setPricingType('freelancer')} className={`px-10 py-3.5 rounded-[20px] font-black text-[12px] uppercase tracking-widest transition-all ${pricingType === 'freelancer' ? 'bg-brand text-white shadow-xl' : 'text-slate-400'}`}>Freelancer</button>
                  <button onClick={() => setPricingType('business')} className={`px-10 py-3.5 rounded-[20px] font-black text-[12px] uppercase tracking-widest transition-all ${pricingType === 'business' ? 'bg-brand text-white shadow-xl' : 'text-slate-400'}`}>Business</button>
               </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
               {currentPlans.map((plan: any) => (
                  <div key={plan.id} className={`group relative p-12 bg-white rounded-[56px] border-2 transition-all hover:translate-y-[-12px] flex flex-col reveal stagger-child ${plan.featured ? 'border-brand shadow-2xl ring-[12px] ring-brand/5' : 'border-slate-100 hover:border-brand/30 shadow-sm'}`}>
                     <div className="mb-12">
                        <div className={`w-20 h-20 rounded-[28px] bg-slate-50 flex items-center justify-center mb-8 border border-slate-100 group-hover:rotate-6 transition-transform ${plan.color}`}>
                           <plan.icon className="w-10 h-10" />
                        </div>
                        <h4 className="text-4xl font-black tracking-tighter mb-2">{plan.name}</h4>
                        <p className="text-brand font-black text-[10px] uppercase tracking-[0.3em] mb-8 opacity-60">{plan.tagline}</p>
                        <div className="flex items-baseline gap-2">
                           <span className="text-6xl font-black text-slate-900">{plan.price}</span>
                           <span className="text-slate-400 text-sm font-bold uppercase tracking-widest">/mo</span>
                        </div>
                     </div>

                     <div className="space-y-6 mb-12 flex-1">
                        <div className="flex items-center gap-4 text-[15px] font-bold text-slate-600">
                           <CheckCircle2 className="w-6 h-6 text-brand" /> <span>{plan.perk}</span>
                        </div>
                        <div className="flex items-center gap-4 text-[15px] font-bold text-slate-600">
                           <CheckCircle2 className="w-6 h-6 text-brand" /> <span>e-Faas Core Identity</span>
                        </div>
                        <div className="flex items-center gap-4 text-[15px] font-bold text-slate-600">
                           <CheckCircle2 className="w-6 h-6 text-brand" /> <span>MVR Direct Clearing</span>
                        </div>
                     </div>

                     <button onClick={onJoin} className={`w-full py-6 rounded-[28px] font-black text-[13px] uppercase tracking-widest transition-all ${plan.featured ? 'bg-brand text-white shadow-2xl shadow-brand/20 hover:scale-[1.02]' : 'bg-slate-50 text-slate-900 border border-slate-200 hover:border-brand hover:bg-white'}`}>
                       Join Workspace
                     </button>
                  </div>
               ))}
            </div>
          </div>
        </section>

        {/* Detailed FAQ Section */}
        <section className="py-40 bg-slate-50">
           <div className="container mx-auto px-6 max-w-4xl">
              <div className="text-center mb-24 reveal">
                 <h3 className="text-4xl md:text-6xl font-black tracking-tighter mb-4">Common Protocols.</h3>
                 <p className="text-slate-500 font-medium text-lg">System-level insights for professionals.</p>
              </div>
              <div className="space-y-4">
                 {FAQ_ITEMS.map((item, i) => (
                    <div key={i} className={`border border-slate-200 rounded-[32px] overflow-hidden transition-all ${openFaq === i ? 'bg-white shadow-2xl ring-8 ring-brand/5' : 'bg-white shadow-sm'}`}>
                       <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between p-10 text-left">
                          <span className="font-black text-[18px] pr-8 tracking-tight">{item.q}</span>
                          <ChevronDown className={`w-6 h-6 text-slate-300 transition-transform duration-500 ${openFaq === i ? 'rotate-180 text-brand' : ''}`} />
                       </button>
                       {openFaq === i && (
                         <div className="px-10 pb-10 animate-in slide-in-from-top-4">
                            <p className="text-slate-500 text-[16px] leading-relaxed font-medium">{item.a}</p>
                         </div>
                       )}
                    </div>
                 ))}
              </div>
           </div>
        </section>

        {/* Modern Footer */}
        <footer className="pt-40 pb-20 bg-white">
           <div className="container mx-auto px-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-20 mb-32">
                 <div className="col-span-1 lg:col-span-2">
                    <span className="brand-text text-4xl text-brand block mb-10">meritt.</span>
                    <p className="text-slate-500 font-medium text-lg leading-relaxed max-w-md">Building the architectural foundation for the island economy. Secure, vetted, and sovereign.</p>
                    <div className="flex gap-4 mt-12">
                       <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center hover:bg-brand hover:text-white transition-all cursor-pointer"><Globe className="w-6 h-6" /></div>
                       <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center hover:bg-brand hover:text-white transition-all cursor-pointer"><Users className="w-6 h-6" /></div>
                    </div>
                 </div>
                 <div>
                    <h5 className="font-black text-[12px] uppercase tracking-[0.4em] text-slate-400 mb-8">Ecosystem</h5>
                    <ul className="space-y-4 text-[14px] font-bold text-slate-600">
                       <li><a href="#" className="hover:text-brand transition-colors">Talent Network</a></li>
                       <li><a href="#" className="hover:text-brand transition-colors">Project Hub</a></li>
                       <li><a href="#" className="hover:text-brand transition-colors">Identity Core</a></li>
                    </ul>
                 </div>
                 <div>
                    <h5 className="font-black text-[12px] uppercase tracking-[0.4em] text-slate-400 mb-8">Resources</h5>
                    <ul className="space-y-4 text-[14px] font-bold text-slate-600">
                       <li><a href="#" className="hover:text-brand transition-colors">Help Terminal</a></li>
                       <li><a href="#" className="hover:text-brand transition-colors">Security Board</a></li>
                       <li><a href="#" className="hover:text-brand transition-colors">Tax Guide</a></li>
                    </ul>
                 </div>
                 <div>
                    <h5 className="font-black text-[12px] uppercase tracking-[0.4em] text-slate-400 mb-8">Entity</h5>
                    <ul className="space-y-4 text-[14px] font-bold text-slate-600">
                       <li><a href="#" className="hover:text-brand transition-colors">Legal Board</a></li>
                       <li><a href="#" className="hover:text-brand transition-colors">Privacy Node</a></li>
                       <li><a href="#" className="hover:text-brand transition-colors">Terms of Ops</a></li>
                    </ul>
                 </div>
              </div>
              <div className="flex flex-col md:flex-row justify-between items-center gap-10 pt-16 border-t border-slate-100">
                 <p className="text-[12px] font-black text-slate-400 uppercase tracking-widest">© 2024 Meritt Maldives Pvt Ltd. Distributed Professional Engine.</p>
                 <div className="flex items-center gap-10 text-[11px] font-black uppercase tracking-widest text-emerald-500">
                    <span className="flex items-center gap-2">
                       <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse"></span>
                       Settlement: 100% Up
                    </span>
                    <span className="flex items-center gap-2">
                       <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse"></span>
                       e-Faas: Online
                    </span>
                 </div>
              </div>
           </div>
        </footer>
      </div>
    </div>
  );
};

export default LandingPage;