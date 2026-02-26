"use client";

import React, { useState } from "react";
import { MentorStatsCards } from "@/components/dashboard/stats-cards";
import { MentorRevenueChart } from "@/components/dashboard/revenue-chart";
import { MentorUpcomingSessions } from "@/components/dashboard/upcoming-sessions";

export default function MentorDashboardPage({
    params,
}: {
    params: Promise<{ mentorId: string }>;
}) {
    const { mentorId } = React.use(params);
    const [notification, setNotification] = useState<{ id: string, message: string } | null>(null);

    // Fallback data for testing MVP Phase
    const mentor = { name: `Mentor ${mentorId}`, sessionsCompleted: 12, rating: "4.8", responseTime: "1h" };
    const totalEarnings = "15,200";
    const activeStudents = 18;

    const showNotification = (id: string, message: string) => {
        setNotification({ id, message });
        setTimeout(() => setNotification(null), 3000);
    };

    const handleShareProfile = () => {
        const url = `${window.location.origin}/profile/preview`;
        navigator.clipboard.writeText(url).then(() => {
            showNotification('share', 'Link copied to clipboard!');
        });
    };

    return (
        <div className="min-h-screen pb-12 animate-in fade-in slide-in-from-bottom-8 duration-700 ease-out">
            {/* Header */}
            <header className="px-8 pt-8 pb-6 bg-white/70 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-10 flex justify-between items-center -mx-6 md:-mx-8 lg:-mx-8 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Dashboard</h1>
                    <p className="text-slate-500 mt-1 font-medium">Welcome back, {mentor.name}! Here is your latest activity.</p>
                </div>
                <button
                    onClick={handleShareProfile}
                    className="relative bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-medium transition-colors shadow-sm shadow-blue-200"
                >
                    Share Profile
                    {notification?.id === 'share' && (
                        <div className="absolute top-full right-0 mt-2 w-max bg-slate-900 text-white text-xs font-bold px-3 py-2 rounded-lg shadow-xl z-50 animate-in fade-in slide-in-from-top-1">
                            {notification.message}
                            <div className="absolute -top-1 right-3 w-2 h-2 bg-slate-900 rotate-45"></div>
                        </div>
                    )}
                </button>
            </header>

            <div className="max-w-7xl mx-auto space-y-8">
                {/* Top Stats Row */}
                <MentorStatsCards mentor={mentor} totalEarnings={totalEarnings} activeStudents={activeStudents} />

                {/* Main Content Split */}
                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Chart Section */}
                    <MentorRevenueChart />

                    {/* Upcoming Sessions Section */}
                    <MentorUpcomingSessions mentorId={mentorId} />
                </div>
            </div>
        </div>
    );
}
