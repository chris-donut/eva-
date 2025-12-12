import React, { useState, useEffect } from 'react';
import { Plus, Triangle, Cpu, Zap, Activity } from 'lucide-react';
import { Button } from '../../ui/Button';
import { AVATARS } from '../../../constants';
import { Agent } from '../../../types';

interface CreateAgentProps {
  onCreated: (agent: Agent) => void;
}

export const CreateAgent: React.FC<CreateAgentProps> = ({ onCreated }) => {
  const [name, setName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(AVATARS[0].id);
  const [isInitializing, setIsInitializing] = useState(false);
  const [initStep, setInitStep] = useState(0);

  const handleSubmit = () => {
    if (!name) return;
    setIsInitializing(true);
  };

  useEffect(() => {
    if (isInitializing) {
        const step1 = setTimeout(() => setInitStep(1), 1000); // Neural Link
        const step2 = setTimeout(() => setInitStep(2), 2500); // Synch Ratio
        const step3 = setTimeout(() => setInitStep(3), 4000); // Complete
        const step4 = setTimeout(() => {
            const newAgent: Agent = {
                id: `agent-${Date.now()}`,
                name,
                avatar: selectedAvatar,
                balance: 231,
                status: 'ACTIVE',
                isDeployed: false,
                totalPnl: 0,
                currentRoundPnl: 0,
                bettingPrompt: '',
                tradingPrompt: ''
            };
            onCreated(newAgent);
        }, 5000);

        return () => {
            clearTimeout(step1);
            clearTimeout(step2);
            clearTimeout(step3);
            clearTimeout(step4);
        };
    }
  }, [isInitializing, name, selectedAvatar, onCreated]);

  if (isInitializing) {
      return (
          <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center font-mono p-8">
              <div className="w-full max-w-lg space-y-8">
                  <div className="text-center">
                    <h2 className="text-4xl font-serif font-black text-eva-orange mb-2 animate-pulse tracking-tighter scale-y-125">INITIALIZATION SEQUENCE</h2>
                    <div className="h-px w-full bg-eva-orange mb-4"></div>
                  </div>

                  <div className="space-y-4">
                      {/* Step 0: Connecting */}
                      <div className="flex items-center justify-between border-b border-gray-800 pb-2">
                          <span className="text-xs text-eva-yellow uppercase tracking-widest flex items-center gap-2">
                              <Activity className="w-4 h-4" /> NEURAL LINKAGE
                          </span>
                          <span className="text-xs font-bold text-eva-green">ESTABLISHED</span>
                      </div>

                       {/* Step 1: Uploading */}
                      <div className={`flex items-center justify-between border-b border-gray-800 pb-2 transition-opacity duration-500 ${initStep >= 1 ? 'opacity-100' : 'opacity-30'}`}>
                          <span className="text-xs text-eva-yellow uppercase tracking-widest flex items-center gap-2">
                              <Cpu className="w-4 h-4" /> UPLOADING LOGIC
                          </span>
                          <span className="text-xs font-bold text-white">
                              {initStep >= 1 ? 'COMPLETE' : 'PENDING...'}
                          </span>
                      </div>

                      {/* Step 2: Sync */}
                      <div className={`flex items-center justify-between border-b border-gray-800 pb-2 transition-opacity duration-500 ${initStep >= 2 ? 'opacity-100' : 'opacity-30'}`}>
                          <span className="text-xs text-eva-yellow uppercase tracking-widest flex items-center gap-2">
                              <Zap className="w-4 h-4" /> SYNC RATIO
                          </span>
                          <span className="text-xs font-bold text-eva-red animate-pulse">
                              {initStep >= 2 ? '400%' : 'CALCULATING...'}
                          </span>
                      </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full h-8 border-2 border-eva-orange p-1 mt-8">
                      <div 
                        className="h-full bg-eva-orange transition-all duration-[4000ms] ease-linear"
                        style={{ width: initStep >= 3 ? '100%' : '10%' }}
                      ></div>
                  </div>
                  
                  <div className="text-center text-[10px] text-gray-500 uppercase tracking-[0.5em] mt-2">
                      MAGI-SYSTEM: CASPER-3 PROCESSING
                  </div>
              </div>
          </div>
      );
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <div className="border-l-4 border-eva-yellow pl-6 mb-12">
        <h2 className="text-5xl font-serif font-black text-eva-yellow tracking-tighter mb-2 scale-y-110">UNIT CONSTRUCTION</h2>
        <p className="text-xs font-mono text-eva-orange tracking-widest uppercase">Select parameters for new autonomous trading entity</p>
      </div>

      <div className="grid grid-cols-12 gap-12">
        <div className="col-span-8 space-y-8">
            {/* Name */}
            <div className="space-y-2">
            <label className="block text-xs font-bold text-eva-yellow tracking-widest uppercase bg-eva-yellow/10 inline-block px-2 py-1 mb-2">01. Unit Identification</label>
            <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="EVA-UNIT-01"
                className="w-full bg-black/50 border-2 border-gray-700 p-4 text-white font-mono placeholder-gray-600 focus:border-eva-orange focus:ring-0 outline-none uppercase tracking-widest text-lg transition-colors"
            />
            </div>

            {/* Prompts */}
            <div className="space-y-2">
            <label className="block text-xs font-bold text-eva-yellow tracking-widest uppercase bg-eva-yellow/10 inline-block px-2 py-1 mb-2">02. Logic Directives (Betting)</label>
            <textarea 
                className="w-full h-32 bg-black/50 border-2 border-gray-700 p-4 text-eva-green font-mono text-xs leading-relaxed resize-none focus:border-eva-orange outline-none"
                placeholder="// ENTER PRE-MARKET STRATEGY ALGORITHM..."
            />
            </div>

            <div className="space-y-2">
            <label className="block text-xs font-bold text-eva-yellow tracking-widest uppercase bg-eva-yellow/10 inline-block px-2 py-1 mb-2">03. Combat Directives (Trading)</label>
            <textarea 
                className="w-full h-40 bg-black/50 border-2 border-gray-700 p-4 text-eva-green font-mono text-xs leading-relaxed resize-none focus:border-eva-orange outline-none"
                placeholder="// ENTER LIVE MARKET EXECUTION PARAMETERS..."
            />
            </div>
        </div>

        <div className="col-span-4 space-y-8">
            {/* Avatar */}
            <div className="space-y-2">
            <label className="block text-xs font-bold text-eva-yellow tracking-widest uppercase bg-eva-yellow/10 inline-block px-2 py-1 mb-2">00. Visual Signature</label>
            <div className="grid grid-cols-3 gap-2">
                {AVATARS.map((avatar) => (
                    <button
                    key={avatar.id}
                    onClick={() => setSelectedAvatar(avatar.id)}
                    className={`aspect-square flex items-center justify-center border-2 transition-all ${
                        selectedAvatar === avatar.id 
                        ? 'bg-eva-orange border-eva-orange text-black' 
                        : 'bg-black border-gray-700 hover:border-eva-orange text-gray-500'
                    }`}
                    >
                    {avatar.icon}
                    </button>
                ))}
            </div>
            </div>

            <div className="bg-eva-red/10 border border-eva-red p-4 mt-8">
                <div className="flex items-center gap-2 text-eva-red mb-2">
                    <Triangle className="w-4 h-4 fill-current" />
                    <span className="font-bold text-xs tracking-widest">WARNING</span>
                </div>
                <p className="text-[10px] text-eva-red leading-relaxed uppercase">
                    Activation requires 0.1 SOL synchronization fee.<br/>
                    Neural linkage failure rate: 0.002%
                </p>
            </div>

            <Button onClick={handleSubmit} className="w-full mt-4 h-16 text-lg relative group overflow-hidden" variant="primary">
               <span className="relative z-10">INITIALIZE UNIT</span>
               <div className="absolute inset-0 bg-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-0"></div>
               <span className="absolute inset-0 z-20 flex items-center justify-center text-black opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-bold tracking-widest">
                   LAUNCH
               </span>
            </Button>
        </div>
      </div>
    </div>
  );
};