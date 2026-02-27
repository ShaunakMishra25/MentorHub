import dotenv from 'dotenv';
import mongoose from 'mongoose';
import User from '../models/user.js';

dotenv.config();

async function checkVerificationStatus() {
  try {
    console.log('🔍 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB\n');

    const mentors = await User.find({ role: 'mentor' })
      .select('name email mentorProfile.verification.isVerified')
      .lean();

    console.log('📊 Total mentors in database:', mentors.length);
    console.log('');

    const verified = mentors.filter(m => m.mentorProfile?.verification?.isVerified === true);
    const unverified = mentors.filter(m => m.mentorProfile?.verification?.isVerified !== true);

    console.log(`✅ Verified mentors (isVerified: true): ${verified.length}`);
    console.log(`❌ Unverified mentors (NOT verified): ${unverified.length}`);
    console.log('');

    if (verified.length > 0) {
      console.log('✅ VERIFIED MENTORS:');
      verified.forEach((m, i) => {
        console.log(`  ${i + 1}. ${m.name} (${m.email})`);
      });
      console.log('');
    }

    if (unverified.length > 0) {
      console.log('❌ UNVERIFIED MENTORS:');
      unverified.forEach((m, i) => {
        const status = m.mentorProfile?.verification?.isVerified;
        console.log(`  ${i + 1}. ${m.name} (${m.email}) - isVerified: ${status}`);
      });
      console.log('');
    }

    console.log('💡 Summary:');
    console.log(`   - API will show ${verified.length} mentors (only verified)`);
    console.log(`   - ${unverified.length} mentors will be hidden (not verified)`);

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

checkVerificationStatus();
