import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, BarChart3, MapPin } from 'lucide-react';
import { Metric, UserRole } from '../types';

interface DashboardProps {
  role: UserRole;
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

const Dashboard: React.FC<DashboardProps> = ({ role }) => {
  const getMetrics = (role: UserRole): Metric[] => {
    switch (role) {
      case 'business':
        return [
          { label: 'Market Spend', value: 'MVR 12k', change: '+8%', isPositive: true },
          { label: 'Projects', value: '5', change: '+1', isPositive: true },
          { label: 'Hire Velocity', value: '4 days', change: '-20%', isPositive: true },
          { label: 'Connections', value: '15', change: '+1', isPositive: true },
        ];
      case 'freelancer':
        return [
          { label: 'Net Earnings', value: 'MVR 45.2k', change: '+12%', isPositive: true },
          { label: 'Invoices', value: '3', change: 'MVR 8k', isPositive: true },
          { label: 'Trust Score', value: '98/100', change: '+2', isPositive: true },
          { label: 'Impression', value: '1.2k', change: '-4%', isPositive: false },
        ];
      default:
        return [
          { label: 'Saved Jobs', value: '12', change: '+2', isPositive: true },
          { label: 'Trust Rank', value: 'Bronze', change: 'New', isPositive: true },
          { label: 'Applications', value: '3', change: '0', isPositive: true },
          { label: 'Visibility', value: 'High', change: '+5%', isPositive: true },
        ];
    }
  };

  const metrics = getMetrics(role);

  return (
    <div className="space-y-6 md:space-y-8 animate-in fade-in duration-500 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-black tracking-tight dark:text-white uppercase">Workspace Node</h1>
          <p className="text-[11px] font-bold text-gray-500 mt-1 uppercase tracking-widest dark:text-gray-400">
            {role === 'business' ? 'Real-time intelligence dashboard.' : "Managing your professional flow."}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {metrics.map((metric, idx) => (
          <div key={idx} className="p-4 md:p-6 border border-[#E2E8F0] dark:border-dark-border rounded-2xl bg-white dark:bg-dark-surface shadow-sm transition-all hover:ring-2 ring-brand/5">
            <p className="text-gray-400 font-black uppercase text-[9px] tracking-[0.2em] mb-2">{metric.label}</p>
            <div className="flex items-end justify-between gap-2">
              <span className="text-[15px] md:text-xl font-black text-brand tracking-tighter truncate">{metric.value}</span>
              <span className={`text-[9px] font-black mb-1 shrink-0 ${metric.isPositive ? 'text-emerald-600' : 'text-rose-600'}`}>
                {metric.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 border border-[#E2E8F0] dark:border-dark-border rounded-[24px] p-5 md:p-8 min-h-[320px] md:min-h-[440px] bg-white dark:bg-dark-surface transition-all flex flex-col shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-black text-[11px] uppercase tracking-[0.3em] flex items-center gap-2 dark:text-white">
              Trajectory Engine <TrendingUp className="w-3.5 h-3.5 text-brand" />
            </h3>
          </div>
          <div className="flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={CHART_DATA}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0047FF" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#0047FF" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" className="dark:opacity-5" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 9, fill: '#999', fontWeight: 700}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 9, fill: '#999', fontWeight: 700}} />
                <Tooltip contentStyle={{ border: 'none', borderRadius: '12px', fontSize: '10px', fontWeight: 800, background: 'white', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }} />
                <Area type="monotone" dataKey="value" stroke="#0047FF" fillOpacity={1} fill="url(#colorValue)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="border border-[#E2E8F0] dark:border-dark-border rounded-[24px] p-6 md:p-8 bg-[#F9FAFB] dark:bg-dark shadow-sm">
          <h3 className="font-black text-[11px] uppercase tracking-[0.3em] flex items-center gap-2 mb-8 dark:text-white">
            Market Benchmarks <BarChart3 className="w-3.5 h-3.5 text-brand" />
          </h3>
          <div className="space-y-4">
            {[
              { skill: 'React Expert', avg: 'MVR 15k', trend: 'up' },
              { skill: 'UI/UX Design', avg: 'MVR 12k', trend: 'up' },
              { skill: 'Translation', avg: 'MVR 4k', trend: 'stable' }
            ].map((item, i) => (
              <div key={i} className="p-4 bg-white dark:bg-dark-surface border border-[#E2E8F0] dark:border-dark-border rounded-xl transition-all hover:scale-[1.02] shadow-sm">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-black text-brand text-[12px] tracking-tight">{item.skill}</span>
                  <span className={`text-[8px] font-black px-1.5 py-0.5 rounded uppercase tracking-widest ${
                    item.trend === 'up' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-500'
                  }`}>
                    {item.trend === 'up' ? '↗ High' : '→ Stable'}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-400">
                   <MapPin className="w-3 h-3" />
                   <span className="text-[11px] font-bold tracking-tight">{item.avg} / Project</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;