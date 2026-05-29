import mongoose from "mongoose";
 
const applicationDocumentSchema = new mongoose.Schema(
  {
    applicationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Application",
      required: true,
    },
 
    documentType: {
      type: String,
      required: true,
    },
 
    fileName: {
      type: String,
      required: true,
    },
 
    filePath: {
      type: String,
      required: true,
    },
 
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
 
    uploadedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);
 
export const ApplicationDocument = mongoose.model(
  "ApplicationDocument",
  applicationDocumentSchema
);