import React, { useState } from 'react';
import { Agent, TradeLog } from '../../../types';
import { Button } from '../../ui/Button';
import { Play, Pause, Activity, Terminal, X, UploadCloud, Settings2 } from 'lucide-react';
import { ReasoningModal } from './ReasoningModal';
import { EditAgentModal } from './EditAgentModal';

interface MyAgentProps {
  agent: Agent;
  logs: TradeLog[];
  onUpdateAgent: (agent: Agent) => void;
  onAddLog: (log: TradeLog) => void;
  onDeploy: () => void;
}

const DepositModal = ({ onClose, onConfirm }: { onClose: () => void; onConfirm: (amount: number) => void }) => {
    const [amount, setAmount] = useState('');
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div className="bg-eva-dark border-2 border-eva-green p-8 w-full max-w-md shadow-[0_0_30px_rgba(16,185,129,0.2)] relative">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-white">
                    <X className="w-5 h-5" />
                </button>
                <h3 className="text-2xl font-serif font-black text-eva-green mb-6 tracking-tighter scale-y-110">INJECT LCL (SOL)</h3>
                <div className="space-y-6">
                    <div>
                        <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Injection Volume</label>
                        <input 
                            type="number" 
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="w-full bg-black border-2 border-gray-700 p-4 text-white font-mono text-xl focus:border-eva-green outline-none transition-colors placeholder-gray-800"
                            placeholder="0.00"
                            autoFocus
                        />
                    </div>
                    <div className="flex gap-4">
                        <Button variant="outline" onClick={onClose} className="flex-1 border-gray-600 text-gray-400 hover:text-white">CANCEL</Button>
                        <Button 
                            variant="primary" 
                            onClick={() => {
                                const val = parseFloat(amount);
                                if (!isNaN(val) && val > 0) onConfirm(val);
                            }}
                            className="flex-1 bg-eva-green border-eva-green text-black hover:bg-white hover:border-white shadow-[0_0_15px_rgba(16,185,129,0.4)]"
                        >
                            CONFIRM
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const MyAgent: React.FC<MyAgentProps> = ({ agent, logs, onUpdateAgent, onAddLog, onDeploy }) => {
  const [selectedLog, setSelectedLog] = useState<TradeLog | null>(null);
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  // Derive status from props rather than local state to ensure synchronization
  const isPaused = agent.status === 'PAUSED';

  const handleDeposit = (amount: number) => {
      // Update Balance
      const updatedAgent = { ...agent, balance: agent.balance + amount };
      onUpdateAgent(updatedAgent);

      // Add Log
      const newLog: TradeLog = {
          id: `tx-${Date.now()}`,
          time: new Date().toISOString().replace('T', ' ').substring(0, 19),
          type: 'DEPOSIT',
          amount: amount,
          txHash: `tx-${Math.random().toString(36).substring(7)}`,
          reasoning: {
              chainOfThought: "External resource injection detected. Normalizing liquidity pool and adjusting capital allocation parameters.",
              output: "Confirmed manual deposit override.",
              action: `Inject ${amount} SOL`
          }
      };
      onAddLog(newLog);
      setShowDepositModal(false);
  };

  const handleEditSave = (betting: string, trading: string) => {
      onUpdateAgent({ ...agent, bettingPrompt: betting, tradingPrompt: trading });
      setShowEditModal(false);
  };

  const handleTogglePause = () => {
    // Toggle between ACTIVE and PAUSED
    const newStatus = isPaused ? 'ACTIVE' : 'PAUSED';
    onUpdateAgent({ ...agent, status: newStatus });
  };

  return (
    <div className="max-w-[1200px] mx-auto p-8 space-y-8">
      
      {/* Header Card */}
      <div className={`border-2 p-6 flex items-center justify-between relative overflow-hidden ${agent.isDeployed ? 'border-eva-yellow bg-black/50' : 'border-gray-600 bg-black/80'}`}>
         <div className="absolute top-0 right-0 p-2 opacity-20 pointer-events-none">
            <Activity className={`w-32 h-32 ${agent.isDeployed ? 'text-eva-yellow' : 'text-gray-600'}`} />
         </div>

         <div className="flex items-center gap-8 relative z-10">
            <div className={`w-24 h-24 border-2 border-white bg-black flex items-center justify-center relative ${!agent.isDeployed && 'grayscale'}`}>
                 {/* Crosshairs */}
                 <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-full h-px bg-eva-red/50"></div>
                    <div className="h-full w-px bg-eva-red/50 absolute"></div>
                 </div>
                 <div className={`w-12 h-12 rounded-full ${agent.isDeployed ? 'bg-eva-yellow animate-pulse' : 'bg-gray-600'}`}></div>
            </div>
            <div>
                <div className="text-[10px] font-bold text-eva-orange tracking-[0.4em] mb-1">UNIT DESIGNATION</div>
                <h2 className="text-4xl font-serif font-black text-white tracking-tighter scale-y-110 mb-2">{agent.name}</h2>
                <div className="flex items-center gap-4">
                    <span className={`px-2 py-1 text-[10px] font-bold uppercase tracking-widest border ${
                        !agent.isDeployed 
                        ? 'border-gray-500 text-gray-500'
                        : isPaused 
                            ? 'border-eva-red text-eva-red' 
                            : 'border-eva-green text-eva-green bg-eva-green/10'
                    }`}>
                        { !agent.isDeployed ? 'STATUS: STANDBY' : isPaused ? 'STATUS: PAUSED' : 'STATUS: OPERATIONAL' }
                    </span>
                    <span className="text-xs text-gray-500 font-mono">ID: 884-231-AA</span>
                </div>
            </div>
         </div>

         <div className="flex flex-col items-end gap-4 relative z-10">
            {!agent.isDeployed ? (
                 <Button 
                    onClick={onDeploy}
                    variant="primary"
                    className="w-40 animate-pulse"
                >
                    <span className="flex items-center gap-2"><UploadCloud className="w-4 h-4" /> DEPLOY</span>
                </Button>
            ) : (
                <Button 
                    onClick={handleTogglePause}
                    variant={isPaused ? "primary" : "outline"}
                    className="w-40"
                >
                    {isPaused ? <span className="flex items-center gap-2"><Play className="w-4 h-4" /> RESUME</span> : <span className="flex items-center gap-2"><Pause className="w-4 h-4" /> SUSPEND</span>}
                </Button>
            )}
            
            <button 
                onClick={() => setShowEditModal(true)}
                className="text-[10px] font-bold text-gray-500 uppercase tracking-widest hover:text-eva-yellow flex items-center gap-2"
            >
                <Settings2 className="w-3 h-3" /> Configure Logic
            </button>
         </div>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-12 gap-8">
        {/* Funds Card */}
        <div className="col-span-4 border border-gray-700 bg-black/40 p-6 relative">
            <div className="absolute -top-3 left-4 bg-eva-dark px-2 text-xs font-bold text-eva-yellow tracking-widest uppercase">Resources</div>
            
            <div className="space-y-6 mt-2">
                <div className="flex justify-between items-end border-b border-gray-800 pb-4">
                    <span className="text-xs text-gray-500 uppercase tracking-widest">SOL Reserve</span>
                    <span className="font-mono text-2xl text-white font-bold">{agent.balance.toFixed(4)}</span>
                </div>
                
                <div className="space-y-2 font-mono text-xs text-gray-400">
                    <div className="flex justify-between">
                        <span>INJECTED:</span>
                        <span>400.00 SOL</span>
                    </div>
                    <div className="flex justify-between">
                        <span>EJECTED:</span>
                        <span>12.50 SOL</span>
                    </div>
                    <div className="flex justify-between pt-2 text-eva-green font-bold">
                        <span>NET GAIN:</span>
                        <span>+22.21 SOL</span>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4">
                    <Button variant="outline" size="sm" onClick={() => setShowDepositModal(true)}>INJECT</Button>
                    <Button variant="outline" size="sm">EJECT</Button>
                </div>
            </div>
        </div>

        {/* History / Logs */}
        <div className="col-span-8 border border-gray-700 bg-black/40 p-6 relative flex flex-col">
           <div className="absolute -top-3 left-4 bg-eva-dark px-2 text-xs font-bold text-eva-yellow tracking-widest uppercase">Operation Logs</div>
           
           <div className="flex justify-between items-center mb-6 pb-2 border-b border-gray-800">
                <div className="text-xs font-mono text-gray-400">ROUND: EVA-84000</div>
                <div className="text-xs font-mono text-eva-green">SYNC RATE: {agent.isDeployed ? '98.2%' : '0.0%'}</div>
           </div>

           <div className="flex-1 overflow-x-auto">
                <table className="w-full text-xs text-left font-mono">
                    <thead className="text-gray-600 uppercase tracking-widest border-b-2 border-gray-800">
                        <tr>
                            <th className="pb-3 pl-2">Time</th>
                            <th className="pb-3">Op</th>
                            <th className="pb-3 text-right">Vol</th>
                            <th className="pb-3 text-right">Price</th>
                            <th className="pb-3 text-center">Data</th>
                        </tr>
                    </thead>
                    <tbody>
                        {logs.map((log) => (
                            <tr key={log.id} className="border-b border-gray-800 hover:bg-white/5 transition-colors group">
                                <td className="py-3 pl-2 text-gray-500">{log.time.split(' ')[1]}</td>
                                <td className={`py-3 font-bold ${log.type === 'BUY' || log.type === 'DEPOSIT' ? 'text-eva-green' : 'text-eva-red'}`}>{log.type}</td>
                                <td className="py-3 text-right text-white">{log.amount.toFixed(2)}</td>
                                <td className="py-3 text-right text-gray-400">{log.price ? log.price : '-'}</td>
                                <td className="py-3 text-center">
                                    <button 
                                        onClick={() => setSelectedLog(log)}
                                        className="text-gray-500 hover:text-eva-yellow transition-colors"
                                    >
                                        <Terminal className="w-4 h-4 mx-auto" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
           </div>
        </div>
      </div>

      {/* Reasoning Modal */}
      {selectedLog && (
        <ReasoningModal log={selectedLog} onClose={() => setSelectedLog(null)} />
      )}

      {/* Deposit Modal */}
      {showDepositModal && (
          <DepositModal onClose={() => setShowDepositModal(false)} onConfirm={handleDeposit} />
      )}

      {/* Edit Modal */}
      {showEditModal && (
          <EditAgentModal agent={agent} onClose={() => setShowEditModal(false)} onSave={handleEditSave} />
      )}
    </div>
  );
};