'use client';

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { DailyStat } from '@/lib/analytics';

interface WeeklyMileageChartProps {
    data: DailyStat[];
}

export function WeeklyMileageChart({ data }: WeeklyMileageChartProps) {
    return (
        <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-zinc-900">
            <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-black dark:text-white">Weekly mileage and ACR zones (Run)</h3>
                <div className="text-sm text-red-500 font-medium cursor-pointer">Period: 1 month +</div>
            </div>

            <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id="mileageGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#115e59" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#115e59" stopOpacity={0.1} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" opacity={0.5} />
                        <XAxis
                            dataKey="date"
                            tick={{ fontSize: 12, fill: '#9ca3af' }}
                            tickLine={false}
                            axisLine={false}
                            interval="preserveStartEnd"
                            minTickGap={30}
                        />
                        <YAxis
                            orientation="right"
                            tick={{ fontSize: 12, fill: '#9ca3af' }}
                            tickLine={false}
                            axisLine={false}
                            label={{ value: 'Weekly distance (km)', angle: -90, position: 'insideRight', style: { textAnchor: 'middle', fill: '#9ca3af', fontSize: 12 } }}
                        />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                            itemStyle={{ fontSize: '12px' }}
                            labelStyle={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}
                        />

                        <Area type="monotone" dataKey="overreaching" stroke="none" fill="#fecaca" fillOpacity={0.4} />
                        <Area type="monotone" dataKey="optimalHigh" stroke="none" fill="#fde68a" fillOpacity={0.6} />
                        <Area type="monotone" dataKey="optimalLow" stroke="none" fill="#bbf7d0" fillOpacity={0.8} />

                        <Area
                            type="monotone"
                            dataKey="weeklyMileage"
                            stroke="#0f766e"
                            strokeWidth={3}
                            fill="url(#mileageGradient)"
                            fillOpacity={1}
                            activeDot={{ r: 6, strokeWidth: 0 }}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
