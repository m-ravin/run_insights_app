'use client';

import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface GaugeProps {
    value: number;
    label: string;
    color: string;
}

function Gauge({ value, label, color }: GaugeProps) {
    const data = [
        { value: value, color: color },
        { value: 100 - value, color: '#e5e7eb' }, // Gray background
    ];

    // Normalize value for display (cap at 100 for the chart, but show real value in text)
    const chartData = [
        { value: Math.min(100, value), color: color },
        { value: Math.max(0, 100 - value), color: '#e5e7eb' },
    ];

    return (
        <div className="flex flex-col items-center">
            <span className="mb-2 text-xs font-bold uppercase text-zinc-500">{label}</span>
            <div className="relative h-24 w-40">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={chartData}
                            cx="50%"
                            cy="100%"
                            startAngle={180}
                            endAngle={0}
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={0}
                            dataKey="value"
                        >
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
                <div className="absolute bottom-0 left-0 flex w-full justify-center">
                    <span className="text-xl font-bold text-zinc-800 dark:text-zinc-200">{value}%</span>
                </div>
            </div>
        </div>
    );
}

export function ProgressGauges() {
    // Placeholder data - in real app, calculate from goals vs actuals
    return (
        <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-zinc-900">
            <h3 className="mb-6 text-lg font-semibold text-black dark:text-white">Your training progress</h3>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
                <div className="flex items-center justify-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-500 text-white font-bold">
                        run
                    </div>
                </div>
                <Gauge value={116} label="Distance" color="#3b82f6" />
                <Gauge value={99} label="Long Run / Ride" color="#3b82f6" />
                <Gauge value={109} label="Elevation Gain" color="#3b82f6" />
            </div>
        </div>
    );
}
