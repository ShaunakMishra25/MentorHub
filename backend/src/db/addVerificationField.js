import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/user.js";

dotenv.config();

/**
 * Migration script to add verification field to ALL existing mentors
 * and optionally mark them as verified
 * 
 * Usage:
 *   node src/db/addVerificationField.js              # Add field, set all to unverified
 *   node src/db/addVerificationField.js --verify-all  # Add field, mark all as verified
 *   node src/db/addVerificationField.js --verify-some # Interactive verification
 */

const addVerificationField = async () => {
  try {
    console.log("🔍 Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB\n");

    const verifyAll = process.argv.includes("--verify-all");
    const verifySome = process.argv.includes("--verify-some");

    // Find all mentors without verification field
    const mentorsToMigrate = await User.find({
      role: "mentor",
      "mentorProfile.verification": { $exists: false }
    }).select("name email mentorProfile.basicInfo");

    console.log(`📊 Found ${mentorsToMigrate.length} mentors to migrate\n`);

    if (mentorsToMigrate.length === 0) {
      console.log("✨ All mentors already have verification field!");
      await mongoose.disconnect();
      process.exit(0);
    }

    let verifiedCount = 0;
    let unverifiedCount = 0;

    for (const mentor of mentorsToMigrate) {
      // Initialize mentorProfile if it doesn't exist
      if (!mentor.mentorProfile) {
        mentor.mentorProfile = {};
      }

      // Add verification field inside mentorProfile
      mentor.mentorProfile.verification = {
        idType: null,
        idNumber: null,
        isVerified: false,
        verifiedAt: null,
        verifiedBy: null
      };

      // Determine if should be verified
      if (verifyAll) {
        mentor.mentorProfile.verification.isVerified = true;
        mentor.mentorProfile.verification.verifiedAt = new Date();
        mentor.mentorProfile.verification.verifiedBy = "migration_script_auto";
        verifiedCount++;
      } else if (verifySome) {
        // Auto-verify mentors with complete profiles
        const hasProfileInfo = mentor.mentorProfile?.basicInfo?.currentOrganisation;
        if (hasProfileInfo) {
          mentor.mentorProfile.verification.isVerified = true;
          mentor.mentorProfile.verification.verifiedAt = new Date();
          mentor.mentorProfile.verification.verifiedBy = "migration_script_profile_complete";
          verifiedCount++;
        } else {
          unverifiedCount++;
        }
      } else {
        unverifiedCount++;
      }

      await mentor.save();
      const status = mentor.mentorProfile.verification.isVerified ? "✅ VERIFIED" : "⏳ UNVERIFIED";
      console.log(`  ${status} - ${mentor.name} (${mentor.email})`);
    }

    console.log("\n" + "=".repeat(60));
    console.log("📈 Migration Summary:");
    console.log("=".repeat(60));
    console.log(`  ✅ Verified mentors: ${verifiedCount}`);
    console.log(`  ⏳ Unverified mentors: ${unverifiedCount}`);
    console.log(`  📝 Total migrated: ${mentorsToMigrate.length}`);
    console.log("=".repeat(60));

    if (unverifiedCount > 0) {
      console.log("\n⚠️  IMPORTANT:");
      console.log(`   ${unverifiedCount} mentors are marked as UNVERIFIED`);
      console.log("   They will NOT appear on the /mentors listing page");
      console.log("\n💡 To verify mentors:");
      console.log("   1. Run: node src/db/verifyMentor.js <email>");
      console.log("   2. Or use MongoDB Compass to update manually");
      console.log("   3. Or re-run with: node src/db/addVerificationField.js --verify-all");
    }

    if (verifiedCount > 0) {
      console.log(`\n✅ ${verifiedCount} mentors are now VERIFIED and will appear on /mentors page`);
    }

    await mongoose.disconnect();
    console.log("\n✅ Migration completed successfully!");
    process.exit(0);

  } catch (error) {
    console.error("❌ Migration failed:", error);
    await mongoose.disconnect();
    process.exit(1);
  }
};

addVerificationField();
