import React from 'react';
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid } from 'recharts';
import { CHART_DATA } from '../../../constants';

interface LiveChartProps {
  isPositive: boolean;
}

export const LiveChart: React.FC<LiveChartProps> = ({ isPositive }) => {
  // Use Brand Red for high visibility in the Light Industrial theme
  const color = "#ef4444"; 

  return (
    <div className="w-full h-full bg-white p-4 relative overflow-hidden flex flex-col border border-gray-100">
      <div className="flex justify-between items-start mb-4 border-b border-gray-200 pb-2">
        <div>
            <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Data Stream</div>
            <div className={`text-2xl font-mono font-bold text-eva-dark`}>
            0.001914 <span className="text-xs text-gray-500 ml-2">SOL</span>
            </div>
        </div>
        <div className="flex gap-px">
            {['1M', '5M', '15M'].map((t, i) => (
            <button key={t} className={`px-2 py-1 text-[10px] uppercase font-bold border ${i === 1 ? 'bg-eva-brand text-white border-eva-brand' : 'bg-transparent text-gray-600 border-gray-300 hover:border-gray-400'}`}>
                {t}
            </button>
            ))}
        </div>
      </div>

      <div className="flex-1 w-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={CHART_DATA}>
            <CartesianGrid stroke="#e5e7eb" strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="time" hide />
            <YAxis domain={['auto', 'auto']} hide />
            <Tooltip 
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #ef4444', color: '#18181b', fontFamily: 'JetBrains Mono', fontSize: '12px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                itemStyle={{ color: '#ef4444' }}
                cursor={{ stroke: '#ef4444', strokeWidth: 1 }}
                formatter={(val: number) => [val.toFixed(6), 'VAL']}
                labelStyle={{ display: 'none' }}
            />
            <Area 
                type="step" 
                dataKey="value" 
                stroke={color} 
                strokeWidth={2}
                fill="url(#colorGradient)"
                isAnimationActive={false}
            />
            <defs>
              <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
              </linearGradient>
            </defs>
            </AreaChart>
        </ResponsiveContainer>
      </div>
      
      {/* Decorative Chart Elements */}
      <div className="absolute bottom-2 left-2 text-[8px] text-eva-brand font-mono opacity-50 font-bold">
         WAVEFORM-A1 // MONITORING
      </div>
    </div>
  );
};