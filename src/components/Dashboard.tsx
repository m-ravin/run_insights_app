'use client';

import { useMemo } from 'react';
import { Activity, calculateACR, calculateTrainingStatus, calculateCapacity, calculateDailyStats } from '@/lib/analytics';
import { TrainingStatus } from './TrainingStatus';
import { ProgressGauges } from './ProgressGauges';
import { InteractivePlanner } from './InteractivePlanner';
import { InjuryRiskChart } from './InjuryRiskChart';
import { WeeklyMileageChart } from './WeeklyMileageChart';

interface DashboardProps {
    activities: Activity[];
}

export function Dashboard({ activities }: DashboardProps) {
    const insights = useMemo(() => {
        if (!activities.length) return null;

        const acr = calculateACR(activities);
        // Calculate previous chronic load (simplified for now, would need real history)
        const previousChronicLoad = acr.chronicLoad * 0.95;

        const status = calculateTrainingStatus(acr.ratio, acr.chronicLoad, previousChronicLoad);
        const capacity = calculateCapacity(acr.chronicLoad);
        const dailyStats = calculateDailyStats(activities);

        // Calculate today's load
        const today = new Date().toISOString().split('T')[0];
        const todayLoad = activities
            .filter(a => a.start_date.startsWith(today))
            .reduce((sum, a) => sum + (a.distance / 1000), 0);

        return { status, capacity, todayLoad, dailyStats };
    }, [activities]);

    if (!insights) return null;

    return (
        <div className="flex w-full flex-col gap-6">
            {/* Top Section: Training Status */}
            <TrainingStatus
                status={insights.status}
                capacity={insights.capacity}
                todayLoad={insights.todayLoad}
            />

            {/* Middle Section: Progress Gauges */}
            <ProgressGauges />

            {/* Bottom Section: Planner & Charts */}
            <div className="flex flex-col gap-6">
                <InteractivePlanner />
                <InjuryRiskChart data={insights.dailyStats} />
                <WeeklyMileageChart data={insights.dailyStats} />
            </div>
        </div>
    );
}
