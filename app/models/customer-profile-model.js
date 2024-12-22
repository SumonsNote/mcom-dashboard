import mongoose, { Schema } from "mongoose";

const customerProfileSchema = new Schema({
  customer_name: { type: String, required: true },
  phone_number: { type: String, required: true, unique: true },
  email: { type: String },
  address: { type: String },
  password: { type: String },
  orders: [{ type: Schema.Types.ObjectId, ref: "Order" }],
  others: { type: String },
  username: { type: String },
  passwordResetToken: { type: String },
  passwordResetExpires: { type: Date },
});

customerProfileSchema.index({
  customer_name: "text",
  createdAt: -1,
  phone_number: "text",
  email: "text",
});
export const CustomerProfile =
  mongoose.models.CustomerProfile ??
  mongoose.model("CustomerProfile", customerProfileSchema);

// write a custom function tp calculate total spent of all users in order
