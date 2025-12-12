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
       {/* Background Grid Lines */}
       <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20" 
            style={{ 
                backgroundImage: 'linear-gradient(#facc15 1px, transparent 1px), linear-gradient(90deg, #facc15 1px, transparent 1px)', 
                backgroundSize: '100px 100px' 
            }}>
       </div>

      <div className="flex justify-between items-end mb-8 border-b-2 border-eva-yellow pb-2 relative z-10">
        <div>
            <div className="text-[10px] text-eva-orange font-bold tracking-[0.5em] mb-1">TARGET</div>
            <h2 className="text-4xl font-serif font-black text-white tracking-tighter scale-y-125">EVA-885000</h2>
        </div>
        <div className="flex gap-4">
             {/* Sim Controls or Info could go here */}
        </div>
      </div>

      <PhaseBar phase={phase} timeLeft={timeLeft} />

      <div className="grid grid-cols-12 gap-8 h-[600px] mb-8 relative z-10">
        {/* Main Content Area */}
        <div className="col-span-8 h-full bg-black/40 border-2 border-gray-700 relative backdrop-blur-sm group">
            {/* Corner Accents */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-eva-yellow"></div>
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-eva-yellow"></div>
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-eva-yellow"></div>
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-eva-yellow"></div>
            
           {phase === 'BETTING' ? (
             <div className="w-full h-full flex items-center justify-center relative overflow-hidden">
                 <div className="relative z-10 text-center max-w-2xl">
                    <h3 className="text-6xl font-serif font-black text-eva-yellow mb-2 tracking-tighter scale-y-125 text-glow">PRE-MARKET</h3>
                    <div className="h-px w-full bg-eva-yellow mb-8"></div>
                    
                    <p className="text-eva-green font-mono text-sm mb-12 uppercase tracking-widest max-w-lg mx-auto border border-eva-green/30 p-4 bg-eva-green/5">
                        <span className="block mb-2 font-bold text-white">System Message:</span>
                        Market stasis. Inject LCL (Solana) to initialize Agent synchronization.
                    </p>

                    <div className="grid grid-cols-3 gap-0 border-2 border-eva-orange">
                        <div className="p-6 text-center border-r border-eva-orange bg-eva-orange/10">
                            <div className="text-[10px] uppercase text-eva-orange font-bold tracking-widest mb-2">Token Alloc</div>
                            <div className="text-3xl font-mono text-white">50%</div>
                        </div>
                        <div className="p-6 text-center border-r border-eva-orange bg-eva-orange/10">
                            <div className="text-[10px] uppercase text-eva-orange font-bold tracking-widest mb-2">LP Alloc</div>
                            <div className="text-3xl font-mono text-white">20%</div>
                        </div>
                        <div className="p-6 text-center bg-eva-orange/10">
                            <div className="text-[10px] uppercase text-eva-orange font-bold tracking-widest mb-2">Prize Fund</div>
                            <div className="text-3xl font-mono text-white">80%</div>
                        </div>
                    </div>
                 </div>
             </div>
           ) : phase === 'TRADING' || phase === 'LIQUIDATION' ? (
             <LiveChart isPositive={true} />
           ) : (
             <div className="w-full h-full flex items-center justify-center relative bg-eva-red/5">
                <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
                     <div className="text-[200px] font-serif font-black text-eva-red">TERMINATED</div>
                </div>
                <div className="relative z-10 p-12 bg-black border-2 border-eva-red text-center min-w-[500px] shadow-[0_0_50px_rgba(239,68,68,0.2)]">
                    <div className="text-eva-red font-serif text-3xl font-black mb-6 tracking-tighter scale-y-125">ROUND SETTLEMENT</div>
                    
                    <div className="space-y-4 text-left font-mono border-t border-b border-eva-red/30 py-6 mb-6">
                        <div className="flex justify-between text-eva-yellow text-lg">
                            <span>#1 UNIT-01</span>
                            <span>24.02 SOL</span>
                        </div>
                        <div className="flex justify-between text-gray-400">
                            <span>#2 UNIT-02</span>
                            <span>12.02 SOL</span>
                        </div>
                        <div className="flex justify-between text-gray-500">
                            <span>#3 UNIT-00</span>
                            <span>5.02 SOL</span>
                        </div>
                    </div>
                    
                    <div className="bg-eva-red text-black p-2 font-bold tracking-widest text-xs uppercase animate-pulse">
                         Rebooting System: 00:06
                    </div>
                </div>
             </div>
           )}
        </div>

        {/* Sidebar */}
        <div className="col-span-4 flex flex-col gap-8 h-full">
           <div className="flex-1 min-h-0 border-2 border-gray-700 bg-black/40 relative">
             <div className="absolute -top-3 left-4 bg-eva-dark px-2 text-xs font-bold text-eva-yellow tracking-widest uppercase">Live Rankings</div>
             <RankingList competitors={competitors} />
           </div>

           {/* User Unit Status */}
           {agent && (
             <div className={`border-2 p-6 shrink-0 relative transition-all ${agent.isDeployed ? 'border-eva-green bg-eva-green/5' : 'border-gray-600 bg-black/50 grayscale'}`}>
                <div className={`absolute top-0 right-0 text-[10px] font-bold px-2 py-1 uppercase ${agent.isDeployed ? 'bg-eva-green text-black' : 'bg-gray-600 text-gray-300'}`}>
                    {agent.isDeployed ? 'ACTIVE UNIT' : 'STANDBY'}
                </div>
                
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full shadow-[0_0_10px_currentColor] ${agent.isDeployed ? 'bg-eva-green animate-pulse' : 'bg-gray-500'}`}></div>
                        <span className="font-bold text-xl text-white tracking-widest">{agent.name}</span>
                    </div>
                    <span className={`text-xs font-mono border px-2 py-0.5 uppercase ${agent.isDeployed ? 'text-eva-green border-eva-green' : 'text-gray-500 border-gray-600'}`}>
                        SYNC: {agent.isDeployed ? '100%' : 'OFFLINE'}
                    </span>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                        <div className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">Token Vol</div>
                        <div className="font-mono text-xl text-white">231,324</div>
                    </div>
                    <div className="text-right">
                        <div className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">SOL Reserve</div>
                        <div className="font-mono text-xl text-white">{agent.balance.toFixed(1)}</div>
                    </div>
                </div>

                <Button variant="outline" className={`w-full h-10 text-xs ${agent.isDeployed ? 'border-eva-green text-eva-green hover:bg-eva-green hover:text-black' : 'border-gray-600 text-gray-500'}`}>
                    MANUAL OVERRIDE
                </Button>
             </div>
           )}
        </div>
      </div>

      {/* Live Activity Logs */}
      <div className="border-t border-eva-gray/50 pt-4">
        <h3 className="text-[10px] font-bold text-eva-orange mb-4 tracking-[0.2em] uppercase flex items-center gap-2">
            <Activity className="w-3 h-3" />
            System Events
        </h3>
        <div className="grid grid-cols-3 gap-4">
            {competitors.slice(0, 3).map((comp, i) => (
                <div key={comp.id} className="bg-black/40 border border-gray-800 p-2 flex justify-between items-center font-mono text-xs hover:border-eva-yellow transition-colors group">
                    <div className="flex items-center gap-2">
                        <span className={`w-1 h-3 ${comp.currentRoundPnl < 0 ? 'bg-eva-red' : 'bg-eva-green'}`}></span>
                        <span className="text-gray-300 group-hover:text-white truncate max-w-[100px]">{comp.name}</span>
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