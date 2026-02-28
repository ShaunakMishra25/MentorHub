"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Home, Users } from "lucide-react";
import Link from "next/link";

// Confetti particle config
const COLORS = ["#6366f1", "#8b5cf6", "#ec4899", "#f59e0b", "#10b981", "#3b82f6", "#f43f5e"];
const PARTICLE_COUNT = 120;

interface Particle {
    id: number;
    x: number;
    color: string;
    delay: number;
    duration: number;
    size: number;
    rotation: number;
    shape: "rect" | "circle" | "star";
}

function Confetti() {
    const [particles] = useState<Particle[]>(() =>
        Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            color: COLORS[Math.floor(Math.random() * COLORS.length)],
            delay: Math.random() * 1.5,
            duration: 2.5 + Math.random() * 2,
            size: 6 + Math.random() * 10,
            rotation: Math.random() * 360,
            shape: (["rect", "circle", "star"] as const)[Math.floor(Math.random() * 3)],
        }))
    );

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
            {particles.map(p => (
                <motion.div
                    key={p.id}
                    initial={{ y: -20, x: `${p.x}vw`, opacity: 1, rotate: 0 }}
                    animate={{
                        y: "110vh",
                        opacity: [1, 1, 0.8, 0],
                        rotate: p.rotation + 360,
                    }}
                    transition={{
                        duration: p.duration,
                        delay: p.delay,
                        ease: "easeIn",
                    }}
                    style={{
                        position: "absolute",
                        top: 0,
                        width: p.size,
                        height: p.shape === "circle" ? p.size : p.size * 0.5,
                        backgroundColor: p.color,
                        borderRadius: p.shape === "circle" ? "50%" : p.shape === "star" ? "2px" : "2px",
                        clipPath: p.shape === "star"
                            ? "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)"
                            : undefined,
                    }}
                />
            ))}
        </div>
    );
}

export default function BookingSuccessPage() {
    const router = useRouter();
    const [countdown, setCountdown] = useState(5);
    const [showConfetti, setShowConfetti] = useState(true);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        // Stop confetti after 4s
        const confettiTimer = setTimeout(() => setShowConfetti(false), 4000);

        // Countdown + auto-redirect
        intervalRef.current = setInterval(() => {
            setCountdown(c => {
                if (c <= 1) {
                    clearInterval(intervalRef.current!);
                    router.push("/");
                    return 0;
                }
                return c - 1;
            });
        }, 1000);

        return () => {
            clearTimeout(confettiTimer);
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [router]);

    return (
        <>
            <AnimatePresence>{showConfetti && <Confetti />}</AnimatePresence>

            <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-indigo-50 flex items-center justify-center px-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 40 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                    className="max-w-lg w-full text-center"
                >
                    {/* Success icon */}
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0.3 }}
                        className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 shadow-xl mb-6"
                    >
                        <CheckCircle className="w-14 h-14 text-white" strokeWidth={2.5} />
                    </motion.div>

                    {/* Heading */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                    >
                        <div className="inline-block bg-gradient-to-r from-violet-600 to-indigo-600 text-transparent bg-clip-text">
                            <h1 className="text-4xl sm:text-5xl font-extrabold mb-3">
                                Booking Confirmed! 🎉
                            </h1>
                        </div>
                        <p className="text-gray-500 text-lg mb-2">
                            Your mentorship session has been booked successfully.
                        </p>
                        <p className="text-gray-400 text-sm mb-10">
                            You&apos;ll receive a confirmation email with all the details shortly.
                        </p>
                    </motion.div>

                    {/* Countdown */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className="text-sm text-gray-400 mb-6"
                    >
                        Redirecting to home in{" "}
                        <span className="font-bold text-violet-600 text-base">{countdown}</span>s…
                    </motion.p>

                    {/* Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                    >
                        <Link
                            href="/"
                            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold rounded-xl shadow-md hover:shadow-lg hover:from-violet-700 hover:to-indigo-700 transition-all duration-200"
                        >
                            <Home className="w-5 h-5" />
                            Go Home
                        </Link>
                        <Link
                            href="/mentors"
                            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white border-2 border-violet-200 text-violet-700 font-semibold rounded-xl hover:border-violet-400 hover:bg-violet-50 transition-all duration-200"
                        >
                            <Users className="w-5 h-5" />
                            Explore Mentors
                        </Link>
                    </motion.div>

                    {/* Decorative pills */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.1 }}
                        className="mt-12 flex flex-wrap justify-center gap-3 text-xs text-gray-400"
                    >
                        {["✅ Session scheduled", "📧 Email on its way", "🔒 Securely booked"].map(t => (
                            <span key={t} className="px-3 py-1.5 bg-white border border-gray-100 rounded-full shadow-sm">
                                {t}
                            </span>
                        ))}
                    </motion.div>
                </motion.div>
            </div>
        </>
    );
}
