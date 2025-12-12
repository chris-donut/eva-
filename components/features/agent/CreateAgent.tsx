import React, { useState } from 'react';
import { Plus, Triangle } from 'lucide-react';
import { Button } from '../../ui/Button';
import { AVATARS } from '../../../constants';
import { Agent } from '../../../types';

interface CreateAgentProps {
  onCreated: (agent: Agent) => void;
}

export const CreateAgent: React.FC<CreateAgentProps> = ({ onCreated }) => {
  const [name, setName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(AVATARS[0].id);

  const handleSubmit = () => {
    if (!name) return;
    
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
  };

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

            <Button onClick={handleSubmit} className="w-full mt-4" variant="primary">
            INITIALIZE UNIT
            </Button>
        </div>
      </div>
    </div>
  );
};