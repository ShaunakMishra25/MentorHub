"use client";

import { useUpcomingSessions } from "@/shared/lib/hooks/useDashboard";
import { Calendar, Clock, Video, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { useState, useEffect } from "react";

export default function UpcomingMeetingBanner() {
    const { isSignedIn, user } = useUser();
    const { sessions, isLoading } = useUpcomingSessions();
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Match the MobileStickyCTA threshold (500px)
            setIsScrolled(window.scrollY > 500);
        };
        window.addEventListener("scroll", handleScroll);
        // Check initial state
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Hide if not signed in or still loading (prevents flash)
    if (!isSignedIn || isLoading) return null;

    // Pick the soonest upcoming confirmed session
    // The backend already returns sessions sorted by sessionDate asc,
    // so the first confirmed/pending entry is the next meeting.
    const upcomingSession = sessions.find(
        (s) => s.status === "confirmed" || s.status === "pending"
    );

    // No upcoming meeting → section is invisible
    if (!upcomingSession) return null;

    // Helper: Parse the exact meeting Date from backend "YYYY-MM-DD" and "HH:MM"
    const [year, month, day] = upcomingSession.date.split("-").map(Number);
    const [startHour, startMin] = upcomingSession.startTime.split(":").map(Number);
    const meetingStartDateTime = new Date(year, month - 1, day, startHour, startMin);
    const now = new Date();

    // Only show the banner if the meeting is strictly within 24 hours from right now
    const msUntilMeeting = meetingStartDateTime.getTime() - now.getTime();
    const hoursUntilMeeting = msUntilMeeting / (1000 * 60 * 60);

    // If the meeting is more than 24 hours away or in the past, hide the banner
    if (hoursUntilMeeting > 24 || hoursUntilMeeting < 0) {
        return null;
    }

    const isMentor = user?.publicMetadata?.role === "mentor";
    const otherPersonName = isMentor
        ? upcomingSession.student?.name
        : upcomingSession.mentor?.name;

    // Format the session date (already parsed above as sessionDate)
    const formattedDate = meetingStartDateTime.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
    });

    // Format start/end times (HH:mm stored in DB)
    const fmtTime = (t: string) => {
        const [h, m] = t.split(":").map(Number);
        const ampm = h >= 12 ? "PM" : "AM";
        const hour = h % 12 || 12;
        return `${hour}:${m.toString().padStart(2, "0")} ${ampm}`;
    };

    const linkTarget = `/session/${upcomingSession.bookingId}`;

    return (
        <div
            className={`
                fixed left-3 right-3 sm:left-0 sm:right-0 w-auto sm:w-full z-40 
                bg-gradient-to-r from-blue-600 to-indigo-700 text-white 
                shadow-xl sm:shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] 
                rounded-2xl sm:rounded-none border border-white/10 sm:border-0 
                overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]
                ${isScrolled ? 'bottom-[88px] sm:bottom-0' : 'bottom-3 sm:bottom-0'}
            `}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                {/* Subtle shine effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 pointer-events-none" />

                <div className="py-3 flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
                    {/* Left: info */}
                    <div className="flex items-center gap-4">
                        <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm shrink-0">
                            <Video className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <p className="font-semibold text-sm sm:text-base leading-tight">
                                Upcoming session with{" "}
                                <span className="font-bold">
                                    {otherPersonName || "your mentor"}
                                </span>
                            </p>
                            <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-blue-100 mt-0.5">
                                <span className="flex items-center gap-1">
                                    <Calendar className="w-3.5 h-3.5" />
                                    {formattedDate}
                                </span>
                                <span className="flex items-center gap-1">
                                    <Clock className="w-3.5 h-3.5" />
                                    {fmtTime(upcomingSession.startTime)} —{" "}
                                    {fmtTime(upcomingSession.endTime)}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Right: CTA */}
                    <Link
                        href={linkTarget}
                        className="shrink-0 w-full sm:w-auto text-center inline-flex justify-center items-center gap-2 px-4 py-2 bg-white text-blue-700 hover:bg-blue-50 text-sm font-semibold rounded-lg transition-colors shadow-sm"
                    >
                        Go to Session
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </div>
    );
}
