import React from 'react';
import { 
  Plus, 
  Edit2, 
  Trash2, 
  Clock,
  FileText,
  Search
} from 'lucide-react';

const mockServices = [
  { id: 1, dept: 'Registrar', name: 'Request Transcript', duration: '15 min', docs: 'Valid ID, Request Form' },
  { id: 2, dept: 'Registrar', name: 'Enroll in Subject', duration: '10 min', docs: 'Add/Drop Form, Adviser Slip' },
  { id: 3, dept: 'Accounting', name: 'Pay Tuition Fee', duration: '7 min', docs: 'Assessment Form' },
  { id: 4, dept: 'Accounting', name: 'Request Official Receipt', duration: '5 min', docs: 'Valid ID' },
  { id: 5, dept: 'Student Affairs', name: 'ID Renewal', duration: '10 min', docs: '2x2 Photo, Old ID' },
  { id: 6, dept: 'Library', name: 'Library Card Application', duration: '5 min', docs: 'Valid School ID' },
  { id: 7, dept: 'Guidance', name: 'Clearance Signing', duration: '15 min', docs: 'Clearance Form' },
];

export default function Services() {
  return (
    <div className="space-y-8">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Services</h1>
          <p className="text-white/40 text-sm mt-1">Configure service types and requirements</p>
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

      <div className="glass-card overflow-hidden">
        <div className="p-6 border-b border-white/5 flex justify-between items-center">
          <h3 className="font-bold text-lg">All Services</h3>
          <button className="btn-accent px-4 py-2 text-xs font-bold flex items-center gap-2">
            <Plus size={14} />
            Add Service
          </button>
        </div>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/5 text-[10px] uppercase tracking-widest text-white/40 font-bold">
              <th className="px-6 py-4">Department</th>
              <th className="px-6 py-4">Service Name</th>
              <th className="px-6 py-4">Avg Duration</th>
              <th className="px-6 py-4">Required Docs</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {mockServices.map((service) => (
              <tr key={service.id} className="hover:bg-white/5 transition-colors group">
                <td className="px-6 py-4">
                  <span className="bg-indigo-500/10 text-indigo-400 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border border-indigo-500/20">
                    {service.dept}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm font-bold">{service.name}</td>
                <td className="px-6 py-4 text-xs font-bold text-amber-400">{service.duration}</td>
                <td className="px-6 py-4 text-xs text-white/40">{service.docs}</td>
                <td className="px-6 py-4">
                  <button className="p-2 hover:bg-white/10 text-white/40 rounded-lg transition-colors flex items-center gap-2 text-[10px] font-bold uppercase border border-white/5">
                    <Edit2 size={12} />
                    Edit
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
