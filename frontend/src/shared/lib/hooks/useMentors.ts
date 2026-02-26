import useSWR from "swr";
import { type MentorProfile } from "@/app/(public)/mentors/mock";
import { fetchMentors, fetchMentorById, transformMentorData } from "../api/mentors";

// SWR configuration for mentor data caching
const swrConfig = {
  revalidateOnFocus: false,
  revalidateOnReconnect: true,
  dedupingInterval: 60000, // 1 minute deduplication
  errorRetryCount: 3,
};

/**
 * Hook to fetch all mentors with caching
 */
export function useMentors() {
  const { data, error, isLoading, mutate } = useSWR<MentorProfile[]>(
    "mentors",
    fetchMentors,
    {
      ...swrConfig,
      revalidateIfStale: true,
      refreshInterval: 5 * 60 * 1000, // Refresh every 5 minutes
    }
  );

  return {
    mentors: data || [],
    isLoading,
    isError: !!error,
    error,
    mutate,
  };
}

/**
 * Hook to fetch a single mentor by ID with caching
 */
export function useMentor(mentorId: string | undefined) {
  const { data, error, isLoading, mutate } = useSWR<MentorProfile | undefined>(
    mentorId ? `mentor-${mentorId}` : null,
    () => (mentorId ? fetchMentorById(mentorId) : undefined),
    {
      ...swrConfig,
      revalidateIfStale: false, // Single mentor data is more stable
    }
  );

  return {
    mentor: data,
    isLoading,
    isError: !!error,
    error,
    mutate,
  };
}

/**
 * Prefetch mentor data for faster navigation
 */
export function prefetchMentor(mentorId: string) {
  // This triggers SWR to cache the data
  fetchMentorById(mentorId);
}

/**
 * Prefetch all mentors
 */
export function prefetchMentors() {
  fetchMentors();
}
