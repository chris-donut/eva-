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
                     phase === 'LIQUIDATION' ? 'text-eva-brand border-eva-brand bg-red-50 animate-pulse' : 'text-eva-dark border-gray-300 bg-white'
                 }`}>
                    Pattern: {phase === 'BETTING' ? 'BLUE' : 'ORANGE'}
                 </div>
                 <div className="text-gray-600 font-mono text-[10px] flex items-center gap-2 font-bold">
                    <Clock className="w-3 h-3 text-eva-brand" />
                    INTERNAL CLOCK: <span className="text-black font-bold text-sm">{formatTime(timeLeft)}</span>
                 </div>
             </div>
             <div className="text-right">
                <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Prize Pool</div>
                <div className="text-2xl font-mono text-eva-brand font-bold text-glow">16.00 SOL</div>
             </div>
        </div>
        
        {/* Segmented Bar */}
        <div className="flex gap-1 h-6">
            {phases.map((p, i) => {
                const isActive = i === activeIdx;
                const isPast = i < activeIdx;
                
                let colorClass = "bg-gray-100 border-gray-200 text-gray-400"; // Default inactive
                
                if (isActive) {
                    // Active Logic
                    if (p === 'CRITICAL') colorClass = "bg-eva-brand border-eva-brand text-white animate-pulse";
                    else if (p === 'ACTIVE') colorClass = "bg-green-600 border-green-600 text-white";
                    else colorClass = "bg-black border-black text-white";
                } else if (isPast) {
                     colorClass = "bg-white border-gray-300 text-gray-800";
                }

                return (
                    <div key={p} className={`flex-1 border-2 flex items-center justify-center ${colorClass} transition-all duration-300 relative overflow-hidden`}>
                         {/* Stripe overlay for active */}
                         {isActive && <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMiIvPgo8cGF0aCBkPSJNLTExIDJMMi0xMSIgIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIxIi8+Cjwvc3ZnPg==')]"></div>}
                         <span className="font-bold text-[10px] tracking-[0.2em] uppercase z-10">{p}</span>
                    </div>
                );
            })}
        </div>
    </div>
  );
};