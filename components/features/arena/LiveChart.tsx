import React from 'react';
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid } from 'recharts';
import { CHART_DATA } from '../../../constants';

interface LiveChartProps {
  isPositive: boolean;
}

export const LiveChart: React.FC<LiveChartProps> = ({ isPositive }) => {
  // Always Green for Eva aesthetic (or Red for danger), avoid soft gradients
  const color = "#10b981"; 

  return (
    <div className="w-full h-full bg-black/60 p-4 relative overflow-hidden flex flex-col">
      <div className="flex justify-between items-start mb-4 border-b border-gray-800 pb-2">
        <div>
            <div className="text-[10px] text-gray-500 uppercase tracking-widest">Data Stream</div>
            <div className={`text-2xl font-mono font-bold text-eva-green`}>
            0.001914 <span className="text-xs text-gray-600 ml-2">SOL</span>
            </div>
        </div>
        <div className="flex gap-px">
            {['1M', '5M', '15M'].map((t, i) => (
            <button key={t} className={`px-2 py-1 text-[10px] uppercase font-bold border ${i === 1 ? 'bg-eva-green text-black border-eva-green' : 'bg-transparent text-gray-500 border-gray-800 hover:border-gray-600'}`}>
                {t}
            </button>
            ))}
        </div>
      </div>

      <div className="flex-1 w-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={CHART_DATA}>
            <CartesianGrid stroke="#333" strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="time" hide />
            <YAxis domain={['auto', 'auto']} hide />
            <Tooltip 
                contentStyle={{ backgroundColor: '#000', border: '1px solid #10b981', color: '#10b981', fontFamily: 'JetBrains Mono', fontSize: '12px' }}
                itemStyle={{ color: '#10b981' }}
                cursor={{ stroke: '#10b981', strokeWidth: 1 }}
                formatter={(val: number) => [val.toFixed(6), 'VAL']}
                labelStyle={{ display: 'none' }}
            />
            <Area 
                type="step" 
                dataKey="value" 
                stroke={color} 
                strokeWidth={2}
                fill="none"
                isAnimationActive={false}
            />
            </AreaChart>
        </ResponsiveContainer>
      </div>
      
      {/* Decorative Chart Elements */}
      <div className="absolute bottom-2 left-2 text-[8px] text-eva-green font-mono opacity-50">
         WAVEFORM-A1
      </div>
    </div>
  );
};