import React from 'react';
import { 
  Building2, 
  Plus, 
  Edit2, 
  Trash2, 
  MoreHorizontal,
  Search,
  MapPin,
  Users
} from 'lucide-react';

const mockDepts = [
  { id: 'reg', code: 'REG', name: 'Registrar', location: 'Main Building', windows: 6, status: 'Active' },
  { id: 'acc', code: 'ACC', name: 'Accounting', location: 'Main Building', windows: 8, status: 'Active' },
  { id: 'osa', code: 'OSA', name: 'Student Affairs', location: 'Main Building', windows: 4, status: 'Active' },
  { id: 'lib', code: 'LIB', name: 'Library', location: 'Main Building', windows: 3, status: 'Active' },
  { id: 'gc', code: 'GC', name: 'Guidance Center', location: 'Main Building', windows: 2, status: 'Active' },
];

export default function Departments() {
  return (
    <div className="space-y-8">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Departments</h1>
          <p className="text-white/40 text-sm mt-1">Manage university service units and windows</p>
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

      <div className="flex justify-end">
        <button className="btn-accent px-6 py-2 text-xs font-bold flex items-center gap-2">
          <Plus size={14} />
          Add Department
        </button>
      </div>

      <div className="glass-card overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/5 text-[10px] uppercase tracking-widest text-white/40 font-bold">
              <th className="px-6 py-4">Code</th>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Location</th>
              <th className="px-6 py-4">Max Concurrent</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {mockDepts.map((dept) => (
              <tr key={dept.id} className="hover:bg-white/5 transition-colors group">
                <td className="px-6 py-4 font-mono text-xs font-bold text-accent">{dept.code}</td>
                <td className="px-6 py-4 text-sm font-bold">{dept.name}</td>
                <td className="px-6 py-4 text-xs text-white/40">{dept.location}</td>
                <td className="px-6 py-4 text-xs font-bold">{dept.windows} windows</td>
                <td className="px-6 py-4">
                  <span className="bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border border-emerald-500/20">
                    {dept.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-white/10 text-white/40 rounded-lg transition-colors flex items-center gap-2 text-[10px] font-bold uppercase border border-white/5">
                      <Edit2 size={12} />
                      Edit
                    </button>
                    <button className="p-2 hover:bg-rose-500/20 text-rose-500 rounded-lg transition-colors border border-rose-500/10">
                      <Trash2 size={12} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
