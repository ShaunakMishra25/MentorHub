"use client";

import React, { useState, useEffect } from "react";
import {
    ComposedChart,
    Line,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts";

const earningData = [
    { name: 'Jan', earnings: 1200 },
    { name: 'Feb', earnings: 1900 },
    { name: 'Mar', earnings: 1500 },
    { name: 'Apr', earnings: 2200 },
    { name: 'May', earnings: 2800 },
    { name: 'Jun', earnings: 3400 },
];

const CustomTooltip = ({ active, payload, label }: { active?: boolean, payload?: any[], label?: string }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-slate-900 text-white p-4 rounded-xl shadow-xl border border-slate-800">
                <p className="text-sm font-medium text-slate-400 mb-1">{label}</p>
                <p className="text-2xl font-bold">${payload[0].value}</p>
            </div>
        );
    }
    return null;
};

export function MentorRevenueChart() {
    const [chartVisible, setChartVisible] = useState(false);

    useEffect(() => {
        // Small delay to ensure smooth animation after render
        const timer = setTimeout(() => setChartVisible(true), 100);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 animate-in fade-in slide-in-from-bottom-8 duration-700 ease-out fill-mode-both delay-500 lg:col-span-2">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-xl font-bold text-slate-900">Revenue Overview</h2>
                    <p className="text-sm text-slate-500 mt-1">Your earnings over the last 6 months</p>
                </div>
                <select className="bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block p-2.5 outline-none font-medium">
                    <option>Last 6 months</option>
                    <option>This Year</option>
                    <option>All Time</option>
                </select>
            </div>
            <div className="h-[300px] w-full">
                {chartVisible && (
                    <ResponsiveContainer width="100%" height="100%">
                        <ComposedChart data={earningData} margin={{ top: 10, right: 10, bottom: 0, left: 0 }}>
                            <defs>
                                <linearGradient id="colorGradient" x1="0" y1="0" x2="1" y2="0">
                                    <stop offset="0%" stopColor="#3b82f6" stopOpacity={1} />
                                    <stop offset="50%" stopColor="#8b5cf6" stopOpacity={1} />
                                    <stop offset="100%" stopColor="#ec4899" stopOpacity={1} />
                                </linearGradient>

                                <linearGradient id="fillGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.2} />
                                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                                </linearGradient>

                                <filter id="shadow" height="200%">
                                    <feDropShadow dx="0" dy="5" stdDeviation="5" floodColor="#8b5cf6" floodOpacity="0.3" />
                                </filter>
                            </defs>

                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />

                            <XAxis
                                dataKey="name"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#94a3b8', fontSize: 12 }}
                                dy={10}
                            />

                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#94a3b8', fontSize: 12 }}
                                tickFormatter={(value) => `$${value}`}
                            />

                            <Tooltip
                                content={<CustomTooltip />}
                                cursor={{ stroke: '#8b5cf6', strokeWidth: 1, strokeDasharray: '4 4' }}
                            />

                            <Area
                                type="monotone"
                                dataKey="earnings"
                                stroke="none"
                                fill="url(#fillGradient)"
                            />

                            <Line
                                type="monotone"
                                dataKey="earnings"
                                stroke="url(#colorGradient)"
                                strokeWidth={5}
                                filter="url(#shadow)"
                                dot={{
                                    fill: '#fff',
                                    stroke: '#a78bfa',
                                    strokeWidth: 3,
                                    r: 6
                                }}
                                activeDot={{
                                    fill: '#fff',
                                    stroke: '#ec4899',
                                    strokeWidth: 4,
                                    r: 8
                                }}
                            />
                        </ComposedChart>
                    </ResponsiveContainer>
                )}
            </div>
        </div>
    );
}
