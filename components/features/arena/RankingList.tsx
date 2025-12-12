import React, { useState } from 'react';
import { Agent } from '../../../types';
import { CompetitorModal } from './CompetitorModal';

interface RankingListProps {
  competitors: Agent[];
  userAgentId?: string;
}

export const RankingList: React.FC<RankingListProps> = ({ competitors, userAgentId }) => {
  const [selectedCompetitor, setSelectedCompetitor] = useState<Agent | null>(null);

  // Sort competitors by Current Round PnL for the ranking
  const sortedCompetitors = [...competitors].sort((a, b) => b.currentRoundPnl - a.currentRoundPnl);

  return (
    <>
    <div className="h-full overflow-hidden flex flex-col p-4 bg-white">
      
      <div className="space-y-1 flex-1 overflow-y-auto pr-2 custom-scrollbar">
        {sortedCompetitors.map((agent, index) => {
          const rank = index + 1;
          const isUser = agent.id === userAgentId;
          
          return (
            <div 
                key={agent.id} 
                onClick={() => setSelectedCompetitor(agent)}
                className={`flex items-center justify-between p-2 border-b border-dashed font-mono text-xs transition-colors cursor-pointer group ${
                    isUser 
                    ? 'bg-red-50 border-eva-brand text-eva-dark' 
                    : 'border-gray-200 hover:bg-gray-50 text-gray-600 hover:text-gray-900'
                } ${agent.isDeployed ? 'opacity-100' : 'opacity-60'}`}
            >
                <div className="flex items-center gap-4">
                <div className={`w-6 text-center font-bold ${
                    isUser ? 'text-eva-brand' :
                    rank === 1 ? 'text-eva-brand' : 
                    rank === 2 ? 'text-gray-500' :
                    rank === 3 ? 'text-orange-500' : 'text-gray-400'
                }`}>
                    {rank < 10 ? `0${rank}` : rank}
                </div>
                <div>
                    <div className={`uppercase tracking-wider flex items-center gap-2 ${rank === 1 || isUser ? 'font-bold' : 'font-medium'} ${!isUser && rank <= 3 ? 'text-eva-dark' : ''}`}>
                        {agent.name}
                        {isUser && (
                            <span className="text-[8px] bg-eva-brand text-white px-1.5 py-0.5 font-bold tracking-tight">YOU</span>
                        )}
                    </div>
                </div>
                </div>
                
                <div className="text-right flex items-center gap-4">
                <span className={`${isUser ? 'text-gray-600' : 'text-gray-400'} hidden lg:block`}>{agent.tokenBalance?.toLocaleString() || 0} T</span>
                <div className={`font-bold w-20 text-right ${agent.currentRoundPnl >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {agent.currentRoundPnl >= 0 ? '+' : ''}{agent.currentRoundPnl.toFixed(2)}
                </div>
                </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="text-[10px] text-eva-brand uppercase tracking-widest flex justify-between font-bold">
           <span>THRESHOLD TO WIN</span>
           <span>+23.2 SOL</span>
        </div>
        <div className="h-1 bg-gray-100 mt-2 w-full relative overflow-hidden">
             <div className="absolute top-0 left-0 h-full bg-eva-brand w-3/4"></div>
             <div className="absolute top-0 left-0 h-full w-full bg-[repeating-linear-gradient(90deg,transparent,transparent_2px,#fff_2px,#fff_4px)] opacity-50"></div>
        </div>
      </div>
    </div>
    
    {selectedCompetitor && (
        <CompetitorModal agent={selectedCompetitor} onClose={() => setSelectedCompetitor(null)} />
    )}
    </>
  );
};