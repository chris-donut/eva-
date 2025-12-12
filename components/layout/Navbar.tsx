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
    <header className="h-20 bg-white border-b-2 border-eva-brand flex items-center justify-between px-8 sticky top-0 z-50 bg-opacity-95 backdrop-blur-md shadow-sm">
      <div className="flex items-center gap-16">
        <div className="flex flex-col cursor-pointer group" onClick={() => onNavigate('LANDING')}>
            <h1 className="text-4xl font-serif font-black tracking-tighter text-eva-dark leading-none group-hover:text-eva-brand transition-colors" style={{ transform: 'scaleY(1.2)' }}>
            EVANGELION
            </h1>
            <span className="text-[10px] tracking-[0.5em] text-eva-brand font-bold -mt-1 group-hover:text-black transition-colors">TRADING SYSTEM</span>
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
                <span className="text-xs font-serif text-gray-800">SOL: <span className="text-eva-brand font-mono text-lg">{solBalance.toFixed(2)}</span></span>
            </div>
            <div className="h-10 px-4 border border-eva-brand bg-eva-brand/5 flex items-center justify-center text-xs font-bold text-eva-brand tracking-widest shadow-[0_0_10px_rgba(239,68,68,0.1)]">
              ID: {walletAddress}
            </div>
           </>
        ) : (
          <button 
            onClick={onConnect}
            className="h-10 px-6 border border-eva-brand text-eva-brand hover:bg-eva-brand hover:text-white transition-colors text-xs font-bold tracking-widest uppercase"
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
                ? 'bg-eva-brand text-white border border-eva-brand shadow-sm' 
                : 'text-gray-500 border border-transparent hover:border-eva-brand hover:text-eva-brand hover:bg-eva-brand/5'
            }
        `}
    >
        {label}
    </button>
);