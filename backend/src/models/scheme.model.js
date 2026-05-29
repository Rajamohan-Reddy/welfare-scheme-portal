import mongoose from "mongoose";
 
const schemeSchema = new mongoose.Schema(
  {
    schemeCode: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },
 
    schemeName: {
      type: String,
      required: true,
      trim: true,
    },
 
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SchemeCategory",
      required: true,
    },
 
    description: {
      type: String,
      required: true,
    },
 
    eligibilityCriteria: {
      type: String,
      required: true,
    },
 
    requiredDocuments: {
      type: [String],
      default: [],
    },
 
    applicationFields: {
      type: [String],
      default: [],
    },
 
    startDate: {
      type: Date,
      required: true,
    },
 
    endDate: {
      type: Date,
      required: true,
    },
 
    isActive: {
      type: Boolean,
      default: true,
    },
 
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
 
export const Scheme = mongoose.model("Scheme", schemeSchema);