import React, { useState } from 'react';
import { User, Briefcase, Zap, ArrowLeft, Mail, Lock, UserCircle, Globe, Star, CheckCircle2, ChevronRight, Fingerprint } from 'lucide-react';
import { UserRole } from '../types';

interface AuthProps {
  onLogin: (role: UserRole) => void;
  onBack?: () => void;
}

type AuthMode = 'login' | 'signup';
type AuthStep = 'mode' | 'choice' | 'form';

const Auth: React.FC<AuthProps> = ({ onLogin, onBack }) => {
  const [mode, setMode] = useState<AuthMode>('signup');
  const [step, setStep] = useState<AuthStep>('choice');
  const [selectedRole, setSelectedRole] = useState<UserRole>('user');
  const [isLoading, setIsLoading] = useState(false);

  const roles = [
    { id: 'freelancer', title: 'Freelancer', desc: 'Showcase craft & earn in MVR.', icon: Zap, accent: 'text-brand', bg: 'bg-brand/5' },
    { id: 'business', title: 'Business', desc: 'Hire vetted talent for projects.', icon: Briefcase, accent: 'text-brand', bg: 'bg-brand/5' },
    { id: 'user', title: 'Visitor', desc: 'Explore the marketplace as a guest.', icon: User, accent: 'text-slate-500', bg: 'bg-slate-50' }
  ];

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    setStep('form');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => { onLogin(selectedRole); setIsLoading(false); }, 1500);
  };

  const renderChoice = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight mb-2">Join the marketplace</h2>
        <p className="text-slate-500 text-sm font-medium">Select your entry point</p>
      </div>
      <div className="grid gap-3">
        {roles.map((role) => (
          <button
            key={role.id}
            onClick={() => handleRoleSelect(role.id as UserRole)}
            className="w-full group flex items-center justify-between p-4 border border-[#E2E8F0] dark:border-dark-border rounded-2xl hover:border-brand hover:bg-brand/5 transition-all text-left bg-white dark:bg-dark-surface shadow-sm"
          >
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl shrink-0 flex items-center justify-center ${role.bg}`}>
                <role.icon className={`w-6 h-6 ${role.accent}`} />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-[15px]">{role.title}</h3>
                <p className="text-slate-500 text-[12px] font-medium leading-tight">{role.desc}</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-brand transition-all" />
          </button>
        ))}
      </div>
      <div className="p-5 mt-6 bg-brand/[0.03] border border-brand/10 rounded-2xl flex items-center gap-4">
         <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-brand shadow-sm">
            <Fingerprint className="w-6 h-6" />
         </div>
         <p className="text-[11px] text-slate-500 font-medium leading-tight">
            Onboarding includes a <span className="text-brand font-bold">Meritt ID</span> check to ensure local professional integrity.
         </p>
      </div>
      <div className="text-center pt-4">
        <p className="text-slate-500 text-sm font-medium">
          Already have an account? <button onClick={() => setMode('login')} className="text-brand font-black hover:underline">Log in</button>
        </p>
      </div>
    </div>
  );

  const renderForm = () => (
    <div className="animate-in fade-in slide-in-from-right-4">
      <button onClick={() => setStep('choice')} className="flex items-center gap-2 text-slate-400 hover:text-brand transition-colors font-black text-[10px] uppercase tracking-widest mb-8">
        <ArrowLeft className="w-4 h-4" /> Go Back
      </button>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Identity Name</label>
          <input required className="w-full px-4 py-3 border border-[#E2E8F0] dark:border-dark-border rounded-xl text-[14px] bg-[#F9FAFB] outline-none focus:border-brand" placeholder="e.g. Jauzaf Dhonbe" />
        </div>
        <div className="space-y-1.5">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email</label>
          <input required type="email" className="w-full px-4 py-3 border border-[#E2E8F0] dark:border-dark-border rounded-xl text-[14px] bg-[#F9FAFB] outline-none focus:border-brand" placeholder="name@example.com" />
        </div>
        <div className="space-y-1.5">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Secure Password</label>
          <input required type="password" className="w-full px-4 py-3 border border-[#E2E8F0] dark:border-dark-border rounded-xl text-[14px] bg-[#F9FAFB] outline-none focus:border-brand" placeholder="••••••••" />
        </div>
        <div className="pt-4">
          <button type="submit" disabled={isLoading} className="w-full py-4 bg-brand text-white rounded-2xl font-black text-[15px] shadow-xl shadow-brand/20 flex items-center justify-center gap-3">
            {isLoading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : <span>Initialize Meritt ID</span>}
          </button>
        </div>
      </form>
    </div>
  );

  const renderLogin = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-2">Welcome back</h2>
        <p className="text-slate-500 text-sm font-medium">Log in to your professional hub</p>
      </div>
      <form onSubmit={(e) => { e.preventDefault(); onLogin('freelancer'); }} className="space-y-4">
        <input className="w-full px-4 py-3 border border-[#E2E8F0] rounded-xl text-[14px] bg-[#F9FAFB] outline-none focus:border-brand" placeholder="Email" />
        <input type="password" className="w-full px-4 py-3 border border-[#E2E8F0] rounded-xl text-[14px] bg-[#F9FAFB] outline-none focus:border-brand" placeholder="Password" />
        <button className="w-full py-4 bg-brand text-white rounded-2xl font-black text-[15px] shadow-xl shadow-brand/20">Sync Meritt ID</button>
      </form>
      <div className="text-center pt-4">
        <p className="text-slate-500 text-sm font-medium">New? <button onClick={() => { setMode('signup'); setStep('choice'); }} className="text-brand font-black hover:underline">Join Now</button></p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white flex flex-col md:flex-row transition-colors">
      <div className="hidden md:flex md:w-[45%] bg-brand items-center justify-center relative p-12 overflow-hidden">
        <div className="relative z-10 text-white max-w-sm">
          <span className="brand-text text-5xl text-white mb-8 block">meritt.</span>
          <h2 className="text-4xl font-extrabold mb-4 leading-tight">The Professional Hub of the Maldives.</h2>
          <p className="text-white/70 text-lg leading-relaxed mb-10">Direct MVR Clearing & Sovereign Meritt ID Security.</p>
        </div>
        <div className="absolute top-[-100px] left-[-100px] w-96 h-96 bg-white/10 rounded-full blur-[100px]"></div>
      </div>
      <div className="flex-1 flex flex-col relative px-6 py-12 md:px-16 lg:px-24 justify-center max-w-4xl mx-auto md:mx-0">
        <div className="w-full max-w-md mx-auto">
          <div className="md:hidden flex flex-col items-center mb-12">
            <span className="brand-text text-4xl text-brand">meritt.</span>
          </div>
          {mode === 'signup' ? (step === 'choice' ? renderChoice() : renderForm()) : renderLogin()}
        </div>
      </div>
    </div>
  );
};

export default Auth;