import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, BarChart3, Info, MapPin } from 'lucide-react';
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

const BENCHMARKS = [
  { skill: 'Logo Design', avg: 'MVR 3,500', trend: 'stable' },
  { skill: 'Social Media', avg: 'MVR 6,000/mo', trend: 'up' },
  { skill: 'Web UI (React)', avg: 'MVR 15,000', trend: 'up' },
];

const Dashboard: React.FC<DashboardProps> = ({ role }) => {
  const getMetrics = (role: UserRole): Metric[] => {
    switch (role) {
      case 'business':
        return [
          { label: 'Recruitment Spend', value: 'MVR 12k', change: '+8%', isPositive: true },
          { label: 'Active Projects', value: '5', change: '+1', isPositive: true },
          { label: 'Avg. Hire Time', value: '4 days', change: '-20%', isPositive: true },
          { label: 'Talent Sav.', value: '15', change: '+1', isPositive: true },
        ];
      case 'freelancer':
        return [
          { label: 'Total Earnings', value: 'MVR 45,200', change: '+12%', isPositive: true },
          { label: 'Open Invoices', value: '3', change: 'MVR 8k', isPositive: true },
          { label: 'Merit Score', value: '98/100', change: '+2', isPositive: true },
          { label: 'Profile Reach', value: '1.2k', change: '-4%', isPositive: false },
        ];
      default:
        return [
          { label: 'Saved Jobs', value: '12', change: '+2', isPositive: true },
          { label: 'Trust Rank', value: 'Bronze', change: 'New', isPositive: true },
          { label: 'Applications', value: '3', change: '0', isPositive: true },
          { label: 'Connections', value: '8', change: '+1', isPositive: true },
        ];
    }
  };

  const metrics = getMetrics(role);

  return (
    <div className="space-y-6 md:space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-2">
        <div>
          <h1 className="text-xl md:text-2xl font-bold tracking-tight dark:text-white">
            {role === 'business' ? 'Business Intelligence' : 'Workspace Insights'}
          </h1>
          <p className="text-gray-500 mt-1 text-xs md:text-[13px] dark:text-gray-400">
            {role === 'business' ? 'Strategic overview of your recruitment and project health.' : "Manage your professional pipeline."}
          </p>
        </div>
        <div className="text-[10px] md:text-[11px] text-gray-400 font-bold uppercase tracking-widest">
          Last updated: Just now
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {metrics.map((metric, idx) => (
          <div key={idx} className="p-3 md:p-5 border border-[#E2E8F0] dark:border-dark-border rounded-xl bg-white dark:bg-dark-surface shadow-sm transition-colors">
            <p className="text-gray-400 font-bold uppercase text-[10px] tracking-widest mb-1">{metric.label}</p>
            <div className="flex items-end justify-between">
              <span className="text-lg md:text-xl font-bold text-brand truncate">{metric.value}</span>
              <span className={`text-[10px] font-bold mb-1 ${metric.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                {metric.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Grid: Graph + Benchmarks */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 border border-[#E2E8F0] dark:border-dark-border rounded-xl p-4 md:p-6 flex flex-col min-h-[300px] md:min-h-[400px] bg-white dark:bg-dark-surface transition-colors">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold flex items-center gap-2 text-sm md:text-[13px] dark:text-white">
              {role === 'business' ? 'Expenditure Trends' : 'Performance Insights'}
              <TrendingUp className="w-4 h-4 text-brand" />
            </h3>
            <select className="text-[10px] border border-[#E2E8F0] dark:border-dark-border rounded px-2 py-1 bg-[#F9FAFB] dark:bg-dark outline-none dark:text-white">
              <option>Week</option>
              <option>Month</option>
            </select>
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
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 9, fill: '#999'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 9, fill: '#999'}} />
                <Tooltip contentStyle={{ border: '1px solid #E2E8F0', borderRadius: '8px', fontSize: '11px', background: 'white' }} />
                <Area type="monotone" dataKey="value" stroke="#0047FF" fillOpacity={1} fill="url(#colorValue)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Local Project Benchmarks (The Meritt Edge) */}
        <div className="border border-[#E2E8F0] dark:border-dark-border rounded-xl p-4 md:p-6 bg-[#F9FAFB] dark:bg-dark transition-colors">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-sm md:text-[13px] flex items-center gap-2 dark:text-white">
              Maldives Benchmarks
              <BarChart3 className="w-3.5 h-3.5 text-brand" />
            </h3>
          </div>
          <p className="text-[10px] text-gray-400 mb-6 font-bold uppercase tracking-widest">Average Rates (MVR)</p>
          <div className="space-y-4">
            {BENCHMARKS.map((item, i) => (
              <div key={i} className="p-3 bg-white dark:bg-dark-surface border border-[#E2E8F0] dark:border-dark-border rounded-lg transition-colors">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-brand text-[12px]">{item.skill}</span>
                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                    item.trend === 'up' ? 'bg-green-50 dark:bg-green-900/20 text-green-600' : 'bg-gray-50 dark:bg-gray-800 text-gray-500'
                  }`}>
                    {item.trend === 'up' ? '↗ Increasing' : '→ Stable'}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400">
                   <MapPin className="w-3 h-3" />
                   <span className="text-[11px] font-medium">{item.avg}</span>
                </div>
              </div>
            ))}
            <button className="w-full text-center text-brand text-[11px] font-bold py-3 border border-brand rounded-lg hover:bg-brand hover:text-white transition-all">
              Full Market Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;