'use client';

import { useState } from 'react';
import { addDays, format, startOfToday } from 'date-fns';

interface DayPlan {
    date: Date;
    max: number;
    planned: number;
}

export function InteractivePlanner() {
    const today = startOfToday();
    const [days, setDays] = useState<DayPlan[]>(() => {
        return Array.from({ length: 7 }).map((_, i) => ({
            date: addDays(today, i),
            max: Math.round(Math.random() * 10 + 15), // Placeholder capacity logic
            planned: i === 1 ? 18 : i === 4 ? 12 : 0, // Sample data
        }));
    });

    const handleInputChange = (index: number, value: string) => {
        const newDays = [...days];
        newDays[index].planned = Number(value) || 0;
        setDays(newDays);
    };

    return (
        <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-zinc-900">
            <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-black dark:text-white">Plan your Runs</h3>
                <div className="flex gap-4">
                    <select className="rounded border border-zinc-300 bg-transparent px-2 py-1 text-sm dark:border-zinc-700">
                        <option>4 weeks</option>
                    </select>
                    <select className="rounded border border-zinc-300 bg-transparent px-2 py-1 text-sm dark:border-zinc-700">
                        <option>Today</option>
                    </select>
                </div>
            </div>

            <div className="overflow-x-auto">
                <div className="flex min-w-[600px] gap-2">
                    <div className="flex w-16 flex-col gap-2 pt-8 text-right text-xs font-bold text-zinc-500">
                        <div className="h-8 py-1">MAX:</div>
                        <div className="h-10 py-2">WK1:</div>
                    </div>

                    {days.map((day, i) => (
                        <div key={i} className="flex flex-1 flex-col gap-2">
                            <div className="text-center text-xs font-bold uppercase text-zinc-500">
                                {i === 0 ? 'TODAY' : format(day.date, 'EEE d MMM')}
                            </div>

                            <div className={`flex h-8 items-center justify-center rounded text-sm font-bold text-white ${day.max < 5 ? 'bg-green-600' : 'bg-green-500'}`}>
                                {day.max}
                            </div>

                            <input
                                type="number"
                                value={day.planned || ''}
                                onChange={(e) => handleInputChange(i, e.target.value)}
                                className="h-10 w-full rounded border border-zinc-300 bg-zinc-100 text-center font-bold text-black focus:border-blue-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                            />
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-4 text-center text-sm font-medium text-red-500">
                Unlock multi-week planning with Premium +
            </div>
        </div>
    );
}
