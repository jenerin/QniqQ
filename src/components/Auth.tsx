import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Lock, User, ArrowRight, Github, Chrome, CreditCard, UserCircle } from 'lucide-react';

interface AuthProps {
  onSuccess: (role: 'admin' | 'student', name: string, id: string) => void;
}

export default function Auth({ onSuccess }: AuthProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [idNumber, setIdNumber] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [gmail, setGmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    // Mock authentication logic
    setTimeout(() => {
      setLoading(false);
      const role = idNumber.toUpperCase().startsWith('ADMIN') ? 'admin' : 'student';
      
      let displayName = '';

      if (isLogin) {
        // Try to find the name in mock storage (localStorage)
        const savedUsers = JSON.parse(localStorage.getItem('uniq_mock_users') || '{}');
        displayName = savedUsers[idNumber] || (role === 'admin' ? 'Admin User' : `Student ${idNumber}`);
      } else {
        // Sign up: Save the name to mock storage
        const savedUsers = JSON.parse(localStorage.getItem('uniq_mock_users') || '{}');
        savedUsers[idNumber] = fullName;
        localStorage.setItem('uniq_mock_users', JSON.stringify(savedUsers));
        displayName = fullName;
      }
      
      onSuccess(role, displayName, idNumber);
    }, 1500);
  };

  return (
    <div className="w-full max-w-md glass-card p-10 space-y-8">
      <div className="text-center space-y-2">
        <div className="flex justify-center mb-4">
          <span className="text-4xl font-black tracking-tighter text-accent">UniQ</span>
        </div>
        <h2 className="text-3xl font-bold tracking-tight">
          {isLogin ? 'Welcome Back' : 'Create Account'}
        </h2>
        <p className="text-white/50 text-sm">
          {isLogin ? 'Enter your credentials to access your portal' : 'Join UniQ and skip the line'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <AnimatePresence mode="wait">
          {!isLogin && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-5 overflow-hidden"
            >
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-white/50 font-bold">Complete Name</label>
                <div className="relative">
                  <UserCircle className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={18} />
                  <input
                    type="text"
                    required
                    className="w-full glass-input pl-12"
                    placeholder="Juan Dela Cruz"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-white/50 font-bold">Gmail Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={18} />
                  <input
                    type="email"
                    required
                    className="w-full glass-input pl-12"
                    placeholder="name@gmail.com"
                    value={gmail}
                    onChange={(e) => setGmail(e.target.value)}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-widest text-white/50 font-bold">ID Number</label>
          <div className="relative">
            <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={18} />
            <input
              type="text"
              required
              className="w-full glass-input pl-12"
              placeholder="2021-0001"
              value={idNumber}
              onChange={(e) => setIdNumber(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-widest text-white/50 font-bold">Password</label>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={18} />
            <input
              type="password"
              required
              className="w-full glass-input pl-12"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        {error && <p className="text-red-400 text-xs text-center">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full btn-accent flex items-center justify-center gap-2 group"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              {isLogin ? 'Sign In' : 'Create Account'}
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>
      </form>

      <p className="text-center text-sm text-white/40">
        {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
        <button
          onClick={() => setIsLogin(!isLogin)}
          className="text-accent font-semibold hover:underline"
        >
          {isLogin ? 'Sign Up' : 'Log In'}
        </button>
      </p>
    </div>
  );
}
