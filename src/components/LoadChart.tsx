'use client';

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface LoadChartProps {
    history: any[];
}

export function LoadChart({ history }: LoadChartProps) {
    // Transform history to show zones
    // In a real app, these zones would be calculated based on chronic load
    const data = history.map(h => ({
        ...h,
        optimalLow: 20,
        optimalHigh: 50,
        overreaching: 70,
    }));

    return (
        <div className="h-[300px] w-full rounded-xl bg-white p-6 shadow-sm dark:bg-zinc-900">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                    <defs>
                        <linearGradient id="colorOptimal" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" opacity={0.1} />
                    <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                    <YAxis />
                    <Tooltip />

                    {/* Zones - Simulated with stacked areas or just background areas */}
                    <Area type="monotone" dataKey="overreaching" stackId="1" stroke="none" fill="#fecaca" fillOpacity={0.5} />
                    <Area type="monotone" dataKey="optimalHigh" stackId="2" stroke="none" fill="#fde68a" fillOpacity={0.5} />
                    <Area type="monotone" dataKey="optimalLow" stackId="3" stroke="none" fill="#bbf7d0" fillOpacity={0.5} />

                    {/* Actual Load */}
                    <Area type="monotone" dataKey="distance" stroke="#0f766e" fill="#115e59" strokeWidth={2} fillOpacity={0.6} />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}
