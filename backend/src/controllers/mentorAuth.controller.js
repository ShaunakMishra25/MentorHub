import bcrypt from "bcryptjs";
import Mentor from "../models/mentor.js";
import generateToken from "../utils/generateToken.js";

export const mentorSignup = async (req, res) => {
  try {
    // Check if it's the detailed onboarding 
    if (req.body.basicInfo) {
      const { basicInfo, expertise, pricing, bio } = req.body;

      const mentorData = {
        name: basicInfo.firstName && basicInfo.lastName
          ? `${basicInfo.firstName} ${basicInfo.lastName}`
          : "Unknown",
        email: basicInfo.email,
        expertise: expertise?.subjects?.join(", ") || "",
        bio: bio || "",
        chargePerHour: pricing?.pricePerSession || 0,
        freeSlots: []
      };

      const mentor = await Mentor.create(mentorData);
      return res.json({ token: generateToken(mentor._id, "mentor") });
    }

    // Old Signup (requires password)
    const { name, email, password } = req.body;
    if (!password) {
      return res.status(400).json({ msg: "Password is required for email signup" });
    }
    const hash = await bcrypt.hash(password, 10);
    const mentor = await Mentor.create({ name, email, password: hash });
    res.json({ token: generateToken(mentor._id, "mentor") });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ msg: error.message });
  }
};

export const mentorLogin = async (req, res) => {
  const { email, password } = req.body;
  const mentor = await Mentor.findOne({ email });
  if (!mentor || !(await bcrypt.compare(password, mentor.password)))
    return res.status(401).json({ msg: "Invalid credentials" });

  res.json({ token: generateToken(mentor._id, "mentor") });
};
