"use client";

import React, { useState } from "react";
import { Clock, MoreVertical } from "lucide-react";
import { useRouter } from "next/navigation";

const upcomingSessions = [
    { id: 1, student: 'Sarah Jenkins', time: 'Today, 2:00 PM', topic: 'React Performance Tuning' },
    { id: 2, student: 'Marcus Cole', time: 'Tomorrow, 10:00 AM', topic: 'System Design Interview' },
    { id: 3, student: 'Elena Rodriguez', time: 'Thu, 4:30 PM', topic: 'Resume Review' },
];

export function MentorUpcomingSessions({ mentorId }: { mentorId: string }) {
    const router = useRouter();
    const [notification, setNotification] = useState<{ id: string, message: string } | null>(null);

    const showNotification = (id: string, message: string) => {
        setNotification({ id, message });
        setTimeout(() => setNotification(null), 3000);
    };

    return (
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 animate-in fade-in slide-in-from-bottom-8 duration-700 ease-out fill-mode-both delay-700">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-bold text-slate-900">Upcoming Sessions</h2>
                <button
                    onClick={() => showNotification('session-opts', 'Options menu coming soon')}
                    className="relative text-blue-600 hover:bg-blue-50 p-2 rounded-xl transition-colors"
                >
                    <MoreVertical className="w-5 h-5" />
                    {notification?.id === 'session-opts' && (
                        <div className="absolute top-full right-0 mt-2 w-max bg-slate-900 text-white text-xs font-bold px-3 py-2 rounded-lg shadow-xl z-50 animate-in fade-in slide-in-from-top-1">
                            {notification.message}
                            <div className="absolute -top-1 right-3 w-2 h-2 bg-slate-900 rotate-45"></div>
                        </div>
                    )}
                </button>
            </div>

            <div className="space-y-6">
                {upcomingSessions.map((session) => (
                    <div key={session.id} className="flex gap-4 group">
                        <div className="flex flex-col items-center mt-1">
                            <div className="w-2.5 h-2.5 rounded-full bg-blue-600 ring-4 ring-blue-50"></div>
                            <div className="w-px h-full bg-slate-100 my-1 group-last:hidden"></div>
                        </div>
                        <div className="flex-1 pb-2">
                            <p className="text-base font-bold text-slate-900">{session.student}</p>
                            <p className="text-sm font-medium text-blue-600 mt-0.5">{session.topic}</p>
                            <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500 mt-2 bg-slate-50 w-fit px-2 py-1 rounded-md">
                                <Clock className="w-3.5 h-3.5" />
                                {session.time}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <button
                onClick={() => router.push(`/${mentorId}/dashboard/sessions`)}
                className="w-full mt-6 py-3 px-4 border-2 border-slate-100 hover:border-slate-200 text-slate-600 font-bold rounded-2xl transition-all"
            >
                View Calendar
            </button>
        </div>
    );
}
