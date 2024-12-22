import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    role: {
      type: String,
      enum: ["admin", "super-admin", "user", "manager"],
      default: "user",
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.index(
  { email: 1, phone: 1, username: 1, createdAt: -1 },
  { unique: true }
);
userSchema.virtual("full_name").get(function () {
  return `${this.first_name} ${this.last_name}`;
});
export const User = mongoose.models.User ?? mongoose.model("User", userSchema);
