import express from "express";
import { createBooking,upcomingSessions } from "../controllers/booking.controller.js";
import protect from "../middleware/auth.js";

const router = express.Router();

router.post("/",  protect, createBooking);


export default router;