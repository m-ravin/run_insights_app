'use client';

import { useState, useEffect } from 'react';
import { Dashboard } from '@/components/Dashboard';
import { Activity } from '@/lib/analytics';

export default function Home() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const res = await fetch('/api/strava/activities');
        if (res.status === 401) {
          setIsAuthenticated(false);
          setLoading(false);
          return;
        }
        if (!res.ok) {
          throw new Error('Failed to fetch activities');
        }
        const data = await res.json();
        setActivities(data);
        setIsAuthenticated(true);
      } catch (err) {
        console.error(err);
        setError('Failed to load activities. Please try connecting again.');
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  const handleConnect = () => {
    window.location.href = '/api/strava/auth';
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-start bg-zinc-50 p-8 font-sans dark:bg-black">
      <main className="flex w-full max-w-7xl flex-col items-center gap-8">
        <div className="flex w-full items-center justify-between">
          <h1 className="text-4xl font-bold tracking-tight text-black dark:text-white">
            Run Insights
          </h1>
          {isAuthenticated && (
            <button
              onClick={handleConnect}
              className="text-sm text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
            >
              Reconnect Strava
            </button>
          )}
        </div>

        {!isAuthenticated ? (
          <div className="flex flex-col items-center gap-4 rounded-xl bg-white p-8 shadow-sm dark:bg-zinc-900">
            <p className="text-lg text-zinc-600 dark:text-zinc-400">
              Connect your Strava account to see your running insights.
            </p>
            <button
              onClick={handleConnect}
              className="rounded-full bg-[#fc4c02] px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-[#e34402]"
            >
              Connect with Strava
            </button>
          </div>
        ) : (
          <div className="w-full">
            {loading ? (
              <p className="text-center text-zinc-500">Loading activities...</p>
            ) : error ? (
              <p className="text-center text-red-500">{error}</p>
            ) : (
              <Dashboard activities={activities} />
            )}
          </div>
        )}
      </main>
    </div>
  );
}
