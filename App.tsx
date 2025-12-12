import React, { useState } from 'react';
import { Navbar } from './components/layout/Navbar';
import { ConnectWallet } from './components/features/wallet/ConnectWallet';
import { CreateAgent } from './components/features/agent/CreateAgent';
import { Arena } from './components/features/arena/Arena';
import { MyAgent } from './components/features/agent/MyAgent';
import { AppState, Agent } from './types';

function App() {
  const [currentView, setCurrentView] = useState<AppState>('LANDING');
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [agent, setAgent] = useState<Agent | undefined>(undefined);

  const handleConnect = () => {
    // Simulate wallet connection
    setTimeout(() => {
      setWalletAddress('NERV-USER-01');
      setCurrentView('CREATE_AGENT');
    }, 800);
  };

  const handleCreateAgent = (newAgent: Agent) => {
    setAgent(newAgent);
    setCurrentView('ARENA');
  };

  const renderContent = () => {
    switch (currentView) {
      case 'LANDING':
        return <ConnectWallet onConnect={handleConnect} />;
      case 'CREATE_AGENT':
        return <CreateAgent onCreated={handleCreateAgent} />;
      case 'ARENA':
        return <Arena agent={agent} />;
      case 'MY_AGENT':
        return agent ? <MyAgent agent={agent} /> : <div className="text-center mt-20 font-serif text-2xl text-eva-red">UNIT NOT FOUND</div>;
      default:
        return <ConnectWallet onConnect={handleConnect} />;
    }
  };

  return (
    <div className="min-h-screen bg-eva-dark bg-hex-pattern text-gray-100 font-mono selection:bg-eva-yellow selection:text-eva-dark">
      <Navbar 
        currentView={currentView}
        onNavigate={setCurrentView}
        walletAddress={walletAddress}
        onConnect={handleConnect}
        solBalance={0.00}
      />
      
      <main className="fade-in relative z-10">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;