import React from 'react';
import { GamePhase } from '../../../types';
import { Clock } from 'lucide-react';

interface PhaseBarProps {
  phase: GamePhase;
  timeLeft: number;
}

export const PhaseBar: React.FC<PhaseBarProps> = ({ phase, timeLeft }) => {
  const getPhaseIndex = () => {
    switch (phase) {
      case 'BETTING': return 0;
      case 'TRADING': return 1;
      case 'LIQUIDATION': return 2;
      case 'SETTLEMENT': return 3;
      default: return 0;
    }
  };

  const phases = ['PRE-MARKET', 'ACTIVE', 'CRITICAL', 'ZERO'];
  const activeIdx = getPhaseIndex();

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `+00:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full mb-8 relative z-20">
        <div className="flex items-end justify-between mb-2">
             <div className="flex gap-4 items-center">
                 <div className={`font-bold text-xs uppercase tracking-[0.2em] px-2 py-1 border transition-colors ${
                     phase === 'LIQUIDATION' ? 'text-eva-red border-eva-red bg-eva-red/10 animate-pulse' : 'text-eva-yellow border-eva-yellow bg-eva-yellow/10'
                 }`}>
                    Pattern: {phase === 'BETTING' ? 'BLUE' : 'ORANGE'}
                 </div>
                 <div className="text-gray-500 font-mono text-[10px] flex items-center gap-2">
                    <Clock className="w-3 h-3" />
                    INTERNAL CLOCK: <span className="text-white font-bold">{formatTime(timeLeft)}</span>
                 </div>
             </div>
             <div className="text-right">
                <div className="text-[10px] text-gray-500 uppercase tracking-widest">Prize Pool</div>
                <div className="text-2xl font-mono text-eva-yellow font-bold text-glow">16.00 SOL</div>
             </div>
        </div>
        
        {/* Segmented Bar */}
        <div className="flex gap-1 h-6">
            {phases.map((p, i) => {
                const isActive = i === activeIdx;
                const isPast = i < activeIdx;
                
                let colorClass = "bg-gray-800 border-gray-700 text-gray-600"; // Default inactive
                
                if (isActive) {
                    // Active Logic
                    if (p === 'CRITICAL') colorClass = "bg-eva-red border-eva-red text-black animate-pulse";
                    else if (p === 'ACTIVE') colorClass = "bg-eva-green border-eva-green text-black";
                    else colorClass = "bg-eva-yellow border-eva-yellow text-black";
                } else if (isPast) {
                     colorClass = "bg-transparent border-eva-gray text-gray-400";
                }

                return (
                    <div key={p} className={`flex-1 border-2 flex items-center justify-center ${colorClass} transition-all duration-300 relative overflow-hidden`}>
                         {/* Stripe overlay for active */}
                         {isActive && <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjMDAwIiBmaWxsLW9wYWNpdHk9IjAuMSIvPgo8cGF0aCBkPSJNLTExIDJMMi0xMSIgIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLXdpZHRoPSIxIi8+Cjwvc3ZnPg==')]"></div>}
                         <span className="font-bold text-[10px] tracking-[0.2em] uppercase z-10">{p}</span>
                    </div>
                );
            })}
        </div>
    </div>
  );
};