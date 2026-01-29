"use client";

import Image from "next/image";
import Link from "next/link";
import { BadgeCheck, Briefcase, Users, TrendingUp, Star, MessageCircle } from "lucide-react";
import TagBadge from "./TagBadge";

type MentorCardData = {
    id: string;
    name: string;
    pricing?: number;
    tagLine?: string;
    bio: string;
    rating?: number;
    reviewsCount?: number;
    college?: string;
    exam?: string;
    rank?: number;
    yearsOfExperience?: number;
    sessions?: number;
    attendance?: number;
    responseTime?: string;
    imageUrl?: string;
    offerings?: {
        id: string;
        title: string;
        price: number;
        discount?: number;
        icon?: string;
    }[];
};

export default function SimpleMentorCard({ mentor }: { mentor: MentorCardData }) {
    // Parse tagLine to extract credentials
    const getCredentialBadges = () => {
        if (!mentor.tagLine) return [];
        const badges: { text: string; variant: "primary" | "secondary" | "accent" }[] = [];
        const parts = mentor.tagLine.split("|").map(p => p.trim());
        parts.forEach((part, index) => {
            if (part) {
                const variant = index === 0 ? "primary" : index === 1 ? "secondary" : "accent";
                badges.push({ text: part, variant });
            }
        });
        return badges;
    };

    const badges = getCredentialBadges();

    // Fallback images
    const FALLBACK_IMAGES = [
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=1000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop",
    ];

    const isLocalMissing = mentor.imageUrl?.startsWith("/");
    const shouldUseFallback = !mentor.imageUrl || isLocalMissing;
    const imageIndex = mentor.id.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) % FALLBACK_IMAGES.length;
    const imageSrc = shouldUseFallback ? FALLBACK_IMAGES[imageIndex] : mentor.imageUrl!;

    return (
        <div className="group bg-white rounded-2xl border-2 border-gray-200 hover:border-orange-300 hover:shadow-xl transition-all duration-300 overflow-hidden">
            {/* Image Container - Smaller aspect ratio */}
            <div className="relative aspect-[3/2] w-full overflow-hidden">
                <Image
                    src={imageSrc}
                    alt={mentor.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Rating Badge Overlay */}
                {mentor.rating && (
                    <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm shadow-lg px-2 py-1 rounded-lg flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 fill-orange-400 text-orange-400" />
                        <span className="text-xs font-bold text-gray-900">{mentor.rating.toFixed(1)}</span>
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-4">
                {/* Name & Badge */}
                <div className="flex items-center gap-2 mb-2">
                    <Link href={`/mentors/${mentor.id}`}>
                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-orange-600 transition-colors line-clamp-1">
                            {mentor.name}
                        </h3>
                    </Link>
                    <BadgeCheck className="w-4 h-4 text-blue-500 fill-blue-500 flex-shrink-0" />
                </div>

                {/* Credential Badges - Show first 2 only */}
                {badges.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-2">
                        {badges.slice(0, 2).map((badge, index) => (
                            <TagBadge key={index} text={badge.text} variant={badge.variant} />
                        ))}
                    </div>
                )}

                {/* Bio - 2 lines max */}
                <p className="text-xs text-gray-600 line-clamp-2 mb-3 leading-relaxed">
                    {mentor.bio}
                </p>

                {/* Meta Details - Compact inline */}
                <div className="flex items-center gap-3 mb-3 text-xs text-gray-500 flex-wrap">
                    {mentor.yearsOfExperience !== undefined && (
                        <div className="flex items-center gap-1">
                            <Briefcase className="w-3 h-3" />
                            <span>{mentor.yearsOfExperience}y</span>
                        </div>
                    )}
                    {mentor.sessions !== undefined && (
                        <div className="flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            <span>{mentor.sessions}</span>
                        </div>
                    )}
                    {mentor.attendance !== undefined && (
                        <div className="flex items-center gap-1">
                            <TrendingUp className="w-3 h-3 text-green-500" />
                            <span className="text-green-600">{mentor.attendance}%</span>
                        </div>
                    )}
                </div>

                {/* Pricing & Actions */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div className="flex flex-col">
                        <span className="text-xs text-gray-500">Starting at</span>
                        <div className="flex items-baseline gap-0.5">
                            <span className="text-lg font-bold text-gray-900">₹{mentor.pricing || 1000}</span>
                            <span className="text-xs text-gray-500">/hr</span>
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <button className="p-2 bg-white border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
                            <MessageCircle className="w-4 h-4" />
                        </button>
                        <Link
                            href={`/mentors/${mentor.id}`}
                            className="px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-sm font-semibold rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all shadow-sm"
                        >
                            Book
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
