import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/user.js";

dotenv.config();

/**
 * Script to verify/unverify specific mentors
 * 
 * Usage:
 *   node src/db/verifyMentor.js <email> verify
 *   node src/db/verifyMentor.js <email> unverify
 *   node src/db/verifyMentor.js all verify     # Verify ALL mentors
 */

const verifyMentor = async () => {
  try {
    const email = process.argv[2];
    const action = process.argv[3];

    if (!email || !action) {
      console.log("❌ Usage:");
      console.log("   node src/db/verifyMentor.js <email> verify");
      console.log("   node src/db/verifyMentor.js <email> unverify");
      console.log("   node src/db/verifyMentor.js all verify");
      process.exit(1);
    }

    if (!["verify", "unverify"].includes(action)) {
      console.log("❌ Action must be 'verify' or 'unverify'");
      process.exit(1);
    }

    console.log("🔍 Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB\n");

    const isVerified = action === "verify";

    if (email === "all") {
      // Verify/unverify all mentors
      const result = await User.updateMany(
        { role: "mentor" },
        {
          $set: {
            "mentorProfile.verification.isVerified": isVerified,
            "mentorProfile.verification.verifiedAt": isVerified ? new Date() : null,
            "mentorProfile.verification.verifiedBy": isVerified ? "admin_bulk_action" : null
          }
        }
      );

      console.log(`✅ ${action === "verify" ? "Verified" : "Unverified"} ${result.modifiedCount} mentors`);
    } else {
      // Verify/unverify specific mentor
      const mentor = await User.findOne({ email, role: "mentor" });

      if (!mentor) {
        console.log(`❌ Mentor not found with email: ${email}`);
        await mongoose.disconnect();
        process.exit(1);
      }

      // Ensure mentorProfile and verification object exists
      if (!mentor.mentorProfile) {
        mentor.mentorProfile = {};
      }
      if (!mentor.mentorProfile.verification) {
        mentor.mentorProfile.verification = {
          idType: null,
          idNumber: null,
          isVerified: false,
          verifiedAt: null,
          verifiedBy: null
        };
      }

      mentor.mentorProfile.verification.isVerified = isVerified;
      mentor.mentorProfile.verification.verifiedAt = isVerified ? new Date() : null;
      mentor.mentorProfile.verification.verifiedBy = isVerified ? "admin_manual" : null;

      await mentor.save();

      console.log(`✅ Mentor ${action === "verify" ? "verified" : "unverified"} successfully!`);
      console.log(`   Name: ${mentor.name}`);
      console.log(`   Email: ${mentor.email}`);
      console.log(`   Status: ${mentor.mentorProfile.verification.isVerified ? "✅ VERIFIED" : "⏳ UNVERIFIED"}`);
    }

    await mongoose.disconnect();
    console.log("\n✅ Operation completed!");
    process.exit(0);

  } catch (error) {
    console.error("❌ Operation failed:", error);
    await mongoose.disconnect();
    process.exit(1);
  }
};

verifyMentor();
