import { AlertTriangle, CheckCircle, Activity } from 'lucide-react';

interface RiskGaugeProps {
    risk: {
        level: string;
        color: string;
        description: string;
    };
    acr: {
        ratio: number;
        acuteLoad: number;
        chronicLoad: number;
    };
}

export function RiskGauge({ risk, acr }: RiskGaugeProps) {
    return (
        <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-zinc-900">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-black dark:text-white">Injury Risk Model</h3>
                {risk.level === 'Danger' ? (
                    <AlertTriangle className="h-6 w-6 text-red-500" />
                ) : risk.level === 'High' ? (
                    <Activity className="h-6 w-6 text-yellow-500" />
                ) : (
                    <CheckCircle className="h-6 w-6 text-green-500" />
                )}
            </div>

            <div className="mt-6 flex flex-col items-center">
                <div className={`text-4xl font-bold ${risk.color}`}>
                    {risk.level}
                </div>
                <p className="mt-2 text-sm text-zinc-500">{risk.description}</p>

                <div className="mt-8 grid w-full grid-cols-3 gap-4 text-center">
                    <div>
                        <p className="text-xs text-zinc-500">ACR Ratio</p>
                        <p className="text-xl font-semibold text-black dark:text-white">{acr.ratio.toFixed(2)}</p>
                    </div>
                    <div>
                        <p className="text-xs text-zinc-500">Acute Load</p>
                        <p className="text-xl font-semibold text-black dark:text-white">{Math.round(acr.acuteLoad)}</p>
                    </div>
                    <div>
                        <p className="text-xs text-zinc-500">Chronic Load</p>
                        <p className="text-xl font-semibold text-black dark:text-white">{Math.round(acr.chronicLoad)}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
