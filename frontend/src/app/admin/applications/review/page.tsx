"use client";

import Link from "next/link";
import {
    ArrowLeft,
    School,
    FileText,
    Users,
    User,
    BarChart2,
    Settings,
    MapPin,
    Briefcase,
    ShieldCheck,
    Brain,
    FolderOpen,
    File,
    Link as LinkIcon,
    BadgeAlert,
    ExternalLink,
    Eye
} from "lucide-react";

export default function AdminReviewApplication() {
    return (
        <div className="flex min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-body">
            {/* Sidebar Navigation - Hidden on mobile */}
            <aside className="hidden md:flex sticky top-0 h-screen w-72 flex-col border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <div className="flex items-center gap-3 p-6">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white">
                        <School className="h-6 w-6" />
                    </div>
                    <div>
                        <h1 className="font-display text-xl font-bold tracking-tight">Mentomania</h1>
                        <p className="text-xs font-medium uppercase tracking-wider text-slate-500">Admin Portal</p>
                    </div>
                </div>
                <nav className="flex-1 space-y-1.5 px-4 py-4">
                    <Link
                        href="#"
                        className="flex items-center gap-3 rounded-xl bg-primary/10 px-4 py-3 font-semibold text-primary"
                    >
                        <FileText className="h-5 w-5" />
                        <span>Applications</span>
                    </Link>
                    <Link
                        href="#"
                        className="flex items-center gap-3 rounded-xl px-4 py-3 text-slate-600 transition-all duration-200 hover:bg-slate-100 hover:text-slate-900 focus:bg-slate-100 focus:outline-none dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
                    >
                        <Users className="h-5 w-5" />
                        <span>Mentors</span>
                    </Link>
                    <Link
                        href="#"
                        className="flex items-center gap-3 rounded-xl px-4 py-3 text-slate-600 transition-all duration-200 hover:bg-slate-100 hover:text-slate-900 focus:bg-slate-100 focus:outline-none dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
                    >
                        <User className="h-5 w-5" />
                        <span>Mentees</span>
                    </Link>
                    <Link
                        href="#"
                        className="flex items-center gap-3 rounded-xl px-4 py-3 text-slate-600 transition-all duration-200 hover:bg-slate-100 hover:text-slate-900 focus:bg-slate-100 focus:outline-none dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
                    >
                        <BarChart2 className="h-5 w-5" />
                        <span>Reports</span>
                    </Link>
                    <div className="mt-4 border-t border-slate-100 pt-4 dark:border-slate-800">
                        <Link
                            href="#"
                            className="flex items-center gap-3 rounded-xl px-4 py-3 text-slate-600 transition-all duration-200 hover:bg-slate-100 hover:text-slate-900 focus:bg-slate-100 focus:outline-none dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
                        >
                            <Settings className="h-5 w-5" />
                            <span>Settings</span>
                        </Link>
                    </div>
                </nav>
                <div className="border-t border-slate-100 p-4 dark:border-slate-800">
                    <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-2 dark:bg-slate-800/50">
                        <div className="h-8 w-8 overflow-hidden rounded-full bg-slate-300">
                            <img
                                className="h-full w-full object-cover"
                                alt="Admin user profile avatar"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC6XgoGQu254Jy-VUG_P0DCybXCoxIUah4trPwNnZ8xm8XngQe6Adk4afIzB6yRs97ursiA5qHgNh2JSTjLzuvvXWi7L_CiZ457XOtb9mgiumDCm5dt3l2uCG2yAcw1ejiBIBL8UAWtcaS9NXPCQ2kkQX8earj4qp-HzBpkqITDWfDCF9mzN1CM6GHpxafAMciMX_f_HcTJonSx3zOvYuqaFMWDXL_3RxqWlDvFMTY97-MGIVA-2xy2mAQqyOtU_l2xEVEXYTo_EJC7"
                            />
                        </div>
                        <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-bold">Alex Rivera</p>
                            <p className="truncate text-xs text-slate-500">Super Admin</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex min-w-0 flex-1 flex-col bg-slate-50 dark:bg-slate-900/50 w-full md:w-auto">
                {/* Action Bar (Sticky) */}
                <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/80 px-4 sm:px-6 md:px-8 py-3 sm:py-4 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/80">
                    <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
                        <div className="flex items-center gap-2 sm:gap-4 min-w-0">
                            <button className="rounded-full p-2 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800 flex-shrink-0">
                                <ArrowLeft className="h-5 w-5 text-slate-600 dark:text-slate-400" />
                            </button>
                            <div className="min-w-0">
                                <h2 className="font-display text-lg sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white line-clamp-1">Reviewing Application</h2>
                                <p className="text-xs sm:text-sm text-slate-500 hidden sm:block">Submitted on Oct 12, 2023</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                            <button className="rounded-xl border border-red-200 bg-white px-3 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-base font-bold text-red-600 shadow-sm transition-all hover:border-red-300 hover:bg-red-50 hover:text-red-700 focus:ring-2 focus:ring-red-500/20 h-10">
                                <span className="hidden sm:inline">Deny Application</span>
                                <span className="sm:hidden">Deny</span>
                            </button>
                            <button className="rounded-xl bg-primary px-3 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-base font-bold text-white shadow-md shadow-primary/25 transition-all hover:-translate-y-0.5 hover:bg-primary/90 active:translate-y-0 focus:ring-2 focus:ring-primary/50 h-10">
                                <span className="hidden sm:inline">Approve Application</span>
                                <span className="sm:hidden">Approve</span>
                            </button>
                        </div>
                    </div>
                </header>

                <div className="mx-auto w-full max-w-6xl space-y-6 sm:space-y-10 p-4 sm:p-6 md:p-8 md:p-10">
                    {/* Profile Header Card */}
                    <section className="rounded-xl sm:rounded-2xl border border-slate-200/75 bg-white p-4 sm:p-8 md:p-10 shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-900 dark:shadow-none">
                        <div className="flex flex-col items-center sm:items-start gap-4 sm:gap-8 md:flex-row text-center sm:text-left">
                            <div className="relative flex-shrink-0">
                                <img
                                    className="h-24 w-24 sm:h-32 sm:w-32 rounded-2xl border-4 border-white object-cover shadow-xl dark:border-slate-800"
                                    alt="Professional portrait of mentor applicant John Doe"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuACmlQIAprUf0pa7fCN3RztjfONBtQt6Yz841vtP8IRZC5EO-whTDx44wixugdPAX0ncUdbvuRQiSI-PgJAch_SQgqeWjzP2DELs0STjEr0j00U645_G3R0f5pSEoclnAjtMEMJplBNg69IMJklglbiTZJaYLD7HjaVdVYsn9FwPa2xHbrx0sYCb9pkh3HrEzjQUL_kF2wrVedNnEnH3XsfYycETGsE46dwP3fUuiNmkabv7XeH6D4KRgpZirq2dtHhkbbuB_Yhi5B8"
                                />
                                <span className="absolute -bottom-2 -right-2 rounded-full border-2 border-white bg-yellow-100 px-2 sm:px-3 py-1 text-xs font-bold text-yellow-700 dark:border-slate-800 whitespace-nowrap">
                                    PENDING
                                </span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="mb-2 font-display text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                                    John Alexander Doe
                                </h3>
                                <p className="mb-4 text-base sm:text-lg font-medium text-primary">Senior Product Designer at Google</p>
                                <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-4 text-slate-500 text-xs sm:text-sm justify-center sm:justify-start">
                                    <div className="flex items-center gap-2 justify-center sm:justify-start">
                                        <MapPin className="h-4 w-4 flex-shrink-0" />
                                        <span>San Francisco, CA</span>
                                    </div>
                                    <div className="flex items-center gap-2 justify-center sm:justify-start">
                                        <Briefcase className="h-4 w-4 flex-shrink-0" />
                                        <span>8+ Years Experience</span>
                                    </div>
                                    <div className="flex items-center gap-2 justify-center sm:justify-start">
                                        <ShieldCheck className="h-4 w-4 flex-shrink-0" />
                                        <span>Identity Verified</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <div className="grid grid-cols-1 gap-6 sm:gap-10 lg:grid-cols-3">
                        {/* Left Column: Details */}
                        <div className="space-y-6 sm:space-y-10 lg:col-span-2">
                            {/* Expertise & Bio */}
                            <div className="rounded-xl sm:rounded-2xl border border-slate-200/75 bg-white p-4 sm:p-8 md:p-10 shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-900 dark:shadow-none">
                                <h4 className="mb-4 sm:mb-6 flex items-center gap-2 font-display text-lg sm:text-xl font-bold">
                                    <Brain className="h-5 h-6 sm:h-6 w-6 text-primary flex-shrink-0" />
                                    Expertise &amp; Experience
                                </h4>
                                <div className="space-y-4 sm:space-y-6">
                                    <div>
                                        <p className="mb-2 text-xs font-bold uppercase tracking-widest text-slate-500">
                                            Primary Expertise
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                            <span className="rounded-lg border border-primary/10 bg-primary/5 px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-semibold tracking-tight text-primary">
                                                JEE Coaching
                                            </span>
                                            <span className="rounded-lg border border-primary/10 bg-primary/5 px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-semibold tracking-tight text-primary">
                                                UPSC Guidance
                                            </span>
                                            <span className="rounded-lg border border-primary/10 bg-primary/5 px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-semibold tracking-tight text-primary">
                                                Product Design
                                            </span>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="mb-2 text-xs font-bold uppercase tracking-widest text-slate-500">
                                            Key Achievements
                                        </p>
                                        <ul className="list-inside list-disc space-y-2 text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                                            <li>Helped over 50+ students crack top-tier design school entrances.</li>
                                            <li>Former Lead Mentor at Interaction Design Foundation (IDF).</li>
                                            <li>Speaker at Config 2022 on the future of design education.</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <p className="mb-2 text-xs font-bold uppercase tracking-widest text-slate-500">
                                            Biography
                                        </p>
                                        <p className="text-xs sm:text-sm leading-loose text-slate-600 dark:text-slate-400">
                                            Passionate educator and designer with nearly a decade of industry experience. I believe in a
                                            holistic approach to mentoring that combines technical skills with emotional intelligence. My
                                            background at Google has given me a unique perspective on scaling design teams and mentoring
                                            junior talent into leadership roles. Looking to help the next generation of Indian aspirants find
                                            their path in global tech.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Documents Section */}
                            <div className="rounded-xl sm:rounded-2xl border border-slate-200/75 bg-white p-4 sm:p-8 md:p-10 shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-900 dark:shadow-none">
                                <h4 className="mb-4 sm:mb-6 flex items-center gap-2 font-display text-lg sm:text-xl font-bold">
                                    <FolderOpen className="h-5 h-6 sm:h-6 w-6 text-primary flex-shrink-0" />
                                    Verification Documents
                                </h4>
                                <div className="grid grid-cols-1 gap-3 sm:gap-4 sm:grid-cols-2">
                                    <Link
                                        href="#"
                                        className="group flex items-center gap-3 sm:gap-4 rounded-xl border border-slate-100 p-3 sm:p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary/50 active:translate-y-0 dark:border-slate-800 dark:hover:bg-slate-800/50"
                                    >
                                        <div className="flex h-10 sm:h-12 w-10 sm:w-12 items-center justify-center rounded-lg bg-red-50 text-red-500 flex-shrink-0">
                                            <File className="h-5 sm:h-6 w-5 sm:w-6" />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="truncate text-xs sm:text-sm font-bold">Professional_Resume.pdf</p>
                                            <p className="text-xs text-slate-500">2.4 MB • Updated Oct 2023</p>
                                        </div>
                                        <ExternalLink className="h-4 sm:h-5 w-4 sm:w-5 text-slate-300 transition-colors group-hover:text-primary flex-shrink-0" />
                                    </Link>
                                    <Link
                                        href="#"
                                        className="group flex items-center gap-3 sm:gap-4 rounded-xl border border-slate-100 p-3 sm:p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary/50 active:translate-y-0 dark:border-slate-800 dark:hover:bg-slate-800/50"
                                    >
                                        <div className="flex h-10 sm:h-12 w-10 sm:w-12 items-center justify-center rounded-lg bg-blue-50 text-blue-500 flex-shrink-0">
                                            <LinkIcon className="h-5 sm:h-6 w-5 sm:w-6" />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="truncate text-xs sm:text-sm font-bold">Portfolio_Website.url</p>
                                            <p className="text-xs text-slate-500">Personal Website</p>
                                        </div>
                                        <ExternalLink className="h-4 sm:h-5 w-4 sm:w-5 text-slate-300 transition-colors group-hover:text-primary flex-shrink-0" />
                                    </Link>
                                    <Link
                                        href="#"
                                        className="group flex items-center gap-3 sm:gap-4 rounded-xl border border-slate-100 p-3 sm:p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary/50 active:translate-y-0 dark:border-slate-800 dark:hover:bg-slate-800/50"
                                    >
                                        <div className="flex h-10 sm:h-12 w-10 sm:w-12 items-center justify-center rounded-lg bg-slate-50 text-slate-500 flex-shrink-0">
                                            <BadgeAlert className="h-5 sm:h-6 w-5 sm:w-6" />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="truncate text-xs sm:text-sm font-bold">Government_ID.png</p>
                                            <p className="text-xs text-slate-500">Identity Proof</p>
                                        </div>
                                        <Eye className="h-4 sm:h-5 w-4 sm:w-5 text-slate-300 transition-colors group-hover:text-primary flex-shrink-0" />
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Basic Info & Contact */}
                        <div className="space-y-6 sm:space-y-10">
                            {/* Basic Info */}
                            <div className="rounded-xl sm:rounded-2xl border border-slate-200/75 bg-white p-4 sm:p-6 md:p-8 shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-900 dark:shadow-none">
                                <h4 className="mb-4 sm:mb-6 font-display text-base sm:text-lg font-bold">Basic Information</h4>
                                <div className="space-y-4 sm:space-y-5">
                                    <div className="flex flex-col gap-1">
                                        <span className="text-xs font-bold uppercase tracking-widest text-slate-500">
                                            Email Address
                                        </span>
                                        <p className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 break-all">john.doe@google.com</p>
                                    </div>
                                    <div className="flex flex-col gap-1 border-t border-slate-50 pt-4 dark:border-slate-800">
                                        <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Phone Number</span>
                                        <p className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300">+1 (555) 012-3456</p>
                                    </div>
                                    <div className="flex flex-col gap-1 border-t border-slate-50 pt-4 dark:border-slate-800">
                                        <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Gender</span>
                                        <p className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300">Male</p>
                                    </div>
                                    <div className="flex flex-col gap-1 border-t border-slate-50 pt-4 dark:border-slate-800">
                                        <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Languages</span>
                                        <div className="mt-1 flex flex-wrap gap-1.5">
                                            <span className="rounded bg-slate-100 px-2 py-0.5 text-xs font-bold dark:bg-slate-800">
                                                ENGLISH
                                            </span>
                                            <span className="rounded bg-slate-100 px-2 py-0.5 text-xs font-bold dark:bg-slate-800">
                                                HINDI
                                            </span>
                                            <span className="rounded bg-slate-100 px-2 py-0.5 text-xs font-bold dark:bg-slate-800">
                                                SPANISH
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Quick Stats */}
                            <div className="rounded-xl sm:rounded-2xl border border-primary/10 bg-primary/[0.03] p-4 sm:p-6 md:p-8 shadow-sm">
                                <h4 className="mb-4 flex items-center gap-2 font-display text-xs sm:text-sm font-bold uppercase tracking-widest text-primary">
                                    System Check
                                </h4>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between text-xs sm:text-sm">
                                        <span className="text-slate-500">Profile Completion</span>
                                        <span className="font-bold text-primary">100%</span>
                                    </div>
                                    <div className="h-1.5 w-full rounded-full bg-slate-200 dark:bg-slate-800">
                                        <div className="h-1.5 rounded-full bg-primary" style={{ width: "100%" }}></div>
                                    </div>
                                    <div className="flex items-center justify-between text-xs sm:text-sm">
                                        <span className="text-slate-500">Security Score</span>
                                        <span className="font-bold text-green-600">Excellent</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Footer for padding */}
                <div className="h-20"></div>
            </main>
        </div>
    );
}
