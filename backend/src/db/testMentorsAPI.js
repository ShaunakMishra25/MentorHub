import dotenv from 'dotenv';
import User from '../models/user.js';
import connectDB from '../config/db.js';

dotenv.config();

async function testMentorsAPI() {
  try {
    console.log('🔍 Connecting to MongoDB...');
    await connectDB();
    console.log('✅ Connected to MongoDB\n');

    console.log('🔬 Testing getMentors query...');
    
    const filter = {
      role: "mentor",
      "mentorProfile.verification.isVerified": true
    };

    console.log('Filter:', JSON.stringify(filter, null, 2));

    const mentors = await User.find(filter)
      .select("name username imageUrl mentorProfile")
      .limit(5)
      .lean();

    console.log(`\n✅ Query successful! Found ${mentors.length} mentors\n`);

    if (mentors.length > 0) {
      console.log('📋 Sample mentor:');
      console.log(JSON.stringify(mentors[0], null, 2));
      
      // Test sanitization
      const sanitizedMentors = mentors.map(mentor => {
        if (mentor.mentorProfile?.verification?.idNumber) {
          delete mentor.mentorProfile.verification.idNumber;
        }
        return mentor;
      });
      
      console.log('\n✅ Sanitization successful');
      console.log('Has idNumber in sanitized:', sanitizedMentors[0].mentorProfile?.verification?.hasOwnProperty('idNumber'));
    } else {
      console.log('⚠️  No mentors found with the filter');
    }

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    console.error('Stack:', error.stack);
    process.exit(1);
  }
}

testMentorsAPI();
