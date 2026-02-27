"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Send, Pencil, User, Briefcase, FileText, CheckCircle, Info, CheckCircle2 } from "lucide-react";
import { useMentorOnboarding } from "@/shared/lib/context/MentorOnboardingContext";

function capitalize(v: string) {
  return v.charAt(0).toUpperCase() + v.slice(1);
}

function ReviewCard({
  icon,
  title,
  editHref,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  editHref: string;
  children: React.ReactNode;
}) {
  const router = useRouter();
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      {/* Card header */}
      <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/50 px-6 py-4">
        <div className="flex items-center gap-3">
          {icon}
          <h3 className="text-lg font-bold text-slate-900">{title}</h3>
        </div>
        <button
          onClick={() => router.push(editHref)}
          className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-semibold text-primary transition-colors hover:bg-primary/10"
        >
          <Pencil className="h-4 w-4" />
          Edit
        </button>
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}

export default function ReviewPage() {
  const { data, resetData } = useMentorOnboarding();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = async () => {
    setSubmitting(true);
    try {
      const res = await fetch("/api/mentor/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      
      const result = await res.json();
      
      if (!res.ok) {
        throw new Error(result.error || "Failed to submit");
      }
      
      setSubmitted(true);
      resetData();
      setTimeout(() => router.push("/onboarding/profile/submitted"), 1500);
    } catch (err: any) {
      alert(err.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const basicInfo = data.basicInfo;
  const expertise = data.expertise as any;

  return (
    <div className="py-8 space-y-6 max-w-[800px]">
      {/* ── Progress Card ── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
      >
        <div className="flex items-start justify-between mb-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Step 4 of 4</p>
            <h1 className="mt-1 text-3xl font-black tracking-tight text-slate-900">Final Review</h1>
          </div>
          <div className="text-right">
            <p className="text-2xl font-black leading-none text-primary">100%</p>
            <p className="text-xs text-slate-400">Completed</p>
          </div>
        </div>
        <div className="h-3 w-full overflow-hidden rounded-full bg-slate-100">
          <motion.div
            className="h-full rounded-full bg-primary"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          />
        </div>
        <p className="mt-4 text-sm text-slate-600">
          You&apos;re almost there! Please take a moment to review your application details. Once submitted, your profile will be sent to our moderation team.
        </p>
      </motion.div>

      {/* ── Review Cards ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08, duration: 0.4, ease: "easeOut" }}
        className="flex flex-col gap-6"
      >
        {/* Basic Details */}
        <ReviewCard
          icon={<User className="h-5 w-5 text-primary" />}
          title="Basic Details"
          editHref="/onboarding/profile/basic-info"
        >
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {[
              { label: "Full Name", value: basicInfo ? `${basicInfo.firstName} ${basicInfo.lastName}` : "-" },
              { label: "Gender", value: basicInfo?.gender ? capitalize(basicInfo.gender) : "-" },
              { label: "Current Role", value: expertise?.currentRole ?? "-" },
              { label: "Experience", value: expertise?.yearsOfExperience ?? "-" },
            ].map(({ label, value }) => (
              <div key={label} className="flex flex-col gap-1">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">{label}</p>
                <p className="font-medium text-slate-800">{value}</p>
              </div>
            ))}
          </div>
        </ReviewCard>

        {/* Background & Biography */}
        <ReviewCard
          icon={<Briefcase className="h-5 w-5 text-primary" />}
          title="Background & Biography"
          editHref="/onboarding/profile/expertise"
        >
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Exam Expertise</p>
              <p className="text-sm italic leading-relaxed text-slate-600">
                &ldquo;{expertise?.examExpertise ?? "-"}&rdquo;
              </p>
            </div>
            {expertise?.keyHighlights && (
              <div className="flex flex-col gap-1">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Key Highlights</p>
                <p className="text-sm italic leading-relaxed text-slate-600">&ldquo;{expertise.keyHighlights}&rdquo;</p>
              </div>
            )}
            {expertise?.rankOrScore && (
              <div className="flex flex-wrap gap-2 pt-1">
                <span className="rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
                  {expertise.rankOrScore}
                </span>
              </div>
            )}
          </div>
        </ReviewCard>

        {/* Documents */}
        <ReviewCard
          icon={<FileText className="h-5 w-5 text-primary" />}
          title="Documents"
          editHref="/onboarding/profile/verification"
        >
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4 rounded-xl border border-primary/20 bg-primary/5 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold leading-tight text-slate-900">Identity document uploaded</p>
                <p className="text-xs text-slate-500">Pending verification</p>
              </div>
              <CheckCircle className="h-5 w-5 text-green-500" />
            </div>
          </div>
        </ReviewCard>
      </motion.div>

      {/* ── Confirmation Section ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.3 }}
        className="flex flex-col gap-6 pt-4"
      >
        {/* Warning note */}
        <div className="flex gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4">
          <Info className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
          <p className="text-sm text-amber-800">
            By clicking &ldquo;Confirm &amp; Submit&rdquo;, you agree to our Mentor Terms of Service and Code of Conduct.
            Your application will be reviewed within 2–3 business days.
          </p>
        </div>

        {/* Success message */}
        <AnimatePresence>
          {submitted && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-4 rounded-xl border border-emerald-200 bg-emerald-50 p-4"
            >
              <div className="rounded-full bg-emerald-100 p-2 text-emerald-600">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-bold text-emerald-900">Application Submitted!</h4>
                <p className="text-xs text-emerald-700">You&apos;re all set. Redirecting you to the dashboard...</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex flex-col items-center justify-between gap-4 pb-10 sm:flex-row">
          <button
            type="button"
            onClick={() => router.back()}
            className="flex w-full items-center justify-center gap-2 rounded-xl px-8 py-3 font-bold text-slate-600 transition-colors hover:bg-slate-200 sm:w-auto"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>
          <button
            type="button"
            onClick={onSubmit}
            disabled={submitting || submitted}
            className="flex h-12 w-full items-center justify-center gap-3 rounded-xl bg-primary font-bold text-white shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5 hover:bg-primary/90 active:translate-y-0 disabled:opacity-60 sm:max-w-md sm:flex-1"
          >
            <span>{submitting ? "Submitting..." : "Confirm & Submit Application"}</span>
            <Send className="h-4 w-4" />
          </button>
        </div>
      </motion.div>
    </div>
  );
}
