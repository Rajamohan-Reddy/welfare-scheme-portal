import mongoose from "mongoose";

const verificationHistorySchema = new mongoose.Schema(
  {
    applicationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Application",
      required: true,
    },

    action: {
      type: String,
      required: true,
    },

    remarks: {
      type: String,
      default: null,
    },

    previousStatus: {
      type: String,
      default: null,
    },

    currentStatus: {
      type: String,
      required: true,
    },

    performedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

verificationHistorySchema.index({
  applicationId: 1,
});

verificationHistorySchema.index({
  performedBy: 1,
});

export const VerificationHistory = mongoose.model(
  "VerificationHistory",
  verificationHistorySchema,
);
