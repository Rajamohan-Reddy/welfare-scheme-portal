import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    applicationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Application",
      required: true,
    },

    beneficiaryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    schemeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Scheme",
      required: true,
    },

    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    transactionReference: {
      type: String,
      required: true,
      unique: true,
    },

    paymentDate: {
      type: Date,
      default: Date.now,
    },

    paymentStatus: {
      type: String,
      enum: ["PENDING", "SUCCESS", "FAILED"],
      default: "PENDING",
    },

    processedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    remarks: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

paymentSchema.index({
  applicationId: 1,
});

paymentSchema.index({
  beneficiaryId: 1,
});

paymentSchema.index({
  schemeId: 1,
});

paymentSchema.index({
  paymentStatus: 1,
});

paymentSchema.index({
  paymentDate: -1,
});

export const Payment = mongoose.model("Payment", paymentSchema);
