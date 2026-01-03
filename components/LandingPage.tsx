
import React, { useEffect, useState } from 'react';

interface LandingPageProps {
  onExplore: () => void;
  onLogin: () => void;
  onJoin: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onExplore, onLogin, onJoin }) => {
  const [pricingType, setPricingType] = useState<'freelancer' | 'business'>('freelancer');

  useEffect(() => {
    // Reveal Animations observer
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .fade-in, .stagger-parent').forEach(el => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="landing-root bg-[#F8FAFF] overflow-x-hidden min-h-screen">
      <style>{`
        .landing-root {
          --primary: #0047FF;
          --primary-dark: #0037C4;
          --accent: #60A5FA;
          --bg-light: #F8FAFC;
          --glass: rgba(255, 255, 255, 0.65);
          --glass-border: rgba(255, 255, 255, 0.8);
          --text-main: #0F172A;
          --text-muted: #64748B;
          --shadow-soft: 0 20px 40px -10px rgba(0, 71, 255, 0.08);
          --shadow-hover: 0 30px 60px -12px rgba(0, 71, 255, 0.15);
          --success: #10B981;
          font-family: 'Plus Jakarta Sans', 'Inter', sans-serif;
        }

        .ambient-mesh {
          position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; z-index: -1;
          background: radial-gradient(circle at 15% 50%, rgba(0, 71, 255, 0.08), transparent 25%),
                      radial-gradient(circle at 85% 30%, rgba(96, 165, 250, 0.1), transparent 25%),
                      radial-gradient(circle at 50% 80%, rgba(167, 139, 250, 0.06), transparent 25%);
          filter: blur(60px);
          animation: breathe 10s ease-in-out infinite alternate;
        }

        @keyframes breathe { 0% { opacity: 0.5; transform: scale(1); } 100% { opacity: 1; transform: scale(1.1); } }

        .reveal { opacity: 0; transform: translateY(30px); transition: all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1); }
        .reveal.active { opacity: 1; transform: translateY(0); }
        .reveal-left { opacity: 0; transform: translateX(-30px); transition: all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1); }
        .reveal-left.active { opacity: 1; transform: translateX(0); }
        .reveal-right { opacity: 0; transform: translateX(30px); transition: all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1); }
        .reveal-right.active { opacity: 1; transform: translateX(0); }
        
        .orbit-wrapper { position: relative; height: 500px; display: flex; align-items: center; justify-content: center; }
        .orbit-ring { position: absolute; border-radius: 50%; border: 1px solid rgba(0, 71, 255, 0.1); }
        .ring-large { width: 450px; height: 450px; animation: rotate 60s linear infinite; }
        .ring-small { width: 300px; height: 300px; border-style: dashed; animation: rotate 40s linear reverse infinite; }
        
        @keyframes rotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

        .center-hub {
          width: 140px; height: 140px; background: white; border-radius: 50%;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          box-shadow: 0 20px 60px rgba(0, 71, 255, 0.15); border: 1px solid white; z-index: 5;
          animation: pulse 2s ease-in-out infinite;
        }
        @keyframes pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); } }

        .floating-avatar {
          position: absolute; width: 56px; height: 56px; border-radius: 50%;
          background-size: cover; border: 3px solid white; 
          box-shadow: 0 10px 20px rgba(0,0,0,0.1);
        }

        .btn-landing { padding: 12px 28px; border-radius: 50px; font-weight: 700; display: inline-block; cursor: pointer; transition: all 0.3s ease; }
        .btn-p { background: var(--primary); color: white; box-shadow: 0 8px 20px rgba(0, 71, 255, 0.25); }
        .btn-p:hover { transform: translateY(-2px); box-shadow: 0 15px 30px rgba(0, 71, 255, 0.35); background: var(--primary-dark); }
        .btn-o { background: white; border: 1px solid #E2E8F0; color: var(--text-main); }
        .btn-o:hover { border-color: var(--primary); color: var(--primary); transform: translateY(-1px); }

        .feature-card {
            background: rgba(255,255,255,0.7); border: 1px solid white; 
            padding: 40px; border-radius: 32px; backdrop-filter: blur(10px);
            transition: all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
        }
        .feature-card:hover { transform: translateY(-10px); background: white; box-shadow: var(--shadow-hover); }

        .logo-track { display: inline-flex; gap: 60px; animation: scroll 30s linear infinite; }
        @keyframes scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
      `}</style>

      <div className="ambient-mesh"></div>

      <div className="container mx-auto px-6">
        <header className="flex justify-between items-center py-4 mt-5 bg-white/65 backdrop-blur-xl border border-white/80 rounded-full sticky top-5 z-[100] shadow-sm px-8">
            <div className="font-extrabold text-2xl text-brand">meritt.</div>
            <nav className="hidden md:flex gap-8">
                <a href="#features" className="text-sm font-semibold hover:text-brand transition-colors">Features</a>
                <a href="#marketplace" className="text-sm font-semibold hover:text-brand transition-colors" onClick={(e) => {e.preventDefault(); onExplore();}}>Marketplace</a>
                <a href="#pricing" className="text-sm font-semibold hover:text-brand transition-colors">Pricing</a>
            </nav>
            <div className="flex gap-3">
                <button onClick={onLogin} className="btn-landing btn-o text-sm px-6 py-2">Log In</button>
                <button onClick={onJoin} className="btn-landing btn-p text-sm px-6 py-2">Join</button>
            </div>
        </header>

        <section className="hero grid grid-cols-1 lg:grid-cols-2 items-center gap-10 py-16 lg:py-24 overflow-hidden reveal">
            <div className="hero-content">
                <span className="text-brand font-bold text-xs tracking-widest uppercase mb-4 block">Curated for the Archipelago</span>
                <h1 className="text-5xl lg:text-7xl font-extrabold leading-tight mb-6 bg-gradient-to-br from-slate-900 to-slate-600 bg-clip-text text-transparent">Hire the Maldives' <br/>Finest Talent.</h1>
                <p className="text-lg text-slate-500 mb-8 leading-relaxed">Meritt connects visionary businesses with vetted local specialists. Secure escrow, human support, and world-class results.</p>
                <div className="flex flex-wrap gap-4">
                    <button onClick={onJoin} className="btn-landing btn-p">Start a Project</button>
                    <button onClick={onExplore} className="btn-landing btn-o">Explore Marketplace</button>
                </div>
            </div>
            
            <div className="orbit-wrapper hidden lg:flex">
                <div className="orbit-ring ring-large">
                    <div className="floating-avatar top-0 left-1/2 -translate-x-1/2 -translate-y-1/2" style={{backgroundImage: "url('https://i.pravatar.cc/100?img=12')"}}></div>
                    <div className="floating-avatar bottom-[20%] left-[10%]" style={{backgroundImage: "url('https://i.pravatar.cc/100?img=32')"}}></div>
                    <div className="floating-avatar bottom-[20%] right-[10%]" style={{backgroundImage: "url('https://i.pravatar.cc/100?img=44')"}}></div>
                </div>
                <div className="orbit-ring ring-small"></div>
                <div className="center-hub">
                    <h2 className="text-4xl font-extrabold text-brand">20k</h2>
                    <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">MEMBERS</span>
                </div>
            </div>
        </section>

        <section className="stats-section bg-brand/5 py-16 px-8 rounded-[40px] my-12 reveal">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
                <div>
                    <span className="text-4xl font-extrabold text-brand block mb-2">500+</span>
                    <span className="text-xs font-bold text-slate-400 uppercase">Active Projects</span>
                </div>
                <div>
                    <span className="text-4xl font-extrabold text-brand block mb-2">2.5M</span>
                    <span className="text-xs font-bold text-slate-400 uppercase">MVR Processed</span>
                </div>
                <div>
                    <span className="text-4xl font-extrabold text-brand block mb-2">98%</span>
                    <span className="text-xs font-bold text-slate-400 uppercase">Success Rate</span>
                </div>
                <div>
                    <span className="text-4xl font-extrabold text-brand block mb-2">24h</span>
                    <span className="text-xs font-bold text-slate-400 uppercase">Avg Response</span>
                </div>
            </div>
        </section>

        <section id="features" className="py-20 reveal">
            <div className="text-center mb-16">
                <h2 className="text-4xl font-extrabold mb-4">Built for Excellence</h2>
                <p className="text-slate-500 max-w-xl mx-auto">Every feature designed to make freelance collaboration seamless and secure.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="feature-card reveal-left">
                    <div className="w-12 h-12 bg-brand rounded-2xl flex items-center justify-center text-white mb-6">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
                    </div>
                    <h3 className="text-xl font-bold mb-4">Secure Escrow</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">Your funds are protected until you approve the work. Built-in dispute resolution ensures fair outcomes for everyone.</p>
                </div>
                <div className="feature-card reveal-right">
                    <div className="w-12 h-12 bg-brand rounded-2xl flex items-center justify-center text-white mb-6">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                    </div>
                    <h3 className="text-xl font-bold mb-4">Human Matching</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">No algorithms. Real people review your project and hand-pick the perfect specialists for your needs.</p>
                </div>
            </div>
        </section>

        <section id="pricing" className="py-20 reveal text-center">
            <h2 className="text-4xl font-extrabold mb-4">Simple Pricing</h2>
            <p className="text-slate-500 mb-12">Choose the plan that fits your needs.</p>
            
            <div className="flex justify-center gap-4 mb-10">
                <button onClick={() => setPricingType('freelancer')} className={`px-6 py-2 rounded-full font-bold text-sm ${pricingType === 'freelancer' ? 'bg-brand text-white' : 'bg-slate-100 text-slate-500'}`}>Freelancers</button>
                <button onClick={() => setPricingType('business')} className={`px-6 py-2 rounded-full font-bold text-sm ${pricingType === 'business' ? 'bg-brand text-white' : 'bg-slate-100 text-slate-500'}`}>Businesses</button>
            </div>

            <div className="max-w-md mx-auto">
                {pricingType === 'freelancer' ? (
                    <div className="bg-white p-10 rounded-[32px] border-2 border-brand shadow-xl relative animate-in fade-in slide-in-from-bottom-4">
                        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand text-white text-[10px] font-bold px-3 py-1 rounded-full">FREE FOREVER</span>
                        <h3 className="text-2xl font-bold mb-2">Freelancer</h3>
                        <div className="text-5xl font-extrabold my-6 text-brand">Free</div>
                        <ul className="text-left space-y-4 text-slate-500 text-sm mb-8">
                            <li>• Unlimited job applications</li>
                            <li>• Portfolio showcase</li>
                            <li>• Secure escrow payments</li>
                            <li>• 10% platform fee</li>
                        </ul>
                        <button onClick={onJoin} className="btn-landing btn-p w-full">Join as Freelancer</button>
                    </div>
                ) : (
                    <div className="bg-white p-10 rounded-[32px] border-2 border-brand shadow-xl relative animate-in fade-in slide-in-from-bottom-4">
                         <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand text-white text-[10px] font-bold px-3 py-1 rounded-full">BUSINESS ACCESS</span>
                        <h3 className="text-2xl font-bold mb-2">Business Starter</h3>
                        <div className="text-5xl font-extrabold my-6 text-brand">MVR49</div>
                        <ul className="text-left space-y-4 text-slate-500 text-sm mb-8">
                            <li>• Unlimited talent discovery</li>
                            <li>• Direct messaging</li>
                            <li>• Project pipeline tools</li>
                            <li>• 5% platform fee</li>
                        </ul>
                        <button onClick={onJoin} className="btn-landing btn-p w-full">Join as Business</button>
                    </div>
                )}
            </div>
        </section>

        <footer className="bg-slate-900 text-white p-12 lg:p-20 rounded-[40px] mb-10 text-center lg:text-left relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 relative z-10">
                <div className="lg:col-span-2">
                    <h2 className="text-3xl font-extrabold mb-6">meritt.</h2>
                    <p className="text-slate-400 max-w-sm leading-relaxed">The curated marketplace connecting Maldivian talent with global opportunities. Made for the islands, open to the world.</p>
                </div>
                <div>
                    <h4 className="font-bold mb-6">Platform</h4>
                    <ul className="text-slate-400 space-y-3 text-sm">
                        <li><a href="#" className="hover:text-white transition-colors">How it Works</a></li>
                        <li><a href="#" onClick={(e) => {e.preventDefault(); onExplore();}} className="hover:text-white transition-colors">Explore Marketplace</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold mb-6">Support</h4>
                    <ul className="text-slate-400 space-y-3 text-sm">
                        <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                    </ul>
                </div>
            </div>
            <div className="mt-20 pt-8 border-t border-white/10 flex flex-col lg:flex-row justify-between items-center gap-6">
                <p className="text-slate-500 text-xs">© 2024 Meritt. All rights reserved. Made with ❤️ in the Maldives.</p>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                    <span className="text-emerald-500 text-[10px] font-bold uppercase tracking-widest">All systems operational</span>
                </div>
            </div>
        </footer>
      </div>
    </div>
  );
};

export default LandingPage;
