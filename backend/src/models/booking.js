import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  mentorId: { type: mongoose.Schema.Types.ObjectId, ref: "Mentor", required: true, index: true },
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
  date: { type: String, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  price: { type: Number, required: true },
  status: {
    type: String,
    enum: ["pending", "paid", "cancelled", "completed"],
    default: "pending",
    index: true
  },
  payment: {
    razorpay_order_id: String,
    razorpay_payment_id: String,
  }
}, { timestamps: true });

//new indexes
bookingSchema.index({ mentorId: 1, date: 1, startTime: 1 }, { unique: true });

export default mongoose.model("Booking", bookingSchema);
