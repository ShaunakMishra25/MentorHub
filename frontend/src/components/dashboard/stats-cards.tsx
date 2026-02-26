"use client";

import React, { useState, useEffect } from "react";
import { DollarSign, Calendar, Users, TrendingUp, ArrowUpRight } from "lucide-react";

export function MentorStatsCards({ mentor, totalEarnings, activeStudents }: { mentor: Record<string, unknown>, totalEarnings: string, activeStudents: number }) {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    if (!mounted) return null; // Avoid hydration mismatch for simple animations

    return (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 animate-in fade-in slide-in-from-bottom-8 duration-700 ease-out">
            {/* Earnings Card */}
            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 hover:shadow-xl hover:-translate-y-1 hover:border-blue-200/50 transition-all duration-300 relative overflow-hidden">
                <div className="flex justify-between items-start mb-4">
                    <div className="h-12 w-12 rounded-2xl bg-emerald-100 flex items-center justify-center">
                        <DollarSign className="w-6 h-6 text-emerald-600" />
                    </div>
                    <span className="flex items-center text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                        <ArrowUpRight className="w-3 h-3 mr-1" />
                        +14%
                    </span>
                </div>
                <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Total Earnings</p>
                <p className="text-3xl font-bold text-slate-900 mt-1">${totalEarnings}</p>
            </div>

            {/* Sessions Card */}
            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 hover:shadow-xl hover:-translate-y-1 hover:border-blue-200/50 transition-all duration-300" style={{ animationDelay: "100ms" }}>
                <div className="flex justify-between items-start mb-4">
                    <div className="h-12 w-12 rounded-2xl bg-blue-100 flex items-center justify-center">
                        <Calendar className="w-6 h-6 text-blue-600" />
                    </div>
                </div>
                <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Completed Sessions</p>
                <p className="text-3xl font-bold text-slate-900 mt-1">{String(mentor?.sessionsCompleted || 0)}</p>
            </div>

            {/* Active Students Card */}
            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 hover:shadow-xl hover:-translate-y-1 hover:border-blue-200/50 transition-all duration-300" style={{ animationDelay: "200ms" }}>
                <div className="flex justify-between items-start mb-4">
                    <div className="h-12 w-12 rounded-2xl bg-violet-100 flex items-center justify-center">
                        <Users className="w-6 h-6 text-violet-600" />
                    </div>
                </div>
                <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Active Students</p>
                <p className="text-3xl font-bold text-slate-900 mt-1">{activeStudents}</p>
            </div>

            {/* Rating & Response Card */}
            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 hover:shadow-xl hover:-translate-y-1 hover:border-blue-200/50 transition-all duration-300" style={{ animationDelay: "300ms" }}>
                <div className="flex justify-between items-start mb-4">
                    <div className="h-12 w-12 rounded-2xl bg-amber-100 flex items-center justify-center">
                        <TrendingUp className="w-6 h-6 text-amber-600" />
                    </div>
                </div>
                <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Average Rating</p>
                <div className="flex items-end gap-2 mt-1">
                    <p className="text-3xl font-bold text-slate-900">{String(mentor?.rating || "0.0")}</p>
                    <p className="text-sm text-slate-500 mb-1 border-l border-slate-200 pl-2 ml-1">
                        {String(mentor?.responseTime || "2h")} avg response
                    </p>
                </div>
            </div>
        </div>
    );
}
