interface PlanWeek {
    week: number;
    targetDistance: number;
    focus: string;
}

interface PlannerProps {
    plan: PlanWeek[];
}

export function Planner({ plan }: PlannerProps) {
    return (
        <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-zinc-900">
            <h3 className="mb-4 text-lg font-semibold text-black dark:text-white">12-Week Planner</h3>
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead>
                        <tr className="border-b border-zinc-100 dark:border-zinc-800">
                            <th className="pb-3 font-medium text-zinc-500">Week</th>
                            <th className="pb-3 font-medium text-zinc-500">Focus</th>
                            <th className="pb-3 font-medium text-zinc-500">Target (km)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {plan.map((week) => (
                            <tr key={week.week} className="border-b border-zinc-50 last:border-0 dark:border-zinc-800/50">
                                <td className="py-3 text-black dark:text-white">Week {week.week}</td>
                                <td className="py-3">
                                    <span className={`rounded-full px-2 py-1 text-xs font-medium ${week.focus === 'Recovery'
                                            ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                            : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                                        }`}>
                                        {week.focus}
                                    </span>
                                </td>
                                <td className="py-3 text-black dark:text-white">{week.targetDistance} km</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
