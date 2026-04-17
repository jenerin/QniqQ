/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { ReactNode, useState } from 'react';
import { 
  LayoutDashboard, 
  Library, 
  BarChart3, 
  FolderTree, 
  Key, 
  Settings, 
  LogOut,
  QrCode,
  User,
  ChevronRight,
  Plus,
  Users,
  Circle,
  Building2,
  Settings2,
  PieChart,
  Bot,
  MonitorPlay,
  CreditCard
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Auth from './components/Auth';
import AdminDashboard from './components/AdminDashboard';
import LiveQueue from './components/LiveQueue';
import StudentPanel from './components/StudentPanel';
import Departments from './components/Departments';
import Services from './components/Services';
import UserManagement from './components/UserManagement';
import MetricsAnalytics from './components/MetricsAnalytics';
import QRCodes from './components/QRCodes';
import UniQLogicAI from './components/UniQLogicAI';
import Revenue from './components/Revenue';
import Account from './components/Account';

type View = 'dashboard' | 'live-queue' | 'departments' | 'services' | 'users' | 'metrics' | 'revenue' | 'ai' | 'qr' | 'student' | 'account';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState<'admin' | 'student'>('admin');
  const [user, setUser] = useState<{ name: string, id: string } | null>(null);
  const [currentView, setCurrentView] = useState<View>('dashboard');

  const handleAuthSuccess = (userRole: 'admin' | 'student', name: string, id: string) => {
    setRole(userRole);
    setUser({ name, id });
    setIsAuthenticated(true);
    setCurrentView(userRole === 'admin' ? 'dashboard' : 'student');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center p-4 md:p-8">
        <Auth onSuccess={handleAuthSuccess} />
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-[1400px] h-[calc(100vh-4rem)] md:h-[900px] glass-panel flex overflow-hidden">
        {/* Sidebar */}
      {role === 'admin' && (
        <aside className="w-72 border-r border-white/5 p-8 flex flex-col bg-black/20">
          <div className="space-y-1 mb-12">
            <div className="flex items-center gap-3">
              <span className="text-3xl font-black tracking-tighter text-accent">UniQ</span>
            </div>
            <p className="text-[10px] font-bold tracking-[0.2em] text-white/30 leading-tight">
              WAIT IN CLASS, NOT IN LINE.
            </p>
          </div>

          <div className="flex-1 space-y-8 overflow-y-auto pr-2 custom-scrollbar">
            <SidebarSection label="Overview">
              <SidebarItem 
                icon={<LayoutDashboard size={18} />} 
                label="Dashboard" 
                active={currentView === 'dashboard'} 
                onClick={() => setCurrentView('dashboard')}
              />
              <SidebarItem 
                icon={<Circle size={18} fill="currentColor" className="text-rose-500" />} 
                label="Live Queue" 
                active={currentView === 'live-queue'} 
                onClick={() => setCurrentView('live-queue')}
              />
            </SidebarSection>

            <SidebarSection label="Management">
              <SidebarItem 
                icon={<Building2 size={18} />} 
                label="Departments" 
                active={currentView === 'departments'} 
                onClick={() => setCurrentView('departments')}
              />
              <SidebarItem 
                icon={<Settings2 size={18} />} 
                label="Services" 
                active={currentView === 'services'} 
                onClick={() => setCurrentView('services')}
              />
              <SidebarItem 
                icon={<Users size={18} />} 
                label="Users" 
                active={currentView === 'users'} 
                onClick={() => setCurrentView('users')}
              />
            </SidebarSection>

            <SidebarSection label="Analytics">
              <SidebarItem 
                icon={<TrendingUpIcon size={18} />} 
                label="UniQ-Metrics" 
                active={currentView === 'metrics'} 
                onClick={() => setCurrentView('metrics')}
              />
              <SidebarItem 
                icon={<CreditCard size={18} />} 
                label="Revenue" 
                active={currentView === 'revenue'} 
                onClick={() => setCurrentView('revenue')}
              />
            </SidebarSection>

            <SidebarSection label="System">
              <SidebarItem 
                icon={<Bot size={18} />} 
                label="UniQ-Logic AI" 
                active={currentView === 'ai'} 
                onClick={() => setCurrentView('ai')}
              />
              <SidebarItem 
                icon={<QrCode size={18} />} 
                label="QR Codes" 
                active={currentView === 'qr'} 
                onClick={() => setCurrentView('qr')}
              />
            </SidebarSection>
          </div>

          <div className="pt-8 border-t border-white/5 space-y-4">
            <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-white/5 border border-white/5 cursor-pointer hover:bg-white/10 transition-colors" onClick={() => setCurrentView('account')}>
              <div className="w-8 h-8 bg-indigo-500/20 rounded-lg flex items-center justify-center text-indigo-400">
                <User size={18} />
              </div>
              <div className="flex-1 overflow-hidden">
                <div className="text-xs font-bold truncate">{user?.name || 'Admin User'}</div>
                <div className="text-[10px] text-white/30 uppercase tracking-widest font-bold">Dean's Office</div>
              </div>
            </div>
            <button 
              onClick={() => setIsAuthenticated(false)}
              className="w-full flex items-center gap-3 px-4 py-2 text-white/40 hover:text-white transition-colors text-sm font-medium"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </aside>
      )}

      {/* Main Content */}
      <main className={`flex-1 overflow-y-auto bg-black/10 ${role === 'admin' ? 'p-10' : 'p-6'}`}>
        {role === 'student' && (
          <div className="flex justify-between items-center mb-8">
            <span className="text-2xl font-black tracking-tighter text-accent">UniQ</span>
            <button 
              onClick={() => setIsAuthenticated(false)}
              className="flex items-center gap-2 text-white/40 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest"
            >
              <LogOut size={14} />
              Logout
            </button>
          </div>
        )}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {currentView === 'dashboard' && <AdminDashboard />}
            {currentView === 'live-queue' && <LiveQueue />}
            {currentView === 'departments' && <Departments />}
            {currentView === 'services' && <Services />}
            {currentView === 'users' && <UserManagement />}
            {currentView === 'metrics' && <MetricsAnalytics />}
            {currentView === 'revenue' && <Revenue />}
            {currentView === 'qr' && <QRCodes />}
            {currentView === 'ai' && <UniQLogicAI />}
            {currentView === 'student' && user && <StudentPanel user={user} />}
            {currentView === 'account' && <Account />}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
    </div>
  );
}

