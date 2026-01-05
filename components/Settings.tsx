import React, { useState } from 'react';
import { Shield, CreditCard, Briefcase, Settings2, Sparkles, FileText, GripVertical, Star, CheckCircle2, Fingerprint, Lock, ShieldCheck } from 'lucide-react';
import { User } from '../types';

interface SettingsProps {
  user: User;
}

const Settings: React.FC<SettingsProps> = ({ user }) => {
  const [activeSection, setActiveSection] = useState(user.role === 'freelancer' ? 'freelancer' : 'org');

  const SECTIONS = [
    ...(user.role === 'freelancer' ? [{ id: 'freelancer', label: 'Freelancer Workspace', icon: Star }] : []),
    { id: 'identity', label: 'Meritt ID Vault', icon: Fingerprint },
    { id: 'org', label: user.role === 'freelancer' ? 'Identity & Profile' : 'Organization Profile', icon: Briefcase },
    { id: 'billing', label: 'Billing & Payouts', icon: CreditCard },
    { id: 'workflow', label: 'Workflow (Pro)', icon: Settings2 },
    { id: 'security', label: 'Security & Privacy', icon: Shield },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500 pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl md:text-2xl font-bold tracking-tight dark:text-white uppercase">Workspace Configuration</h1>
          <p className="text-gray-500 text-xs md:text-[13px] dark:text-gray-400">Manage your sovereign identity and workspace preferences.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <nav className="col-span-1 flex flex-col gap-1.5 h-fit">
          {SECTIONS.map(item => (
            <button 
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`flex items-center justify-between px-4 py-2.5 rounded-lg text-[12px] font-bold transition-all border ${
                activeSection === item.id 
                ? 'bg-brand border-brand text-white shadow-lg shadow-brand/20' 
                : 'bg-[#F9FAFB] dark:bg-dark-surface border-[#E2E8F0] dark:border-dark-border text-gray-500 hover:text-brand hover:border-brand'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <item.icon className="w-4 h-4" />
                {item.label}
              </div>
              {item.id === 'workflow' && <Sparkles className="w-3 h-3 text-yellow-400" />}
            </button>
          ))}
        </nav>

        <div className="col-span-3 bg-white dark:bg-dark-surface border border-[#E2E8F0] dark:border-dark-border rounded-2xl overflow-hidden shadow-sm transition-colors">
          
          {/* Meritt ID Identity Vault */}
          {activeSection === 'identity' && (
            <div className="p-8 space-y-10 animate-in slide-in-from-right-4">
              <div className="flex items-center justify-between border-b border-gray-100 dark:border-dark-border pb-4">
                <h3 className="text-sm font-bold uppercase tracking-widest text-brand flex items-center gap-2">
                   <Fingerprint className="w-5 h-5" /> Meritt ID Protocol
                </h3>
                <div className="flex items-center gap-2">
                   <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Sovereign Node Active</span>
                   <ShieldCheck className="w-5 h-5 text-emerald-500" />
                </div>
              </div>

              <div className="p-8 bg-brand/[0.03] dark:bg-brand/5 border border-brand/10 rounded-3xl">
                 <div className="flex flex-col md:flex-row gap-8 items-start">
                    <div className="w-24 h-24 bg-white dark:bg-dark border border-brand/20 rounded-2xl flex items-center justify-center shadow-xl">
                       <Fingerprint className="w-12 h-12 text-brand" />
                    </div>
                    <div className="flex-1">
                       <h4 className="text-lg font-black dark:text-white mb-2">Your Sovereign Identity</h4>
                       <p className="text-[13px] text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
                          Meritt ID is your cryptographically secured digital passport on the workspace. 
                          It ensures that your professional history, ratings, and wallet are tied to your person, not just an account.
                       </p>
                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="flex items-center gap-3 p-3 bg-white dark:bg-dark border border-slate-100 dark:border-dark-border rounded-xl">
                             <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                                <Shield className="w-4 h-4" />
                             </div>
                             <div>
                                <p className="text-[10px] font-black uppercase text-slate-400">KYC Status</p>
                                <p className="text-[12px] font-bold dark:text-white">Fully Verified</p>
                             </div>
                          </div>
                          <div className="flex items-center gap-3 p-3 bg-white dark:bg-dark border border-slate-100 dark:border-dark-border rounded-xl">
                             <div className="w-8 h-8 rounded-lg bg-brand/10 flex items-center justify-center text-brand">
                                <Lock className="w-4 h-4" />
                             </div>
                             <div>
                                <p className="text-[10px] font-black uppercase text-slate-400">Data Storage</p>
                                <p className="text-[12px] font-bold dark:text-white">Encrypted Local</p>
                             </div>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>

              <div className="space-y-4">
                 <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Active Verification Proofs</h4>
                 <div className="space-y-3">
                    {['BML Account Holder Proof', 'Maldivian Residency Verified', 'GST/TIN Registered Proof'].map((proof, i) => (
                      <div key={i} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-dark border border-slate-100 dark:border-dark-border rounded-2xl group hover:border-brand/40 transition-colors">
                         <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                            <span className="text-[13px] font-bold dark:text-slate-200">{proof}</span>
                         </div>
                         <button className="text-[10px] font-black uppercase text-brand opacity-0 group-hover:opacity-100 transition-opacity">Regenerate</button>
                      </div>
                    ))}
                 </div>
              </div>
            </div>
          )}

          {/* Freelancer Specific Settings */}
          {activeSection === 'freelancer' && user.role === 'freelancer' && (
            <div className="p-8 space-y-10 animate-in slide-in-from-right-4">
              <div className="flex items-center justify-between border-b border-gray-100 dark:border-dark-border pb-4">
                <h3 className="text-sm font-bold uppercase tracking-widest text-brand">Freelancer Engine</h3>
                <div className="flex items-center gap-2">
                   <span className="text-[10px] font-bold text-brand uppercase tracking-widest">Available</span>
                   <div className="w-10 h-5 bg-brand rounded-full relative"><div className="w-4 h-4 bg-white rounded-full absolute right-0.5 top-0.5" /></div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="space-y-4">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Active Skills</label>
                    <div className="space-y-2">
                       {['React Development', 'Logo Design', 'Branding'].map(skill => (
                         <div key={skill} className="flex items-center justify-between p-3 border border-gray-100 dark:border-dark-border rounded-xl bg-gray-50 dark:bg-dark">
                            <span className="text-[12px] font-bold dark:text-gray-200">{skill}</span>
                            <CheckCircle2 className="w-4 h-4 text-brand" />
                         </div>
                       ))}
                       <button className="w-full py-2 border border-dashed border-gray-300 dark:border-dark-border rounded-xl text-[11px] font-bold text-gray-400 hover:text-brand">+ Add Pro Skill</button>
                    </div>
                 </div>

                 <div className="space-y-4">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Market Rate (MVR)</label>
                    <div className="p-6 border border-brand/20 bg-brand/5 dark:bg-brand/10 rounded-2xl">
                       <p className="text-[11px] text-brand font-bold mb-4 uppercase tracking-wider">Hourly Benchmark</p>
                       <div className="flex items-center gap-2">
                          <input type="text" defaultValue="550" className="w-24 px-3 py-2 border border-[#E2E8F0] dark:border-dark-border rounded-lg bg-white dark:bg-dark text-lg font-bold outline-none focus:border-brand text-brand" />
                          <span className="font-bold text-gray-400">/ Hour</span>
                       </div>
                    </div>
                 </div>
              </div>
            </div>
          )}

          {/* Org Section */}
          {activeSection === 'org' && (
            <div className="p-8 space-y-8 animate-in slide-in-from-right-4">
              <div className="flex items-center justify-between pb-4 border-b border-[#E2E8F0] dark:border-dark-border">
                <h3 className="text-sm font-bold uppercase tracking-widest text-brand">{user.role === 'freelancer' ? 'Identity' : 'Business'}</h3>
                <span className="px-2 py-0.5 bg-brand/10 text-brand border border-brand/20 rounded text-[10px] font-bold uppercase tracking-tighter">Verified Status</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Full Name / Entity</label>
                  <input className="w-full px-4 py-2.5 border border-[#E2E8F0] dark:border-dark-border rounded-xl text-[13px] bg-[#F9FAFB] dark:bg-dark outline-none focus:bg-white dark:focus:bg-dark/80 focus:border-brand transition-all dark:text-white" defaultValue={user.name} />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Location</label>
                  <input className="w-full px-4 py-2.5 border border-[#E2E8F0] dark:border-dark-border rounded-xl text-[13px] bg-[#F9FAFB] dark:bg-dark outline-none dark:text-white" defaultValue="Malé, Maldives" />
                </div>
              </div>
            </div>
          )}

          {/* Workflow Section */}
          {activeSection === 'workflow' && (
            <div className="p-8 space-y-10 animate-in slide-in-from-right-4">
              <div className="flex items-center justify-between">
                <div>
                   <h3 className="text-sm font-bold uppercase tracking-widest text-brand">Automations</h3>
                   <p className="text-[11px] text-gray-500 mt-1">Design how Meritt handles your specific projects.</p>
                </div>
                <button className="px-4 py-2 bg-brand text-white rounded-lg text-[11px] font-bold shadow-lg shadow-brand/20">Upgrade to Elite</button>
              </div>

              <div className="p-6 border border-[#E2E8F0] dark:border-dark-border rounded-2xl bg-[#F9FAFB] dark:bg-dark">
                 <h4 className="font-bold text-[13px] mb-4 flex items-center gap-2 dark:text-white">
                    <Settings2 className="w-4 h-4 text-brand" />
                    Pipeline Stages
                 </h4>
                 <div className="flex flex-wrap gap-2">
                    {['Initial Draft', 'Client Review', 'Revision', 'Approved'].map(s => (
                      <div key={s} className="px-3 py-1.5 bg-white dark:bg-dark-surface border border-[#E2E8F0] dark:border-dark-border rounded-md text-[11px] font-bold shadow-sm flex items-center gap-2 dark:text-gray-200">
                         <GripVertical className="w-3 h-3 text-gray-300" />
                         {s}
                      </div>
                    ))}
                 </div>
              </div>
            </div>
          )}

          <div className="px-8 py-6 bg-white dark:bg-dark-surface border-t border-[#E2E8F0] dark:border-dark-border flex justify-end gap-3 transition-colors">
            <button className="px-5 py-2.5 border border-[#E2E8F0] dark:border-dark-border rounded-lg font-bold text-[12px] hover:bg-gray-50 dark:hover:bg-dark transition-all dark:text-gray-400">Discard</button>
            <button className="px-5 py-2.5 bg-brand text-white rounded-lg font-bold text-[12px] hover:brightness-110 transition-all shadow-xl shadow-brand/20">Sync Workspace</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;