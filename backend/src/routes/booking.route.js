import express from "express";
import { requireAuth } from "@clerk/express";
import { createBooking, getBookingById } from "../controllers/booking.controller.js";

const router = express.Router();

router.post("/", requireAuth(), createBooking);
router.get("/:bookingId", requireAuth(), getBookingById);

export default router;