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
  },
);

// schemeCategorySchema.index({ categoryCode: 1 }, { unique: true });

schemeCategorySchema.index({
  isActive: 1,
});

export const SchemeCategory = mongoose.model(
  "SchemeCategory",
  schemeCategorySchema,
);
