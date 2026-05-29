import bcrypt from "bcryptjs";
import { User } from "../models/user.model.js";
import { env } from "../config/env.config.js";
import { connectDB } from "../config/db.config.js";
import { ROLES } from "../constants/roles.constants.js";

const seedAdmin = async () => {
  try {
    await connectDB();

    const existingAdmin = await User.findOne({
      role: ROLES.ADMIN,
    });

    if (existingAdmin) {
      console.log("Admin already exists");
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash(env.adminPassword, 10);

    await User.create({
      firstName: "System",
      lastName: "Administrator",

      email: env.adminEmail,

      password: hashedPassword,

      phoneNumber: "9999999999",

      role: ROLES.ADMIN,

      isActive: true,

      isProfileCompleted: true,
    });

    console.log("Default admin created successfully");

    process.exit(0);
  } catch (error) {
    console.error("Admin seed failed:", error.message);

    process.exit(1);
  }
};

seedAdmin();
