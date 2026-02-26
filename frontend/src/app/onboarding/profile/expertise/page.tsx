"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, BadgeCheck } from "lucide-react";
import { useMentorOnboarding } from "@/shared/lib/context/MentorOnboardingContext";

type ExpertiseFormValues = {
  examExpertise: string;
  currentRole: string;
  rankOrScore: string;
  yearsOfExperience: string;
  keyHighlights: string;
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.38, delay: i * 0.07, ease: "easeOut" as const },
  }),
};

export default function ExpertisePage() {
  const router = useRouter();
  const { updateData } = useMentorOnboarding();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<ExpertiseFormValues>({
    mode: "onChange",
    defaultValues: {
      examExpertise: "",
      currentRole: "",
      rankOrScore: "",
      yearsOfExperience: "0-1",
      keyHighlights: "",
    },
  });

  const onSubmit: SubmitHandler<ExpertiseFormValues> = (data) => {
    updateData({ expertise: data as any });
    router.push("/onboarding/profile/verification");
  };

  return (
    <div className="py-8 space-y-6">
      {/* ── Progress Header ── */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        custom={0}
        className="max-w-2xl rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
              2
            </span>
            <p className="text-base font-semibold text-slate-900">Step 2 of 4</p>
          </div>
          <p className="text-sm font-bold text-primary">50% Complete</p>
        </div>
        <div className="h-2.5 w-full overflow-hidden rounded-full bg-primary/10">
          <motion.div
            className="h-full rounded-full bg-primary"
            initial={{ width: 0 }}
            animate={{ width: "50%" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        </div>
        <div className="mt-3 flex items-center gap-2 text-slate-500">
          <span className="material-symbols-outlined text-[18px]">work</span>
          <p className="text-sm font-medium">Professional Background &amp; Expertise</p>
        </div>
      </motion.div>

      {/* ── Form Card ── */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        custom={1}
        className="max-w-2xl overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
      >
        {/* Card Header */}
        <div className="border-b border-slate-100 p-8">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Tell us about your expertise
          </h1>
          <p className="mt-2 text-base text-slate-500">
            This information helps us verify your profile and match you with the most relevant
            aspirants looking for guidance.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-8 p-8">
            {/* Core Info */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Exam Expertise */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Exam Expertise
                </label>
                <select
                  {...register("examExpertise", { required: "Please select an exam" })}
                  className="h-12 w-full rounded-lg border border-slate-200 bg-slate-50 px-4 text-slate-900 transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <option value="" disabled>Select primary exam</option>
                  <option value="upsc">UPSC Civil Services</option>
                  <option value="jee">IIT-JEE (Advanced/Main)</option>
                  <option value="neet">NEET-UG</option>
                  <option value="cat">CAT (MBA)</option>
                  <option value="gate">GATE</option>
                  <option value="gmat">GMAT / GRE</option>
                </select>
                {errors.examExpertise && (
                  <p className="text-xs text-rose-500">{errors.examExpertise.message}</p>
                )}
              </div>

              {/* Current Role */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Current Role
                </label>
                <input
                  type="text"
                  placeholder="e.g. Senior SDE at Google"
                  {...register("currentRole")}
                  className="h-12 w-full rounded-lg border border-slate-200 bg-slate-50 px-4 text-slate-900 transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>

            {/* Specific Exam Achievements */}
            <div className="border-t border-slate-100 pt-6">
              <h3 className="mb-6 flex items-center gap-2 text-lg font-bold text-slate-900">
                <BadgeCheck className="h-5 w-5 text-primary" />
                Specific Exam Achievements
              </h3>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* Rank / Score */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-slate-700">
                    What was your rank / score?
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. AIR 42 or 99.9 percentile"
                    {...register("rankOrScore")}
                    className="h-12 w-full rounded-lg border border-slate-200 bg-slate-50 px-4 text-slate-900 transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                {/* Years of Experience */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-slate-700">
                    Years of experience in this field?
                  </label>
                  <select
                    {...register("yearsOfExperience")}
                    className="h-12 w-full rounded-lg border border-slate-200 bg-slate-50 px-4 text-slate-900 transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  >
                    <option value="0-1">Less than 1 year</option>
                    <option value="1-3">1 – 3 years</option>
                    <option value="3-5">3 – 5 years</option>
                    <option value="5+">5+ years</option>
                  </select>
                </div>

                {/* Key Highlights */}
                <div className="flex flex-col gap-2 md:col-span-2">
                  <label className="text-sm font-semibold text-slate-700">
                    Key Highlights <span className="font-normal text-slate-400">(Optional)</span>
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Mention any specific subjects you mastered or awards received..."
                    {...register("keyHighlights")}
                    className="w-full resize-none rounded-lg border border-slate-200 bg-slate-50 p-4 text-slate-900 transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Footer Navigation */}
          <div className="flex flex-col items-center justify-between gap-4 border-t border-slate-100 bg-slate-50 px-8 py-6 sm:flex-row">
            <button
              type="button"
              onClick={() => router.back()}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-300 px-8 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100 sm:w-auto"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </button>
            <button
              type="submit"
              disabled={!isValid || isSubmitting}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-10 py-3 text-sm font-bold text-white shadow-lg shadow-primary/25 transition-all hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
            >
              {isSubmitting ? "Saving..." : "Continue to Step 3"}
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </form>
      </motion.div>

      {/* Help note */}
      <motion.p
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        custom={2}
        className="max-w-2xl text-center text-sm text-slate-500"
      >
        Need help?{" "}
        <a href="#" className="font-medium text-primary hover:underline">
          Contact our onboarding support team
        </a>
      </motion.p>
    </div>
  );
}
