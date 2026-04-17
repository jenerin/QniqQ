import React from 'react';
import { 
  Search, 
  Plus, 
  Eye, 
  MoreHorizontal,
  User,
  UserCircle
} from 'lucide-react';

const mockUsers = [
  { id: '2021-001', name: 'Ana Cruz', email: 'anacruz@ust.edu.ph', role: 'student', joined: 'Jan 2025' },
  { id: '2021-002', name: 'Carlo Dela Rosa', email: 'cdelarosa@ust.edu.ph', role: 'student', joined: 'Jan 2025' },
  { id: '2021-003', name: 'Bianca Villanueva', email: 'bvillanueva@ust.edu.ph', role: 'student', joined: 'Jan 2025' },
  { id: 'STAFF-001', name: 'Jose Reyes', email: 'jreyes@ust.edu.ph', role: 'staff', joined: 'Jan 2025' },
  { id: 'ADMIN-001', name: 'Maria Santos', email: 'msantos@ust.edu.ph', role: 'admin', joined: 'Jan 2025' },
];

export default function UserManagement() {
  return (
    <div className="space-y-8">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
          <p className="text-white/40 text-sm mt-1">Manage student and staff access</p>
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

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={18} />
          <input 
            type="text" 
            className="w-full glass-input pl-12" 
            placeholder="Search by name or student number..." 
          />
        </div>
        <button className="btn-accent px-6 py-2 text-xs font-bold flex items-center gap-2">
          <Plus size={14} />
          Add User
        </button>
      </div>

      <div className="glass-card overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/5 text-[10px] uppercase tracking-widest text-white/40 font-bold">
              <th className="px-6 py-4">Student #</th>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4">Joined</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {mockUsers.map((user) => (
              <tr key={user.id} className="hover:bg-white/5 transition-colors group">
                <td className="px-6 py-4 text-xs text-white/40 font-mono">{user.id}</td>
                <td className="px-6 py-4 text-sm font-bold">{user.name}</td>
                <td className="px-6 py-4 text-xs text-white/40">{user.email}</td>
                <td className="px-6 py-4">
                  <span className={`
                    px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border
                    ${user.role === 'admin' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 
                      user.role === 'staff' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : 
                      'bg-indigo-500/10 text-indigo-400 border-indigo-500/20'}
                  `}>
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 text-xs text-white/40">{user.joined}</td>
                <td className="px-6 py-4">
                  <button className="p-2 hover:bg-white/10 text-white/40 rounded-lg transition-colors flex items-center gap-2 text-[10px] font-bold uppercase border border-white/5">
                    <Eye size={12} />
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
