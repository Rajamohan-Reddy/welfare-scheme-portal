import mongoose from "mongoose";
 
const applicationSchema = new mongoose.Schema(
  {
    applicationNumber: {
      type: String,
      required: true,
      unique: true,
    },
 
    applicantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
 
    schemeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Scheme",
      required: true,
    },
 
    assignedOfficerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
 
    status: {
      type: String,
      enum: [
        "DRAFT",
        "SUBMITTED",
        "UNDER_VERIFICATION",
        "CORRECTION_REQUIRED",
        "VERIFIED",
        "APPROVED",
        "REJECTED",
      ],
      default: "DRAFT",
    },
 
    currentStep: {
      type: String,
      default: "APPLICATION_SUBMITTED",
    },
 
    submittedAt: Date,
 
    verifiedAt: Date,
 
    approvedAt: Date,
 
    rejectedAt: Date,
 
    applicationYear: Number,
 
    applicationMonth: Number,
  },
  {
    timestamps: true,
  }
);
 
export const Application = mongoose.model(
  "Application",
  applicationSchema
);