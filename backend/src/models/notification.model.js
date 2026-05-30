import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    message: {
      type: String,
      required: true,
    },

    isRead: {
      type: Boolean,
      default: false,
    },

    referenceType: {
      type: String,
      default: null,
    },

    referenceId: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

notificationSchema.index({
  userId: 1,
});

notificationSchema.index({
  isRead: 1,
});

export const Notification = mongoose.model("Notification", notificationSchema);
