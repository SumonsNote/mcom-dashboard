import mongoose, { Schema } from "mongoose";

const checkoutSchema = new Schema(
  {
    customerFname: { type: String, required: true },
    customerLname: { type: String, required: true },
    address: { type: String, required: true },
    email: { type: String, required: true },
    city: { type: String, required: true },
    zone: { type: String, required: true },
    comment: { type: String },
    paymentMethod: { type: String, required: true },
    deliveryMethod: { type: String, required: true },
    orderReview: [
      {
        name: { type: String, required: true },
        price: { type: Number, required: true },
        total: { type: Number, required: true },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Checkout =
  mongoose.models.Checkout ?? mongoose.model("Checkout", checkoutSchema);
