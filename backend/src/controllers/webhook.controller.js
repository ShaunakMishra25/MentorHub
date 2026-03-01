import User from "../models/user.js";
import { Webhook } from "svix";

export const handleClerkWebhook = async (req, res) => {
  try {
    const payload = req.body;
    const headers = req.headers;

    const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    const event = wh.verify(payload, headers);

    const { type, data } = event;

    const clerkId = data.id;

    if (type === "user.created") {
      try {
        const email = data.email_addresses && data.email_addresses.length > 0
          ? data.email_addresses[0].email_address
          : "";
        const name = `${data.first_name || ""} ${data.last_name || ""}`.trim();
        const imageUrl = data.image_url;

        const newUser = new User({
          clerkId,
          email,
          name,
          username: data.username || undefined,
          imageUrl,
          role: data.public_metadata?.role || "student", // Default to student unless specified
        });
        await newUser.save();
        console.log(`User created successfully with clerkId: ${clerkId}`);
      } catch (err) {
        console.error("Error creating user from webhook:", err);
        return res.status(500).json({ error: "Failed to create user in database" });
      }
    }

    if (type === "user.updated") {
      const role = data.public_metadata?.role;

      if (role === "mentor") {
        const user = await User.findOne({ clerkId });

        if (!user) {
          return res.status(404).json({ error: "User not found" });
        }

        if (user.role === "mentor") {
          return res.status(200).json({ message: "Already mentor" });
        }
        user.role = "mentor";
        await user.save();
      }
    }

    res.status(200).json({ received: true });
  } catch (err) {
    console.error("Clerk webhook error:", err);
    res.status(400).send("Webhook verification failed");
  }
};
