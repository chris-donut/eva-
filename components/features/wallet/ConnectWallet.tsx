import React from 'react';
import { ShieldAlert, Fingerprint } from 'lucide-react';
import { Button } from '../../ui/Button';

interface ConnectWalletProps {
  onConnect: () => void;
}

export const ConnectWallet: React.FC<ConnectWalletProps> = ({ onConnect }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-10">
         <div className="w-[600px] h-[600px] border-[20px] border-eva-red rounded-full flex items-center justify-center">
            <div className="w-[500px] h-[500px] border border-eva-red rounded-full"></div>
         </div>
      </div>

      <div className="w-full max-w-lg p-1 bg-eva-dark border-2 border-eva-red shadow-[0_0_20px_rgba(239,68,68,0.3)] relative z-10">
        <div className="bg-eva-dark p-12 text-center border border-eva-red/30">
            <div className="mb-8 flex justify-center">
                 <div className="w-20 h-20 bg-eva-red text-black flex items-center justify-center clip-octagon">
                    <ShieldAlert className="w-10 h-10" />
                 </div>
            </div>
            
            <h2 className="text-4xl font-serif font-bold text-eva-red mb-2 tracking-tighter scale-y-110">RESTRICTED AREA</h2>
            <div className="w-full h-px bg-eva-red mb-6"></div>
            
            <p className="text-xs text-eva-orange font-mono mb-12 tracking-widest uppercase leading-relaxed">
            Unauthorized access is strictly prohibited.<br/>
            Central Dogma Access Requires Level 5 Clearance.
            </p>

            <Button onClick={onConnect} className="w-full h-16 text-lg tracking-[0.2em] animate-pulse" variant="danger">
            <Fingerprint className="w-6 h-6 mr-4" />
            Bio-Entry
            </Button>
            
            <div className="mt-8 text-[10px] text-gray-600 font-mono flex justify-between">
                <span>MAGI-SYSTEM: CASPER-3</span>
                <span>STATUS: LOCKED</span>
            </div>
        </div>
      </div>
    </div>
  );
};