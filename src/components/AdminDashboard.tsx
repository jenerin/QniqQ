import React from 'react';
import { 
  Users, 
  CheckCircle2, 
  Clock, 
  UserX, 
  TrendingUp, 
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { motion } from 'motion/react';
import { useQueueStore } from '../services/queueService';

const weeklyData = [
  { name: 'Mon', tickets: 87 },
  { name: 'Tue', tickets: 93 },
  { name: 'Wed', tickets: 76 },
  { name: 'Thu', tickets: 102 },
  { name: 'Fri', tickets: 88 },
  { name: 'Sat', tickets: 61 },
  { name: 'Today', tickets: 34 },
];

export default function AdminDashboard() {
  const { tickets } = useQueueStore();

  const getDeptStats = (code: string) => {
    const deptTickets = tickets.filter(t => t.deptCode === code);
    return {
      waiting: deptTickets.filter(t => t.status === 'waiting').length,
      serving: deptTickets.filter(t => t.status === 'serving').length,
      done: deptTickets.filter(t => t.status === 'done').length,
    };
  };

  const regStats = getDeptStats('REG');
  const accStats = getDeptStats('ACC');
  const osaStats = getDeptStats('OSA');

  const totalTickets = tickets.length;
  const totalDone = tickets.filter(t => t.status === 'done').length;

  const outcomeData = [
    { name: 'Completed', value: totalDone, color: '#4cc9f0' },
    { name: 'Cancelled', value: 27, color: '#f59e0b' },
    { name: 'No-Show', value: 28, color: '#ef4444' },
  ];

  return (
    <div className="space-y-8">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dean's Dashboard</h1>
          <p className="text-white/40 text-sm mt-1">Real-time overview of university operations</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-emerald-500/10 text-emerald-400 px-3 py-1.5 rounded-full border border-emerald-500/20 text-xs font-medium">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            Live Data
          </div>
          <button className="glass-input px-4 py-1.5 text-xs font-medium hover:bg-white/5 transition-colors">
            Settings
          </button>
          <button className="btn-accent px-4 py-1.5 text-xs font-bold">
            + Add Queue
          </button>
        </div>
      </header>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          label="TICKETS TODAY" 
          value={totalTickets.toString()} 
          trend="+ 12% vs yesterday" 
          trendUp={true}
          icon={<Users size={20} className="text-accent" />}
        />
        <StatCard 
          label="COMPLETED" 
          value={totalDone.toString()} 
          trend={`Completion rate: ${Math.round((totalDone / (totalTickets || 1)) * 100)}%`} 
          trendUp={true}
          icon={<CheckCircle2 size={20} className="text-emerald-400" />}
        />
        <StatCard 
          label="AVG WAIT TIME" 
          value="19.4 min" 
          trend="↓ 3.2 min vs last week" 
          trendUp={false}
          icon={<Clock size={20} className="text-indigo-400" />}
        />
        <StatCard 
          label="NO-SHOWS" 
          value="28" 
          trend="5% of total tickets" 
          trendUp={false}
          icon={<UserX size={20} className="text-rose-400" />}
        />
      </div>

      {/* Department Load */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Department Load — Right Now</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <DepartmentCard 
            name="Registrar" 
            code="REG" 
            waiting={regStats.waiting} 
            inService={regStats.serving} 
            doneToday={regStats.done} 
            avgMin={23.1} 
            capacity={Math.min(100, (regStats.waiting + regStats.serving) * 20)}
          />
          <DepartmentCard 
            name="Accounting" 
            code="ACC" 
            waiting={accStats.waiting} 
            inService={accStats.serving} 
            doneToday={accStats.done} 
            avgMin={15.4} 
            capacity={Math.min(100, (accStats.waiting + accStats.serving) * 20)}
          />
          <DepartmentCard 
            name="Student Affairs" 
            code="OSA" 
            waiting={osaStats.waiting} 
            inService={osaStats.serving} 
            doneToday={osaStats.done} 
            avgMin={28.7} 
            capacity={Math.min(100, (osaStats.waiting + osaStats.serving) * 20)}
          />
        </div>
      </section>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 glass-card">
          <div className="flex justify-between items-center mb-8">
            <h3 className="font-semibold">Weekly Ticket Volume</h3>
            <div className="flex bg-black/20 p-1 rounded-lg">
              <button className="px-3 py-1 text-xs font-medium bg-white/10 rounded-md">Tickets</button>
              <button className="px-3 py-1 text-xs font-medium text-white/40">Wait Time</button>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#ffffff40', fontSize: 12 }} 
                />
                <YAxis hide />
                <Tooltip 
                  cursor={{ fill: '#ffffff05' }}
                  contentStyle={{ backgroundColor: '#1e1b4b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                />
                <Bar dataKey="tickets" fill="#4cc9f0" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="text-center mt-4 text-xs text-white/40">
            Total this week: 541 tickets • 491 completed
          </div>
        </div>

        <div className="glass-card">
          <h3 className="font-semibold mb-8">Ticket Outcomes</h3>
          <div className="h-[250px] relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={outcomeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {outcomeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-3xl font-bold">89%</span>
              <span className="text-[10px] text-white/40 uppercase tracking-widest">Success</span>
            </div>
          </div>
          <div className="space-y-3 mt-6">
            {outcomeData.map((item) => (
              <div key={item.name} className="flex justify-between items-center text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-white/60">{item.name}</span>
                </div>
                <span className="font-bold">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Suggestions */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <AlertCircle size={18} className="text-accent" />
          <h2 className="text-xl font-semibold">UniQ-Logic Suggestions</h2>
        </div>
        <div className="space-y-3">
          <SuggestionItem 
            title="Accounting is clear! Pay your fees now to skip the later rush."
            desc="Registrar (4 waiting) → suggest → Accounting (1 waiting)"
          />
          <SuggestionItem 
            title="Library has zero queue. Get your library card while OSA clears up."
            desc="Student Affairs (6 waiting) → suggest → Library (0 waiting)"
          />
        </div>
      </section>
    </div>
  );
}

function StatCard({ label, value, trend, trendUp, icon }: any) {
  return (
    <div className="glass-card p-6 space-y-4">
      <div className="flex justify-between items-start">
        <label className="text-[10px] uppercase tracking-widest text-white/50 font-bold">{label}</label>
        {icon}
      </div>
      <div className="space-y-1">
        <div className="text-4xl font-bold tracking-tighter">{value}</div>
        <div className={`flex items-center gap-1 text-xs ${trendUp ? 'text-emerald-400' : 'text-indigo-400'}`}>
          {trendUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
          {trend}
        </div>
      </div>
    </div>
  );
}

function DepartmentCard({ name, code, waiting, inService, doneToday, avgMin, capacity }: any) {
  return (
    <div className="glass-card p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-lg">{name}</h3>
        <span className="bg-indigo-500/20 text-indigo-400 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">{code}</span>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-black/20 p-4 rounded-xl">
          <div className="text-2xl font-bold text-indigo-400">{waiting}</div>
          <div className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Waiting</div>
        </div>
        <div className="bg-black/20 p-4 rounded-xl">
          <div className="text-2xl font-bold text-emerald-400">{inService}</div>
          <div className="text-[10px] text-white/40 uppercase tracking-widest font-bold">In Service</div>
        </div>
        <div className="bg-black/20 p-4 rounded-xl">
          <div className="text-2xl font-bold text-emerald-400">{doneToday}</div>
          <div className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Done Today</div>
        </div>
        <div className="bg-black/20 p-4 rounded-xl">
          <div className="text-2xl font-bold text-amber-400">{avgMin}</div>
          <div className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Avg Min</div>
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex justify-between text-[10px] text-white/40 uppercase tracking-widest font-bold">
          <span>Capacity</span>
          <span>{capacity}% (6/6)</span>
        </div>
        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
          <div 
            className={`h-full rounded-full ${capacity > 80 ? 'bg-rose-500' : 'bg-emerald-500'}`} 
            style={{ width: `${capacity}%` }} 
          />
        </div>
      </div>
    </div>
  );
}

function SuggestionItem({ title, desc }: any) {
  return (
    <div className="glass-card p-4 flex items-center justify-between group hover:bg-white/10 transition-colors">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 bg-amber-500/20 rounded-xl flex items-center justify-center text-amber-400">
          <TrendingUp size={20} />
        </div>
        <div>
          <h4 className="font-medium text-sm">{title}</h4>
          <p className="text-xs text-white/40">{desc}</p>
        </div>
      </div>
      <button className="btn-accent px-4 py-2 text-xs font-bold">
        Send Alert
      </button>
    </div>
  );
}
