import React from 'react';
import { 
  Bot, 
  Zap, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle2,
  BrainCircuit,
  Sparkles
} from 'lucide-react';

export default function UniQLogicAI() {
  return (
    <div className="space-y-8">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
            <Bot className="text-accent" />
            UniQ-Logic AI
          </h1>
          <p className="text-white/40 text-sm mt-1">AI-driven queue optimization and student flow predictions</p>
        </div>
        <div className="flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full border border-accent/20 text-xs font-bold uppercase tracking-widest">
          <Sparkles size={14} className="animate-pulse" />
          System Optimized
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-card p-8 space-y-6 border-accent/20 bg-accent/5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-accent/20 rounded-2xl flex items-center justify-center text-accent">
                <BrainCircuit size={28} />
              </div>
              <div>
                <h3 className="text-xl font-bold">Predictive Flow Analysis</h3>
                <p className="text-white/40 text-sm">AI is currently analyzing peak traffic patterns</p>
              </div>
            </div>
            
            <div className="space-y-4 pt-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-white/60">System Confidence</span>
                <span className="text-accent font-bold">94.2%</span>
              </div>
              <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-accent rounded-full" style={{ width: '94.2%' }} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="bg-black/20 p-6 rounded-2xl space-y-2">
                <div className="text-3xl font-bold text-emerald-400">10:30 AM</div>
                <div className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Next Peak Predicted</div>
              </div>
              <div className="bg-black/20 p-6 rounded-2xl space-y-2">
                <div className="text-3xl font-bold text-amber-400">-12%</div>
                <div className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Wait Time Reduction</div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-lg">Active Optimization Strategies</h3>
            <div className="space-y-3">
              <StrategyItem 
                title="Dynamic Window Reallocation" 
                desc="Accounting Window 3 reallocated to Registrar for high volume"
                status="Active"
              />
              <StrategyItem 
                title="Student Notification Throttling" 
                desc="Delaying 'Near Turn' alerts to prevent lobby overcrowding"
                status="Monitoring"
              />
              <StrategyItem 
                title="Service Duration Normalization" 
                desc="Adjusting estimated wait times based on live staff performance"
                status="Active"
              />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass-card p-6 space-y-6">
            <h3 className="font-bold text-lg">AI Insights</h3>
            <div className="space-y-6">
              <InsightItem 
                icon={<TrendingUp className="text-emerald-400" />}
                title="Efficiency Gain"
                text="System efficiency is up by 18% compared to manual queuing."
              />
              <InsightItem 
                icon={<AlertCircle className="text-amber-400" />}
                title="Bottleneck Alert"
                text="Registrar Window 2 is processing 30% slower than average."
              />
              <InsightItem 
                icon={<CheckCircle2 className="text-indigo-400" />}
                title="Student Satisfaction"
                text="Sentiment analysis shows 92% positive feedback on wait times."
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StrategyItem({ title, desc, status }: any) {
  return (
    <div className="glass-card p-4 flex items-center justify-between hover:bg-white/10 transition-colors">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-white/40">
          <Zap size={20} />
        </div>
        <div>
          <h4 className="font-bold text-sm">{title}</h4>
          <p className="text-xs text-white/40">{desc}</p>
        </div>
      </div>
      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${status === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-white/10 text-white/40 border-white/10'}`}>
        {status}
      </span>
    </div>
  );
}

function InsightItem({ icon, title, text }: any) {
  return (
    <div className="flex gap-4">
      <div className="mt-1">{icon}</div>
      <div className="space-y-1">
        <h4 className="font-bold text-sm">{title}</h4>
        <p className="text-xs text-white/40 leading-relaxed">{text}</p>
      </div>
    </div>
  );
}
