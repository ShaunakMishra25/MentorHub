import { Calculator, Stethoscope, GraduationCap, BookOpen, Cog, DollarSign, Scale, Globe, Brain, FlaskConical, Search, Calendar, Rocket, BadgeCheck, Target, Coins, Users } from "lucide-react";

export const popularExams = [
    { id: "jee", name: "IIT JEE", icon: Calculator, color: "text-blue-600", bg: "bg-blue-100", link: "/exam/iit-jee" },
    { id: "neet", name: "NEET", icon: Stethoscope, color: "text-green-600", bg: "bg-green-100", link: "/exam/neet" },
    { id: "cat", name: "CAT / MBA", icon: GraduationCap, color: "text-purple-600", bg: "bg-purple-100", link: "/exam/cat-mba" },
    { id: "upsc", name: "UPSC", icon: BookOpen, color: "text-orange-600", bg: "bg-orange-100", link: "/exam/upsc" },
    { id: "gate", name: "GATE", icon: Cog, color: "text-indigo-600", bg: "bg-indigo-100", link: "/exam/gate" },
    { id: "ca", name: "CA", icon: DollarSign, color: "text-yellow-600", bg: "bg-yellow-100", link: "/exam/ca" },
    { id: "clat", name: "CLAT", icon: Scale, color: "text-red-600", bg: "bg-red-100", link: "/exam/clat" },
    { id: "nda", name: "NDA", icon: Globe, color: "text-teal-600", bg: "bg-teal-100", link: "/exam/nda" },
    { id: "cuet", name: "CUET", icon: Brain, color: "text-pink-600", bg: "bg-pink-100", link: "/exam/cuet" },
    { id: "bitsat", name: "BITSAT", icon: FlaskConical, color: "text-cyan-600", bg: "bg-cyan-100", link: "/exam/bitsat" },
];

export const featuredMentors = [
    {
        id: "1",
        name: "Arya Sharma",
        college: "IIT Bombay",
        exam: "IIT JEE",
        rank: "AIR 45",
        rating: 4.9,
        reviews: 120,
        hourlyRate: 500,
        tags: ["Physics", "Maths"],
    },
    {
        id: "2",
        name: "Rohan Gupta",
        college: "AIIMS Delhi",
        exam: "NEET",
        rank: "AIR 12",
        rating: 5.0,
        reviews: 85,
        hourlyRate: 800,
        tags: ["Biology", "Chemistry"],
    },
    {
        id: "3",
        name: "Sanya Verma",
        college: "IIM Ahmedabad",
        exam: "CAT",
        rank: "99.98%ile",
        rating: 4.8,
        reviews: 200,
        hourlyRate: 1200,
        tags: ["VARC", "DILR"],
    },
    {
        id: "4",
        name: "Vikram Singh",
        college: "LBSNAA",
        exam: "UPSC",
        rank: "AIR 89",
        rating: 4.9,
        reviews: 150,
        hourlyRate: 0,
        tags: ["Strategy", "Mains"],
    },
];

export const howItWorksSteps = [
    {
        id: 1,
        title: "Find Your Mentor",
        description: "Browse through profiles of top rankers from IITs, AIIMS, IIMs, and more. Filter by exam, ranking, and subject expertise.",
        icon: Search,
    },
    {
        id: 2,
        title: "Book a Session",
        description: "Connect 1-on-1 via video call. Discuss strategy, clear doubts, and get a personalized roadmap for your preparation.",
        icon: Calendar,
    },
    {
        id: 3,
        title: "Crack Your Exam",
        description: "Follow the guidance, stay motivated, and achieve your dream rank with continuous support from your mentor.",
        icon: Rocket,
    },
];

export const benefits = [
    {
        title: "Verified Top Rankers",
        description: "Every mentor is manually verified. Learn only from those who have actually cracked the exam.",
        icon: BadgeCheck,
    },
    {
        title: "Personalized Strategy",
        description: "One size doesn't fit all. Get a study plan tailored to your strengths and weaknesses.",
        icon: Target,
    },
    {
        title: "Affordable Guidance",
        description: "Premium mentorship at a fraction of the cost of big coaching institutes.",
        icon: Coins,
    },
    {
        title: "Community Support",
        description: "Join a community of serious aspirants and stay motivated throughout your journey.",
        icon: Users,
    },
];
