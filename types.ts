export type AppState = 'LANDING' | 'CREATE_AGENT' | 'ARENA' | 'MY_AGENT';

export type GamePhase = 'BETTING' | 'TRADING' | 'LIQUIDATION' | 'SETTLEMENT';

export interface Agent {
  id: string;
  name: string;
  avatar: string; // ID of the avatar icon
  balance: number; // In SOL
  status: 'ACTIVE' | 'PAUSED' | 'STANDBY';
  isDeployed: boolean;
  totalPnl: number;
  currentRoundPnl: number;
  bettingPrompt: string;
  tradingPrompt: string;
  lastAction?: string;
  tokenBalance?: number; // For ranking
}

export interface TradeLog {
  id: string;
  time: string;
  type: 'BUY' | 'SELL' | 'DEPOSIT' | 'WITHDRAW' | 'LIQUIDATION';
  amount: number;
  price?: number; // Optional for non-trade types
  txHash: string;
  reasoning: {
    chainOfThought: string;
    output: string;
    action: string;
  };
}

export interface RankingItem {
  rank: number;
  agentName: string;
  tokens: number;
  supplyPercent: number;
  pnl: number;
  isUser?: boolean;
}