import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String },
    email: { type: String },
    phone_number: { type: String, required: true },
    shipping_address: { type: String, required: true },
    country: { type: String, required: true },
    city: { type: String, required: true },
    zip_code: { type: String },
    products: {
      type: [
        {
          productID: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "Product",
          },
          quantity: { type: Number, required: true },
        },
      ],
      required: true,
    },
    order_notes: {
      type: String,
    },
  },
  { timestamps: true }
);

export const orderModel =
  mongoose.models.Order ?? mongoose.model("Order", orderSchema);
