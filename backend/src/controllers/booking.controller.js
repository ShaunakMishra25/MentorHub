import mongoose from "mongoose";
import Booking from "../models/Booking.js";
import User from "../models/user.js";

export const createBooking = async (req, res) => {
  const session = await mongoose.startSession();

  try {
    await session.withTransaction(async () => {

      const clerkUserId = req.auth.userId;

      if (!clerkUserId) {
        throw new Error("Unauthorized");
      }
      const student = await User.findOne({
        clerkId: clerkUserId
      }).session(session);

      if (!student) {
        throw new Error("User not found");
      }

      if (student.role !== "student") {
        throw new Error("Only students can book sessions");
      }

      const { mentorId, date, startTime } = req.body;

      if (!mentorId || !date || !startTime) {
        throw new Error("mentorId, date, startTime required");
      }

      const sessionDate = new Date(date);

      const mentor = await User.findOne({
        _id: mentorId,
        role: "mentor"
      }).session(session);

      if (!mentor) {
        throw new Error("Mentor not found");
      }

      const upcomingSession = mentor.mentorProfile.upcomingSessions.find(
        (s) =>
          new Date(s.date).toISOString().split("T")[0] ===
            sessionDate.toISOString().split("T")[0] &&
          s.startTime === startTime
      );

      if (!upcomingSession) {
        throw new Error("Session not available");
      }

      if (upcomingSession.isBooked) {
        throw new Error("Session already booked");
      }

      const booking = await Booking.create(
        [{
          mentor: mentor._id,
          student: student._id,
          sessionDate: upcomingSession.date,
          startTime: upcomingSession.startTime,
          endTime: upcomingSession.endTime,
          sessionDuration: upcomingSession.sessionDuration,
          price: mentor.mentorProfile.pricing?.pricePerSession || 0
        }],
        { session }
      );

      const updateResult = await User.updateOne(
        {
          _id: mentor._id,
          "mentorProfile.upcomingSessions.date": upcomingSession.date,
          "mentorProfile.upcomingSessions.startTime": startTime,
          "mentorProfile.upcomingSessions.isBooked": false
        },
        {
          $set: {
            "mentorProfile.upcomingSessions.$.isBooked": true,
            "mentorProfile.upcomingSessions.$.bookedBy": student._id
          }
        },
        { session }
      );

      if (updateResult.modifiedCount === 0) {
        throw new Error("Slot already booked");
      }

      res.status(201).json({
        success: true,
        msg: "Booking successful",
        booking: booking[0]
      });

    });

  } catch (error) {

    console.error("Booking Error:", error.message);

    if (
      error.message === "mentorId, date, startTime required" ||
      error.message === "Session not available" ||
      error.message === "Session already booked" ||
      error.message === "Slot already booked"
    ) {
      return res.status(400).json({
        success: false,
        msg: error.message
      });
    }

    if (
      error.message === "Mentor not found" ||
      error.message === "User not found"
    ) {
      return res.status(404).json({
        success: false,
        msg: error.message
      });
    }

    if (
      error.message === "Unauthorized" ||
      error.message === "Only students can book sessions"
    ) {
      return res.status(401).json({
        success: false,
        msg: error.message
      });
    }

    return res.status(500).json({
      success: false,
      msg: "Server error"
    });

  } finally {
    session.endSession();
  }
};