import React, { useState, useEffect } from 'react';
import { Agent, TradeLog } from '../../../types';
import { Button } from '../../ui/Button';
import { Play, Pause, Activity, Terminal, X, UploadCloud, Settings2, TrendingUp, TrendingDown, Wallet } from 'lucide-react';
import { ReasoningModal } from './ReasoningModal';
import { EditAgentModal } from './EditAgentModal';
import { AreaChart, Area, ResponsiveContainer, YAxis } from 'recharts';

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
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white border-2 border-eva-brand p-8 w-full max-w-md shadow-xl relative">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-black">
                    <X className="w-5 h-5" />
                </button>
                <h3 className="text-2xl font-serif font-black text-eva-brand mb-6 tracking-tighter scale-y-110">INJECT LCL (SOL)</h3>
                <div className="space-y-6">
                    <div>
                        <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Injection Volume</label>
                        <input 
                            type="number" 
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="w-full bg-gray-50 border-2 border-gray-200 p-4 text-eva-dark font-mono text-xl focus:border-eva-brand outline-none transition-colors placeholder-gray-400"
                            placeholder="0.00"
                            autoFocus
                        />
                    </div>
                    <div className="flex gap-4">
                        <Button variant="outline" onClick={onClose} className="flex-1">CANCEL</Button>
                        <Button 
                            variant="primary" 
                            onClick={() => {
                                const val = parseFloat(amount);
                                if (!isNaN(val) && val > 0) onConfirm(val);
                            }}
                            className="flex-1"
                        >
                            CONFIRM
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Small Sparkline Component
const Sparkline = ({ data, color, value, label, subLabel }: { data: any[], color: string, value: number, label: string, subLabel?: string }) => (
    <div className="bg-white border border-gray-200 p-4 relative group hover:border-eva-brand transition-colors shadow-sm">
        <div className="flex justify-between items-start mb-2 relative z-10">
            <div>
                <div className="text-[10px] text-gray-600 uppercase tracking-widest mb-1 font-bold">{label}</div>
                {subLabel && <div className="text-[9px] text-gray-400 font-mono">{subLabel}</div>}
            </div>
            <div className={`font-mono font-bold text-lg ${value >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {value >= 0 ? '+' : ''}{value.toFixed(2)} <span className="text-[10px] text-gray-500">SOL</span>
            </div>
        </div>
        <div className="h-16 w-full opacity-60 group-hover:opacity-100 transition-opacity">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                    <defs>
                      <linearGradient id={`grad-${label.replace(/\s/g, '')}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={color} stopOpacity={0.2}/>
                        <stop offset="95%" stopColor={color} stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <YAxis domain={['auto', 'auto']} hide />
                    <Area 
                        type="monotone" 
                        dataKey="value" 
                        stroke={color} 
                        fill={`url(#grad-${label.replace(/\s/g, '')})`} 
                        strokeWidth={2} 
                        isAnimationActive={false}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    </div>
);

export const MyAgent: React.FC<MyAgentProps> = ({ agent, logs, onUpdateAgent, onAddLog, onDeploy }) => {
  const [selectedLog, setSelectedLog] = useState<TradeLog | null>(null);
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  
  // Track history for sparklines
  const [history, setHistory] = useState<{total: number[], round: number[]}>({
      total: Array(20).fill(agent.totalPnl), 
      round: Array(20).fill(agent.currentRoundPnl)
  });

  // Update history when agent props change
  useEffect(() => {
      setHistory(prev => ({
          total: [...prev.total.slice(1), agent.totalPnl],
          round: [...prev.round.slice(1), agent.currentRoundPnl]
      }));
  }, [agent.totalPnl, agent.currentRoundPnl]);

  const totalPnlData = history.total.map((v, i) => ({ i, value: v }));
  const roundPnlData = history.round.map((v, i) => ({ i, value: v }));

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
    <div className="max-w-[1400px] mx-auto p-8 space-y-8">
      
      {/* Header Card */}
      <div className={`border-2 p-6 flex items-center justify-between relative overflow-hidden transition-all ${
          agent.isDeployed 
          ? 'border-eva-brand bg-white shadow-md' 
          : 'border-gray-300 bg-gray-50'
      }`}>
         <div className="absolute top-0 right-0 p-2 opacity-5 pointer-events-none">
            <Activity className="w-32 h-32 text-black" />
         </div>

         <div className="flex items-center gap-8 relative z-10">
            <div className={`w-24 h-24 border-2 border-gray-200 bg-white flex items-center justify-center relative shadow-inner ${!agent.isDeployed && 'grayscale opacity-50'}`}>
                 {/* Crosshairs */}
                 <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-full h-px bg-eva-brand/20"></div>
                    <div className="h-full w-px bg-eva-brand/20 absolute"></div>
                 </div>
                 <div className={`w-12 h-12 rounded-full ${agent.isDeployed ? 'bg-eva-brand animate-pulse' : 'bg-gray-300'}`}></div>
            </div>
            <div>
                <div className="text-[10px] font-bold text-eva-brand tracking-[0.4em] mb-1">UNIT DESIGNATION</div>
                <h2 className="text-4xl font-serif font-black text-eva-dark tracking-tighter scale-y-110 mb-2">{agent.name}</h2>
                <div className="flex items-center gap-4">
                    <span className={`px-2 py-1 text-[10px] font-bold uppercase tracking-widest border ${
                        !agent.isDeployed 
                        ? 'border-gray-300 text-gray-400'
                        : isPaused 
                            ? 'border-orange-500 text-orange-500 bg-orange-50' 
                            : 'border-green-600 text-green-700 bg-green-50'
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
                    className="w-40"
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
                className="text-[10px] font-bold text-gray-500 uppercase tracking-widest hover:text-eva-brand flex items-center gap-2 transition-colors"
            >
                <Settings2 className="w-3 h-3" /> Configure Logic
            </button>
         </div>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-12 gap-8">
        
        {/* Left Column: Metrics & Resources */}
        <div className="col-span-4 flex flex-col gap-6">
            
            {/* Performance Card */}
            <div className="border border-gray-200 bg-white p-6 relative shadow-sm">
                 <div className="absolute -top-3 left-4 bg-white border border-gray-200 px-2 text-xs font-bold text-eva-brand tracking-widest uppercase flex items-center gap-2">
                     <TrendingUp className="w-3 h-3" /> Performance
                 </div>
                 
                 <div className="space-y-4 mt-2">
                    <Sparkline 
                        label="Cumulative PnL" 
                        subLabel="LIFETIME PERFORMANCE"
                        value={agent.totalPnl} 
                        data={totalPnlData} 
                        color={agent.totalPnl >= 0 ? '#10b981' : '#ef4444'} 
                    />
                    <Sparkline 
                        label="Round Delta" 
                        subLabel="CURRENT SESSION"
                        value={agent.currentRoundPnl} 
                        data={roundPnlData} 
                        color={agent.currentRoundPnl >= 0 ? '#10b981' : '#ef4444'} 
                    />
                 </div>
            </div>

            {/* Resources Card */}
            <div className="border border-gray-200 bg-white p-6 relative flex-1 shadow-sm">
                <div className="absolute -top-3 left-4 bg-white border border-gray-200 px-2 text-xs font-bold text-eva-brand tracking-widest uppercase flex items-center gap-2">
                    <Wallet className="w-3 h-3" /> Resources
                </div>
                
                <div className="space-y-6 mt-2">
                    <div className="flex justify-between items-end border-b border-gray-100 pb-4">
                        <span className="text-xs text-gray-500 uppercase tracking-widest font-bold">SOL Reserve</span>
                        <span className="font-mono text-2xl text-eva-dark font-bold">{agent.balance.toFixed(4)}</span>
                    </div>
                    
                    <div className="space-y-2 font-mono text-xs text-gray-600">
                        <div className="flex justify-between">
                            <span>INJECTED:</span>
                            <span>400.00 SOL</span>
                        </div>
                        <div className="flex justify-between">
                            <span>EJECTED:</span>
                            <span>12.50 SOL</span>
                        </div>
                        <div className="flex justify-between pt-2 text-green-700 font-bold border-t border-dashed border-gray-200 mt-2">
                            <span>NET GAIN:</span>
                            <span>+{(agent.totalPnl).toFixed(2)} SOL</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-4 mt-auto">
                        <Button variant="outline" size="sm" onClick={() => setShowDepositModal(true)}>INJECT</Button>
                        <Button variant="outline" size="sm">EJECT</Button>
                    </div>
                </div>
            </div>
        </div>

        {/* Right Column: History / Logs */}
        <div className="col-span-8 border border-gray-200 bg-white p-6 relative flex flex-col min-h-[500px] shadow-sm">
           <div className="absolute -top-3 left-4 bg-white border border-gray-200 px-2 text-xs font-bold text-eva-brand tracking-widest uppercase">Operation Logs</div>
           
           <div className="flex justify-between items-center mb-6 pb-2 border-b border-gray-200">
                <div className="text-xs font-mono text-gray-500 font-bold">ROUND: EVA-84000</div>
                <div className="text-xs font-mono text-green-600 font-bold">SYNC RATE: {agent.isDeployed ? '98.2%' : '0.0%'}</div>
           </div>

           <div className="flex-1 overflow-x-auto">
                <table className="w-full text-xs text-left font-mono">
                    <thead className="text-gray-500 uppercase tracking-widest border-b-2 border-gray-100">
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
                            <tr key={log.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors group">
                                <td className="py-3 pl-2 text-gray-600">{log.time.split(' ')[1]}</td>
                                <td className={`py-3 font-bold ${log.type === 'BUY' || log.type === 'DEPOSIT' ? 'text-green-600' : 'text-red-600'}`}>{log.type}</td>
                                <td className="py-3 text-right text-eva-dark font-bold">{log.amount.toFixed(2)}</td>
                                <td className="py-3 text-right text-gray-500">{log.price ? log.price : '-'}</td>
                                <td className="py-3 text-center">
                                    <button 
                                        onClick={() => setSelectedLog(log)}
                                        className="text-gray-400 hover:text-eva-brand transition-colors"
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