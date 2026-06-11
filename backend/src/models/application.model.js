import mongoose from "mongoose";

import { APPLICATION_STATUS } from "../constants/application.constants.js";

const documentSchema = new mongoose.Schema(
  {
    documentType: {
      type: String,
      required: true,
    },

    fileUrl: {
      type: String,
      required: true,
    },

    uploadedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    _id: false,
  },
);

const applicationSchema = new mongoose.Schema(
  {
    applicationNumber: {
      type: String,
      required: true,
      unique: true,
    },

    citizenId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    schemeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Scheme",
      required: true,
    },

    status: {
      type: String,

      enum: Object.values(APPLICATION_STATUS),

      default: APPLICATION_STATUS.SUBMITTED,
    },

    applicantRemarks: {
      type: String,
      default: null,
    },

    officerRemarks: {
      type: String,
      default: null,
    },

    rejectionReason: {
      type: String,
      default: null,
    },

    documents: {
      type: [documentSchema],
      default: [],
    },

    dynamicFormData: {
      type: Map,
      of: String,
      default: {},
    },

    submittedAt: {
      type: Date,
      default: Date.now,
    },

    approvedAt: {
      type: Date,
      default: null,
    },

    rejectedAt: {
      type: Date,
      default: null,
    },

    verifiedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

// applicationSchema.index(
//   {
//     applicationNumber: 1,
//   },
//   {
//     unique: true,
//   },
// );

applicationSchema.index({
  citizenId: 1,
});

applicationSchema.index({
  schemeId: 1,
});

applicationSchema.index({
  status: 1,
});

applicationSchema.index({
  submittedAt: -1,
});
export const Application = mongoose.model("Application", applicationSchema);
