"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Calendar, BookOpen, Clock, User, ChevronLeft, ChevronRight, Menu, X } from 'lucide-react';

export function MentorDashboardSidebar({ mentorId }: { mentorId: string }) {
    const pathname = usePathname();
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navItems = [
        { href: `/${mentorId}/dashboard`, icon: LayoutDashboard, label: 'Dashboard' },
        { href: `/${mentorId}/dashboard/sessions`, icon: BookOpen, label: 'Sessions' },
        { href: `/${mentorId}/dashboard/availability`, icon: Clock, label: 'Availability' },
        { href: `/profile`, icon: User, label: 'My Profile' }, // Keep this public/external as in original
    ];

    return (
        <>
            {/* Mobile Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/20 z-30 md:hidden backdrop-blur-sm transition-opacity"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`
        fixed inset-y-0 left-0 z-40 bg-white border-r border-slate-200/60 flex flex-col shadow-[4px_0_24px_rgba(0,0,0,0.01)] transition-all duration-300 ease-in-out
        ${isCollapsed ? 'md:w-[80px]' : 'md:w-[260px]'}
        ${isMobileMenuOpen ? 'translate-x-0 w-[260px]' : '-translate-x-full md:translate-x-0'}
      `}>
                {/* Collapse Toggle Button */}
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="absolute -right-3 top-9 bg-white border border-slate-200 rounded-full p-1 shadow-sm hover:bg-slate-50 text-slate-500 z-50 hidden md:flex"
                >
                    {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
                </button>

                {/* Mobile Close Button */}
                <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 md:hidden"
                >
                    <X size={20} />
                </button>

                {/* Logo Area */}
                <div className={`px-6 py-7 flex items-end gap-0 ${isCollapsed ? 'justify-center px-2' : ''}`}>
                    <svg
                        viewBox="0 0 54 60"
                        className="w-[36px] h-[40px] shrink-0"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <defs>
                            <linearGradient id="logo-grad" x1="0" y1="0" x2="54" y2="60" gradientUnits="userSpaceOnUse">
                                <stop offset="0%" stopColor="#27272a" />
                                <stop offset="100%" stopColor="#a1a1aa" />
                            </linearGradient>
                        </defs>
                        <circle cx="12" cy="10" r="6.5" fill="url(#logo-grad)" />
                        <circle cx="42" cy="21" r="5" fill="url(#logo-grad)" />
                        <g fill="url(#logo-grad)">
                            <path d="M 5 24 C 5 18 19 18 19 24 L 19 60 L 5 60 Z" />
                            <path d="M 37 34 C 37 28 47 28 47 34 L 47 60 L 37 60 Z" />
                        </g>
                        <g stroke="url(#logo-grad)" strokeLinecap="round">
                            <path d="M 12 24 L 27 45" strokeWidth="11" />
                            <path d="M 42 34 L 27 45" strokeWidth="9" />
                        </g>
                    </svg>
                    {!isCollapsed && (
                        <span className="text-[26px] font-bold tracking-tight leading-none mb-[2px] -ml-1">
                            <span className="text-slate-900">entor</span>
                            <span className="text-primary">Hub</span>
                        </span>
                    )}
                </div>

                {/* Mini User Profile Snippet */}
                <div className={`px-5 pb-6 ${isCollapsed ? 'px-2' : ''}`}>
                    <Link
                        href={`/profile`}
                        className={`flex items-center gap-3 p-2.5 rounded-xl border border-slate-100 shadow-sm transition-all hover:shadow-md cursor-pointer ${isCollapsed ? 'justify-center border-transparent shadow-none hover:bg-slate-100' : ''}`}
                    >
                        <div className="w-9 h-9 rounded-full bg-primary/10 overflow-hidden shrink-0">
                            <img
                                src="https://ui-avatars.com/api/?name=User&background=eef2ff&color=4f46e5"
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        {!isCollapsed && (
                            <div className="overflow-hidden flex-1">
                                <h3 className="text-sm font-semibold text-slate-800 truncate">Mentor {mentorId}</h3>
                                <p className="text-xs text-slate-500 truncate">Mentor</p>
                            </div>
                        )}
                    </Link>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-4 space-y-1 overflow-y-auto pb-6">
                    {navItems.map(({ href, icon: Icon, label }) => {
                        const isActive = pathname === href;
                        return (
                            <Link
                                key={href}
                                href={href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                title={isCollapsed ? label : ''}
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${isActive
                                        ? 'bg-primary/10 text-primary'
                                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                                    } ${isCollapsed ? 'justify-center' : ''}`}
                            >
                                <Icon
                                    className={`w-5 h-5 ${isActive ? 'text-primary' : 'text-slate-400'}`}
                                    strokeWidth={isActive ? 2.5 : 2}
                                />
                                {!isCollapsed && label}
                            </Link>
                        );
                    })}
                </nav>
            </aside>

            {/* Mobile Header (Fixed Top) */}
            <header className="h-16 flex items-center justify-between px-6 md:hidden bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-20">
                <div className="flex items-end gap-0">
                    <span className="text-xl font-bold text-slate-900 leading-none">entor</span>
                    <span className="text-xl font-bold text-primary leading-none">Hub</span>
                </div>
                <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 -mr-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                    <Menu size={24} />
                </button>
            </header>
        </>
    );
}
