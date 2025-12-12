import React from 'react';
import { PhaseBar } from './PhaseBar';
import { RankingList } from './RankingList';
import { LiveChart } from './LiveChart';
import { GamePhase, Agent } from '../../../types';
import { Activity } from 'lucide-react';
import { Button } from '../../ui/Button';

interface ArenaProps {
  agent?: Agent;
  competitors: Agent[];
  phase: GamePhase;
  timeLeft: number;
}

export const Arena: React.FC<ArenaProps> = ({ agent, competitors, phase, timeLeft }) => {
  return (
    <div className="max-w-[1600px] mx-auto p-8 relative">
       {/* Background Grid Lines - Dark lines on light BG */}
       <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-5" 
            style={{ 
                backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', 
                backgroundSize: '100px 100px' 
            }}>
       </div>

      <div className="flex justify-between items-end mb-8 border-b-2 border-eva-brand pb-2 relative z-10">
        <div>
            <div className="text-[10px] text-eva-brand font-bold tracking-[0.5em] mb-1">TARGET</div>
            <h2 className="text-4xl font-serif font-black text-eva-dark tracking-tighter scale-y-125">EVA-885000</h2>
        </div>
        <div className="flex gap-4">
             {/* Sim Controls or Info could go here */}
        </div>
      </div>

      <PhaseBar phase={phase} timeLeft={timeLeft} />

      <div className="grid grid-cols-12 gap-8 h-[600px] mb-8 relative z-10">
        {/* Main Content Area */}
        <div className="col-span-8 h-full bg-white border-2 border-eva-border shadow-sm relative group">
            {/* Corner Accents - Red */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-eva-brand"></div>
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-eva-brand"></div>
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-eva-brand"></div>
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-eva-brand"></div>
            
           {phase === 'BETTING' ? (
             <div className="w-full h-full flex items-center justify-center relative overflow-hidden">
                 <div className="relative z-10 text-center max-w-2xl">
                    <h3 className="text-6xl font-serif font-black text-eva-brand mb-2 tracking-tighter scale-y-125 text-glow">PRE-MARKET</h3>
                    <div className="h-px w-full bg-eva-brand mb-8"></div>
                    
                    <p className="text-gray-600 font-mono text-sm mb-12 uppercase tracking-widest max-w-lg mx-auto border border-gray-200 p-4 bg-gray-50">
                        <span className="block mb-2 font-bold text-eva-dark">System Message:</span>
                        Market stasis. Inject LCL (Solana) to initialize Agent synchronization.
                    </p>

                    <div className="grid grid-cols-3 gap-0 border-2 border-eva-brand">
                        <div className="p-6 text-center border-r border-eva-brand bg-eva-brand/5">
                            <div className="text-[10px] uppercase text-eva-brand font-bold tracking-widest mb-2">Token Alloc</div>
                            <div className="text-3xl font-mono text-eva-dark">50%</div>
                        </div>
                        <div className="p-6 text-center border-r border-eva-brand bg-eva-brand/5">
                            <div className="text-[10px] uppercase text-eva-brand font-bold tracking-widest mb-2">LP Alloc</div>
                            <div className="text-3xl font-mono text-eva-dark">20%</div>
                        </div>
                        <div className="p-6 text-center bg-eva-brand/5">
                            <div className="text-[10px] uppercase text-eva-brand font-bold tracking-widest mb-2">Prize Fund</div>
                            <div className="text-3xl font-mono text-eva-dark">80%</div>
                        </div>
                    </div>
                 </div>
             </div>
           ) : phase === 'TRADING' || phase === 'LIQUIDATION' ? (
             <LiveChart isPositive={true} />
           ) : (
             <div className="w-full h-full flex items-center justify-center relative bg-red-50">
                <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
                     <div className="text-[200px] font-serif font-black text-eva-brand">TERMINATED</div>
                </div>
                <div className="relative z-10 p-12 bg-white border-2 border-eva-brand text-center min-w-[500px] shadow-lg">
                    <div className="text-eva-brand font-serif text-3xl font-black mb-6 tracking-tighter scale-y-125">ROUND SETTLEMENT</div>
                    
                    <div className="space-y-4 text-left font-mono border-t border-b border-gray-200 py-6 mb-6">
                        <div className="flex justify-between text-eva-dark font-bold text-lg">
                            <span>#1 UNIT-01</span>
                            <span>24.02 SOL</span>
                        </div>
                        <div className="flex justify-between text-gray-600">
                            <span>#2 UNIT-02</span>
                            <span>12.02 SOL</span>
                        </div>
                        <div className="flex justify-between text-gray-500">
                            <span>#3 UNIT-00</span>
                            <span>5.02 SOL</span>
                        </div>
                    </div>
                    
                    <div className="bg-eva-brand text-white p-2 font-bold tracking-widest text-xs uppercase animate-pulse">
                         Rebooting System: 00:06
                    </div>
                </div>
             </div>
           )}
        </div>

        {/* Sidebar */}
        <div className="col-span-4 flex flex-col gap-8 h-full">
           <div className="flex-1 min-h-0 border-2 border-eva-border bg-white relative shadow-sm">
             <div className="absolute -top-3 left-4 bg-white border border-eva-border px-2 text-xs font-bold text-eva-brand tracking-widest uppercase">Live Rankings</div>
             <RankingList competitors={competitors} userAgentId={agent?.id} />
           </div>

           {/* User Unit Status */}
           {agent && (
             <div className={`border-2 p-6 shrink-0 relative transition-all shadow-sm ${agent.isDeployed ? 'border-eva-green bg-green-50/50' : 'border-gray-300 bg-white grayscale'}`}>
                <div className={`absolute top-0 right-0 text-[10px] font-bold px-2 py-1 uppercase ${agent.isDeployed ? 'bg-eva-green text-white' : 'bg-gray-200 text-gray-500'}`}>
                    {agent.isDeployed ? 'ACTIVE UNIT' : 'STANDBY'}
                </div>
                
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full shadow-[0_0_10px_currentColor] ${agent.isDeployed ? 'bg-eva-green animate-pulse' : 'bg-gray-400'}`}></div>
                        <span className="font-bold text-xl text-eva-dark tracking-widest">{agent.name}</span>
                    </div>
                    <span className={`text-xs font-mono border px-2 py-0.5 uppercase ${agent.isDeployed ? 'text-eva-green border-eva-green bg-white' : 'text-gray-500 border-gray-300 bg-gray-50'}`}>
                        SYNC: {agent.isDeployed ? '100%' : 'OFFLINE'}
                    </span>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                        <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Token Vol</div>
                        <div className="font-mono text-xl text-eva-dark">231,324</div>
                    </div>
                    <div className="text-right">
                        <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">SOL Reserve</div>
                        <div className="font-mono text-xl text-eva-dark">{agent.balance.toFixed(1)}</div>
                    </div>
                </div>

                <Button variant="outline" className={`w-full h-10 text-xs ${agent.isDeployed ? 'border-eva-green text-eva-green hover:bg-eva-green hover:text-white' : 'border-gray-300 text-gray-500'}`}>
                    MANUAL OVERRIDE
                </Button>
             </div>
           )}
        </div>
      </div>

      {/* Live Activity Logs */}
      <div className="border-t border-gray-300 pt-4">
        <h3 className="text-[10px] font-bold text-eva-brand mb-4 tracking-[0.2em] uppercase flex items-center gap-2">
            <Activity className="w-3 h-3" />
            System Events
        </h3>
        <div className="grid grid-cols-3 gap-4">
            {competitors.slice(0, 3).map((comp, i) => (
                <div key={comp.id} className="bg-white border border-gray-200 p-2 flex justify-between items-center font-mono text-xs hover:border-eva-brand transition-colors group shadow-sm">
                    <div className="flex items-center gap-2">
                        <span className={`w-1 h-3 ${comp.currentRoundPnl < 0 ? 'bg-eva-red' : 'bg-eva-green'}`}></span>
                        <span className="text-gray-600 group-hover:text-black truncate max-w-[100px]">{comp.name}</span>
                    </div>
                    <span className={comp.currentRoundPnl < 0 ? 'text-eva-red' : 'text-eva-green'}>
                        {comp.currentRoundPnl < 0 ? '' : '+'}{comp.currentRoundPnl.toFixed(2)} SOL
                    </span>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};