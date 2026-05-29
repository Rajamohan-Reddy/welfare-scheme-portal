import mongoose from "mongoose";
 
const applicationFormDataSchema = new mongoose.Schema(
  {
    applicationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Application",
      required: true,
      unique: true,
    },
 
    formData: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);
 
export const ApplicationFormData = mongoose.model(
  "ApplicationFormData",
  applicationFormDataSchema
);