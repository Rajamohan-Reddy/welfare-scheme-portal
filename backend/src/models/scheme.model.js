import mongoose from "mongoose";

import { BENEFIT_TYPES } from "../constants/scheme.constants.js";

const mediaSchema = new mongoose.Schema(
  {
    bannerImage: {
      type: String,
      default: null,
    },

    thumbnailImage: {
      type: String,
      default: null,
    },

    galleryImages: {
      type: [String],
      default: [],
    },

    guidelinesDocument: {
      type: String,
      default: null,
    },

    governmentOrderDocument: {
      type: String,
      default: null,
    },
  },
  {
    _id: false,
  },
);

const eligibilitySchema = new mongoose.Schema(
  {
    minAge: {
      type: Number,
      default: null,
    },

    maxAge: {
      type: Number,
      default: null,
    },

    gender: {
      type: [String],
      default: [],
    },

    maxAnnualIncome: {
      type: Number,
      default: null,
    },

    casteCategories: {
      type: [String],
      default: [],
    },

    studentRequired: {
      type: Boolean,
      default: false,
    },

    farmerRequired: {
      type: Boolean,
      default: false,
    },

    widowRequired: {
      type: Boolean,
      default: false,
    },

    disabledRequired: {
      type: Boolean,
      default: false,
    },
  },
  {
    _id: false,
  },
);

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
      trim: true,
    },

    department: {
      type: String,
      required: true,
      trim: true,
    },

    benefitType: {
      type: String,

      enum: Object.values(BENEFIT_TYPES),

      required: true,
    },

    benefitAmount: {
      type: Number,
      default: 0,
    },

    media: {
      type: mediaSchema,
      default: {},
    },

    eligibility: {
      type: eligibilitySchema,
      default: {},
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

    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

// schemeSchema.index({ schemeCode: 1 }, { unique: true });

schemeSchema.index({
  department: 1,
});

schemeSchema.index({
  isActive: 1,
});

export const Scheme = mongoose.model("Scheme", schemeSchema);
