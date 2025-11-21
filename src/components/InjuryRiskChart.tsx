'use client';

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceArea } from 'recharts';
import { DailyStat } from '@/lib/analytics';

interface InjuryRiskChartProps {
    data: DailyStat[];
}

export function InjuryRiskChart({ data }: InjuryRiskChartProps) {
    return (
        <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-zinc-900">
            <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-black dark:text-white">Risk of running injury</h3>
                <div className="text-sm text-red-500 font-medium cursor-pointer">Period: 1 month - Unlock with Premium +</div>
            </div>

            <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                        <XAxis
                            dataKey="date"
                            tick={{ fontSize: 12, fill: '#6b7280' }}
                            tickLine={false}
                            axisLine={false}
                            interval="preserveStartEnd"
                        />
                        <YAxis
                            domain={[0, 2.5]}
                            orientation="right"
                            tick={{ fontSize: 12, fill: '#6b7280' }}
                            tickLine={false}
                            axisLine={false}
                            label={{ value: 'Relative risk of injury', angle: -90, position: 'insideRight', style: { textAnchor: 'middle', fill: '#6b7280', fontSize: 12 } }}
                        />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        />

                        {/* Background Zones */}
                        <ReferenceArea y1={1.5} y2={4} fill="#fecaca" fillOpacity={0.5} /> {/* High Risk */}
                        <ReferenceArea y1={1.3} y2={1.5} fill="#fde68a" fillOpacity={0.5} /> {/* Caution */}
                        <ReferenceArea y1={0.8} y2={1.3} fill="#bbf7d0" fillOpacity={0.5} /> {/* Optimal */}
                        <ReferenceArea y1={0} y2={0.8} fill="#86efac" fillOpacity={0.5} /> {/* Low */}

                        {/* ACR Line */}
                        <Area
                            type="monotone"
                            dataKey="acr"
                            stroke="#000"
                            strokeWidth={2}
                            fill="none"
                            isAnimationActive={false}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
