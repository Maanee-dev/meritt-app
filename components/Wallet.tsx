import React from 'react';
import { CreditCard, ArrowUpRight, ArrowDownLeft, ShieldCheck, Zap, Star } from 'lucide-react';

const Wallet: React.FC = () => {
  const plans = [
    { name: 'Standard', price: 'MVR 0', commission: '12%', color: 'text-gray-400', icon: CreditCard, features: ['Core Dashboard', 'Standard Support'] },
    { name: 'Starter', price: 'MVR 49', commission: '7%', color: 'text-brand', icon: Zap, features: ['Custom Stages', 'Verified Badge', 'Priority Support'] },
    { name: 'Professional', price: 'MVR 99', commission: '3%', color: 'text-yellow-500', icon: Star, features: ['3% Commission', 'API Access', 'Portfolio Showcase'] },
  ];

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold tracking-tight dark:text-white">Wallet & Tiers</h1>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-brand text-white rounded-md font-bold hover:brightness-110 shadow-lg shadow-brand/20">
          Add Funds
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-brand text-white p-8 rounded-2xl relative overflow-hidden shadow-2xl shadow-brand/20">
          <div className="relative z-10">
            <p className="text-brand-foreground opacity-70 font-bold uppercase tracking-widest text-[10px] mb-1">Available Balance</p>
            <h2 className="text-4xl font-bold mb-8">MVR 12,450.00</h2>
            <div className="flex gap-4">
              <button className="flex items-center gap-2 px-3 py-1.5 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-bold transition-colors">
                <ArrowDownLeft className="w-4 h-4" /> Withdrawal
              </button>
              <button className="flex items-center gap-2 px-3 py-1.5 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-bold transition-colors">
                <ArrowUpRight className="w-4 h-4" /> Payout
              </button>
            </div>
          </div>
          <div className="absolute top-[-40px] right-[-40px] w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        </div>

        <div className="border border-[#E2E8F0] dark:border-dark-border p-8 rounded-2xl flex flex-col justify-between bg-white dark:bg-dark-surface transition-colors">
          <div>
            <p className="text-gray-500 dark:text-gray-400 font-bold uppercase tracking-widest text-[10px] mb-1">Active Subscription</p>
            <div className="flex items-center gap-2">
               <h2 className="text-2xl font-bold text-brand">Professional</h2>
               <span className="px-2 py-0.5 bg-brand/10 text-brand text-[10px] font-bold rounded uppercase border border-brand/20">Active</span>
            </div>
          </div>
          <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-dark-border">
            <div>
              <p className="text-gray-400 text-[10px] font-bold uppercase">Next Renewal</p>
              <p className="font-bold text-sm dark:text-gray-200">Sept 15, 2024</p>
            </div>
            <button className="text-brand text-sm font-bold hover:underline">Manage Billing</button>
          </div>
        </div>
      </div>

      <section>
        <h3 className="text-lg font-bold mb-6 dark:text-white">Professional Tiers</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div key={plan.name} className="border border-[#E2E8F0] dark:border-dark-border p-6 rounded-xl flex flex-col hover:border-brand transition-all cursor-pointer group bg-white dark:bg-dark-surface">
              <div className="mb-6">
                <plan.icon className={`w-8 h-8 ${plan.color} mb-4`} />
                <h4 className="text-lg font-bold group-hover:text-brand dark:text-gray-200">{plan.name}</h4>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-2xl font-bold dark:text-white">{plan.price}</span>
                  <span className="text-gray-400 text-xs">/ month</span>
                </div>
              </div>
              
              <div className="space-y-3 mb-8 flex-1">
                <div className="flex items-center gap-2 text-brand font-bold text-xs uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4" /> {plan.commission} Comm.
                </div>
                {plan.features.map(f => (
                  <div key={f} className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
                    <div className="w-1 h-1 bg-brand rounded-full" /> {f}
                  </div>
                ))}
              </div>

              <button className={`w-full py-2.5 rounded-lg font-bold text-sm border transition-all ${
                plan.name === 'Professional' 
                ? 'bg-brand text-white border-transparent' 
                : 'bg-white dark:bg-dark text-brand border-[#E2E8F0] dark:border-dark-border hover:border-brand'
              }`}>
                {plan.name === 'Professional' ? 'Current Active' : 'Select Tier'}
              </button>
            </div>
          ))}
        </div>
      </section>

      <div className="bg-[#F9FAFB] dark:bg-dark border border-[#E2E8F0] dark:border-dark-border p-6 rounded-xl flex items-center justify-between transition-colors">
        <div className="flex items-center gap-4">
           <div className="w-12 h-12 bg-white dark:bg-dark-surface border border-[#E2E8F0] dark:border-dark-border rounded-lg flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-brand" />
           </div>
           <div>
              <h4 className="font-bold dark:text-white">Manual Bank Verification</h4>
              <p className="text-gray-500 dark:text-gray-400 text-xs">Upload your BML/MIB receipt for rapid manual verification.</p>
           </div>
        </div>
        <button className="px-4 py-2 border border-brand text-brand rounded-md font-bold text-sm hover:bg-brand hover:text-white transition-all">
          Upload Receipt
        </button>
      </div>
    </div>
  );
};

export default Wallet;