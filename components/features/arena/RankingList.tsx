import React, { useState } from 'react';
import { Agent } from '../../../types';
import { CompetitorModal } from './CompetitorModal';

interface RankingListProps {
  competitors: Agent[];
}

export const RankingList: React.FC<RankingListProps> = ({ competitors }) => {
  const [selectedCompetitor, setSelectedCompetitor] = useState<Agent | null>(null);

  // Sort competitors by Current Round PnL for the ranking
  const sortedCompetitors = [...competitors].sort((a, b) => b.currentRoundPnl - a.currentRoundPnl);

  return (
    <>
    <div className="h-full overflow-hidden flex flex-col p-4">
      
      <div className="space-y-1 flex-1 overflow-y-auto pr-2 custom-scrollbar">
        {sortedCompetitors.map((agent, index) => {
          const rank = index + 1;
          const isUser = false; // We could pass currentUserId prop if needed to highlight
          
          return (
            <div 
                key={agent.id} 
                onClick={() => setSelectedCompetitor(agent)}
                className={`flex items-center justify-between p-2 border-b border-dashed border-gray-800 font-mono text-xs hover:bg-white/5 transition-colors cursor-pointer group ${
                    rank <= 3 ? 'text-white' : 'text-gray-500'
                } ${agent.isDeployed ? 'opacity-100' : 'opacity-50'}`}
            >
                <div className="flex items-center gap-4">
                <div className={`w-6 text-center font-bold ${
                    rank === 1 ? 'text-eva-yellow' : 
                    rank === 2 ? 'text-gray-300' :
                    rank === 3 ? 'text-eva-orange' : 'text-gray-600'
                }`}>
                    {rank < 10 ? `0${rank}` : rank}
                </div>
                <div>
                    <div className={`uppercase tracking-wider ${rank === 1 ? 'font-bold' : ''}`}>
                        {agent.name}
                        {/* Indicate if it's the user's agent mostly by name matching or passed prop */}
                    </div>
                </div>
                </div>
                
                <div className="text-right flex items-center gap-4">
                <span className="text-gray-600 hidden lg:block">{agent.tokenBalance?.toLocaleString() || 0} T</span>
                <div className={`font-bold w-20 text-right ${agent.currentRoundPnl >= 0 ? 'text-eva-green' : 'text-eva-red'}`}>
                    {agent.currentRoundPnl >= 0 ? '+' : ''}{agent.currentRoundPnl.toFixed(2)}
                </div>
                </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 pt-4 border-t border-eva-gray">
        <div className="text-[10px] text-eva-orange uppercase tracking-widest flex justify-between">
           <span>THRESHOLD TO WIN</span>
           <span>+23.2 SOL</span>
        </div>
        <div className="h-1 bg-gray-800 mt-2 w-full relative overflow-hidden">
             <div className="absolute top-0 left-0 h-full bg-eva-orange w-3/4"></div>
             <div className="absolute top-0 left-0 h-full w-full bg-[repeating-linear-gradient(90deg,transparent,transparent_2px,#000_2px,#000_4px)] opacity-50"></div>
        </div>
      </div>
    </div>
    
    {selectedCompetitor && (
        <CompetitorModal agent={selectedCompetitor} onClose={() => setSelectedCompetitor(null)} />
    )}
    </>
  );
};