import React, { useState } from 'react';
import { 
  Users, 
  Clock, 
  CheckCircle2, 
  Play, 
  MoreVertical,
  Search,
  Filter,
  ArrowRight,
  User
} from 'lucide-react';
import { useQueueStore } from '../services/queueService';

const departments = [
  { name: 'Registrar', code: 'REG', color: 'text-indigo-400', bg: 'bg-indigo-500/10' },
  { name: 'Accounting', code: 'ACC', color: 'text-amber-400', bg: 'bg-amber-500/10' },
  { name: 'Student Affairs', code: 'OSA', color: 'text-rose-400', bg: 'bg-rose-500/10' },
  { name: 'Library', code: 'LIB', color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  { name: 'Guidance Center', code: 'GC', color: 'text-amber-400', bg: 'bg-amber-500/10' },
];

export default function LiveQueue() {
  const { tickets, markAsDone, serveNext } = useQueueStore();
  const [selectedDept, setSelectedDept] = useState('REG');

  const deptTickets = tickets.filter(t => t.deptCode === selectedDept);
  const serving = deptTickets.find(t => t.status === 'serving');
  const waiting = deptTickets.filter(t => t.status === 'waiting').sort((a, b) => a.timestamp - b.timestamp);
  const completed = deptTickets.filter(t => t.status === 'done').sort((a, b) => b.timestamp - a.timestamp);

  return (
    <div className="space-y-8">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Live Queue Manager</h1>
          <p className="text-white/40 text-sm mt-1">Real-time student flow management</p>
        </div>
        <div className="flex gap-2 bg-white/5 p-1 rounded-xl border border-white/5 overflow-x-auto max-w-md custom-scrollbar">
          {departments.map((dept) => (
            <button
              key={dept.code}
              onClick={() => setSelectedDept(dept.code)}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                selectedDept === dept.code 
                ? 'bg-accent text-slate-900 shadow-lg shadow-accent/20' 
                : 'text-white/40 hover:text-white'
              }`}
            >
              {dept.name}
            </button>
          ))}
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Currently Serving */}
        <div className="lg:col-span-1 space-y-6">
          <h3 className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Currently Serving</h3>
          {serving ? (
            <div className="glass-card p-8 border-accent/30 bg-accent/5 space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Users size={80} />
              </div>
              <div className="space-y-1">
                <div className="text-5xl font-black tracking-tighter text-accent">{serving.number}</div>
                <div className="text-lg font-bold text-white">{serving.studentName}</div>
                <div className="text-xs text-white/40 font-mono">{serving.studentId}</div>
              </div>
              
              <div className="pt-4 flex gap-3">
                <button 
                  onClick={() => markAsDone(serving.id)}
                  className="flex-1 btn-accent py-3 flex items-center justify-center gap-2 font-bold"
                >
                  <CheckCircle2 size={18} />
                  Mark as Done
                </button>
              </div>
            </div>
          ) : (
            <div className="glass-card p-12 flex flex-col items-center justify-center text-center space-y-4 border-dashed">
              <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center text-white/20">
                <Users size={32} />
              </div>
              <div>
                <h4 className="font-bold">No one is being served</h4>
                <p className="text-xs text-white/40">Start serving the next student in line</p>
              </div>
              <button 
                onClick={() => serveNext(selectedDept)}
                className="btn-accent px-6 py-2 text-xs font-bold flex items-center gap-2"
              >
                <Play size={14} />
                Serve Next
              </button>
            </div>
          )}

          <div className="glass-card p-6 space-y-4">
            <h4 className="font-bold text-sm">Queue Stats</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-black/20 p-4 rounded-xl">
                <div className="text-2xl font-bold text-white">{waiting.length}</div>
                <div className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Waiting</div>
              </div>
              <div className="bg-black/20 p-4 rounded-xl">
                <div className="text-2xl font-bold text-emerald-400">{completed.length}</div>
                <div className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Completed</div>
              </div>
            </div>
          </div>
        </div>

        {/* Waiting List */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Waiting List</h3>
            <div className="flex items-center gap-2 text-[10px] text-white/40 font-bold">
              <Clock size={12} />
              EST. WAIT: {waiting.length * 15} MIN
            </div>
          </div>

          <div className="glass-card overflow-hidden">
            {waiting.length > 0 ? (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/5 text-[10px] uppercase tracking-widest text-white/40 font-bold">
                    <th className="px-6 py-4">Position</th>
                    <th className="px-6 py-4">Ticket</th>
                    <th className="px-6 py-4">Student</th>
                    <th className="px-6 py-4">Time Joined</th>
                    <th className="px-6 py-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {waiting.map((ticket, index) => (
                    <tr key={ticket.id} className="hover:bg-white/5 transition-colors group">
                      <td className="px-6 py-4">
                        <span className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center text-[10px] font-bold">
                          {index + 1}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm font-bold text-accent">{ticket.number}</td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-bold">{ticket.studentName}</div>
                        <div className="text-[10px] text-white/40 font-mono">{ticket.studentId}</div>
                      </td>
                      <td className="px-6 py-4 text-xs text-white/40">
                        {new Date(ticket.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button 
                          onClick={() => serveNext(selectedDept)}
                          className="p-2 hover:bg-accent hover:text-slate-900 text-white/40 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                        >
                          <Play size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="p-12 text-center text-white/20 font-bold">
                Waiting list is empty
              </div>
            )}
          </div>

          {/* Recently Completed */}
          <div className="space-y-4">
            <h3 className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Recently Completed</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {completed.slice(0, 4).map(ticket => (
                <div key={ticket.id} className="glass-card p-4 flex items-center justify-between opacity-60 hover:opacity-100 transition-opacity">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-emerald-500/10 text-emerald-400 rounded-xl flex items-center justify-center">
                      <CheckCircle2 size={20} />
                    </div>
                    <div>
                      <div className="text-sm font-bold">{ticket.studentName}</div>
                      <div className="text-[10px] text-white/40">{ticket.number}</div>
                    </div>
                  </div>
                  <div className="text-[10px] text-white/30 font-bold">
                    {new Date(ticket.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
