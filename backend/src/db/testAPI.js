import http from "http";

// Test the getMentors API endpoint
const testMentorsAPI = () => {
  const options = {
    hostname: 'localhost',
    port: 5000,
    path: '/api/mentor/mentors',
    method: 'GET'
  };

  const req = http.request(options, (res) => {
    let data = '';

    res.on('data', (chunk) => {
      data += chunk;
    });

    res.on('end', () => {
      try {
        const response = JSON.parse(data);
        console.log("✅ API Response:");
        console.log(`   Total Mentors: ${response.totalMentors}`);
        console.log(`   Mentors Returned: ${response.mentors?.length || 0}`);
        if (response.mentors?.length > 0) {
          console.log("\n📋 First 3 mentors:");
          response.mentors.slice(0, 3).forEach((m, idx) => {
            console.log(`   ${idx + 1}. ${m.name}`);
          });
        }
      } catch (error) {
        console.error("❌ Failed to parse response:", error);
      }
    });
  });

  req.on('error', (error) => {
    console.error("❌ API request failed:", error.message);
    console.log("\n💡 Make sure backend is running:");
    console.log("   cd backend && node server.js");
  });

  req.end();
};

// Wait a moment then test
setTimeout(testMentorsAPI, 100);
