import React from 'react';
import { 
  DollarSign, 
  TrendingUp, 
  CreditCard, 
  ArrowUpRight,
  ArrowDownRight,
  Download,
  Calendar
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

const revenueData = [
  { name: 'Mon', amount: 45200 },
  { name: 'Tue', amount: 52100 },
  { name: 'Wed', amount: 48900 },
  { name: 'Thu', amount: 61200 },
  { name: 'Fri', amount: 55400 },
  { name: 'Sat', amount: 32100 },
  { name: 'Today', amount: 18400 },
];

export default function Revenue() {
  return (
    <div className="space-y-8">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Revenue & Payments</h1>
          <p className="text-white/40 text-sm mt-1">Track university fees and payment collections</p>
        </div>
        <div className="flex gap-4">
          <button className="glass-input px-6 py-2 text-xs font-bold flex items-center gap-2 hover:bg-white/5 transition-colors">
            <Calendar size={14} />
            Last 30 Days
          </button>
          <button className="btn-accent px-6 py-2 text-xs font-bold flex items-center gap-2">
            <Download size={14} />
            Export Report
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <RevenueStatCard 
          label="TOTAL REVENUE" 
          value="₱313,300" 
          trend="+ 8.4%" 
          trendUp={true}
          icon={<DollarSign size={20} className="text-emerald-400" />}
        />
        <RevenueStatCard 
          label="AVG TRANSACTION" 
          value="₱4,200" 
          trend="- 2.1%" 
          trendUp={false}
          icon={<CreditCard size={20} className="text-indigo-400" />}
        />
        <RevenueStatCard 
          label="PENDING PAYMENTS" 
          value="₱12,450" 
          trend="42 students" 
          trendUp={true}
          icon={<TrendingUp size={20} className="text-amber-400" />}
        />
      </div>

      <div className="glass-card p-8">
        <div className="flex justify-between items-center mb-8">
          <h3 className="font-bold text-lg">Daily Collection Trend</h3>
          <div className="flex items-center gap-2 text-[10px] text-white/40 font-bold uppercase tracking-widest">
            <div className="w-2 h-2 rounded-full bg-accent" />
            Revenue (PHP)
          </div>
        </div>
        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4cc9f0" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#4cc9f0" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#ffffff40', fontSize: 12, fontWeight: 'bold' }} 
              />
              <YAxis hide />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1e1b4b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
              />
              <Area 
                type="monotone" 
                dataKey="amount" 
                stroke="#4cc9f0" 
                fillOpacity={1} 
                fill="url(#colorAmount)" 
                strokeWidth={3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="glass-card overflow-hidden">
        <div className="p-6 border-b border-white/5">
          <h3 className="font-bold text-lg">Recent Transactions</h3>
        </div>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/5 text-[10px] uppercase tracking-widest text-white/40 font-bold">
              <th className="px-6 py-4">Transaction ID</th>
              <th className="px-6 py-4">Student</th>
              <th className="px-6 py-4">Service</th>
              <th className="px-6 py-4">Amount</th>
              <th className="px-6 py-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {[1, 2, 3, 4, 5].map((i) => (
              <tr key={i} className="hover:bg-white/5 transition-colors">
                <td className="px-6 py-4 text-xs text-white/40 font-mono">TXN-9982{i}</td>
                <td className="px-6 py-4 text-sm font-bold">Student Name {i}</td>
                <td className="px-6 py-4 text-xs text-white/60">Tuition Fee Payment</td>
                <td className="px-6 py-4 text-sm font-bold text-accent">₱4,500.00</td>
                <td className="px-6 py-4">
                  <span className="bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border border-emerald-500/20">
                    Paid
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function RevenueStatCard({ label, value, trend, trendUp, icon }: any) {
  return (
    <div className="glass-card p-6 space-y-4">
      <div className="flex justify-between items-start">
        <label className="text-[10px] uppercase tracking-widest text-white/50 font-bold">{label}</label>
        {icon}
      </div>
      <div className="space-y-1">
        <div className="text-4xl font-black tracking-tighter">{value}</div>
        <div className={`flex items-center gap-1 text-xs ${trendUp ? 'text-emerald-400' : 'text-rose-400'}`}>
          {trendUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
          {trend}
        </div>
      </div>
    </div>
  );
}
