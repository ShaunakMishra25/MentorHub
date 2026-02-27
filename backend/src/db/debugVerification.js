import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/user.js";

dotenv.config();

/**
 * Debug script to investigate verification filtering issue
 */

const debugVerification = async () => {
  try {
    console.log("🔍 Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB\n");

    // 1. Check total mentors
    const totalMentors = await User.countDocuments({ role: "mentor" });
    console.log(`📊 Total mentors in database: ${totalMentors}\n`);

    // 2. Check mentors with verification field
    const mentorsWithVerification = await User.countDocuments({
      role: "mentor",
      "mentorProfile.verification": { $exists: true }
    });
    console.log(`✓ Mentors with verification field: ${mentorsWithVerification}`);

    // 3. Check mentors without verification field
    const mentorsWithoutVerification = await User.countDocuments({
      role: "mentor",
      "mentorProfile.verification": { $exists: false }
    });
    console.log(`✗ Mentors without verification field: ${mentorsWithoutVerification}\n`);

    // 4. Check verified mentors (boolean true)
    const verifiedMentors = await User.countDocuments({
      role: "mentor",
      "mentorProfile.verification.isVerified": true
    });
    console.log(`✅ Verified mentors (isVerified: true): ${verifiedMentors}`);

    // 5. Check unverified mentors (boolean false)
    const unverifiedMentors = await User.countDocuments({
      role: "mentor",
      "mentorProfile.verification.isVerified": false
    });
    console.log(`⏳ Unverified mentors (isVerified: false): ${unverifiedMentors}`);

    // 6. Check if isVerified is stored as string
    const stringTrue = await User.countDocuments({
      role: "mentor",
      "mentorProfile.verification.isVerified": "true"
    });
    console.log(`⚠️  Mentors with isVerified: "true" (string): ${stringTrue}`);

    const stringFalse = await User.countDocuments({
      role: "mentor",
      "mentorProfile.verification.isVerified": "false"
    });
    console.log(`⚠️  Mentors with isVerified: "false" (string): ${stringFalse}\n`);

    // 7. Sample data inspection
    console.log("📋 Sample mentor data (first 3):");
    const sampleMentors = await User.find({ role: "mentor" })
      .select("name email mentorProfile.verification")
      .limit(3)
      .lean();

    sampleMentors.forEach((mentor, idx) => {
      console.log(`\n${idx + 1}. ${mentor.name} (${mentor.email})`);
      const verification = mentor.mentorProfile?.verification;
      console.log(`   verification exists: ${!!verification}`);
      if (verification) {
        console.log(`   isVerified: ${verification.isVerified} (type: ${typeof verification.isVerified})`);
        console.log(`   idType: ${verification.idType || "not set"}`);
        console.log(`   idNumber: ${verification.idNumber ? "***set***" : "not set"}`);
      }
    });

    // 8. Test the actual query used in getMentors controller
    console.log("\n\n🔬 Testing actual controller query:");
    const filter = {
      role: "mentor",
      "mentorProfile.verification.isVerified": true
    };
    const controllerResult = await User.find(filter)
      .select("name email mentorProfile.verification.isVerified")
      .limit(5)
      .lean();
    
    console.log(`Query result: ${controllerResult.length} mentors found`);
    controllerResult.forEach((m, idx) => {
      console.log(`  ${idx + 1}. ${m.name} - isVerified: ${m.mentorProfile?.verification?.isVerified}`);
    });

    // 9. Recommendations
    console.log("\n\n💡 Recommendations:");
    if (mentorsWithoutVerification > 0) {
      console.log(`⚠️  ${mentorsWithoutVerification} mentors don't have verification field - they need migration`);
    }
    if (stringTrue > 0 || stringFalse > 0) {
      console.log(`⚠️  Some mentors have isVerified stored as string - needs data type fix`);
    }
    if (verifiedMentors === 0) {
      console.log(`⚠️  No verified mentors found - all mentors need manual verification`);
    }
    if (verifiedMentors > 0) {
      console.log(`✅ ${verifiedMentors} verified mentors - these should appear on /mentors page`);
    }

    await mongoose.disconnect();
    console.log("\n✅ Debug complete!");
    process.exit(0);

  } catch (error) {
    console.error("❌ Debug failed:", error);
    await mongoose.disconnect();
    process.exit(1);
  }
};

debugVerification();
