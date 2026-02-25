"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, Phone, ArrowRight, Lightbulb } from "lucide-react";

import { MentorBasicInfo } from "@/shared/lib/types/mentor-onboarding-data";
import { useMentorOnboarding } from "@/shared/lib/context/MentorOnboardingContext";
import { Input } from "@/shared/ui/input";

type BasicInfoFormValues = MentorBasicInfo & {
  email?: string;
  phone?: string;
  preferredLanguage?: string;
  aboutYou?: string;
};

export default function BasicInfoPage() {
  const { user } = useUser();
  const router = useRouter();
  const { updateData } = useMentorOnboarding();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid, isSubmitting },
  } = useForm<BasicInfoFormValues>({
    mode: "onChange",
    defaultValues: {
      firstName: "",
      lastName: "",
      profilePhoto: "",
      gender: "prefer-not-to-say",
      currentOrganisation: "",
      industry: "",
      currentRole: "",
      workExperience: 0,
      preferredLanguage: "en",
      aboutYou: "",
    },
  });

  useEffect(() => {
    if (user) {
      setValue("firstName", user.firstName ?? "");
      setValue("lastName", user.lastName ?? "");
      setValue("profilePhoto", user.imageUrl ?? "");
      const primaryEmail = user.primaryEmailAddress?.emailAddress;
      if (primaryEmail) {
        setValue("email", primaryEmail);
      }
    }
  }, [user, setValue]);

  const onSubmit = (data: BasicInfoFormValues) => {
    const {
      firstName,
      lastName,
      profilePhoto,
      gender,
      currentOrganisation,
      industry,
      currentRole,
      workExperience,
    } = data;

    updateData({
      basicInfo: {
        firstName,
        lastName,
        profilePhoto,
        gender,
        currentOrganisation,
        industry,
        currentRole,
        workExperience,
      },
    });

    router.push("/onboarding/profile/expertise");
  };

  const aboutYou = watch("aboutYou") ?? "";

  return (
    <div className="py-8 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="flex flex-col gap-3 max-w-2xl"
      >
        <div className="flex items-end justify-between gap-4">
          <div className="flex flex-col gap-0.5">
            <span className="text-xs font-bold uppercase tracking-widest text-primary">
              Step 1 of 4
            </span>
            <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
              Basic Details
            </h1>
          </div>
          <span className="text-sm font-semibold text-muted-foreground shrink-0">25% Complete</span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
          <motion.div
            className="h-full rounded-full bg-primary"
            initial={{ width: 0 }}
            animate={{ width: "25%" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        </div>
      </motion.div>

      {/* Form Card */}
      <motion.form
        onSubmit={handleSubmit(onSubmit)}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05, duration: 0.4, ease: "easeOut" }}
        className="max-w-2xl rounded-2xl border border-border-subtle bg-surface-background shadow-floating px-5 py-6 sm:px-8 sm:py-8 space-y-6"
      >
        {/* Name Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground flex items-center gap-1.5">
              First name <span className="text-rose-500">*</span>
            </label>
            <Input
              type="text"
              placeholder="e.g. Jonathan"
              aria-invalid={!!errors.firstName}
              {...register("firstName", { required: "First name is required" })}
            />
            {errors.firstName && (
              <p className="text-xs text-rose-500 font-medium">{errors.firstName.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground flex items-center gap-1.5">
              Last name <span className="text-rose-500">*</span>
            </label>
            <Input
              type="text"
              placeholder="e.g. Doe"
              aria-invalid={!!errors.lastName}
              {...register("lastName", { required: "Last name is required" })}
            />
            {errors.lastName && (
              <p className="text-xs text-rose-500 font-medium">{errors.lastName.message}</p>
            )}
          </div>
        </div>

        {/* Email */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground flex items-center gap-1.5">
            Email address <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
              <Mail className="h-4 w-4" />
            </div>
            <Input
              type="email"
              placeholder="name@youremail.com"
              className="pl-9"
              aria-invalid={!!errors.email}
              {...register("email", { required: "Email is required" })}
            />
          </div>
          {errors.email && (
            <p className="text-xs text-rose-500 font-medium">{errors.email.message}</p>
          )}
        </div>

        {/* Phone & Gender / Language Row */}
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground flex items-center gap-1.5">
              Phone number <span className="text-rose-500">*</span>
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1 min-w-0">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
                  <Phone className="h-4 w-4" />
                </div>
                <Input
                  type="tel"
                  placeholder="+91 98765 43210"
                  className="pl-9"
                  aria-invalid={!!errors.phone}
                  {...register("phone", { required: "Phone number is required" })}
                />
              </div>
            </div>
            {errors.phone && (
              <p className="text-xs text-rose-500 font-medium">{errors.phone.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground flex items-center gap-1.5">
                Gender <span className="text-rose-500">*</span>
              </label>
              <select
                aria-invalid={!!errors.gender}
                className="h-9 md:h-10 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm text-foreground shadow-xs outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
                {...register("gender", { required: "Gender is required" })}
              >
                <option value="" disabled>
                  Select gender
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="non-binary">Non-binary</option>
                <option value="prefer-not-to-say">Prefer not to say</option>
              </select>
              {errors.gender && (
                <p className="text-xs text-rose-500 font-medium">{errors.gender.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Preferred language
              </label>
              <select
                className="h-9 md:h-10 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm text-foreground shadow-xs outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
                {...register("preferredLanguage")}
              >
                <option value="en">English</option>
                <option value="hi">Hindi</option>
                <option value="bn">Bengali</option>
                <option value="ta">Tamil</option>
                <option value="te">Telugu</option>
              </select>
            </div>
          </div>
        </div>

        {/* About You */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">
            About you
          </label>
          <textarea
            rows={4}
            maxLength={500}
            placeholder="Briefly describe your professional background and why you want to mentor students..."
            className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm text-foreground shadow-xs outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] resize-none"
            {...register("aboutYou")}
          />
          <div className="flex items-center justify-between text-[11px] text-muted-foreground">
            <span>Profiles with a clear, specific story get significantly more booking requests.</span>
            <span>
              {aboutYou.length} / 500
            </span>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={!isValid || isSubmitting}
            className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-floating transition-all disabled:opacity-60 disabled:cursor-not-allowed hover:bg-primary/90 hover:shadow-soft"
          >
            <span>{isSubmitting ? "Saving..." : "Next step"}</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
      </motion.form>

      {/* Tip Area */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.35, ease: "easeOut" }}
        className="max-w-2xl rounded-2xl border border-primary/10 bg-primary/5 px-4 py-4 sm:px-5 sm:py-4 flex gap-3 sm:gap-4 items-start"
      >
        <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary">
          <Lightbulb className="h-4 w-4" />
        </div>
        <div className="space-y-1">
          <h2 className="text-sm font-semibold text-foreground">
            Quick tip
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            Mentors with a complete, well-written basic profile are much more likely to be discovered by the right
            students. Invest a minute here and it pays off across every booking.
          </p>
        </div>
      </motion.div>
    </div>
  );
}

