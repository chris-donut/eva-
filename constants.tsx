import React from 'react';
import { RankingItem, TradeLog } from './types';
import { Bot, Zap, Flame, Brain, Gem } from 'lucide-react';

export const AVATARS = [
  { id: 'robot', icon: <Bot className="w-6 h-6" /> },
  { id: 'target', icon: <Zap className="w-6 h-6" /> }, // Simulating target with Zap for now
  { id: 'lightning', icon: <Zap className="w-6 h-6 text-yellow-500" /> },
  { id: 'fire', icon: <Flame className="w-6 h-6 text-orange-500" /> },
  { id: 'brain', icon: <Brain className="w-6 h-6 text-pink-500" /> },
  { id: 'gem', icon: <Gem className="w-6 h-6 text-blue-500" /> },
];

export const MOCK_RANKINGS: RankingItem[] = [
  { rank: 1, agentName: 'Agent 1', tokens: 60231.21, supplyPercent: 17.5, pnl: 12.04 },
  { rank: 2, agentName: 'Agent 2', tokens: 55100.45, supplyPercent: 14.2, pnl: 9.32 },
  { rank: 3, agentName: 'AlphaBot', tokens: 42000.00, supplyPercent: 11.0, pnl: 8.11 },
  { rank: 4, agentName: 'Sniper_X', tokens: 38231.11, supplyPercent: 9.5, pnl: 5.40 },
  { rank: 5, agentName: 'HODL_Gpt', tokens: 21000.55, supplyPercent: 5.1, pnl: -1.20 },
];

export const MOCK_LOGS: TradeLog[] = [
  {
    id: 'tx-1',
    time: '2025/12/12 23:43:22',
    type: 'BUY',
    amount: 123.21,
    price: 0.00003,
    txHash: 'eswd...asd1',
    reasoning: {
      chainOfThought: "Market volatility is increasing. The recent dip in SOL provides a favorable entry point relative to the moving average. Sentiment analysis of recent blocks suggests accumulation.",
      output: "The probability of a short-term rebound is > 65%. Risk/Reward ratio is 1:3. Executing buy order to capitalize on local minima.",
      action: "Buy 123.21 Token for 0.4 SOL @0.00003 SOL"
    }
  },
  {
    id: 'tx-2',
    time: '2025/12/12 23:41:10',
    type: 'SELL',
    amount: 50.00,
    price: 0.000035,
    txHash: 'beef...ea2',
    reasoning: {
      chainOfThought: "RSI indicates overbought conditions on the 1m timeframe. Taking partial profit to rebalance portfolio exposure.",
      output: "Reducing exposure by 10% to secure accrued gains. Maintaining core position for potential breakout.",
      action: "Sell 50.00 Token for 0.175 SOL @0.000035 SOL"
    }
  },
   {
    id: 'tx-3',
    time: '2025/12/12 23:38:05',
    type: 'BUY',
    amount: 200.00,
    price: 0.000028,
    txHash: 'acc1...99x',
    reasoning: {
      chainOfThought: "Detected large buy wall at 0.000027. Front-running the support level.",
      output: "Support confirmed. Entering aggressive long position.",
      action: "Buy 200.00 Token"
    }
  }
];

export const CHART_DATA = Array.from({ length: 50 }, (_, i) => ({
  time: i,
  value: 0.0015 + Math.random() * 0.0005 + (i * 0.00005),
}));
