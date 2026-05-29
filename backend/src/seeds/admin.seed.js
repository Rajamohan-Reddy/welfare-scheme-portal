import bcrypt from "bcryptjs";
import { User } from "../models/user.model.js";
import { env } from "../config/env.config.js";

export const seedAdmin = async () => {
  try {
    const existingAdmin = await User.findOne({
      role: "ADMIN",
    });

    if (existingAdmin) {
      console.log("Admin already exists");
      return;
    }

    const hashedPassword = await bcrypt.hash(env.adminPassword, 10);

    await User.create({
      firstName: "System",
      lastName: "Administrator",

      email: env.adminEmail,

      password: hashedPassword,

      phoneNumber: "9999999999",

      role: "ADMIN",

      isActive: true,

      isProfileCompleted: true,
    });

    console.log("Default admin created successfully");
  } catch (error) {
    console.error("Admin seed failed:", error.message);
  }
};
