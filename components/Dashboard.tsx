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
    <div className="space-y-8 md:space-y-10 animate-in fade-in duration-500 pb-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <header className="space-y-1">
          <h1 className="text-2xl md:text-3xl font-black tracking-tighter text-[#0F172A] dark:text-white uppercase leading-none">
            Workspace Hub
          </h1>
          <p className="text-[11px] text-slate-500 font-bold uppercase tracking-[0.25em] mt-1">
            Welcome back, {user?.name.split(' ')[0] || 'Jauzaf'}. <span className="thaana-text ml-1 opacity-60">ކިހިނެއް؟</span> Identity node synced.
          </p>
        </header>
        <div className="flex items-center gap-3">
          {user?.isHuman && (
            <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 rounded-xl">
               <BadgeCheck className="w-4 h-4 text-emerald-500" />
               <span className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">Sovereign Proof Active</span>
            </div>
          )}
          <button className="flex items-center gap-2 px-5 py-2.5 bg-brand text-white rounded-xl text-[11px] font-black uppercase tracking-widest shadow-xl shadow-brand/20 hover:scale-105 active:scale-95 transition-all">
            <Zap className="w-3.5 h-3.5 fill-current" /> Start New Gig
          </button>
        </div>
      </div>

      <section className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-5" aria-label="Performance Metrics">
        {metrics.map((metric, i) => (
          <article key={i} className="bg-white dark:bg-dark-surface border border-[#E2E8F0] dark:border-dark-border p-6 rounded-[28px] shadow-sm hover:shadow-xl hover:border-brand/20 transition-all group">
            <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2 group-hover:text-brand transition-colors">
              {metric.label}
            </p>
            <div className="flex items-baseline justify-between">
              <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                {metric.value}
              </h3>
              <span className={`text-[10px] font-black px-2 py-0.5 rounded-lg ${
                metric.isPositive ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600' : 'bg-rose-50 dark:bg-rose-500/10 text-rose-600'
              }`}>
                {metric.change}
              </span>
            </div>
          </article>
        ))}
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <section className="bg-white dark:bg-dark-surface border border-[#E2E8F0] dark:border-dark-border rounded-[36px] p-6 md:p-10 shadow-sm">
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-brand/5 dark:bg-brand/10 rounded-2xl flex items-center justify-center border border-brand/10">
                  <TrendingUp className="w-6 h-6 text-brand" />
                </div>
                <h3 className="text-[14px] font-black text-slate-900 dark:text-white uppercase tracking-wider">Revenue Stream Node</h3>
              </div>
            </div>
            <div className="h-[280px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={CHART_DATA}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0047FF" stopOpacity={0.15}/>
                      <stop offset="95%" stopColor="#0047FF" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" opacity={0.2} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 800, fill: '#94A3B8' }} dy={10} />
                  <Tooltip contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 20px 40px -10px rgba(0,0,0,0.1)', fontSize: '11px', fontWeight: 800 }} />
                  <Area type="monotone" dataKey="value" stroke="#0047FF" strokeWidth={5} fillOpacity={1} fill="url(#colorValue)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </section>

          <section className="bg-emerald-600 rounded-[36px] p-10 text-white relative overflow-hidden group shadow-2xl shadow-emerald-500/30 transition-all hover:scale-[1.005]">
             <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:scale-110 transition-transform"><Gift className="w-40 h-40" /></div>
             <div className="relative z-10 space-y-8">
                <div className="space-y-3">
                   <h3 className="text-3xl font-black uppercase tracking-tighter leading-none">Meritt Network Growth</h3>
                   <p className="text-white/80 text-[14px] font-medium max-w-lg leading-relaxed">Refer other professional island talent and earn 2.5% lifetime commission on their clearing nodes.</p>
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-5">
                   <div className="w-full sm:flex-1 bg-white/10 backdrop-blur-xl border border-white/20 px-8 py-5 rounded-2xl flex items-center justify-between group/code transition-all hover:bg-white/20">
                      <code className="text-xl font-black tracking-widest uppercase">MERITT-JAUZ-2024</code>
                      <button className="p-2.5 hover:bg-white/20 rounded-xl transition-all" title="Copy Code"><Copy className="w-4 h-4" /></button>
                   </div>
                   <button className="w-full sm:w-auto px-10 py-5 bg-white text-emerald-700 rounded-2xl font-black text-[13px] uppercase tracking-widest flex items-center justify-center gap-3 shadow-2xl shadow-black/10 hover:shadow-black/20 transition-all">
                      <Share2 className="w-4 h-4" /> Share Hub
                   </button>
                </div>
             </div>
          </section>
        </div>

        <aside className="space-y-8">
          <section className={`rounded-[36px] p-10 text-white relative overflow-hidden transition-all duration-1000 ${user?.isHuman ? 'bg-emerald-600' : 'bg-slate-900 dark:bg-brand'}`}>
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-8">
                {user?.isHuman ? <BadgeCheck className="w-14 h-14" /> : <Fingerprint className="w-10 h-10 text-white" />}
                <div className="h-2 flex-1 bg-white/20 rounded-full overflow-hidden">
                  <div className={`h-full bg-white transition-all duration-1000 ${user?.isHuman ? 'w-full' : 'w-1/3'}`}></div>
                </div>
              </div>
              <h3 className="text-2xl font-black mb-2 tracking-tight uppercase leading-none">Meritt ID Sync</h3>
              <p className="text-[13px] text-white/80 font-medium mb-8 leading-relaxed">
                {user?.isHuman ? 'Sovereign Proof of Human verified. Biometric keys fully active across the network.' : 'Standard validation active. Upgrade to Biometric tier for 3% fee reduction.'}
              </p>
              <div className="flex items-center gap-2.5 text-[10px] font-black uppercase tracking-widest text-white/60 bg-white/10 py-2 px-4 rounded-full w-fit">
                 <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> 
                 {user?.isHuman ? 'Biometric Layer Active' : 'Level 1 Node Verified'}
              </div>
            </div>
          </section>

          <section className="bg-white dark:bg-dark-surface border border-[#E2E8F0] dark:border-dark-border rounded-[36px] p-8 shadow-sm">
            <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.25em] mb-6">Upcoming Hub Deadlines</h4>
            <div className="space-y-5">
               {[
                 { title: 'Logo Refinement', time: '16:00 GST', client: 'Oceanic' },
                 { title: 'Merchant Sync', time: 'Tomorrow', client: 'TechWave' }
               ].map((task, i) => (
                 <article key={i} className="flex items-center gap-5 group cursor-pointer p-2 -m-2 rounded-2xl hover:bg-slate-50 dark:hover:bg-dark transition-all">
                   <div className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-dark border border-slate-100 dark:border-dark-border flex items-center justify-center group-hover:border-brand/40 group-hover:bg-brand/5 transition-all">
                     <Clock className="w-5 h-5 text-slate-400 group-hover:text-brand" />
                   </div>
                   <div className="flex-1 min-w-0">
                     <p className="text-[13px] font-black dark:text-white truncate uppercase tracking-tight">{task.title}</p>
                     <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">{task.client} Protocol</p>
                   </div>
                 </article>
               ))}
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
};

export default Dashboard;