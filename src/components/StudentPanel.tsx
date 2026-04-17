import React, { useState, useEffect } from 'react';
import { 
  QrCode, 
  Clock, 
  Users, 
  Bell, 
  ChevronRight,
  Search,
  CheckCircle2,
  AlertCircle,
  X,
  Camera
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Scanner } from '@yudiel/react-qr-scanner';
import { useQueueStore, Ticket } from '../services/queueService';

const departments = [
  { id: 'reg', name: 'Registrar', code: 'REG', waiting: 4, waitTime: '15 min' },
  { id: 'acc', name: 'Accounting', code: 'ACC', waiting: 1, waitTime: '5 min' },
  { id: 'osa', name: 'Student Affairs', code: 'OSA', waiting: 6, waitTime: '25 min' },
  { id: 'lib', name: 'Library', code: 'LIB', waiting: 0, waitTime: '0 min' },
  { id: 'gc', name: 'Guidance Center', code: 'GC', waiting: 2, waitTime: '10 min' },
];

interface StudentPanelProps {
  user: { name: string, id: string };
}

export default function StudentPanel({ user }: StudentPanelProps) {
  const { tickets, addTicket } = useQueueStore();
  const [activeTicket, setActiveTicket] = useState<Ticket | null>(null);
  const [joining, setJoining] = useState(false);
  const [showScanner, setShowScanner] = useState(false);
  const [selectedDept, setSelectedDept] = useState<any>(null);

  // Sync active ticket status from store
  useEffect(() => {
    if (activeTicket) {
      const updated = tickets.find(t => t.id === activeTicket.id);
      if (updated) setActiveTicket(updated);
    }
  }, [tickets]);

  useEffect(() => {
    // Check for "join" parameter in URL
    const params = new URLSearchParams(window.location.search);
    const joinCode = params.get('join');
    
    if (joinCode) {
      const dept = departments.find(d => joinCode.toUpperCase().includes(d.code));
      if (dept) {
        processJoin(dept);
        // Clear the URL parameter
        window.history.replaceState({}, document.title, window.location.pathname);
      }
    }
  }, []);

  const handleJoin = (dept: any) => {
    setSelectedDept(dept);
    setShowScanner(true);
  };

  const handleScan = (result: any) => {
    if (result && result[0]?.rawValue) {
      const scannedValue = result[0].rawValue.toUpperCase();
      setShowScanner(false);
      
      // Try to find department by code
      const foundDept = departments.find(d => scannedValue.includes(d.code));
      processJoin(foundDept || selectedDept || departments[0]);
    }
  };

  const processJoin = async (dept: any) => {
    setJoining(true);
    try {
      // Use the actual logged-in user's name and ID
      const ticket = await addTicket(dept.code, user.name, user.id);
      setActiveTicket(ticket);
    } catch (error) {
      console.error('Failed to join queue:', error);
    } finally {
      setJoining(false);
    }
  };

  // Calculate position in queue
  const getPosition = (ticket: Ticket) => {
    const deptWaiting = tickets
      .filter(t => t.deptCode === ticket.deptCode && (t.status === 'waiting' || t.status === 'serving'))
      .sort((a, b) => a.timestamp - b.timestamp);
    
    const index = deptWaiting.findIndex(t => t.id === ticket.id);
    return index + 1;
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <header className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-white">Student Portal</h1>
        <p className="text-white/40 text-sm">Select a department to join the queue.</p>
      </header>

      <AnimatePresence mode="wait">
        {activeTicket && activeTicket.status !== 'done' ? (
          <motion.div 
            key="active-ticket"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`glass-card p-8 border-accent/30 bg-accent/5 space-y-8 ${activeTicket.status === 'serving' ? 'ring-2 ring-emerald-400/50' : ''}`}
          >
            <div className="flex justify-between items-start">
              <div>
                <label className="text-[10px] uppercase tracking-widest text-accent font-bold">
                  {activeTicket.status === 'serving' ? 'YOUR TURN!' : 'Active Ticket'}
                </label>
                <div className="text-5xl font-black tracking-tighter text-accent">{activeTicket.number}</div>
              </div>
              <div className={`p-3 rounded-2xl ${activeTicket.status === 'serving' ? 'bg-emerald-400/20 text-emerald-400' : 'bg-accent/20 text-accent'}`}>
                <Bell size={24} className={activeTicket.status === 'serving' ? 'animate-bounce' : ''} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-black/20 p-4 rounded-xl">
                <div className="text-2xl font-bold text-white">
                  {activeTicket.status === 'serving' ? 'NOW' : getPosition(activeTicket)}
                </div>
                <div className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Your Position</div>
              </div>
              <div className="bg-black/20 p-4 rounded-xl">
                <div className="text-2xl font-bold text-amber-400">
                  {activeTicket.status === 'serving' ? '0 min' : `${getPosition(activeTicket) * 15} min`}
                </div>
                <div className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Est. Wait</div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm text-white">
                <div className={`w-2 h-2 rounded-full animate-pulse ${activeTicket.status === 'serving' ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                <span>Status: <span className="font-bold uppercase">{activeTicket.status}</span></span>
              </div>
              <p className="text-xs text-white/40 italic">
                {activeTicket.status === 'serving' 
                  ? 'Please proceed to the counter now!' 
                  : "We'll notify you when your turn is near. Please stay within the campus vicinity."}
              </p>
            </div>

            <button 
              onClick={() => setActiveTicket(null)}
              className="w-full py-3 text-xs font-bold text-rose-400 hover:bg-rose-500/10 rounded-xl transition-colors border border-rose-500/20"
            >
              Cancel Ticket
            </button>
          </motion.div>
        ) : (
          <motion.div 
            key="join-queue"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {activeTicket?.status === 'done' && (
              <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-xl flex items-center gap-3 text-emerald-400">
                <CheckCircle2 size={20} />
                <div className="text-xs font-bold">Your previous transaction is complete. Thank you!</div>
              </div>
            )}

            <div className="grid gap-4">
              {departments.map((dept) => {
                const deptWaiting = tickets.filter(t => t.deptCode === dept.code && t.status === 'waiting').length;
                return (
                  <div 
                    key={dept.id}
                    onClick={() => !joining && processJoin(dept)}
                    className="glass-card p-6 flex items-center justify-between group cursor-pointer hover:bg-white/10 transition-all active:scale-[0.98] border-white/5 hover:border-accent/30"
                  >
                    <div className="flex items-center gap-6">
                      <div className="w-14 h-14 bg-accent/20 rounded-2xl flex items-center justify-center text-accent font-black text-xl">
                        {dept.code}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white group-hover:text-accent transition-colors">{dept.name}</h3>
                        <div className="flex items-center gap-4 text-xs text-white/40 uppercase tracking-widest font-bold mt-1">
                          <span className="flex items-center gap-1"><Users size={12} /> {deptWaiting} waiting</span>
                          <span className="flex items-center gap-1"><Clock size={12} /> {deptWaiting * 15} min</span>
                        </div>
                      </div>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white/20 group-hover:bg-accent group-hover:text-slate-900 transition-all">
                      <ChevronRight size={24} />
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* QR Scanner Modal */}
      <AnimatePresence>
        {showScanner && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-6"
          >
            <div className="w-full max-w-md glass-card p-6 space-y-6 relative">
              <button 
                onClick={() => setShowScanner(false)}
                className="absolute right-4 top-4 text-white/40 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
              
              <div className="text-center space-y-2">
                <h3 className="text-xl font-bold text-white">
                  {selectedDept ? `Scan ${selectedDept.name} QR` : 'Scan Department QR'}
                </h3>
                <p className="text-xs text-white/40">Point your camera at the printed QR code</p>
              </div>

              <div className="aspect-square rounded-2xl overflow-hidden border-2 border-accent/30 relative">
                <Scanner 
                  onScan={handleScan}
                  onError={(err) => console.error(err)}
                  styles={{
                    container: { width: '100%', height: '100%' }
                  }}
                />
                <div className="absolute inset-0 border-[40px] border-black/40 pointer-events-none" />
                <div className="absolute inset-[40px] border-2 border-accent animate-pulse pointer-events-none" />
              </div>

              <button 
                onClick={() => setShowScanner(false)}
                className="w-full py-3 text-xs font-bold text-white/60 hover:text-white transition-colors"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {joining && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="glass-card p-8 flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin" />
            <p className="font-bold animate-pulse text-white">Generating your ticket...</p>
          </div>
        </div>
      )}
    </div>
  );
}
