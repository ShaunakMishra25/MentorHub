'use client';

import React from 'react';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useUser } from '@clerk/nextjs';
import BecomeMentorButton from '@/modules/landing/BecomeMentorButton';
import { Button } from '@/shared/ui/button';
import { ArrowRight, Star, Search } from 'lucide-react';
import { popularExams } from '../data';


export default function HeroSection() {
    const { isSignedIn, isLoaded } = useUser();

    return (
        <section className="relative overflow-hidden pt-20 pb-10 md:pt-32 md:pb-16">
            {/* Background Decor */}
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50/50 via-white to-white" />
            <div className="absolute top-0 right-0 -z-10 h-[600px] w-[600px] rounded-full bg-orange-50/50 blur-3xl opacity-60" />
            <div className="absolute bottom-0 left-0 -z-10 h-[500px] w-[500px] rounded-full bg-blue-50/50 blur-3xl opacity-60" />

            <div className="container mx-auto px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50/50 px-4 py-1.5 text-sm font-medium text-blue-700 mb-8"
                >
                    <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-pulse relative">
                        <span className="absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75 animate-ping"></span>
                    </span>
                    Trusted by 10,000+ Students
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="mx-auto max-w-4xl text-4xl font-bold tracking-tight text-gray-900 sm:text-7xl mb-6 leading-[1.15]"
                >
                    Ace Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Dream Exam</span>
                    <br className="hidden sm:block" />
                    <span className="block sm:inline mt-2 sm:mt-0">With Top Rankers</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="mx-auto max-w-2xl text-base sm:text-lg text-gray-600 mb-10 px-4"
                >
                    Connect with mentors who have cracked IIT JEE, NEET, CAT, and UPSC.
                    Get personalized strategy, roadmap, and doubt solving 1-on-1.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 px-4 sm:px-0"
                >
                    <div className="w-full max-w-md relative">
                        <div className="relative group">
                            <select
                                onChange={(e) => {
                                    if (e.target.value) {
                                        window.location.href = `/mentors?exam=${e.target.value}`;
                                    }
                                }}
                                className="w-full h-14 pl-6 pr-12 rounded-full border-2 border-blue-100 bg-white text-gray-900 font-medium shadow-lg hover:border-blue-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all appearance-none cursor-pointer text-base sm:text-lg active:scale-[0.98]"
                                defaultValue=""
                                aria-label="Select your exam"
                            >
                                <option value="" disabled>Select your exam (e.g., JEE, NEET)</option>
                                {popularExams.map((exam) => (
                                    <option key={exam.id} value={exam.id}>
                                        {exam.name}
                                    </option>
                                ))}
                            </select>
                            <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-blue-600 transition-transform group-hover:scale-110">
                                <Search className="w-6 h-6" />
                            </div>
                        </div>
                    </div>
                </motion.div>

                {isLoaded && isSignedIn && (
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.4 }}
                        className="relative mx-auto max-w-5xl rounded-[2.5rem] border border-gray-200 bg-white shadow-2xl overflow-hidden"
                    >
                        <div className="absolute top-0 left-0 w-full h-8 bg-gray-50 border-b border-gray-100 flex items-center px-4 gap-2 z-10">
                            <div className="w-3 h-3 rounded-full bg-red-400"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                            <div className="w-3 h-3 rounded-full bg-green-400"></div>
                        </div>

                        <HeroMockUI />

                        {/* Overlay Gradient */}
                        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
                    </motion.div>
                )}
            </div>
        </section>
    );
}

function HeroMockUI() {
    return (
        <div className="p-2 sm:p-4 pt-12 bg-gray-50/50 flex justify-center items-center min-h-[300px] sm:min-h-[400px]">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl items-center"
            >
                {/* Featured Success Card */}
                <div className="relative bg-white p-6 rounded-2xl shadow-xl border border-orange-100 hover:shadow-2xl transition-all duration-300 group">
                    {/* Warm Gradient Border Effect */}
                    <div className="absolute inset-0 -z-10 bg-gradient-to-br from-orange-100 to-blue-50 rounded-2xl blur-xl opacity-40 group-hover:opacity-60 transition-opacity"></div>

                    <div className="flex items-start justify-between mb-8">
                        <div>
                            <span className="inline-block px-3 py-1 bg-orange-50 text-orange-600 text-xs font-bold uppercase tracking-wider rounded-full mb-2">
                                New Success Story
                            </span>
                            <h3 className="text-xl font-bold text-gray-900 leading-tight">
                                "From 60th percentile to IIT Delhi CSE"
                            </h3>
                        </div>
                        <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-xl">
                            🎓
                        </div>
                    </div>

                    <div className="flex items-center gap-4 border-t border-gray-50 pt-6">
                        <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/20">
                            A
                        </div>
                        <div>
                            <p className="font-bold text-gray-900">Arjun Mehta</p>
                            <p className="text-sm text-gray-500">Mentored by <span className="text-blue-600 font-medium">IIT B. Senior</span></p>
                        </div>
                    </div>
                </div>

                {/* Stats / Activity Column */}
                <div className="hidden md:flex flex-col gap-4">
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                            <span className="font-bold text-lg">98%</span>
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-900">Session Satisfaction</h4>
                            <p className="text-xs text-gray-500">Based on 5k+ reviews</p>
                        </div>
                    </div>

                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4 opacity-80 scale-95 translate-x-4">
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                            <span className="font-bold text-lg">24</span>
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-900">Top Rankers Live Now</h4>
                            <p className="text-xs text-gray-500">Available for 1:1</p>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
