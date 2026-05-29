import mongoose from "mongoose";
 
const auditLogSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
 
    module: {
      type: String,
      required: true,
    },
 
    action: {
      type: String,
      required: true,
    },
 
    description: {
      type: String,
      required: true,
    },
 
    ipAddress: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);
 
export const AuditLog = mongoose.model(
  "AuditLog",
  auditLogSchema
);