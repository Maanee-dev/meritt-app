
import React, { useState } from 'react';
import { User, Briefcase, Zap, ArrowLeft, Mail, Lock, UserCircle, Globe, Star, CheckCircle2, ChevronRight } from 'lucide-react';
import { UserRole } from '../types';

interface AuthProps {
  onLogin: (role: UserRole) => void;
  onBack?: () => void;
}

type AuthMode = 'login' | 'signup';
type AuthStep = 'mode' | 'choice' | 'form';

const MerittMLogo = () => (
  <svg width="48" height="48" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 32V12L20 22L32 12V32" stroke="#0047FF" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M8 12C8 9.79086 9.79086 8 12 8H28C30.2111 8 32 9.79086 32 12" stroke="#0047FF" strokeWidth="5.5" strokeLinecap="round"/>
  </svg>
);

const Auth: React.FC<AuthProps> = ({ onLogin, onBack }) => {
  const [mode, setMode] = useState<AuthMode>('signup');
  const [step, setStep] = useState<AuthStep>('choice');
  const [selectedRole, setSelectedRole] = useState<UserRole>('user');
  const [isLoading, setIsLoading] = useState(false);

  const roles = [
    { 
      id: 'freelancer', 
      title: 'Freelancer', 
      desc: 'Showcase your craft and earn in MVR.', 
      icon: Zap,
      accent: 'text-brand',
      bg: 'bg-brand/5'
    },
    { 
      id: 'business', 
      title: 'Business', 
      desc: 'Hire vetted local talent for your projects.', 
      icon: Briefcase,
      accent: 'text-brand',
      bg: 'bg-brand/5'
    },
    { 
      id: 'user', 
      title: 'Visitor', 
      desc: 'Explore the marketplace as a guest client.', 
      icon: User,
      accent: 'text-slate-500',
      bg: 'bg-slate-50'
    }
  ];

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    setStep('form');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      onLogin(selectedRole);
      setIsLoading(false);
    }, 1500);
  };

  const renderChoice = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Join the living marketplace</h2>
        <p className="text-slate-500 text-sm">Select how you want to use Meritt</p>
      </div>
      <div className="grid gap-3">
        {roles.map((role) => (
          <button
            key={role.id}
            onClick={() => handleRoleSelect(role.id as UserRole)}
            className="w-full group flex items-center justify-between p-4 border border-[#E2E8F0] dark:border-dark-border rounded-2xl hover:border-brand hover:bg-brand/5 transition-all text-left bg-white dark:bg-dark-surface shadow-sm"
          >
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl shrink-0 flex items-center justify-center border border-transparent group-hover:border-brand/20 ${role.bg}`}>
                <role.icon className={`w-6 h-6 ${role.accent}`} />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white group-hover:text-brand transition-colors text-[15px]">{role.title}</h3>
                <p className="text-slate-500 dark:text-gray-400 text-[12px] font-medium leading-tight mt-0.5">{role.desc}</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-brand group-hover:translate-x-1 transition-all" />
          </button>
        ))}
      </div>
      <div className="text-center pt-4">
        <p className="text-slate-500 text-sm font-medium">
          Already have an account? <button onClick={() => setMode('login')} className="text-brand font-bold hover:underline">Log in</button>
        </p>
      </div>
    </div>
  );

  const renderForm = () => (
    <div className="animate-in fade-in slide-in-from-right-4 duration-500">
      <button 
        onClick={() => setStep('choice')}
        className="flex items-center gap-2 text-slate-400 hover:text-brand transition-colors font-bold text-xs uppercase tracking-widest mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        Change Role
      </button>

      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="px-3 py-1 bg-brand/10 text-brand text-[10px] font-extrabold rounded-full uppercase tracking-tighter">
            {selectedRole} Account
          </span>
        </div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Complete your setup</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">
            {selectedRole === 'business' ? 'Company Entity' : 'Full Name'}
          </label>
          <div className="relative group">
            <UserCircle className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-brand transition-colors" />
            <input 
              required
              className="w-full pl-10 pr-4 py-3 border border-[#E2E8F0] dark:border-dark-border rounded-xl text-[14px] bg-[#F9FAFB] dark:bg-dark outline-none focus:bg-white dark:focus:bg-dark/80 focus:border-brand transition-all dark:text-white" 
              placeholder={selectedRole === 'business' ? "e.g. TechWave Maldives" : "Jauzaf Dhonbe"}
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
          <div className="relative group">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-brand transition-colors" />
            <input 
              required
              type="email"
              className="w-full pl-10 pr-4 py-3 border border-[#E2E8F0] dark:border-dark-border rounded-xl text-[14px] bg-[#F9FAFB] dark:bg-dark outline-none focus:bg-white dark:focus:bg-dark/80 focus:border-brand transition-all dark:text-white" 
              placeholder="name@example.com"
            />
          </div>
        </div>

        {selectedRole === 'freelancer' && (
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">Primary Craft</label>
            <div className="relative group">
              <Star className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-brand transition-colors" />
              <select className="w-full pl-10 pr-4 py-3 border border-[#E2E8F0] dark:border-dark-border rounded-xl text-[14px] bg-[#F9FAFB] dark:bg-dark outline-none focus:bg-white dark:focus:bg-dark/80 focus:border-brand appearance-none transition-all dark:text-white">
                <option>Logo & Brand Identity</option>
                <option>Full-stack Web Dev</option>
                <option>Mobile App UI/UX</option>
                <option>Social Media Content</option>
              </select>
            </div>
          </div>
        )}

        {selectedRole === 'business' && (
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">Industry</label>
            <div className="relative group">
              <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-brand transition-colors" />
              <input 
                className="w-full pl-10 pr-4 py-3 border border-[#E2E8F0] dark:border-dark-border rounded-xl text-[14px] bg-[#F9FAFB] dark:bg-dark outline-none focus:bg-white dark:focus:bg-dark/80 focus:border-brand transition-all dark:text-white" 
                placeholder="e.g. Hospitality / Tourism"
              />
            </div>
          </div>
        )}

        <div className="space-y-1.5">
          <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">Password</label>
          <div className="relative group">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-brand transition-colors" />
            <input 
              required
              type="password"
              className="w-full pl-10 pr-4 py-3 border border-[#E2E8F0] dark:border-dark-border rounded-xl text-[14px] bg-[#F9FAFB] dark:bg-dark outline-none focus:bg-white dark:focus:bg-dark/80 focus:border-brand transition-all dark:text-white" 
              placeholder="••••••••"
            />
          </div>
        </div>

        <div className="pt-4">
          <button 
            type="submit"
            disabled={isLoading}
            className="w-full py-4 bg-brand text-white rounded-2xl font-bold text-[15px] hover:brightness-110 transition-all shadow-xl shadow-brand/20 flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <>
                <CheckCircle2 className="w-5 h-5" />
                <span>Initialize Workspace</span>
              </>
            )}
          </button>
        </div>
      </form>
      
      <p className="mt-8 text-center text-slate-400 text-[11px] font-medium leading-relaxed">
        By continuing, you agree to Meritt's <span className="underline cursor-pointer">Terms of Service</span> and <span className="underline cursor-pointer">Privacy Policy</span>.
      </p>
    </div>
  );

  const renderLogin = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Welcome back</h2>
        <p className="text-slate-500 text-sm">Log in to manage your professional workspace</p>
      </div>
      
      <form onSubmit={(e) => { e.preventDefault(); onLogin('freelancer'); }} className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">Email</label>
          <input className="w-full px-4 py-3 border border-[#E2E8F0] dark:border-dark-border rounded-xl text-[14px] bg-[#F9FAFB] dark:bg-dark outline-none focus:border-brand dark:text-white" placeholder="name@example.com" />
        </div>
        <div className="space-y-1.5">
          <div className="flex items-center justify-between ml-1">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Password</label>
            <button type="button" className="text-brand text-[10px] font-bold uppercase tracking-widest hover:underline">Forgot?</button>
          </div>
          <input type="password" className="w-full px-4 py-3 border border-[#E2E8F0] dark:border-dark-border rounded-xl text-[14px] bg-[#F9FAFB] dark:bg-dark outline-none focus:border-brand dark:text-white" placeholder="••••••••" />
        </div>
        <button className="w-full py-4 bg-brand text-white rounded-2xl font-bold text-[15px] hover:brightness-110 transition-all shadow-xl shadow-brand/20">
          Enter Workspace
        </button>
      </form>

      <div className="text-center pt-4">
        <p className="text-slate-500 text-sm font-medium">
          New to Meritt? <button onClick={() => { setMode('signup'); setStep('choice'); }} className="text-brand font-bold hover:underline">Join Now</button>
        </p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white dark:bg-dark flex flex-col md:flex-row transition-colors">
      {/* Visual Side Pane (Desktop) */}
      <div className="hidden md:flex md:w-[45%] bg-brand items-center justify-center relative overflow-hidden p-12">
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        
        <div className="relative z-10 text-white max-w-sm">
          <div className="w-20 h-20 bg-white/10 backdrop-blur-xl rounded-3xl flex items-center justify-center mb-8 border border-white/20">
            <MerittMLogo />
          </div>
          <h2 className="text-4xl font-extrabold mb-4 leading-tight">The Professional Standard of the Maldives.</h2>
          <p className="text-white/70 text-lg leading-relaxed mb-10">Connect, collaborate, and grow with the archipelago's finest vetted talent.</p>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                <CheckCircle2 className="w-3 h-3 text-white" />
              </div>
              <span className="text-sm font-bold opacity-80">Manual Escrow Verification</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                <CheckCircle2 className="w-3 h-3 text-white" />
              </div>
              <span className="text-sm font-bold opacity-80">e-Faas Verified Profiles</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                <CheckCircle2 className="w-3 h-3 text-white" />
              </div>
              <span className="text-sm font-bold opacity-80">Direct BML/MIB Payouts</span>
            </div>
          </div>
        </div>
      </div>

      {/* Auth Content Pane */}
      <div className="flex-1 flex flex-col relative px-6 py-12 md:px-16 lg:px-24 xl:px-32 justify-center max-w-4xl mx-auto md:mx-0 overflow-y-auto no-scrollbar">
        {onBack && (
          <button onClick={onBack} className="absolute top-8 left-8 md:left-16 flex items-center gap-2 text-slate-400 hover:text-brand transition-colors font-bold text-xs uppercase tracking-widest">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </button>
        )}

        <div className="w-full max-w-md mx-auto">
          {/* Logo (Mobile Only) */}
          <div className="md:hidden flex flex-col items-center mb-12">
            <div className="w-16 h-16 bg-brand rounded-2xl flex items-center justify-center mb-4 shadow-xl shadow-brand/20">
              <MerittMLogo />
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Meritt.</h1>
          </div>

          {mode === 'signup' ? (
            step === 'choice' ? renderChoice() : renderForm()
          ) : (
            renderLogin()
          )}

          <div className="mt-16 text-center">
            <p className="text-slate-300 text-[10px] font-bold uppercase tracking-[0.2em]">Maldives Professional Engine v1.0.5</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
