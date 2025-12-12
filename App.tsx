import React, { useState, useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { ConnectWallet } from './components/features/wallet/ConnectWallet';
import { CreateAgent } from './components/features/agent/CreateAgent';
import { Arena } from './components/features/arena/Arena';
import { MyAgent } from './components/features/agent/MyAgent';
import { AppState, Agent, TradeLog } from './types';
import { MOCK_LOGS, INITIAL_COMPETITORS } from './constants';

function App() {
  const [currentView, setCurrentView] = useState<AppState>('LANDING');
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [agent, setAgent] = useState<Agent | undefined>(undefined);
  const [logs, setLogs] = useState<TradeLog[]>(MOCK_LOGS);
  
  // Active Competitors State (Bots + potentially user agent)
  const [competitors, setCompetitors] = useState<Agent[]>(INITIAL_COMPETITORS);

  // Simulation Effect
  useEffect(() => {
    const interval = setInterval(() => {
      // 1. Simulate Competitor PnL Fluctuations
      setCompetitors(prev => prev.map(comp => {
        // Random fluctuation between -0.5 and 0.5 SOL per tick
        const change = (Math.random() - 0.48) * 0.5;
        const newRoundPnl = comp.currentRoundPnl + change;
        const newTotalPnl = comp.totalPnl + change;
        
        return {
          ...comp,
          currentRoundPnl: newRoundPnl,
          totalPnl: newTotalPnl
        };
      }));

      // 2. Simulate User Agent PnL if Deployed
      if (agent && agent.isDeployed && agent.status === 'ACTIVE') {
         const userChange = (Math.random() - 0.45) * 0.6; // Slight advantage for user ;)
         setAgent(prev => {
             if(!prev) return undefined;
             return {
                 ...prev,
                 currentRoundPnl: prev.currentRoundPnl + userChange,
                 totalPnl: prev.totalPnl + userChange
             };
         });
      }

    }, 2000); // 2 second tick

    return () => clearInterval(interval);
  }, [agent?.isDeployed, agent?.status]); // Re-run if deployment status changes

  const handleConnect = () => {
    setTimeout(() => {
      setWalletAddress('NERV-USER-01');
      setCurrentView('CREATE_AGENT');
    }, 800);
  };

  const handleCreateAgent = (newAgent: Agent) => {
    setAgent({ ...newAgent, isDeployed: false, status: 'STANDBY' }); // Ensure initial state is standby
    setCurrentView('ARENA');
  };

  const handleUpdateAgent = (updatedAgent: Agent) => {
    setAgent(updatedAgent);
  };

  const handleDeployAgent = () => {
      if (!agent) return;
      const deployedAgent = { ...agent, isDeployed: true, status: 'ACTIVE' as const };
      setAgent(deployedAgent);
      // We don't necessarily need to add to `competitors` array if we merge them in Arena, 
      // but let's keep them separate to distinguish "Bots" vs "User" in logic for now, 
      // and merge in the view.
      // Removed automatic navigation to ARENA so user sees status update on My Agent screen
      // setCurrentView('ARENA'); 
  };

  const handleAddLog = (log: TradeLog) => {
    setLogs(prevLogs => [log, ...prevLogs]);
  };

  // Merge User Agent into Competitors list for Arena View
  const arenaCompetitors = agent && agent.isDeployed 
    ? [...competitors, agent] 
    : competitors;

  const renderContent = () => {
    switch (currentView) {
      case 'LANDING':
        return <ConnectWallet onConnect={handleConnect} />;
      case 'CREATE_AGENT':
        return <CreateAgent onCreated={handleCreateAgent} />;
      case 'ARENA':
        return <Arena agent={agent} competitors={arenaCompetitors} />;
      case 'MY_AGENT':
        return agent ? (
          <MyAgent 
            agent={agent} 
            logs={logs}
            onUpdateAgent={handleUpdateAgent}
            onAddLog={handleAddLog}
            onDeploy={handleDeployAgent}
          />
        ) : <div className="text-center mt-20 font-serif text-2xl text-eva-red">UNIT NOT FOUND</div>;
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