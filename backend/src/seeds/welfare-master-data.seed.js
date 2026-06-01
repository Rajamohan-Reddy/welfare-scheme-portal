import mongoose from "mongoose";
import dotenv from "dotenv";

import { SchemeCategory } from "../models/scheme-category.model.js";
import { Scheme } from "../models/scheme.model.js";
import { User } from "../models/user.model.js";

import { SCHEME_CATEGORIES } from "./scheme-categories.seed.js";
import { SCHEMES_MASTER } from "./schemes.seed.js";
import { createOfficerSeedData } from "./officers.seed.js";

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("MongoDB Connected");

    const admin = await User.findOne({
      role: "ADMIN",
    });

    if (!admin) {
      throw new Error("Admin user not found. Create admin first.");
    }

    console.log("Clearing old data...");

    await Scheme.deleteMany({});

    await SchemeCategory.deleteMany({});

    await User.deleteMany({
      role: "OFFICER",
    });

    console.log("Creating categories...");

    const categories = await SchemeCategory.insertMany(SCHEME_CATEGORIES);

    const categoryMap = {};

    categories.forEach((category) => {
      categoryMap[category.categoryCode] = category._id;
    });

    console.log("Creating schemes...");

    const schemes = SCHEMES_MASTER.map((scheme) => ({
      schemeCode: scheme.schemeCode,

      schemeName: scheme.schemeName,

      categoryId: categoryMap[scheme.categoryCode],

      description: scheme.description,

      department: scheme.department,

      benefitType: scheme.benefitType,

      benefitAmount: scheme.benefitAmount,

      media: {
        bannerImage: scheme.bannerImage,

        thumbnailImage: scheme.thumbnailImage,

        galleryImages: [],

        guidelinesDocument: scheme.guidelinesDocument || null,

        governmentOrderDocument: scheme.governmentOrderDocument || null,
      },

      eligibility: scheme.eligibility || {},

      requiredDocuments: scheme.requiredDocuments || [],

      applicationFields: scheme.applicationFields || [],

      startDate: new Date("2025-01-01"),

      endDate: new Date("2030-12-31"),

      isActive: true,

      createdBy: admin._id,
    }));

    await Scheme.insertMany(schemes);

    console.log("Creating officers...");

    const officers = await createOfficerSeedData();

    await User.insertMany(officers);

    console.log("");
    console.log("==================================");
    console.log("WELFARE MASTER DATA SEEDED");
    console.log("==================================");
    console.log(`Categories : ${categories.length}`);
    console.log(`Schemes    : ${schemes.length}`);
    console.log(`Officers   : ${officers.length}`);
    console.log("==================================");

    process.exit(0);
  } catch (error) {
    console.error(error);

    process.exit(1);
  }
};

seedData();
