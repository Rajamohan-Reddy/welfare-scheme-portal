import mongoose from "mongoose";

const auditLogSchema = new mongoose.Schema(
  {
    module: {
      type: String,
      required: true,
    },

    action: {
      type: String,
      required: true,
    },

    entityId: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
    },

    performedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    metadata: {
      type: Object,
      default: {},
    },

    ipAddress: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

auditLogSchema.index({
  module: 1,
});

auditLogSchema.index({
  action: 1,
});

auditLogSchema.index({
  performedBy: 1,
});

export const AuditLog = mongoose.model("AuditLog", auditLogSchema);
