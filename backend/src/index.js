import app from "./app.js";
import { env } from "./config/env.config.js";
import { connectDB } from "./config/db.config.js";
import "./config/env.validation.js";

const startServer = async () => {
  try {
    await connectDB();

    app.listen(env.port, () => {
      console.log(`Server running successfully on port ${env.port}`);
    });
  } catch (error) {
    console.error("Server Startup Failed:", error.message);

    process.exit(1);
  }
};

startServer();
