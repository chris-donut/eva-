import React, { useState } from 'react';
import { X, Save, FileCode } from 'lucide-react';
import { Agent } from '../../../types';
import { Button } from '../../ui/Button';

interface EditAgentModalProps {
  agent: Agent;
  onClose: () => void;
  onSave: (bettingPrompt: string, tradingPrompt: string) => void;
}

export const EditAgentModal: React.FC<EditAgentModalProps> = ({ agent, onClose, onSave }) => {
  const [bettingPrompt, setBettingPrompt] = useState(agent.bettingPrompt || '');
  const [tradingPrompt, setTradingPrompt] = useState(agent.tradingPrompt || '');

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4">
      <div className="bg-eva-dark w-full max-w-4xl border-2 border-eva-yellow shadow-[0_0_50px_rgba(250,204,21,0.15)] flex flex-col h-[80vh] relative">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-eva-yellow/30 bg-black/50">
            <div className="flex items-center gap-4">
                <FileCode className="w-6 h-6 text-eva-yellow" />
                <div>
                    <h3 className="text-xl font-serif font-black text-white tracking-tighter scale-y-110">RE-WRITE SEQUENCE</h3>
                    <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">UNIT: {agent.name}</span>
                </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-eva-yellow hover:text-black text-gray-500 transition-colors">
                <X className="w-6 h-6" />
            </button>
        </div>

        {/* Content */}
        <div className="flex-1 p-8 grid grid-cols-2 gap-8 overflow-y-auto bg-hex-pattern">
            <div className="flex flex-col h-full">
                <label className="block text-xs font-bold text-eva-yellow tracking-widest uppercase bg-eva-yellow/10 inline-block px-2 py-1 mb-2">
                    01. Pre-Market Algorithm
                </label>
                <textarea 
                    value={bettingPrompt}
                    onChange={(e) => setBettingPrompt(e.target.value)}
                    className="flex-1 w-full bg-black/60 border border-gray-700 p-4 text-eva-green font-mono text-xs leading-relaxed resize-none focus:border-eva-yellow outline-none custom-scrollbar"
                    placeholder="// ENTER STRATEGY LOGIC..."
                />
            </div>
            <div className="flex flex-col h-full">
                <label className="block text-xs font-bold text-eva-yellow tracking-widest uppercase bg-eva-yellow/10 inline-block px-2 py-1 mb-2">
                    02. Combat Execution Logic
                </label>
                <textarea 
                    value={tradingPrompt}
                    onChange={(e) => setTradingPrompt(e.target.value)}
                    className="flex-1 w-full bg-black/60 border border-gray-700 p-4 text-eva-green font-mono text-xs leading-relaxed resize-none focus:border-eva-yellow outline-none custom-scrollbar"
                    placeholder="// ENTER EXECUTION PARAMETERS..."
                />
            </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-800 bg-black flex justify-end gap-4">
             <Button variant="outline" onClick={onClose}>ABORT</Button>
             <Button variant="primary" onClick={() => onSave(bettingPrompt, tradingPrompt)} className="w-40">
                 <Save className="w-4 h-4 mr-2" />
                 OVERWRITE
             </Button>
        </div>
      </div>
    </div>
  );
};