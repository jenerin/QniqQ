import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import { Plus } from 'lucide-react';

const dailyVolume = [
  { name: 'Mon', tickets: 87 },
  { name: 'Tue', tickets: 93 },
  { name: 'Wed', tickets: 76 },
  { name: 'Thu', tickets: 102 },
  { name: 'Fri', tickets: 88 },
  { name: 'Sat', tickets: 61 },
  { name: 'Today', tickets: 34 },
];

const deptPerformance = [
  { dept: 'Registrar', total: 95, completed: 89, rate: 92, wait: 23.1, service: 14, noShows: 3 },
  { dept: 'Accounting', total: 76, completed: 72, rate: 92, wait: 15.4, service: 9, noShows: 4 },
  { dept: 'Student Affairs', total: 52, completed: 45, rate: 83, wait: 28.7, service: 17, noShows: 4 },
  { dept: 'Library', total: 32, completed: 31, rate: 91, wait: 5.2, service: 3, noShows: 3 },
  { dept: 'Guidance Center', total: 25, completed: 22, rate: 81, wait: 31, service: 19, noShows: 3 },
];

export default function MetricsAnalytics() {
  return (
    <div className="space-y-8">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">UniQ-Metrics Analytics</h1>
          <p className="text-white/40 text-sm mt-1">Deep dive into queue performance</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-emerald-500/10 text-emerald-400 px-3 py-1.5 rounded-full border border-emerald-500/20 text-xs font-medium">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            Live Data
          </div>
          <button className="glass-input px-4 py-1.5 text-xs font-medium hover:bg-white/5 transition-colors">
            Settings
          </button>
          <button className="btn-accent px-4 py-1.5 text-xs font-bold flex items-center gap-2">
            <Plus size={14} />
            Add Queue
          </button>
        </div>
      </header>

      {/* Top Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard label="TOTAL THIS WEEK" value="541" />
        <MetricCard label="COMPLETION RATE" value="89%" />
        <MetricCard label="AVG WAIT (WEEK)" value="21min" />
        <MetricCard label="PEAK HOUR" value="10AM" />
      </div>

      {/* Chart */}
      <div className="glass-card p-8">
        <div className="flex justify-between items-center mb-8">
          <h3 className="font-bold text-lg">Daily Ticket Volume — Last 7 Days</h3>
          <span className="text-[10px] text-white/40 uppercase tracking-widest font-bold">All Departments</span>
        </div>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={dailyVolume}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#ffffff40', fontSize: 12, fontWeight: 'bold' }} 
              />
              <YAxis hide />
              <Tooltip 
                cursor={{ fill: '#ffffff05' }}
                contentStyle={{ backgroundColor: '#1e1b4b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
              />
              <Bar dataKey="tickets" fill="#4cc9f0" radius={[4, 4, 0, 0]}>
                {dailyVolume.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.name === 'Today' ? '#4cc9f0' : '#4cc9f040'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-between mt-4 px-2">
          {dailyVolume.map((d) => (
            <span key={d.name} className="text-[10px] font-bold text-white/60">{d.tickets}</span>
          ))}
        </div>
      </div>

      {/* Per-Department Performance */}
      <div className="glass-card overflow-hidden">
        <div className="p-6 border-b border-white/5">
          <h3 className="font-bold text-lg">Per-Department Performance</h3>
        </div>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/5 text-[10px] uppercase tracking-widest text-white/40 font-bold">
              <th className="px-6 py-4">Department</th>
              <th className="px-6 py-4">Total Today</th>
              <th className="px-6 py-4">Completed</th>
              <th className="px-6 py-4">Rate</th>
              <th className="px-6 py-4">Avg Wait</th>
              <th className="px-6 py-4">Avg Service</th>
              <th className="px-6 py-4">No-Shows</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {deptPerformance.map((item) => (
              <tr key={item.dept} className="hover:bg-white/5 transition-colors">
                <td className="px-6 py-4 text-sm font-bold">{item.dept}</td>
                <td className="px-6 py-4 text-sm font-bold text-white/60">{item.total}</td>
                <td className="px-6 py-4 text-sm font-bold text-emerald-400">{item.completed}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="h-1.5 w-16 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-400 rounded-full" style={{ width: `${item.rate}%` }} />
                    </div>
                    <span className="text-xs font-bold">{item.rate}%</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm font-bold text-amber-400">{item.wait} min</td>
                <td className="px-6 py-4 text-sm font-bold text-white/40">{item.service} min</td>
                <td className="px-6 py-4 text-sm font-bold text-rose-500">{item.noShows}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function MetricCard({ label, value }: { label: string, value: string }) {
  return (
    <div className="glass-card p-6 space-y-4">
      <label className="text-[10px] uppercase tracking-widest text-white/50 font-bold">{label}</label>
      <div className="text-4xl font-black tracking-tighter">{value}</div>
    </div>
  );
}
