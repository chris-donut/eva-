import React from 'react';
import { MOCK_RANKINGS } from '../../../constants';
import { Agent } from '../../../types';

interface RankingListProps {
  userAgent?: Agent;
}

export const RankingList: React.FC<RankingListProps> = ({ userAgent }) => {
  return (
    <div className="h-full overflow-hidden flex flex-col p-4">
      
      <div className="space-y-1 flex-1 overflow-y-auto pr-2 custom-scrollbar">
        {MOCK_RANKINGS.map((item) => (
          <div 
            key={item.rank} 
            className={`flex items-center justify-between p-2 border-b border-dashed border-gray-800 font-mono text-xs hover:bg-white/5 transition-colors group ${
                item.rank <= 3 ? 'text-white' : 'text-gray-500'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className={`w-6 text-center font-bold ${
                item.rank === 1 ? 'text-eva-yellow' : 
                item.rank === 2 ? 'text-gray-300' :
                item.rank === 3 ? 'text-eva-orange' : 'text-gray-600'
              }`}>
                {item.rank < 10 ? `0${item.rank}` : item.rank}
              </div>
              <div>
                <div className={`uppercase tracking-wider ${item.rank === 1 ? 'font-bold' : ''}`}>{item.agentName}</div>
              </div>
            </div>
            
            <div className="text-right flex items-center gap-4">
              <span className="text-gray-600">{item.tokens.toFixed(0)} T</span>
              <div className={`font-bold w-20 text-right ${item.pnl >= 0 ? 'text-eva-green' : 'text-eva-red'}`}>
                {item.pnl >= 0 ? '+' : ''}{item.pnl}
              </div>
            </div>
          </div>
        ))}
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
  );
};