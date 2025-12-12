import React from 'react';
import { X, Network, MessageSquare, Zap, Cpu } from 'lucide-react';
import { TradeLog } from '../../../types';

interface ReasoningModalProps {
  log: TradeLog | null;
  onClose: () => void;
}

export const ReasoningModal: React.FC<ReasoningModalProps> = ({ log, onClose }) => {
  if (!log) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-eva-dark w-full max-w-3xl border-2 border-eva-orange shadow-[0_0_50px_rgba(249,115,22,0.2)] flex flex-col max-h-[90vh] relative">
        
        {/* Decorative Header Lines */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-eva-orange via-eva-yellow to-eva-orange"></div>
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-800 bg-black/50">
            <div className="flex items-center gap-4">
                <div className="bg-eva-orange text-black font-bold px-3 py-1 text-xs uppercase tracking-widest">MAGI-01</div>
                <div>
                    <h3 className="text-xl font-serif font-black text-white tracking-tighter scale-y-110">DECISION LOG</h3>
                    <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">{log.txHash}</span>
                </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-eva-red hover:text-black text-gray-500 transition-colors border border-transparent hover:border-eva-red">
                <X className="w-6 h-6" />
            </button>
        </div>

        {/* Content */}
        <div className="p-8 overflow-y-auto space-y-8 bg-hex-pattern relative">
            
            {/* Chain of Thought */}
            <div className="relative pl-8">
                <div className="absolute left-0 top-1 w-2 h-2 bg-eva-yellow rounded-full"></div>
                <div className="absolute left-[3px] top-4 bottom-0 w-px bg-gray-800"></div>
                
                <h4 className="text-xs font-bold text-eva-yellow mb-3 uppercase tracking-widest flex items-center gap-2">
                    <Cpu className="w-4 h-4" />
                    Cognitive Pattern
                </h4>
                <p className="text-gray-300 font-mono text-xs leading-loose border-l-2 border-eva-yellow/20 pl-4">
                    {log.reasoning.chainOfThought}
                </p>
            </div>

            {/* Output */}
            <div className="relative pl-8">
                <div className="absolute left-0 top-1 w-2 h-2 bg-eva-green rounded-full"></div>
                <div className="absolute left-[3px] top-4 bottom-0 w-px bg-gray-800"></div>

                <h4 className="text-xs font-bold text-eva-green mb-3 uppercase tracking-widest flex items-center gap-2">
                    <Network className="w-4 h-4" />
                    Conclusion Directive
                </h4>
                <p className="text-white font-mono text-sm leading-relaxed border border-eva-green/30 bg-eva-green/5 p-4">
                    {log.reasoning.output}
                </p>
            </div>

             {/* Action */}
             <div className="relative pl-8">
                <div className="absolute left-0 top-1 w-2 h-2 bg-eva-red rounded-full animate-pulse"></div>
                
                <h4 className="text-xs font-bold text-eva-red mb-3 uppercase tracking-widest flex items-center gap-2">
                    <Zap className="w-4 h-4" />
                    Execution
                </h4>
                <div className="font-mono text-lg font-bold text-white bg-eva-red/20 border border-eva-red p-4 inline-block">
                    {log.reasoning.action}
                </div>
            </div>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-800 bg-black text-[10px] font-mono text-gray-600 uppercase flex justify-between tracking-widest">
             <span>Model: MELCHIOR-1</span>
             <span>Probability: 99.9%</span>
        </div>
      </div>
    </div>
  );
};