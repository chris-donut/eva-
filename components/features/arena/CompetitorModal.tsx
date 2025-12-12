import React from 'react';
import { X, Activity, Database, Shield } from 'lucide-react';
import { Agent } from '../../../types';
import { AVATARS } from '../../../constants';

interface CompetitorModalProps {
  agent: Agent;
  onClose: () => void;
}

export const CompetitorModal: React.FC<CompetitorModalProps> = ({ agent, onClose }) => {
  const avatarIcon = AVATARS.find(a => a.id === agent.avatar)?.icon || <Activity className="w-6 h-6" />;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-eva-dark w-full max-w-2xl border-2 border-eva-orange shadow-[0_0_50px_rgba(249,115,22,0.2)] flex flex-col relative overflow-hidden">
        
        {/* Decorative Grid Background */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" 
             style={{ backgroundImage: 'linear-gradient(#f97316 1px, transparent 1px), linear-gradient(90deg, #f97316 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-eva-orange/50 bg-black/80 relative z-10">
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 border-2 border-eva-orange bg-eva-orange/20 flex items-center justify-center text-eva-orange">
                    {avatarIcon}
                </div>
                <div>
                    <div className="text-[10px] font-bold text-eva-orange tracking-[0.3em] uppercase mb-1">UNIDENTIFIED SIGNAL</div>
                    <h3 className="text-2xl font-serif font-black text-white tracking-tighter scale-y-110">{agent.name}</h3>
                </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-eva-orange hover:text-black text-eva-orange transition-colors border border-transparent hover:border-eva-orange">
                <X className="w-6 h-6" />
            </button>
        </div>

        {/* Body */}
        <div className="p-8 relative z-10 grid grid-cols-2 gap-8">
            <div className="space-y-6">
                <div className="bg-black/50 border border-gray-700 p-4">
                    <h4 className="text-xs text-eva-yellow font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
                        <Database className="w-3 h-3" /> Unit Metrics
                    </h4>
                    <div className="space-y-3 font-mono text-xs">
                        <div className="flex justify-between">
                            <span className="text-gray-500">LIQUIDITY (SOL)</span>
                            <span className="text-white font-bold">{agent.balance.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">TOKEN HOLDINGS</span>
                            <span className="text-white font-bold">{agent.tokenBalance?.toLocaleString() || 0}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">ROUND PNL</span>
                            <span className={agent.currentRoundPnl >= 0 ? 'text-eva-green' : 'text-eva-red'}>
                                {agent.currentRoundPnl >= 0 ? '+' : ''}{agent.currentRoundPnl.toFixed(2)} SOL
                            </span>
                        </div>
                    </div>
                </div>

                <div className="bg-black/50 border border-gray-700 p-4">
                    <h4 className="text-xs text-eva-red font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
                        <Activity className="w-3 h-3" /> Last Action
                    </h4>
                    <div className="font-mono text-sm text-white border-l-2 border-eva-red pl-3 py-1">
                        {agent.lastAction || 'NO DATA'}
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <h4 className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
                    <Shield className="w-3 h-3" /> AT Field Pattern
                </h4>
                <div className="w-full h-40 bg-black border border-gray-800 relative overflow-hidden flex items-center justify-center">
                     <div className="absolute inset-0 flex items-center justify-center">
                         {/* Fake "Encryption" visual */}
                         <div className="text-[8px] text-eva-orange font-mono opacity-50 break-all p-2">
                             0F 2A 9C 11 BB 44 91 22 00 1A 
                             FA CC 15 EF 44 44 10 B9 81 FF
                             00 00 00 11 11 22 33 44 55 66
                             ENCRYPTED DATA STREAM - MAGI
                             ACCESS DENIED - LEVEL 8 REQ
                         </div>
                     </div>
                     <div className="bg-eva-orange text-black text-[10px] font-bold px-3 py-1 uppercase z-10 animate-pulse">
                         Strategy Encrypted
                     </div>
                </div>
                <div className="text-[10px] text-gray-500 font-mono leading-relaxed">
                    Source code analysis requires MAGI system approval. Competitor logic is obfuscated during active trading rounds.
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};