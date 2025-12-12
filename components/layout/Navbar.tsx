import React from 'react';
import { Disc, Radio } from 'lucide-react';
import { AppState } from '../../types';

interface NavbarProps {
  currentView: AppState;
  onNavigate: (view: AppState) => void;
  walletAddress: string | null;
  onConnect: () => void;
  solBalance: number;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  currentView, 
  onNavigate, 
  walletAddress, 
  onConnect,
  solBalance
}) => {
  return (
    <header className="h-20 bg-eva-dark border-b-2 border-eva-red flex items-center justify-between px-8 sticky top-0 z-50 bg-opacity-90 backdrop-blur-md">
      <div className="flex items-center gap-16">
        <div className="flex flex-col cursor-pointer group" onClick={() => onNavigate('LANDING')}>
            <h1 className="text-4xl font-serif font-black tracking-tighter text-eva-yellow leading-none group-hover:text-white transition-colors text-glow" style={{ transform: 'scaleY(1.2)' }}>
            EVANGELION
            </h1>
            <span className="text-[10px] tracking-[0.5em] text-eva-red font-bold -mt-1 group-hover:text-white transition-colors">TRADING SYSTEM</span>
        </div>
        
        {walletAddress && (
          <nav className="flex gap-1">
            <NavButton 
                active={currentView === 'ARENA'} 
                onClick={() => onNavigate('ARENA')}
                label="TOKYO-3 ARENA"
            />
            <NavButton 
                active={currentView === 'MY_AGENT'} 
                onClick={() => onNavigate('MY_AGENT')}
                label="UNIT STATUS"
            />
          </nav>
        )}
      </div>

      <div className="flex items-center gap-6">
        {walletAddress ? (
           <>
            <div className="flex flex-col items-end">
                <span className="text-[10px] text-eva-green font-bold tracking-widest">CONNECTION STABLE</span>
                <span className="text-xs font-serif text-white">SOL: <span className="text-eva-yellow font-mono text-lg">{solBalance.toFixed(2)}</span></span>
            </div>
            <div className="h-10 px-4 border border-eva-yellow bg-eva-yellow/10 flex items-center justify-center text-xs font-bold text-eva-yellow tracking-widest shadow-[0_0_10px_rgba(250,204,21,0.2)]">
              ID: {walletAddress}
            </div>
           </>
        ) : (
          <button 
            onClick={onConnect}
            className="h-10 px-6 border border-eva-yellow text-eva-yellow hover:bg-eva-yellow hover:text-black transition-colors text-xs font-bold tracking-widest uppercase"
          >
            Init Connection
          </button>
        )}
      </div>
    </header>
  );
};

const NavButton = ({ active, onClick, label }: { active: boolean, onClick: () => void, label: string }) => (
    <button 
        onClick={onClick}
        className={`
            h-10 px-6 text-xs font-bold tracking-widest transition-all
            ${active 
                ? 'bg-eva-red text-black border border-eva-red' 
                : 'text-gray-400 border border-transparent hover:border-eva-red hover:text-eva-red'
            }
        `}
    >
        {label}
    </button>
);