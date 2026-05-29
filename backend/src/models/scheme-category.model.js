import mongoose from "mongoose";
 
const schemeCategorySchema = new mongoose.Schema(
  {
    categoryCode: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true,
    },
 
    categoryName: {
      type: String,
      required: true,
      trim: true,
    },
 
    description: {
      type: String,
      trim: true,
    },
 
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);
 
export const SchemeCategory = mongoose.model(
  "SchemeCategory",
  schemeCategorySchema
);