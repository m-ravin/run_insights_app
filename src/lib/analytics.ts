import { differenceInDays, subDays, startOfWeek, endOfWeek, eachDayOfInterval, format, isSameDay, parseISO, addDays, startOfDay } from 'date-fns';

export interface Activity {
    id: number;
    name: string;
    distance: number; // meters
    moving_time: number; // seconds
    type: string;
    start_date: string;
    total_elevation_gain: number;
}

export interface DailyLoad {
    date: string;
    load: number; // arbitrary load unit (e.g., distance or time)
}

export interface DailyStat {
    date: string;
    distance: number; // km
    weeklyMileage: number; // km (last 7 days)
    acuteLoad: number;
    chronicLoad: number;
    acr: number;
    riskLevel: number; // 0-4 scale
    optimalLow: number;
    optimalHigh: number;
    overreaching: number;
}

export const calculateACR = (activities: Activity[], date: Date = new Date()) => {
    // Sort activities by date
    const sortedActivities = [...activities].sort((a, b) => new Date(a.start_date).getTime() - new Date(b.start_date).getTime());

    // Helper to get load for a specific day
    const getLoadForDay = (targetDate: Date) => {
        const dayActivities = sortedActivities.filter(a => isSameDay(parseISO(a.start_date), targetDate));
        return dayActivities.reduce((sum, a) => sum + (a.distance / 1000), 0);
    };

    // Acute Load: Average load over last 7 days
    let acuteLoadSum = 0;
    for (let i = 0; i < 7; i++) {
        acuteLoadSum += getLoadForDay(subDays(date, i));
    }
    const acuteLoad = acuteLoadSum / 7;

    // Chronic Load: Average load over last 28 days
    let chronicLoadSum = 0;
    for (let i = 0; i < 28; i++) {
        chronicLoadSum += getLoadForDay(subDays(date, i));
    }
    const chronicLoad = chronicLoadSum / 28;

    const ratio = chronicLoad === 0 ? 0 : acuteLoad / chronicLoad;

    return {
        acuteLoad,
        chronicLoad,
        ratio
    };
};

export const calculateInjuryRisk = (acr: number) => {
    if (acr < 0.8) return { level: 'Low', color: 'text-blue-500', description: 'Undertraining risk' };
    if (acr >= 0.8 && acr <= 1.3) return { level: 'Optimal', color: 'text-green-500', description: 'Sweet spot' };
    if (acr > 1.3 && acr <= 1.5) return { level: 'High', color: 'text-yellow-500', description: 'Overreaching' };
    return { level: 'Danger', color: 'text-red-500', description: 'High injury risk' };
};

export const calculateTrainingStatus = (acr: number, chronicLoad: number, previousChronicLoad: number) => {
    let health = 'Good';
    let fitness = 'Maintaining';

    // Health Logic based on ACR
    if (acr > 1.5) health = 'Risk';
    else if (acr > 1.3) health = 'Caution';
    else if (acr < 0.8) health = 'Recovery';

    // Fitness Logic based on Chronic Load Trend
    if (chronicLoad > previousChronicLoad * 1.05) fitness = 'Improving';
    else if (chronicLoad < previousChronicLoad * 0.95) fitness = 'Detraining';

    return { health, fitness };
};

export const calculateCapacity = (chronicLoad: number) => {
    // Capacity is roughly 1.3x chronic load (safe upper limit)
    return Math.round(chronicLoad * 1.3);
};

export const calculateDailyStats = (activities: Activity[], days: number = 90): DailyStat[] => {
    const today = new Date();
    const stats: DailyStat[] = [];

    // Pre-calculate daily loads for efficiency
    const dailyLoads = new Map<string, number>();
    activities.forEach(a => {
        const dateStr = a.start_date.split('T')[0];
        const current = dailyLoads.get(dateStr) || 0;
        dailyLoads.set(dateStr, current + (a.distance / 1000));
    });

    const getLoad = (d: Date) => dailyLoads.get(format(d, 'yyyy-MM-dd')) || 0;

    for (let i = days; i >= 0; i--) {
        const date = subDays(today, i);

        // Calculate Acute (7 days)
        let acuteSum = 0;
        for (let j = 0; j < 7; j++) acuteSum += getLoad(subDays(date, j));
        const acuteLoad = acuteSum / 7;
        const weeklyMileage = acuteSum; // Total last 7 days

        // Calculate Chronic (28 days)
        let chronicSum = 0;
        for (let j = 0; j < 28; j++) chronicSum += getLoad(subDays(date, j));
        const chronicLoad = chronicSum / 28;

        const acr = chronicLoad === 0 ? 0 : acuteLoad / chronicLoad;

        stats.push({
            date: format(date, 'MMM d'),
            distance: getLoad(date),
            weeklyMileage,
            acuteLoad,
            chronicLoad,
            acr,
            riskLevel: acr,
            optimalLow: chronicLoad * 7 * 0.8,
            optimalHigh: chronicLoad * 7 * 1.3,
            overreaching: chronicLoad * 7 * 1.5,
        });
    }

    return stats;
};

export const processHistory = (activities: Activity[]) => {
    // Group by month for the last 2 years
    // This is a simplified version. Real implementation would fill gaps.
    const history = activities.reduce((acc, activity) => {
        const month = format(parseISO(activity.start_date), 'yyyy-MM');
        if (!acc[month]) {
            acc[month] = { date: month, distance: 0, elevation: 0, time: 0, count: 0 };
        }
        acc[month].distance += activity.distance / 1000;
        acc[month].elevation += activity.total_elevation_gain;
        acc[month].time += activity.moving_time / 60;
        acc[month].count += 1;
        return acc;
    }, {} as Record<string, any>);

    return Object.values(history).sort((a: any, b: any) => a.date.localeCompare(b.date));
};

export const generatePlan = (currentChronicLoad: number) => {
    // Simple progressive overload plan
    const plan = [];
    let plannedLoad = currentChronicLoad || 10; // Start with 10km/week if 0

    for (let i = 1; i <= 12; i++) {
        // Increase by 10% every week, deload every 4th week
        if (i % 4 === 0) {
            plannedLoad *= 0.7; // Deload
        } else {
            plannedLoad *= 1.1;
        }

        plan.push({
            week: i,
            targetDistance: Math.round(plannedLoad),
            focus: i % 4 === 0 ? 'Recovery' : 'Build'
        });
    }
    return plan;
};

