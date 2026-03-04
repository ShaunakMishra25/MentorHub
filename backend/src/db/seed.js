import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/user.js";

dotenv.config();

// Mock mentor data matching User schema - 15 Indian mentors with Unsplash images
const mentorsData = [
    {
        clerkId: "mock_clerk_rajesh_001",
        email: "rajesh.sharma@mentorhub.com",
        firstName: "Rajesh",
        lastName: "Sharma",
        username: "dr.rajesh.sharma",
        imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
        role: "mentor",
        name: "Dr. Rajesh Sharma",
        mentorProfile: {
            basicInfo: {
                gender: "male",
                currentOrganisation: "Allen Career Institute",
                industry: "Education",
                currentRole: "Senior Physics Faculty",
                workExperience: 12,
                profilePhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
            },
            professionalInfo: {
                highestQualification: "Ph.D. Physics",
                college: "IIT Delhi",
                branch: "Physics",
                passingYear: 2012
            },
            expertise: {
                subjects: ["Physics", "Mathematics"],
                specializations: "IIT JEE Advanced Physics, Mechanics & Electrodynamics"
            },
            availability: {
                days: ["Monday", "Wednesday", "Friday", "Saturday"],
                timeSlots: ["09:00-10:00", "15:00-16:00", "18:00-19:00"]
            },
            pricing: {
                pricePerSession: 800,
                sessionDuration: 60,
                isFreeTrialEnabled: true
            }
        }
    },
    {
        clerkId: "mock_clerk_priya_002",
        email: "priya.patel@mentorhub.com",
        firstName: "Priya",
        lastName: "Patel",
        username: "priya.patel",
        imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face",
        role: "mentor",
        name: "Priya Patel",
        mentorProfile: {
            basicInfo: {
                gender: "female",
                currentOrganisation: "Aakash Educational Services",
                industry: "Education",
                currentRole: "Biology HOD",
                workExperience: 8,
                profilePhoto: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face"
            },
            professionalInfo: {
                highestQualification: "MBBS",
                college: "AIIMS Delhi",
                branch: "Medicine",
                passingYear: 2016
            },
            expertise: {
                subjects: ["Biology", "Chemistry"],
                specializations: "NEET Biology, Organic Chemistry, Human Physiology"
            },
            availability: {
                days: ["Tuesday", "Thursday", "Saturday"],
                timeSlots: ["10:00-11:00", "14:00-15:00", "17:00-18:00"]
            },
            pricing: {
                pricePerSession: 700,
                sessionDuration: 60,
                isFreeTrialEnabled: true
            }
        }
    },
    {
        clerkId: "mock_clerk_vikram_003",
        email: "vikram.reddy@mentorhub.com",
        firstName: "Vikram",
        lastName: "Reddy",
        username: "vikram.reddy",
        imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
        role: "mentor",
        name: "Vikram Reddy",
        mentorProfile: {
            basicInfo: {
                gender: "male",
                currentOrganisation: "IMS Learning Resources",
                industry: "Education",
                currentRole: "CAT Faculty & Mentor",
                workExperience: 6,
                profilePhoto: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face"
            },
            professionalInfo: {
                highestQualification: "MBA",
                college: "IIM Ahmedabad",
                branch: "Finance",
                passingYear: 2018
            },
            expertise: {
                subjects: ["Quantitative Aptitude", "Logical Reasoning", "Data Interpretation"],
                specializations: "CAT Preparation, MBA Admissions Strategy"
            },
            availability: {
                days: ["Monday", "Wednesday", "Friday", "Sunday"],
                timeSlots: ["18:00-19:00", "19:00-20:00", "20:00-21:00"]
            },
            pricing: {
                pricePerSession: 900,
                sessionDuration: 60,
                isFreeTrialEnabled: true
            }
        }
    },
    {
        clerkId: "mock_clerk_ananya_004",
        email: "ananya.krishnan@mentorhub.com",
        firstName: "Ananya",
        lastName: "Krishnan",
        username: "ananya.krishnan",
        imageUrl: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=400&h=400&fit=crop&crop=face",
        role: "mentor",
        name: "Ananya Krishnan",
        mentorProfile: {
            basicInfo: {
                gender: "female",
                currentOrganisation: "BYJU'S IAS",
                industry: "Government",
                currentRole: "IAS Officer & Guest Faculty",
                workExperience: 5,
                profilePhoto: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=400&h=400&fit=crop&crop=face"
            },
            professionalInfo: {
                highestQualification: "MA Public Administration",
                college: "JNU Delhi",
                branch: "Public Administration",
                passingYear: 2017
            },
            expertise: {
                subjects: ["General Studies", "Essay Writing", "Ethics"],
                specializations: "UPSC CSE Strategy, Interview Preparation, Optional Guidance"
            },
            availability: {
                days: ["Saturday", "Sunday"],
                timeSlots: ["07:00-08:00", "08:00-09:00", "20:00-21:00"]
            },
            pricing: {
                pricePerSession: 1200,
                sessionDuration: 60,
                isFreeTrialEnabled: false
            }
        }
    },
    {
        clerkId: "mock_clerk_sanjay_005",
        email: "sanjay.gupta@mentorhub.com",
        firstName: "Sanjay",
        lastName: "Gupta",
        username: "sanjay.gupta",
        imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
        role: "mentor",
        name: "Sanjay Gupta",
        mentorProfile: {
            basicInfo: {
                gender: "male",
                currentOrganisation: "Google India",
                industry: "Technology",
                currentRole: "Senior Software Engineer",
                workExperience: 7,
                profilePhoto: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face"
            },
            professionalInfo: {
                highestQualification: "M.Tech Computer Science",
                college: "IIT Bombay",
                branch: "Computer Science",
                passingYear: 2017
            },
            expertise: {
                subjects: ["Data Structures", "Algorithms", "Operating Systems", "DBMS"],
                specializations: "GATE CS Preparation, Competitive Programming"
            },
            availability: {
                days: ["Tuesday", "Thursday", "Saturday", "Sunday"],
                timeSlots: ["20:00-21:00", "21:00-22:00"]
            },
            pricing: {
                pricePerSession: 650,
                sessionDuration: 60,
                isFreeTrialEnabled: true
            }
        }
    },
    {
        clerkId: "mock_clerk_neha_006",
        email: "neha.agarwal@mentorhub.com",
        firstName: "Neha",
        lastName: "Agarwal",
        username: "neha.agarwal",
        imageUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face",
        role: "mentor",
        name: "Neha Agarwal",
        mentorProfile: {
            basicInfo: {
                gender: "female",
                currentOrganisation: "FIITJEE",
                industry: "Education",
                currentRole: "Chemistry Faculty",
                workExperience: 9,
                profilePhoto: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face"
            },
            professionalInfo: {
                highestQualification: "M.Sc Chemistry",
                college: "IIT Bombay",
                branch: "Chemistry",
                passingYear: 2015
            },
            expertise: {
                subjects: ["Organic Chemistry", "Inorganic Chemistry", "Physical Chemistry"],
                specializations: "JEE Advanced Chemistry, Chemistry Olympiad"
            },
            availability: {
                days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                timeSlots: ["16:00-17:00", "17:00-18:00"]
            },
            pricing: {
                pricePerSession: 750,
                sessionDuration: 60,
                isFreeTrialEnabled: true
            }
        }
    },
    {
        clerkId: "mock_clerk_arjun_007",
        email: "arjun.verma@mentorhub.com",
        firstName: "Arjun",
        lastName: "Verma",
        username: "arjun.verma",
        imageUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=face",
        role: "mentor",
        name: "Arjun Verma",
        mentorProfile: {
            basicInfo: {
                gender: "male",
                currentOrganisation: "Resonance",
                industry: "Education",
                currentRole: "Physics Faculty",
                workExperience: 8,
                profilePhoto: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=face"
            },
            professionalInfo: {
                highestQualification: "M.Sc Physics",
                college: "AIIMS Delhi",
                branch: "Medical Physics",
                passingYear: 2016
            },
            expertise: {
                subjects: ["Physics", "Biophysics"],
                specializations: "NEET Physics, Medical Entrance Preparation"
            },
            availability: {
                days: ["Monday", "Wednesday", "Friday"],
                timeSlots: ["09:00-10:00", "10:00-11:00", "15:00-16:00"]
            },
            pricing: {
                pricePerSession: 680,
                sessionDuration: 60,
                isFreeTrialEnabled: true
            }
        }
    },
    {
        clerkId: "mock_clerk_kavitha_008",
        email: "kavitha.iyer@mentorhub.com",
        firstName: "Kavitha",
        lastName: "Iyer",
        username: "kavitha.iyer",
        imageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
        role: "mentor",
        name: "Kavitha Iyer",
        mentorProfile: {
            basicInfo: {
                gender: "female",
                currentOrganisation: "TIME Institute",
                industry: "Education",
                currentRole: "Verbal Ability Expert",
                workExperience: 10,
                profilePhoto: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face"
            },
            professionalInfo: {
                highestQualification: "MBA",
                college: "IIM Bangalore",
                branch: "Marketing",
                passingYear: 2014
            },
            expertise: {
                subjects: ["Verbal Ability", "Reading Comprehension", "English Grammar"],
                specializations: "CAT VARC, GRE Verbal, Communication Skills"
            },
            availability: {
                days: ["Tuesday", "Thursday", "Saturday"],
                timeSlots: ["11:00-12:00", "18:00-19:00", "19:00-20:00"]
            },
            pricing: {
                pricePerSession: 850,
                sessionDuration: 60,
                isFreeTrialEnabled: true
            }
        }
    },
    {
        clerkId: "mock_clerk_rohit_009",
        email: "rohit.malhotra@mentorhub.com",
        firstName: "Rohit",
        lastName: "Malhotra",
        username: "rohit.malhotra",
        imageUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&crop=face",
        role: "mentor",
        name: "Rohit Malhotra",
        mentorProfile: {
            basicInfo: {
                gender: "male",
                currentOrganisation: "Vajiram & Ravi",
                industry: "Government",
                currentRole: "IFS Officer & Guest Faculty",
                workExperience: 4,
                profilePhoto: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&crop=face"
            },
            professionalInfo: {
                highestQualification: "MA History",
                college: "Delhi University",
                branch: "History",
                passingYear: 2018
            },
            expertise: {
                subjects: ["History", "Polity", "International Relations"],
                specializations: "UPSC History Optional, Indian Polity, Current Affairs"
            },
            availability: {
                days: ["Saturday", "Sunday"],
                timeSlots: ["09:00-10:00", "10:00-11:00", "16:00-17:00"]
            },
            pricing: {
                pricePerSession: 1100,
                sessionDuration: 60,
                isFreeTrialEnabled: false
            }
        }
    },
    {
        clerkId: "mock_clerk_sneha_010",
        email: "sneha.bhattacharya@mentorhub.com",
        firstName: "Sneha",
        lastName: "Bhattacharya",
        username: "sneha.bhattacharya",
        imageUrl: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop&crop=face",
        role: "mentor",
        name: "Sneha Bhattacharya",
        mentorProfile: {
            basicInfo: {
                gender: "female",
                currentOrganisation: "ISRO",
                industry: "Aerospace",
                currentRole: "Scientist/Engineer",
                workExperience: 5,
                profilePhoto: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop&crop=face"
            },
            professionalInfo: {
                highestQualification: "M.Tech Electronics",
                college: "IIT Kharagpur",
                branch: "Electronics & Communication",
                passingYear: 2019
            },
            expertise: {
                subjects: ["Electronics", "Signals & Systems", "Digital Electronics"],
                specializations: "GATE ECE Preparation, PSU Interview Guidance"
            },
            availability: {
                days: ["Monday", "Wednesday", "Saturday"],
                timeSlots: ["19:00-20:00", "20:00-21:00"]
            },
            pricing: {
                pricePerSession: 600,
                sessionDuration: 60,
                isFreeTrialEnabled: true
            }
        }
    },
    {
        clerkId: "mock_clerk_amit_011",
        email: "amit.singh@mentorhub.com",
        firstName: "Amit",
        lastName: "Singh",
        username: "amit.kumar.singh",
        imageUrl: "https://images.unsplash.com/photo-1531891437562-4301cf35b7e4?w=400&h=400&fit=crop&crop=face",
        role: "mentor",
        name: "Amit Kumar Singh",
        mentorProfile: {
            basicInfo: {
                gender: "male",
                currentOrganisation: "Vedantu",
                industry: "EdTech",
                currentRole: "Master Teacher - Mathematics",
                workExperience: 11,
                profilePhoto: "https://images.unsplash.com/photo-1531891437562-4301cf35b7e4?w=400&h=400&fit=crop&crop=face"
            },
            professionalInfo: {
                highestQualification: "M.Sc Mathematics",
                college: "IIT Kanpur",
                branch: "Mathematics",
                passingYear: 2013
            },
            expertise: {
                subjects: ["Mathematics", "Calculus", "Algebra", "Coordinate Geometry"],
                specializations: "JEE Advanced Mathematics, Math Olympiad Training"
            },
            availability: {
                days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                timeSlots: ["16:00-17:00", "17:00-18:00", "18:00-19:00"]
            },
            pricing: {
                pricePerSession: 950,
                sessionDuration: 60,
                isFreeTrialEnabled: true
            }
        }
    },
    {
        clerkId: "mock_clerk_pooja_012",
        email: "pooja.deshmukh@mentorhub.com",
        firstName: "Pooja",
        lastName: "Deshmukh",
        username: "pooja.deshmukh",
        imageUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face",
        role: "mentor",
        name: "Pooja Deshmukh",
        mentorProfile: {
            basicInfo: {
                gender: "female",
                currentOrganisation: "JIPMER",
                industry: "Healthcare",
                currentRole: "Resident Doctor & Faculty",
                workExperience: 4,
                profilePhoto: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face"
            },
            professionalInfo: {
                highestQualification: "MBBS",
                college: "JIPMER Puducherry",
                branch: "Medicine",
                passingYear: 2020
            },
            expertise: {
                subjects: ["Zoology", "Human Anatomy", "Physiology"],
                specializations: "NEET Zoology, Medical Entrance Biology"
            },
            availability: {
                days: ["Tuesday", "Thursday", "Sunday"],
                timeSlots: ["07:00-08:00", "21:00-22:00"]
            },
            pricing: {
                pricePerSession: 620,
                sessionDuration: 60,
                isFreeTrialEnabled: true
            }
        }
    },
    {
        clerkId: "mock_clerk_karthik_013",
        email: "karthik.nair@mentorhub.com",
        firstName: "Karthik",
        lastName: "Nair",
        username: "karthik.nair",
        imageUrl: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=400&h=400&fit=crop&crop=face",
        role: "mentor",
        name: "Karthik Nair",
        mentorProfile: {
            basicInfo: {
                gender: "male",
                currentOrganisation: "ETS India",
                industry: "Education",
                currentRole: "GRE/GMAT Trainer",
                workExperience: 6,
                profilePhoto: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=400&h=400&fit=crop&crop=face"
            },
            professionalInfo: {
                highestQualification: "MBA",
                college: "Stanford University",
                branch: "Business Administration",
                passingYear: 2018
            },
            expertise: {
                subjects: ["GRE Preparation", "GMAT Preparation", "Quantitative Reasoning"],
                specializations: "Study Abroad Guidance, MBA Admissions, SOP Review"
            },
            availability: {
                days: ["Monday", "Wednesday", "Friday", "Saturday"],
                timeSlots: ["10:00-11:00", "19:00-20:00", "20:00-21:00"]
            },
            pricing: {
                pricePerSession: 1000,
                sessionDuration: 60,
                isFreeTrialEnabled: true
            }
        }
    },
    {
        clerkId: "mock_clerk_divya_014",
        email: "divya.menon@mentorhub.com",
        firstName: "Divya",
        lastName: "Menon",
        username: "divya.menon",
        imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face",
        role: "mentor",
        name: "Divya Menon",
        mentorProfile: {
            basicInfo: {
                gender: "female",
                currentOrganisation: "Supreme Court of India",
                industry: "Legal",
                currentRole: "Advocate & Legal Educator",
                workExperience: 7,
                profilePhoto: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face"
            },
            professionalInfo: {
                highestQualification: "LLM",
                college: "NLU Delhi",
                branch: "Law",
                passingYear: 2017
            },
            expertise: {
                subjects: ["Legal Aptitude", "Constitutional Law", "Legal Reasoning"],
                specializations: "CLAT Preparation, Law School Admissions, Moot Court Training"
            },
            availability: {
                days: ["Tuesday", "Thursday", "Saturday", "Sunday"],
                timeSlots: ["18:00-19:00", "19:00-20:00"]
            },
            pricing: {
                pricePerSession: 550,
                sessionDuration: 60,
                isFreeTrialEnabled: true
            }
        }
    },
    {
        clerkId: "mock_clerk_manish_015",
        email: "manish.tiwari@mentorhub.com",
        firstName: "Manish",
        lastName: "Tiwari",
        username: "manish.tiwari",
        imageUrl: "https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=400&h=400&fit=crop&crop=face",
        role: "mentor",
        name: "Manish Tiwari",
        mentorProfile: {
            basicInfo: {
                gender: "male",
                currentOrganisation: "Paramount Coaching Centre",
                industry: "Education",
                currentRole: "Bank PO Trainer",
                workExperience: 9,
                profilePhoto: "https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=400&h=400&fit=crop&crop=face"
            },
            professionalInfo: {
                highestQualification: "MBA Finance",
                college: "Symbiosis Pune",
                branch: "Finance",
                passingYear: 2015
            },
            expertise: {
                subjects: ["Quantitative Aptitude", "Reasoning", "Banking Awareness"],
                specializations: "Bank PO, SSC CGL, Railway Exams Preparation"
            },
            availability: {
                days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                timeSlots: ["08:00-09:00", "09:00-10:00", "19:00-20:00"]
            },
            pricing: {
                pricePerSession: 450,
                sessionDuration: 60,
                isFreeTrialEnabled: true
            }
        }
    }
];

