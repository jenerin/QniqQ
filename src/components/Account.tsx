import React from 'react';
import { 
  User, 
  Mail, 
  Shield, 
  Bell, 
  LogOut, 
  Camera,
  Key,
  Smartphone
} from 'lucide-react';

export default function Account() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">Account Settings</h1>
        <p className="text-white/40 text-sm mt-1">Manage your profile and security preferences</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Profile Sidebar */}
        <div className="space-y-6">
          <div className="glass-card p-8 flex flex-col items-center text-center space-y-4">
            <div className="relative group">
              <div className="w-24 h-24 bg-accent/20 rounded-full flex items-center justify-center text-accent text-3xl font-bold border-2 border-accent/30">
                JD
              </div>
              <button className="absolute bottom-0 right-0 p-2 bg-accent text-slate-900 rounded-full shadow-lg hover:scale-110 transition-transform">
                <Camera size={16} />
              </button>
            </div>
            <div>
              <h3 className="font-bold text-lg">John Doe</h3>
              <p className="text-xs text-white/40">Administrator</p>
            </div>
            <button className="w-full py-2 text-xs font-bold text-rose-400 hover:bg-rose-500/10 rounded-xl transition-colors border border-rose-500/20 flex items-center justify-center gap-2">
              <LogOut size={14} />
              Sign Out
            </button>
          </div>

          <div className="glass-card p-4 space-y-1">
            <AccountNavButton icon={<User size={16} />} label="Personal Info" active={true} />
            <AccountNavButton icon={<Shield size={16} />} label="Security" />
            <AccountNavButton icon={<Bell size={16} />} label="Notifications" />
            <AccountNavButton icon={<Smartphone size={16} />} label="Connected Devices" />
          </div>
        </div>

        {/* Main Content */}
        <div className="md:col-span-2 space-y-6">
          <div className="glass-card p-8 space-y-8">
            <h3 className="font-bold text-xl border-b border-white/5 pb-4">Personal Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-white/50 font-bold">Full Name</label>
                <input type="text" className="w-full glass-input" defaultValue="John Doe" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-white/50 font-bold">Employee ID</label>
                <input type="text" className="w-full glass-input" defaultValue="ADMIN-001" disabled />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-[10px] uppercase tracking-widest text-white/50 font-bold">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={18} />
                  <input type="email" className="w-full glass-input pl-12" defaultValue="johndoe@university.edu" />
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button className="btn-accent px-8 py-3 font-bold">
                Save Changes
              </button>
            </div>
          </div>

          <div className="glass-card p-8 space-y-6">
            <h3 className="font-bold text-xl border-b border-white/5 pb-4">Security</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-indigo-500/20 rounded-xl flex items-center justify-center text-indigo-400">
                    <Key size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">Two-Factor Authentication</h4>
                    <p className="text-xs text-white/40">Add an extra layer of security to your account</p>
                  </div>
                </div>
                <div className="w-12 h-6 bg-emerald-500/20 rounded-full relative cursor-pointer border border-emerald-500/30">
                  <div className="absolute right-1 top-1 w-4 h-4 bg-emerald-400 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AccountNavButton({ icon, label, active = false }: any) {
  return (
    <button className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${active ? 'bg-accent text-slate-900 shadow-lg shadow-accent/10' : 'text-white/40 hover:bg-white/5 hover:text-white'}`}>
      {icon}
      {label}
    </button>
  );
}
