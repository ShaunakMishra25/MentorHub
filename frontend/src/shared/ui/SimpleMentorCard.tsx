"use client";

import Link from "next/link";
import Image from "next/image";
import { BadgeCheck, Briefcase, Users, TrendingUp, Star, MessageCircle, User, Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/shared/ui/tooltip";
import TagBadge from "./TagBadge";
import { useState } from "react";
import { useMemo } from "react";
import { Skeleton } from "@/shared/ui/skeleton";
import { Button } from "@/shared/ui/button";

type MentorCardData = {
  id: string;
  name?: string;
  profileImage?: string;
  imageUrl?: string;
  mentorProfile?: {
    basicInfo?: {
      profilePhoto?: string;
    };
  };
  isVerified?: boolean;
  pricing?: number;
  sessionDuration?: number;
  isFreeTrialEnabled?: boolean;
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
  subjects?: string[];
  specializations?: string[];

  service?: string;
  posting?: string;
  attempts?: number;
  optionalSubject?: string;

  offerings?: {
    id: string;
    title: string;
    price: number;
    discount?: number;
    icon?: string;
  }[];
};

interface SimpleMentorCardProps {
  mentor?: MentorCardData;
  isLoading?: boolean;
}

export default function SimpleMentorCard({
  mentor,
  isLoading = false,
}: SimpleMentorCardProps) {
  const [imageError, setImageError] = useState(false);

  if (isLoading) {
    return (
      <div className="bg-surface-background rounded-2xl border border-border-subtle p-4 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
          <Skeleton className="w-20 h-20 sm:w-32 sm:h-32 rounded-xl flex-shrink-0 mx-auto sm:mx-0" />
          <div className="flex-1 space-y-4 w-full">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
              <Skeleton className="h-8 w-1/3" />
              <Skeleton className="h-8 w-24" />
            </div>
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <div className="flex gap-4 pt-4 flex-wrap">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-20" />
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center pt-6 mt-4 gap-4 border-t border-border-subtle">
              <Skeleton className="h-8 w-32" />
              <Skeleton className="h-10 w-full sm:w-32 rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!mentor) return null;

  const profileImageUrl = mentor.mentorProfile?.basicInfo?.profilePhoto || mentor.imageUrl || mentor.profileImage;

  const trustSignal = useMemo(() => {
    if (!mentor) return null;
    const signals = [
      "Usually responds within 15 mins",
      "Available today",
      "3 students booked today",
      "4 students viewing right now",
      "High demand recently",
    ];
    const index = mentor.name ? mentor.name.charCodeAt(0) % signals.length : 0;
    return signals[index];
  }, [mentor]);

  const badges = [
    mentor.exam && { text: mentor.exam, variant: "primary" },
    mentor.service && { text: mentor.service, variant: "secondary" },
    mentor.posting && { text: mentor.posting, variant: "accent" },
    mentor.college && { text: mentor.college, variant: "secondary" },
  ].filter(Boolean) as { text: string; variant: "primary" | "secondary" | "accent" }[];

  return (
    <div className="block w-full relative group cursor-pointer">
      <div className="bg-surface-background rounded-2xl border border-border-subtle shadow-sm relative">
        <Link href={`/mentors/${mentor.id}`} className="absolute inset-0 z-0">
          <span className="sr-only">View {mentor.name}'s profile</span>
        </Link>
        <div className="p-4 sm:p-8 relative z-10 pointer-events-none">
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 items-center sm:items-start text-center sm:text-left">
            <div className="relative flex-shrink-0">
              <div className="w-20 h-20 sm:w-32 sm:h-32 rounded-xl bg-gray-50 flex items-center justify-center overflow-hidden border border-border-subtle">
                {profileImageUrl && !imageError ? (
                  <Image
                    src={profileImageUrl}
                    alt={mentor.name || 'Mentor'}
                    width={128}
                    height={128}
                    className="object-cover w-full h-full"
                    onError={() => setImageError(true)}
                    sizes="(max-width: 640px) 80px, 128px"
                  />
                ) : (
                  <User className="w-8 h-8 sm:w-12 sm:h-12 text-gray-300" />
                )}
              </div>
              {mentor.isVerified && (
                <div className="absolute -top-2 -right-2 bg-blue-600 p-1 sm:p-1.5 rounded-full ring-4 ring-white shadow-sm">
                  <BadgeCheck className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                </div>
              )}
            </div>

            <div className="flex-1 w-full min-w-0">
              <div className="flex flex-col items-center sm:items-start gap-2 mb-2 w-full">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                  <h3 className="text-lg sm:text-2xl font-bold tracking-tight text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {mentor.name}
                  </h3>
                  {mentor.rating !== undefined && (
                    <div className="flex items-center gap-1.5 px-2 py-0.5 bg-gray-50 rounded-md border border-gray-100 whitespace-nowrap">
                      <Star className="w-3 h-3 fill-gray-900 text-gray-900" />
                      <span className="text-xs sm:text-sm font-semibold text-gray-900">
                        {mentor.rating.toFixed(1)}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              {mentor.tagLine && (
                <p className="text-xs sm:text-sm text-blue-600 font-medium mb-3 line-clamp-1">{mentor.tagLine}</p>
              )}

              {/* Exam / College / Subject badges */}
              <div className="flex flex-wrap gap-2 mb-4 justify-center sm:justify-start">
                {badges.slice(0, 2).map((badge, index) => (
                  <TagBadge key={index} text={badge.text} variant={badge.variant as "primary" | "secondary" | "accent"} />
                ))}
                {mentor.subjects?.slice(0, 2).map((subject, index) => (
                  <TagBadge key={`sub-${index}`} text={subject} variant="secondary" />
                ))}
              </div>

              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed line-clamp-2 mb-4 sm:mb-6">
                {mentor.bio}
              </p>

              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 text-xs sm:text-sm font-medium text-gray-500">
                {mentor.yearsOfExperience !== undefined && (
                  <span className="flex items-center gap-1 sm:gap-1.5 justify-center sm:justify-start">
                    <Briefcase className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
                    {mentor.yearsOfExperience}+ Years Exp.
                  </span>
                )}
                {mentor.yearsOfExperience !== undefined && mentor.sessions !== undefined && (
                  <span className="text-gray-300 hidden sm:inline">•</span>
                )}
                {mentor.sessions !== undefined && (
                  <span className="flex items-center gap-1 sm:gap-1.5 justify-center sm:justify-start">
                    <Users className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
                    {mentor.sessions.toLocaleString()}+ Sessions
                  </span>
                )}
                {mentor.reviewsCount !== undefined && (
                  <>
                    <span className="text-gray-300 hidden sm:inline">•</span>
                    <span className="flex items-center gap-1 sm:gap-1.5 justify-center sm:justify-start">
                      <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
                      {mentor.reviewsCount} Reviews
                    </span>
                  </>
                )}
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-4 sm:mt-8 pt-4 sm:pt-6 gap-3 sm:gap-4 border-t border-border-subtle relative z-20 pointer-events-auto w-full">
                <div className="text-center sm:text-left">
                  <div className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-1">Session From</div>
                  <div className="flex items-baseline gap-2 justify-center sm:justify-start">
                    <div className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight">₹{mentor.pricing || 199}</div>
                    {mentor.sessionDuration && (
                      <span className="text-xs text-gray-400">· {mentor.sessionDuration} min</span>
                    )}
                  </div>
                  {mentor.isFreeTrialEnabled && (
                    <span className="text-xs text-green-600 font-semibold block mt-1">Free Trial Available</span>
                  )}
                </div>
                <Link
                  href={`/book/${mentor.id}`}
                  className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-sm active:scale-[0.98] inline-block text-center h-10"
                >
                  Book Session
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
