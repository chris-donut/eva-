import React, { useState, useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { ConnectWallet } from './components/features/wallet/ConnectWallet';
import { CreateAgent } from './components/features/agent/CreateAgent';
import { Arena } from './components/features/arena/Arena';
import { MyAgent } from './components/features/agent/MyAgent';
import { AppState, Agent, TradeLog, GamePhase } from './types';
import { MOCK_LOGS, INITIAL_COMPETITORS } from './constants';

// Phase durations in seconds
const PHASE_DURATION = {
  BETTING: 30,
  TRADING: 45,
  LIQUIDATION: 15,
  SETTLEMENT: 10
};

function App() {
  const [currentView, setCurrentView] = useState<AppState>('LANDING');
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [agent, setAgent] = useState<Agent | undefined>(undefined);
  const [logs, setLogs] = useState<TradeLog[]>(MOCK_LOGS);
  
  // Game Loop State
  const [phase, setPhase] = useState<GamePhase>('BETTING');
  const [timeLeft, setTimeLeft] = useState(PHASE_DURATION.BETTING);
  const [competitors, setCompetitors] = useState<Agent[]>(INITIAL_COMPETITORS);

  // Simulation & Game Loop Effect
  useEffect(() => {
    const timer = setInterval(() => {
      // 1. Handle Timer & Phase Transitions
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // Transition Logic
          switch (phase) {
            case 'BETTING':
              setPhase('TRADING');
              return PHASE_DURATION.TRADING;
            case 'TRADING':
              setPhase('LIQUIDATION');
              return PHASE_DURATION.LIQUIDATION;
            case 'LIQUIDATION':
              setPhase('SETTLEMENT');
              return PHASE_DURATION.SETTLEMENT;
            case 'SETTLEMENT':
              setPhase('BETTING');
              // Optional: Reset PnL for next round or keep cumulative? 
              // For prototype, let's keep cumulative but maybe reset round PnL visually later
              return PHASE_DURATION.BETTING;
            default:
              return 30;
          }
        }
        return prev - 1;
      });

      // 2. Simulate PnL Fluctuations (Only during Active Market Phases)
      if (phase === 'TRADING' || phase === 'LIQUIDATION') {
        setCompetitors(prev => prev.map(comp => {
          // Volatility increases in Liquidation phase
          const volatility = phase === 'LIQUIDATION' ? 1.2 : 0.5;
          const change = (Math.random() - 0.48) * volatility;
          
          return {
            ...comp,
            currentRoundPnl: comp.currentRoundPnl + change,
            totalPnl: comp.totalPnl + change
          };
        }));

        // Simulate User Agent PnL if Deployed
        if (agent && agent.isDeployed && agent.status === 'ACTIVE') {
           const volatility = phase === 'LIQUIDATION' ? 1.5 : 0.6;
           const userChange = (Math.random() - 0.45) * volatility;
           setAgent(prev => {
               if(!prev) return undefined;
               return {
                   ...prev,
                   currentRoundPnl: prev.currentRoundPnl + userChange,
                   totalPnl: prev.totalPnl + userChange
               };
           });
        }
      }

    }, 1000); // 1 second tick

    return () => clearInterval(timer);
  }, [phase, agent?.isDeployed, agent?.status]);

  const handleConnect = () => {
    setTimeout(() => {
      setWalletAddress('NERV-USER-01');
      setCurrentView('CREATE_AGENT');
    }, 800);
  };

  const handleCreateAgent = (newAgent: Agent) => {
    setAgent({ ...newAgent, isDeployed: false, status: 'STANDBY' }); 
    // Navigate directly to Unit Status to allow user to Deploy
    setCurrentView('MY_AGENT');
  };

  const handleUpdateAgent = (updatedAgent: Agent) => {
    setAgent(updatedAgent);
  };

  const handleDeployAgent = () => {
      if (!agent) return;
      const deployedAgent = { ...agent, isDeployed: true, status: 'ACTIVE' as const };
      setAgent(deployedAgent);
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
        return <Arena 
          agent={agent} 
          competitors={arenaCompetitors} 
          phase={phase}
          timeLeft={timeLeft}
        />;
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
    <div className="min-h-screen bg-eva-light bg-hex-pattern text-eva-dark font-mono selection:bg-eva-brand selection:text-white">
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