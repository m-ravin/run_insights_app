import { Activity } from 'lucide-react';

interface TrainingStatusProps {
    status: {
        health: string;
        fitness: string;
    };
    capacity: number;
    todayLoad: number;
}

export function TrainingStatus({ status, capacity, todayLoad }: TrainingStatusProps) {
    const getStatusColor = (s: string) => {
        switch (s.toLowerCase()) {
            case 'good':
            case 'improving':
            case 'optimal':
                return 'bg-green-500';
            case 'caution':
            case 'maintaining':
                return 'bg-yellow-500';
            case 'risk':
            case 'detraining':
            case 'danger':
                return 'bg-red-500';
            default:
                return 'bg-blue-500';
        }
    };

    const remainingCapacity = Math.max(0, capacity - todayLoad);

    return (
        <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-zinc-900">
            <h3 className="mb-6 text-lg font-semibold text-black dark:text-white">Your training status</h3>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                {/* Health Circle */}
                <div className="flex flex-col items-center gap-2">
                    <span className="text-xs font-bold uppercase text-zinc-500">Run Health</span>
                    <div className={`flex h-24 w-24 items-center justify-center rounded-full text-white ${getStatusColor(status.health)}`}>
                        <span className="text-lg font-bold">{status.health}</span>
                    </div>
                </div>

                {/* Fitness Circle */}
                <div className="flex flex-col items-center gap-2">
                    <span className="text-xs font-bold uppercase text-zinc-500">Run Fitness</span>
                    <div className={`flex h-24 w-24 items-center justify-center rounded-full text-white ${getStatusColor(status.fitness)}`}>
                        <span className="text-lg font-bold">{status.fitness}</span>
                    </div>
                </div>

                {/* Load vs Capacity Bar */}
                <div className="flex flex-col items-center gap-2">
                    <span className="text-xs font-bold uppercase text-zinc-500">Load (km) | Capacity</span>
                    <div className="flex h-24 items-end gap-2">
                        <div className="relative flex h-full w-12 flex-col justify-end">
                            <span className="absolute -top-6 w-full text-center text-sm font-bold text-zinc-600">{Math.round(todayLoad)}</span>
                            <div
                                className="w-full rounded-t bg-green-500"
                                style={{ height: `${Math.min(100, (todayLoad / capacity) * 100)}%` }}
                            />
                        </div>
                        <div className="relative flex h-full w-12 flex-col justify-end">
                            <span className="absolute -top-6 w-full text-center text-sm font-bold text-zinc-600">{capacity}</span>
                            <div className="h-full w-full rounded-t bg-zinc-700" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-8 text-center">
                <p className="text-lg font-medium text-zinc-800 dark:text-zinc-200">
                    {remainingCapacity > 0 ? (
                        <>
                            Run no more than <span className="font-bold">{remainingCapacity}km</span> today
                        </>
                    ) : (
                        <>
                            <span className="font-bold text-red-500">Avoid running today</span> (Capacity reached)
                        </>
                    )}
                </p>
                <p className="mt-1 text-sm text-zinc-500">
                    Ride no more than {Math.round(remainingCapacity * 2)}km today
                </p>
                <p className="mt-1 text-sm text-zinc-500">
                    Swim no more than {(remainingCapacity * 0.25).toFixed(1)}km today
                </p>
            </div>

            <div className="mt-6 flex justify-center">
                <button className="rounded-md bg-red-100 px-8 py-2 font-semibold text-red-500 transition-colors hover:bg-red-200">
                    Plan your activities
                </button>
            </div>
        </div>
    );
}
