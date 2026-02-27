import dotenv from "dotenv";
import connectDB from "./src/config/db.js";
import app from "./src/app.js";

// Only load dotenv in local development. In production (Azure), env vars are
// injected by the platform. Calling dotenv.config() with no .env file in
// dotenv v17+ reports "0 vars injected" and can wipe existing process.env values.
if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

const startServer = async () => {
  try {
    await connectDB();
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, "0.0.0.0", () =>
      console.log(`Server running on port ${PORT}`)
    );
  } catch (error) {
    console.error("Failed to connect to the database", error);
    process.exit(1);
  }
};

startServer();