function SidebarSection({ label, children }: { label: string, children: ReactNode }) {
  return (
    <div className="space-y-3">
      <label className="text-[10px] uppercase tracking-[0.2em] text-white/20 font-black px-4">{label}</label>
      <div className="space-y-1">
        {children}
      </div>
    </div>
  );
}

function SidebarItem({ icon, label, active = false, onClick }: { icon: ReactNode, label: string, active?: boolean, onClick?: () => void }) {
  return (
    <div 
      onClick={onClick}
      className={`
        flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all group
        ${active ? 'bg-accent/10 text-accent' : 'text-white/50 hover:bg-white/5 hover:text-white/80'}
      `}
    >
      <div className={`${active ? 'text-accent' : 'text-white/30 group-hover:text-white/60'} transition-colors`}>
        {icon}
      </div>
      <span className="text-sm font-bold tracking-tight">{label}</span>
      {active && <motion.div layoutId="sidebar-active" className="ml-auto w-1.5 h-1.5 rounded-full bg-accent" />}
    </div>
  );
}

function TrendingUpIcon({ size, className }: any) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M22 7L13.5 15.5L8.5 10.5L2 17" />
      <polyline points="16 7 22 7 22 13" />
    </svg>
  );
}

function NavItem({ icon, label, active = false }: { icon: ReactNode, label: string, active?: boolean }) {
  return (
    <div className={`
      flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all
      ${active ? 'bg-white/10 text-white border-l-4 border-accent' : 'text-white/50 hover:bg-white/5 hover:text-white/80'}
    `}>
      {icon}
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
}

function ColorDot({ color, active = false, onClick }: { color: string, active?: boolean, onClick: () => void }) {
  return (
    <div 
      onClick={onClick}
      className={`w-8 h-8 rounded-lg cursor-pointer border-2 transition-all ${active ? 'border-white scale-110 shadow-lg' : 'border-transparent hover:scale-105'}`}
      style={{ backgroundColor: color }}
    />
  );
}

function RecentItem({ label, status }: { label: string, status: string }) {
  return (
    <div className="flex items-center justify-between p-3 border-b border-white/5 text-sm">
      <span className="text-white/80 font-mono text-xs">{label}</span>
      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${status === 'Active' ? 'bg-accent/20 text-accent' : 'bg-white/10 text-white/40'}`}>
        {status}
      </span>
    </div>
  );
}
