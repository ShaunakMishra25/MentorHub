import express from "express";
import { protect } from "../middleware/auth.js";
import {
    getMentors,
    getMentorProfile,
    getOwnProfile,
    updateMentorProfile,
    searchMentors,
    upcomingSessions,
    getSessionHistory,
    saveAvailability
} from "../controllers/mentor.controller.js";

const router = express.Router();

// ──────────────────────────────────────────────────────────────────────────────
// Static / auth-protected routes MUST come before /:mentorId (wildcard param)
// otherwise Express will match /upcoming and /history as /:mentorId = "upcoming"
// ──────────────────────────────────────────────────────────────────────────────
router.get("/mentors", getMentors);
router.get("/search", searchMentors);
router.get("/profile", protect, getOwnProfile);
router.get("/upcoming", protect, upcomingSessions);
router.get("/history", protect, getSessionHistory);
router.put("/profile", protect, updateMentorProfile);
router.put("/availability", protect, saveAvailability);

// Wildcard param route — must be last
router.get("/:mentorId", getMentorProfile);

export default router;
