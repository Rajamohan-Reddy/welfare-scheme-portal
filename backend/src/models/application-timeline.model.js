import mongoose from "mongoose";
 
const applicationTimelineSchema = new mongoose.Schema(
  {
    applicationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Application",
      required: true,
    },
 
    oldStatus: {
      type: String,
      default: null,
    },
 
    newStatus: {
      type: String,
      required: true,
    },
 
    remarks: {
      type: String,
      default: "",
    },
 
    changedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
 
    changedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);
 
export const ApplicationTimeline = mongoose.model(
  "ApplicationTimeline",
  applicationTimelineSchema
);