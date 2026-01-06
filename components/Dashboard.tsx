
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, BarChart3, MapPin, Fingerprint, ShieldCheck, Zap, Star, Clock, ArrowUpRight, Share2, Copy, Gift, BadgeCheck } from 'lucide-react';
import { Metric, User, UserRole } from '../types';

interface DashboardProps {
  role: UserRole;
  user?: User;
}

const CHART_DATA = [
  { name: 'Mon', value: 400 },
  { name: 'Tue', value: 300 },
  { name: 'Wed', value: 600 },
  { name: 'Thu', value: 800 },
  { name: 'Fri', value: 500 },
  { name: 'Sat', value: 900 },
  { name: 'Sun', value: 1100 },
];

const Dashboard: React.FC<DashboardProps> = ({ role, user }) => {
  const metrics: Metric[] = [
    { label: 'Total Earnings', value: 'MVR 42,500', change: '+12.5%', isPositive: true },
    { label: 'Active Projects', value: '12', change: '+2', isPositive: true },
    { label: 'Avg. Rating', value: '4.9', change: '+0.1', isPositive: true },
    { label: 'Network Points', value: '1,240', change: '+140', isPositive: true },
  ];

  return (
    <div className="space-y-6 md:space-y-8 animate-in fade-in duration-500 pb-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-black tracking-tight text-[#0F172A] dark:text-white uppercase">
            Workspace Hub
          </h1>
          <p className="text-[11px] text-slate-500 font-bold uppercase tracking-[0.2em] mt-1">
            Welcome back, {user?.name.split(' ')[0] || 'Jauzaf'}. <span className="thaana-text">ކިހިނެއް؟</span> Your node is synced.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {user?.isHuman && (
            <div className="flex items-center gap-2 px-3 py-1.5 bg-brand/5 border border-brand/20 rounded-xl">
               <BadgeCheck className="w-4 h-4 text-brand" />
               <span className="text-[10px] font-black text-brand uppercase tracking-widest">Proof of Human Active</span>
            </div>
          )}
          <button className="flex items-center gap-2 px-4 py-2 bg-brand text-white rounded-xl text-[11px] font-black uppercase tracking-widest shadow-lg shadow-brand/20 hover:scale-105 active:scale-95 transition-all">
            <Zap className="w-3.5 h-3.5" /> Start New Gig
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, i) => (
          <div key={i} className="bg-white dark:bg-dark-surface border border-[#E2E8F0] dark:border-dark-border p-5 rounded-[24px] shadow-sm hover:shadow-md transition-all group">
            <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1 group-hover:text-brand transition-colors">
              {metric.label}
            </p>
            <div className="flex items-baseline justify-between">
              <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
                {metric.value}
              </h3>
              <span className={`text-[10px] font-black px-1.5 py-0.5 rounded-md ${
                metric.isPositive ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600' : 'bg-rose-50 dark:bg-rose-500/10 text-rose-600'
              }`}>
                {metric.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-dark-surface border border-[#E2E8F0] dark:border-dark-border rounded-[32px] p-6 md:p-8 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-brand/5 rounded-xl flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-brand" />
                </div>
                <h3 className="text-[14px] font-black text-slate-900 dark:text-white uppercase tracking-wider">Revenue Stream</h3>
              </div>
            </div>
            <div className="h-[240px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={CHART_DATA}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0047FF" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#0047FF" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" opacity={0.3} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: '#94A3B8' }} dy={10} />
                  <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 30px -10px rgba(0,0,0,0.1)', fontSize: '11px', fontWeight: 700 }} />
                  <Area type="monotone" dataKey="value" stroke="#0047FF" strokeWidth={4} fillOpacity={1} fill="url(#colorValue)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-emerald-600 rounded-[32px] p-8 text-white relative overflow-hidden group shadow-xl shadow-emerald-500/20 transition-all hover:scale-[1.01]">
             <div className="absolute top-0 right-0 p-8 opacity-20"><Gift className="w-32 h-32" /></div>
             <div className="relative z-10 space-y-6">
                <div className="space-y-2">
                   <h3 className="text-2xl font-black uppercase tracking-tighter">Meritt Network Growth</h3>
                   <p className="text-white/70 text-[13px] font-medium max-w-md">Refer other professionals to the platform and earn 2% lifetime commission on their clearing fees.</p>
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-4">
                   <div className="w-full sm:flex-1 bg-white/10 backdrop-blur-md border border-white/20 px-6 py-4 rounded-2xl flex items-center justify-between">
                      <code className="text-lg font-black tracking-widest">MERITT-JAUZ-2024</code>
                      <button className="p-2 hover:bg-white/10 rounded-xl transition-all" title="Copy Code"><Copy className="w-4 h-4" /></button>
                   </div>
                   <button className="w-full sm:w-auto px-8 py-4 bg-white text-emerald-600 rounded-2xl font-black text-[12px] uppercase tracking-widest flex items-center justify-center gap-3 hover:shadow-lg transition-all">
                      <Share2 className="w-4 h-4" /> Share Hub
                   </button>
                </div>
             </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className={`rounded-[32px] p-8 text-white relative overflow-hidden transition-all duration-700 ${user?.isHuman ? 'bg-emerald-600' : 'bg-slate-900 dark:bg-brand'}`}>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                {user?.isHuman ? <BadgeCheck className="w-10 h-10" /> : <Fingerprint className="w-8 h-8 text-white" />}
                <div className="h-2 flex-1 bg-white/20 rounded-full overflow-hidden">
                  <div className={`h-full bg-white transition-all duration-1000 ${user?.isHuman ? 'w-full' : 'w-1/3'}`}></div>
                </div>
              </div>
              <h3 className="text-xl font-black mb-2 tracking-tight">Meritt ID Sync</h3>
              <p className="text-[12px] text-white/70 font-medium mb-6">
                {user?.isHuman ? 'Proof of Human verified. Biometric keys active.' : 'Standard verification active. Biometric scan pending.'}
              </p>
              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/50">
                 <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> 
                 {user?.isHuman ? 'Biometric Node Active' : 'Standard Node Verified'}
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-dark-surface border border-[#E2E8F0] dark:border-dark-border rounded-[32px] p-6 shadow-sm">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Upcoming Deadlines</h4>
            <div className="space-y-4">
               {[
                 { title: 'Logo Revision', time: 'Today, 4PM', client: 'Oceanic' },
                 { title: 'BML Integration', time: 'Tomorrow', client: 'TechWave' }
               ].map((task, i) => (
                 <div key={i} className="flex items-center gap-4 group cursor-pointer">
                   <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-dark flex items-center justify-center group-hover:bg-brand/5 transition-colors">
                     <Clock className="w-4 h-4 text-slate-400 group-hover:text-brand" />
                   </div>
                   <div className="flex-1 min-w-0">
                     <p className="text-[12px] font-black dark:text-white truncate">{task.title}</p>
                     <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">{task.client}</p>
                   </div>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