async function seedDatabase() {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ Connected to MongoDB");

        // Clear existing mock mentors (only those with mock_clerk_ prefix)
        const deleteResult = await User.deleteMany({ clerkId: { $regex: /^mock_clerk_/ } });
        console.log(`🗑️  Cleared ${deleteResult.deletedCount} existing mock mentors`);

        // Insert seed data
        const result = await User.insertMany(mentorsData);
        console.log(`✅ Seeded ${result.length} mentors successfully`);

        // Display seeded mentors
        console.log("\n📋 Seeded Mentors:");
        console.log("─".repeat(80));
        result.forEach((mentor, index) => {
            console.log(`${index + 1}. ${mentor.name}`);
            console.log(`   📧 ${mentor.email}`);
            console.log(`   🏢 ${mentor.mentorProfile.basicInfo.currentOrganisation}`);
            console.log(`   📚 ${mentor.mentorProfile.expertise.subjects.join(", ")}`);
            console.log(`   💰 ₹${mentor.mentorProfile.pricing.pricePerSession}/session`);
            console.log("");
        });

        await mongoose.disconnect();
        console.log("✅ Database seeding complete!");
        process.exit(0);
    } catch (error) {
        console.error("❌ Seed error:", error);
        process.exit(1);
    }
}

// Run seed function
seedDatabase();
