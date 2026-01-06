
import React, { useState } from 'react';
import { 
  Shield, 
  CreditCard, 
  Briefcase, 
  Settings2, 
  Sparkles, 
  FileText, 
  GripVertical, 
  Star, 
  CheckCircle2, 
  Fingerprint, 
  Lock, 
  ShieldCheck,
  Plus,
  Trash2,
  Users,
  Building2,
  Bell,
  Calendar,
  ExternalLink,
  Globe,
  Wallet,
  Check,
  ChevronRight
} from 'lucide-react';
import { User } from '../types';

interface SettingsProps {
  user: User;
}

const Settings: React.FC<SettingsProps> = ({ user }) => {
  const [activeSection, setActiveSection] = useState(user.role === 'freelancer' ? 'freelancer' : 'org');

  const SECTIONS = [
    ...(user.role === 'freelancer' ? [{ id: 'freelancer', label: 'Freelancer Workspace', icon: Star }] : []),
    ...(user.role === 'business' ? [{ id: 'business_ops', label: 'Business Operations', icon: Building2 }] : []),
    { id: 'identity', label: 'Meritt ID Vault', icon: Fingerprint },
    { id: 'org', label: user.role === 'freelancer' ? 'Identity & Bio' : 'Company Profile', icon: Briefcase },
    { id: 'billing', label: 'Financials & Tax', icon: Wallet },
    { id: 'workflow', label: 'Project Templates', icon: Settings2 },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security & Privacy', icon: Shield },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500 pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl md:text-2xl font-black tracking-tight text-[#0F172A] dark:text-white uppercase">Workspace Node Configuration</h1>
          <p className="text-slate-500 text-xs md:text-[13px] font-bold uppercase tracking-[0.2em] mt-1">Manage your sovereign identity and operational preferences.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <nav className="col-span-1 flex flex-col gap-1.5 h-fit">
          {SECTIONS.map(item => (
            <button 
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`flex items-center justify-between px-4 py-3 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all border ${
                activeSection === item.id 
                ? 'bg-brand border-brand text-white shadow-lg shadow-brand/20' 
                : 'bg-white dark:bg-dark-surface border-[#E2E8F0] dark:border-dark-border text-slate-500 hover:text-brand hover:border-brand shadow-sm'
              }`}
            >
              <div className="flex items-center gap-3">
                <item.icon className="w-4 h-4" />
                {item.label}
              </div>
              {item.id === 'workflow' && <Sparkles className="w-3 h-3 text-yellow-400" />}
            </button>
          ))}
        </nav>

        <div className="col-span-3 bg-white dark:bg-dark-surface border border-[#E2E8F0] dark:border-dark-border rounded-[32px] overflow-hidden shadow-sm transition-colors">
          
          {/* Meritt ID Identity Vault */}
          {activeSection === 'identity' && (
            <div className="p-8 space-y-10 animate-in slide-in-from-right-4">
              <div className="flex items-center justify-between border-b border-gray-100 dark:border-dark-border pb-4">
                <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-brand flex items-center gap-2">
                   <Fingerprint className="w-5 h-5" /> Meritt ID Protocol
                </h3>
                <div className="flex items-center gap-2">
                   <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Sovereign Node Active</span>
                   <ShieldCheck className="w-5 h-5 text-emerald-500" />
                </div>
              </div>

              <div className="p-8 bg-brand/[0.03] dark:bg-brand/5 border border-brand/10 rounded-3xl">
                 <div className="flex flex-col md:flex-row gap-8 items-start">
                    <div className="w-24 h-24 bg-white dark:bg-dark border border-brand/20 rounded-2xl flex items-center justify-center shadow-xl shrink-0">
                       <Fingerprint className="w-12 h-12 text-brand" />
                    </div>
                    <div className="flex-1">
                       <h4 className="text-lg font-black dark:text-white mb-2 uppercase tracking-tight">Your Sovereign Identity</h4>
                       <p className="text-[13px] text-slate-500 dark:text-slate-400 leading-relaxed mb-6 font-medium">
                          Meritt ID is your cryptographically secured digital passport. It ensures that your professional history, ratings, and wallet are tied to your person, providing a "Proof of Human" across the Maldivian network.
                       </p>
                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="flex items-center gap-3 p-4 bg-white dark:bg-dark border border-slate-100 dark:border-dark-border rounded-2xl">
                             <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                                <Shield className="w-4 h-4" />
                             </div>
                             <div>
                                <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest">KYC Status</p>
                                <p className="text-[12px] font-black dark:text-white">Fully Verified</p>
                             </div>
                          </div>
                          <div className="flex items-center gap-3 p-4 bg-white dark:bg-dark border border-slate-100 dark:border-dark-border rounded-2xl">
                             <div className="w-8 h-8 rounded-lg bg-brand/10 flex items-center justify-center text-brand">
                                <Lock className="w-4 h-4" />
                             </div>
                             <div>
                                <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest">Data Storage</p>
                                <p className="text-[12px] font-black dark:text-white">Encrypted Local</p>
                             </div>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>

              <div className="space-y-4">
                 <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Verification Proofs</h4>
                 <div className="space-y-3">
                    {['BML Account Holder Proof', 'Maldivian Residency Verified', 'Professional Competency Node'].map((proof, i) => (
                      <div key={i} className="flex items-center justify-between p-5 bg-slate-50 dark:bg-dark border border-slate-100 dark:border-dark-border rounded-[24px] group hover:border-brand/40 transition-all shadow-sm">
                         <div className="flex items-center gap-4">
                            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.6)]"></div>
                            <span className="text-[13px] font-bold dark:text-slate-200 tracking-tight">{proof}</span>
                         </div>
                         <button className="text-[10px] font-black uppercase text-brand opacity-0 group-hover:opacity-100 transition-all flex items-center gap-2">Regenerate <ChevronRight className="w-3 h-3"/></button>
                      </div>
                    ))}
                 </div>
              </div>
            </div>
          )}

          {/* Freelancer Specific Settings */}
          {activeSection === 'freelancer' && user.role === 'freelancer' && (
            <div className="p-8 space-y-12 animate-in slide-in-from-right-4">
              <div className="flex items-center justify-between border-b border-gray-100 dark:border-dark-border pb-4">
                <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-brand">Freelancer Operational Node</h3>
                <div className="flex items-center gap-3 px-3 py-1 bg-brand/5 rounded-full border border-brand/10">
                   <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                   <span className="text-[10px] font-black text-brand uppercase tracking-widest">Open for Work</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                 <div className="space-y-6">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Service Packages</label>
                    <div className="space-y-3">
                       {[
                         { name: 'Logo Identity Design', price: 'MVR 2,500' },
                         { name: 'React Component Audit', price: 'MVR 1,200/hr' }
                       ].map(pkg => (
                         <div key={pkg.name} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-dark border border-slate-100 dark:border-dark-border rounded-2xl group transition-all">
                            <div>
                               <p className="text-[13px] font-bold dark:text-gray-200 tracking-tight">{pkg.name}</p>
                               <p className="text-[11px] text-brand font-black">{pkg.price}</p>
                            </div>
                            <button className="p-2 text-slate-300 hover:text-rose-500 transition-colors"><Trash2 className="w-4 h-4"/></button>
                         </div>
                       ))}
                       <button className="w-full py-3 border border-dashed border-brand/20 rounded-2xl text-[10px] font-black text-brand uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-brand/5 transition-all">
                         <Plus className="w-4 h-4"/> Create Package
                       </button>
                    </div>
                 </div>

                 <div className="space-y-8">
                    <div>
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] block mb-4">Availability Calendar</label>
                      <div className="p-6 bg-slate-50 dark:bg-dark border border-slate-100 dark:border-dark-border rounded-[24px]">
                         <div className="flex items-center justify-between mb-4">
                            <span className="text-[12px] font-bold dark:text-white">Gig Lead Time</span>
                            <span className="text-brand font-black text-[12px]">2-3 Days</span>
                         </div>
                         <div className="grid grid-cols-7 gap-1">
                            {Array.from({length: 14}).map((_, i) => (
                              <div key={i} className={`h-8 rounded-lg flex items-center justify-center text-[10px] font-black ${i < 4 ? 'bg-brand text-white' : 'bg-white dark:bg-dark-surface border border-slate-100 dark:border-dark-border text-slate-400'}`}>
                                {i + 1}
                              </div>
                            ))}
                         </div>
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-4">Portfolio Sync</label>
                      <div className="space-y-2">
                         <button className="w-full flex items-center justify-between p-4 bg-white dark:bg-dark border border-slate-100 dark:border-dark-border rounded-xl group hover:border-brand/40 transition-all">
                            <div className="flex items-center gap-3">
                               <Globe className="w-4 h-4 text-slate-400 group-hover:text-brand" />
                               <span className="text-[12px] font-bold dark:text-gray-200">Personal Website</span>
                            </div>
                            <ExternalLink className="w-4 h-4 text-slate-300" />
                         </button>
                      </div>
                    </div>
                 </div>
              </div>
            </div>
          )}

          {/* Business Operations Settings */}
          {activeSection === 'business_ops' && user.role === 'business' && (
            <div className="p-8 space-y-12 animate-in slide-in-from-right-4">
              <div className="flex items-center justify-between border-b border-gray-100 dark:border-dark-border pb-4">
                <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-brand">Business Operations Node</h3>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Enterprise Sync: Active</span>
              </div>

              <div className="space-y-8">
                 <div>
                    <div className="flex items-center justify-between mb-6">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Team Management</label>
                       <button className="flex items-center gap-2 px-4 py-2 bg-brand text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-brand/20 hover:scale-105 active:scale-95 transition-all">
                          <Plus className="w-3.5 h-3.5"/> Invite Member
                       </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       {[
                         { name: 'Zayaan Ibrahim', role: 'Admin', email: 'zayaan@oceanic.mv' },
                         { name: 'Hawwa Raufa', role: 'Recruiter', email: 'raufa@oceanic.mv' }
                       ].map(member => (
                         <div key={member.email} className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-dark border border-slate-100 dark:border-dark-border rounded-2xl">
                            <div className="w-10 h-10 rounded-full bg-brand/10 flex items-center justify-center text-brand font-black text-[10px]">{member.name.charAt(0)}</div>
                            <div className="flex-1 min-w-0">
                               <p className="text-[13px] font-black dark:text-white truncate tracking-tight">{member.name}</p>
                               <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">{member.role} • {member.email}</p>
                            </div>
                            <button className="p-2 text-slate-300 hover:text-brand"><Settings2 className="w-4 h-4"/></button>
                         </div>
                       ))}
                    </div>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div>
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] block mb-6">Hiring Preferences</label>
                       <div className="space-y-4">
                          <div className="flex items-center justify-between p-5 bg-white dark:bg-dark border border-slate-100 dark:border-dark-border rounded-2xl">
                             <div>
                                <p className="text-[13px] font-bold dark:text-white tracking-tight">Require Verified Identity</p>
                                <p className="text-[10px] text-slate-500 font-medium">Only allow Meritt ID verified talent</p>
                             </div>
                             <div className="w-10 h-5 bg-brand rounded-full relative shadow-inner"><div className="w-3.5 h-3.5 bg-white rounded-full absolute right-1 top-[3px]" /></div>
                          </div>
                          <div className="flex items-center justify-between p-5 bg-white dark:bg-dark border border-slate-100 dark:border-dark-border rounded-2xl">
                             <div>
                                <p className="text-[13px] font-bold dark:text-white tracking-tight">Escrow Automation</p>
                                <p className="text-[10px] text-slate-500 font-medium">Auto-fund milestones upon hire</p>
                             </div>
                             <div className="w-10 h-5 bg-slate-200 dark:bg-dark-border rounded-full relative"><div className="w-3.5 h-3.5 bg-white rounded-full absolute left-1 top-[3px]" /></div>
                          </div>
                       </div>
                    </div>
                    <div>
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] block mb-6">Regional Focus</label>
                       <div className="flex flex-wrap gap-2">
                          {['Malé Region', 'Addu Atoll', 'Huvadhu Atoll', 'Northern Nodes'].map(region => (
                            <button key={region} className="px-4 py-2 bg-slate-50 dark:bg-dark-surface border border-slate-100 dark:border-dark-border rounded-xl text-[11px] font-black text-slate-500 hover:border-brand hover:text-brand transition-all">{region}</button>
                          ))}
                       </div>
                    </div>
                 </div>
              </div>
            </div>
          )}

          {/* Organization / Identity Bio Settings */}
          {activeSection === 'org' && (
            <div className="p-8 space-y-10 animate-in slide-in-from-right-4">
              <div className="flex items-center justify-between pb-4 border-b border-[#E2E8F0] dark:border-dark-border">
                <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-brand">{user.role === 'freelancer' ? 'Identity Bio' : 'Corporate Identity'}</h3>
                <span className="px-3 py-1 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 border border-emerald-100 dark:border-emerald-500/20 rounded-full text-[9px] font-black uppercase tracking-widest flex items-center gap-2">
                   <ShieldCheck className="w-3 h-3" /> Network Verified
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Entity Name</label>
                  <input className="w-full px-5 py-3 border border-[#E2E8F0] dark:border-dark-border rounded-2xl text-[13px] font-bold bg-[#F9FAFB] dark:bg-dark outline-none focus:bg-white dark:focus:bg-dark/80 focus:border-brand transition-all dark:text-white shadow-inner" defaultValue={user.name} />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Node Headquarters</label>
                  <input className="w-full px-5 py-3 border border-[#E2E8F0] dark:border-dark-border rounded-2xl text-[13px] font-bold bg-[#F9FAFB] dark:bg-dark outline-none dark:text-white shadow-inner" defaultValue="Malé, MV Node-1" />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Description / Bio</label>
                  <textarea rows={4} className="w-full px-5 py-4 border border-[#E2E8F0] dark:border-dark-border rounded-[24px] text-[13px] font-medium bg-[#F9FAFB] dark:bg-dark outline-none focus:bg-white dark:focus:bg-dark/80 focus:border-brand transition-all dark:text-white shadow-inner resize-none" defaultValue={user.role === 'freelancer' ? "Focused on building sovereign digital infrastructure for the islands." : "A premier organization driving digital innovation across the atolls."} />
                </div>
              </div>
            </div>
          )}

          {/* Billing & Tax Node */}
          {activeSection === 'billing' && (
            <div className="p-8 space-y-12 animate-in slide-in-from-right-4">
              <div>
                 <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-brand border-b border-gray-100 dark:border-dark-border pb-4 mb-8">Financial & Tax Protocol</h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] block mb-4">Payout Destinations</label>
                       <div className="space-y-3">
                          <div className="p-5 border-2 border-brand bg-brand/[0.02] rounded-[24px] flex items-center justify-between shadow-sm">
                             <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-brand text-white rounded-xl flex items-center justify-center font-black text-[10px] shadow-lg shadow-brand/20">BML</div>
                                <div>
                                   <p className="text-[13px] font-black dark:text-white tracking-tight">BML Main Account</p>
                                   <p className="text-[10px] text-slate-400 font-bold tracking-widest uppercase">**** 8402 • MVR</p>
                                </div>
                             </div>
                             <CheckCircle2 className="w-5 h-5 text-brand" />
                          </div>
                          <button className="w-full py-4 border border-dashed border-slate-200 dark:border-dark-border rounded-[24px] text-[10px] font-black text-slate-400 uppercase tracking-widest hover:border-brand hover:text-brand transition-all flex items-center justify-center gap-2">
                             <Plus className="w-4 h-4"/> Connect Bank (MIB/BML)
                          </button>
                       </div>
                    </div>

                    <div>
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] block mb-4">Tax Configuration</label>
                       <div className="space-y-4">
                          <div className="space-y-1.5">
                             <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">GST Number</p>
                             <input className="w-full px-4 py-2.5 border border-[#E2E8F0] dark:border-dark-border rounded-xl text-[13px] font-bold bg-[#F9FAFB] dark:bg-dark outline-none dark:text-white" placeholder="1029432GST001" />
                          </div>
                          <div className="space-y-1.5">
                             <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">TIN Identifier</p>
                             <input className="w-full px-4 py-2.5 border border-[#E2E8F0] dark:border-dark-border rounded-xl text-[13px] font-bold bg-[#F9FAFB] dark:bg-dark outline-none dark:text-white" placeholder="94021-MVR-TIN" />
                          </div>
                       </div>
                    </div>
                 </div>
              </div>
            </div>
          )}

          {/* Notification Hub */}
          {activeSection === 'notifications' && (
            <div className="p-8 space-y-10 animate-in slide-in-from-right-4">
              <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-brand border-b border-gray-100 dark:border-dark-border pb-4">Notification Center</h3>
              <div className="space-y-2">
                 {[
                   { id: 'pay', label: 'Payment Clearances', desc: 'Alert when MVR hits your connected bank' },
                   { id: 'gig', label: 'New Marketplace Match', desc: 'Alert for high-match gig opportunities' },
                   { id: 'sys', label: 'Network & Security', desc: 'Critical Meritt ID and protocol updates' }
                 ].map(item => (
                   <div key={item.id} className="flex items-center justify-between p-6 bg-slate-50 dark:bg-dark border border-slate-100 dark:border-dark-border rounded-[24px] group hover:border-brand/40 transition-all">
                      <div className="flex items-center gap-4">
                         <div className="w-10 h-10 rounded-xl bg-brand/5 flex items-center justify-center text-brand">
                            <Bell className="w-5 h-5" />
                         </div>
                         <div>
                            <p className="text-[14px] font-black dark:text-white tracking-tight">{item.label}</p>
                            <p className="text-[11px] text-slate-400 font-medium">{item.desc}</p>
                         </div>
                      </div>
                      <div className="w-12 h-6 bg-brand rounded-full relative shadow-inner"><div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1 shadow-sm" /></div>
                   </div>
                 ))}
              </div>
            </div>
          )}

          <div className="px-8 py-6 bg-white dark:bg-dark-surface border-t border-[#E2E8F0] dark:border-dark-border flex justify-end gap-4 transition-colors">
            <button className="px-6 py-3 border border-[#E2E8F0] dark:border-dark-border rounded-xl text-[11px] font-black uppercase tracking-widest text-slate-400 hover:text-brand transition-all">Discard Changes</button>
            <button className="px-8 py-3 bg-brand text-white rounded-xl text-[11px] font-black uppercase tracking-widest shadow-xl shadow-brand/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2">
               <Check className="w-4 h-4" /> Sync Node Preferences
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
