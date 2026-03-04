"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { MentorOnboardingData } from "@/shared/lib/types/mentor-onboarding-data";

type OnboardingContextType = {
  data: MentorOnboardingData;
  updateData: (stepData: Partial<MentorOnboardingData>) => void;
  resetData: () => void;
};

const MentorOnboardingContext =
  createContext<OnboardingContextType | null>(null);

export function MentorOnboardingProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoaded } = useUser();
  const storageKey = user?.id ? `mentorOnboarding_${user.id}` : null;

  // Start with empty state — populated once we know the user
  const [data, setData] = useState<MentorOnboardingData>({});

  // Track the last userId so we can detect user switches
  const lastUserIdRef = useRef<string | null>(null);

  // 🔹 Load the correct user's data whenever the authenticated user changes
  useEffect(() => {
    if (!isLoaded) return;

    const currentUserId = user?.id ?? null;

    // If the user switched (or signed in for the first time), reset in-memory state
    if (currentUserId !== lastUserIdRef.current) {
      lastUserIdRef.current = currentUserId;

      if (currentUserId && typeof window !== "undefined") {
        try {
          // Remove the old unscoped key if it still exists (migration cleanup)
          localStorage.removeItem("mentorOnboarding");
          const stored = localStorage.getItem(`mentorOnboarding_${currentUserId}`);
          setData(stored ? JSON.parse(stored) : {});
        } catch {
          setData({});
        }
      } else {
        // Signed out — clear in-memory state, don't touch storage
        setData({});
      }
    }
  }, [user?.id, isLoaded]);

  // 🔹 Persist on every change, scoped to the current user
  useEffect(() => {
    if (!storageKey || typeof window === "undefined") return;
    localStorage.setItem(storageKey, JSON.stringify(data));
  }, [data, storageKey]);

  const updateData = (stepData: Partial<MentorOnboardingData>) => {
    setData((prev) => ({
      ...prev,
      ...stepData,
    }));
  };

  const resetData = () => {
    setData({});
    if (storageKey && typeof window !== "undefined") {
      localStorage.removeItem(storageKey);
    }
  };

  return (
    <MentorOnboardingContext.Provider
      value={{ data, updateData, resetData }}
    >
      {children}
    </MentorOnboardingContext.Provider>
  );
}

export function useMentorOnboarding() {
  const ctx = useContext(MentorOnboardingContext);
  if (!ctx) {
    throw new Error("useMentorOnboarding must be used inside provider");
  }
  return ctx;
}
