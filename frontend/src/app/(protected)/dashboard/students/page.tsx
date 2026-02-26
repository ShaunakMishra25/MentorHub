"use client";

import { useState, useMemo } from "react";
import { BookOpen, Clock, TrendingUp, Mail, Users, Loader2 } from "lucide-react";
import { useUpcomingSessions, useSessionHistory, type DashboardSession } from "@/shared/lib/hooks/useDashboard";
import Image from "next/image";

// ── Types ─────────────────────────────────────────────────────────────────────

type StudentStatus = "Active" | "On Hold" | "Completed";

interface Student {
    id: string;
    name: string;
    avatar: string;
    imageUrl?: string;
    program: string;
    sessions: number;
    progress: number;
    lastSession: string;
    nextSession: string;
    status: StudentStatus;
    email: string;
}

const statusColors: Record<StudentStatus, string> = {
    Active: "bg-emerald-50 text-emerald-700",
    "On Hold": "bg-amber-50 text-amber-700",
    Completed: "bg-blue-50 text-blue-700",
};

// ── Page ──────────────────────────────────────────────────────────────────────

export default function StudentsPage() {
    const [search, setSearch] = useState("");
    
    // Fetch real data from backend
    const { sessions: upcomingSessions, isLoading: upcomingLoading } = useUpcomingSessions();
    const { sessions: historyData, isLoading: historyLoading } = useSessionHistory();
    
    const isLoading = upcomingLoading || historyLoading;

    // Transform sessions data into students list
    const students = useMemo(() => {
        const allSessions = [...upcomingSessions, ...historyData];
        const studentMap = new Map<string, {
            id: string;
            name: string;
            imageUrl?: string;
            sessions: DashboardSession[];
        }>();

        // Group sessions by student
        allSessions.forEach((session) => {
            const studentId = session.student.id;
            if (!studentMap.has(studentId)) {
                studentMap.set(studentId, {
                    id: studentId,
                    name: session.student.name,
                    imageUrl: session.student.imageUrl,
                    sessions: [],
                });
            }
            studentMap.get(studentId)!.sessions.push(session);
        });

        // Transform to Student objects
        return Array.from(studentMap.values()).map((data): Student => {
            const sessionCount = data.sessions.length;
            const completedCount = data.sessions.filter(s => s.status === "completed").length;
            const progress = sessionCount > 0 ? Math.round((completedCount / sessionCount) * 100) : 0;
            
            // Find last and next sessions
            const sortedSessions = [...data.sessions].sort((a, b) => 
                new Date(a.date).getTime() - new Date(b.date).getTime()
            );
            
            const now = new Date();
            const pastSessions = sortedSessions.filter(s => new Date(s.date) < now);
            const futureSessions = sortedSessions.filter(s => new Date(s.date) >= now);
            
            const lastSession = pastSessions.length > 0 
                ? getRelativeTime(new Date(pastSessions[pastSessions.length - 1].date))
                : "N/A";
            
            const nextSession = futureSessions.length > 0
                ? formatNextSession(new Date(futureSessions[0].date), futureSessions[0].startTime)
                : "N/A";

            // Determine status
            let status: StudentStatus = "Active";
            if (futureSessions.length === 0 && completedCount > 0) {
                status = "Completed";
            } else if (futureSessions.length === 0 && pastSessions.length > 0) {
                const lastDate = new Date(pastSessions[pastSessions.length - 1].date);
                const daysSinceLastSession = Math.floor((now.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
                if (daysSinceLastSession > 14) {
                    status = "On Hold";
                }
            }

            return {
                id: data.id,
                name: data.name,
                avatar: data.name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase(),
                imageUrl: data.imageUrl,
                program: "Mentorship",
                sessions: sessionCount,
                progress,
                lastSession,
                nextSession,
                status,
                email: "", // Email not available from session data
            };
        });
    }, [upcomingSessions, historyData]);

    const filtered = students.filter(
        (s) =>
            s.name.toLowerCase().includes(search.toLowerCase()) ||
            s.program.toLowerCase().includes(search.toLowerCase())
    );
    
    const active = students.filter((s) => s.status === "Active").length;
    const completed = students.filter((s) => s.status === "Completed").length;
    const totalSess = students.reduce((acc, s) => acc + s.sessions, 0);

    return (
        <div className="animate-fadeIn pb-10">
            <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-10 -mx-4 md:-mx-6 px-4 md:px-6 mb-6">
                <div className="py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">My Students</h1>
                        <p className="text-slate-500 mt-0.5 text-sm">Oversee your mentees progress and sessions</p>
                    </div>
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search students…"
                        className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none w-full sm:w-64"
                    />
                </div>
            </header>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-4 mb-6">
                {[
                    { icon: Users, label: "Active Students", value: active, color: "text-emerald-600", bg: "bg-emerald-100" },
                    { icon: BookOpen, label: "Total Sessions", value: totalSess, color: "text-blue-600", bg: "bg-blue-100" },
                    { icon: TrendingUp, label: "Completed Programs", value: completed, color: "text-violet-600", bg: "bg-violet-100" },
                ].map(({ icon: Icon, label, value, color, bg }) => (
                    <div key={label} className="card-modern bg-white rounded-2xl border border-slate-100 shadow-card p-5 hover:shadow-card-hover hover:-translate-y-0.5 transition-all">
                        <div className={`${bg} w-10 h-10 rounded-xl flex items-center justify-center mb-3`}>
                            <Icon className={`w-5 h-5 ${color}`} />
                        </div>
                        <p className="text-2xl font-bold text-slate-900">{value}</p>
                        <p className="text-xs text-slate-500 font-medium mt-0.5">{label}</p>
                    </div>
                ))}
            </div>

            {/* Students list */}
            <div className="space-y-3">
                {filtered.map((s) => (
                    <div key={s.id}
                        className="card-modern bg-white rounded-2xl border border-slate-100 shadow-card p-5 hover:shadow-card-hover hover:-translate-y-0.5 transition-all">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                            {/* Avatar + info */}
                            <div className="flex items-center gap-4 flex-1">
                                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center text-white font-bold text-sm shrink-0">
                                    {s.avatar}
                                </div>
                                <div className="min-w-0">
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <h3 className="font-bold text-slate-900">{s.name}</h3>
                                        <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${statusColors[s.status]}`}>
                                            {s.status}
                                        </span>
                                    </div>
                                    <p className="text-sm text-slate-500 mt-0.5">{s.program}</p>
                                </div>
                            </div>

                            {/* Progress */}
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-1.5">
                                    <span>Progress</span><span>{s.progress}%</span>
                                </div>
                                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                                    <div
                                        className="h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-500"
                                        style={{ width: `${s.progress}%` }}
                                    />
                                </div>
                            </div>

                            {/* Meta */}
                            <div className="flex items-center gap-6 text-sm text-slate-600 shrink-0">
                                <div className="flex items-center gap-1.5">
                                    <BookOpen className="w-4 h-4 text-slate-400" />
                                    <span className="font-semibold">{s.sessions}</span>
                                    <span className="text-slate-400">sessions</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Clock className="w-4 h-4 text-slate-400" />
                                    <span className="font-medium">{s.nextSession}</span>
                                </div>
                            </div>

                            {/* Actions */}
                            <button
                                onClick={() => window.open(`mailto:${s.email}`)}
                                className="shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 text-sm font-bold text-slate-600 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600 transition-all"
                            >
                                <Mail className="w-4 h-4" /> Message
                            </button>
                        </div>
                    </div>
                ))}

                {filtered.length === 0 && (
                    <div className="text-center py-16 text-slate-400">
                        <Users className="w-10 h-10 mx-auto mb-3 opacity-30" />
                        <p className="font-medium">{isLoading ? "Loading students..." : "No students found"}</p>
                    </div>
                )}
            </div>
        </div>
    );
}

// Helper functions
function getRelativeTime(date: Date): string {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 14) return "1 week ago";
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
}

function formatNextSession(date: Date, time: string): string {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    if (date.toDateString() === now.toDateString()) {
        return `Today, ${time}`;
    }
    if (date.toDateString() === tomorrow.toDateString()) {
        return `Tomorrow, ${time}`;
    }
    return `${date.toLocaleDateString("en-US", { weekday: "short" })}, ${time}`;
}
