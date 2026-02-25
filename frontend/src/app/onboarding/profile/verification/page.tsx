"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, CloudUpload, ShieldCheck, CheckCircle, Info } from "lucide-react";

export default function VerificationPage() {
    const router = useRouter();
    const [dragging, setDragging] = useState(false);
    const [file, setFile] = useState<File | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selected = e.target.files?.[0];
        if (selected) setFile(selected);
    };

    return (
        <div className="py-8 space-y-6">
            {/* ── Progress ── */}
            <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="max-w-2xl space-y-2"
            >
                <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold uppercase tracking-wider text-slate-900">
                        Step 3 of 4: Identity &amp; Trust
                    </span>
                    <span className="text-sm font-bold text-primary">75% Complete</span>
                </div>
                <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-200">
                    <motion.div
                        className="h-full rounded-full bg-primary"
                        initial={{ width: 0 }}
                        animate={{ width: "75%" }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    />
                </div>
            </motion.div>

            {/* ── Title ── */}
            <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05, duration: 0.35, ease: "easeOut" }}
                className="max-w-2xl space-y-2"
            >
                <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">
                    Verify your credentials
                </h1>
                <p className="text-lg leading-relaxed text-slate-600 max-w-xl">
                    Our community thrives on trust. Please provide professional documentation to confirm your
                    expertise and unlock your mentor profile.
                </p>
            </motion.div>

            {/* ── Main Content Grid ── */}
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.4, ease: "easeOut" }}
                className="max-w-2xl grid grid-cols-1 gap-6 md:grid-cols-3"
            >
                {/* Left: Upload + Accepted Docs */}
                <div className="space-y-5 md:col-span-2">
                    {/* Upload Zone */}
                    <label
                        onDragOver={(e: React.DragEvent<HTMLLabelElement>) => { e.preventDefault(); setDragging(true); }}
                        onDragLeave={() => setDragging(false)}
                        onDrop={(e: React.DragEvent<HTMLLabelElement>) => { e.preventDefault(); setDragging(false); const dropped = e.dataTransfer.files[0]; if (dropped) setFile(dropped); }}
                        className={`group flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-12 bg-white transition-all ${dragging ? "border-primary bg-primary/5" : "border-slate-300 hover:border-primary"
                            }`}
                    >
                        <input type="file" className="sr-only" accept=".pdf,.jpg,.jpeg,.png" onChange={handleFileChange} />
                        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 transition-transform group-hover:scale-110">
                            <CloudUpload className="h-8 w-8 text-primary" />
                        </div>
                        {file ? (
                            <>
                                <p className="text-base font-bold text-slate-900">{file.name}</p>
                                <p className="mt-1 text-sm text-primary font-medium">File ready — click to change</p>
                            </>
                        ) : (
                            <>
                                <h3 className="text-lg font-bold text-slate-900">Click or drag and drop to upload</h3>
                                <p className="mt-2 text-center text-sm text-slate-500">
                                    Upload government ID, professional certifications, or employment proof.
                                </p>
                            </>
                        )}
                        <div className="mt-6 flex flex-wrap justify-center gap-2">
                            {["PDF", "JPG", "PNG", "Max 10MB"].map((tag) => (
                                <span
                                    key={tag}
                                    className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </label>

                    {/* Accepted Documents */}
                    <div className="rounded-xl border border-slate-200 bg-white p-6">
                        <h4 className="mb-4 flex items-center gap-2 font-bold text-slate-900">
                            <Info className="h-5 w-5 text-primary" />
                            Accepted Documents
                        </h4>
                        <ul className="space-y-3">
                            {[
                                "Professional certifications from recognized institutions",
                                "Official government identification (Passport or Driver's License)",
                                "Recent employment verification letter or LinkedIn profile snapshot",
                            ].map((doc) => (
                                <li key={doc} className="flex items-start gap-3 text-sm text-slate-600">
                                    <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                                    <span>{doc}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Right: Verified Status Card */}
                <div className="md:col-span-1">
                    <div className="sticky top-24 flex flex-col items-center rounded-xl border border-primary/20 bg-gradient-to-b from-primary/10 to-transparent p-8 text-center overflow-hidden">
                        {/* Verified Badge */}
                        <div className="relative mb-6">
                            <div className="absolute inset-0 animate-pulse rounded-full bg-primary opacity-20 blur-2xl" />
                            <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-primary shadow-lg shadow-primary/30">
                                <ShieldCheck className="h-12 w-12 text-white" />
                            </div>
                        </div>
                        <h4 className="mb-2 text-xl font-bold text-slate-900">Verified Status</h4>
                        <p className="mb-6 text-sm leading-relaxed text-slate-600">
                            Once verified, this badge will appear on your profile. Verified mentors see a{" "}
                            <span className="font-bold text-primary">45% higher</span> conversion rate from mentees.
                        </p>
                        {/* Profile Preview placeholder */}
                        <div className="flex h-32 w-full items-center justify-center rounded-lg bg-slate-200">
                            <span className="text-xs font-medium uppercase tracking-widest text-slate-400">
                                Profile Preview
                            </span>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* ── Footer Navigation ── */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15, duration: 0.3 }}
                className="max-w-2xl flex items-center justify-between border-t border-slate-200 pt-8"
            >
                <button
                    type="button"
                    onClick={() => router.back()}
                    className="flex items-center gap-2 rounded-xl px-6 py-3 font-bold text-slate-600 transition-all hover:bg-slate-100"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back
                </button>
                <button
                    type="button"
                    onClick={() => router.push("/onboarding/profile/review")}
                    className="flex items-center gap-2 rounded-xl bg-primary px-10 py-3 font-bold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary/90"
                >
                    Continue to Final Step
                    <ArrowRight className="h-4 w-4" />
                </button>
            </motion.div>

            {/* ── Footer Note ── */}
            <p className="max-w-2xl text-center text-sm text-slate-500">
                Your documents are processed securely and encrypted. We never share your private ID documents with anyone.
            </p>
        </div>
    );
}
