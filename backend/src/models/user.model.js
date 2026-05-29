import mongoose from "mongoose";
 
const addressSchema = new mongoose.Schema(
  {
    houseNo: String,
    street: String,
    village: String,
    mandal: String,
    district: String,
    state: String,
    pincode: String,
  },
  { _id: false }
);
 
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
    },
 
    lastName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
    },
 
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
 
    password: {
      type: String,
      required: true,
      select: false,
    },
 
    phoneNumber: {
      type: String,
      required: true,
      trim: true,
    },
 
    aadhaarNumber: {
      type: String,
      trim: true,
      default: null,
    },
 
    dateOfBirth: {
      type: Date,
      default: null,
    },
 
    gender: {
      type: String,
      enum: ["MALE", "FEMALE", "OTHER"],
      default: null,
    },
 
    address: {
      type: addressSchema,
      default: {},
    },
 
    profileImage: {
      type: String,
      default: null,
    },
 
    role: {
      type: String,
      enum: ["ADMIN", "OFFICER", "CITIZEN"],
      default: "CITIZEN",
      required: true,
    },
 
    refreshToken: {
      type: String,
      default: null,
      select: false,
    },
 
    isActive: {
      type: Boolean,
      default: true,
    },
 
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
 
    lastLoginAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);
 
userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ role: 1 });
userSchema.index({ isActive: 1 });
 
export const User = mongoose.model("User", userSchema);