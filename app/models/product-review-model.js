import mongoose, { Schema } from "mongoose";

const productReviewSchema = new Schema(
  {
    review: String,
    rating: String,
    user: { type: Schema.Types.ObjectId, ref: "User" },
    product: { type: Schema.Types.ObjectId, ref: "Product" },
    images: Array,
  },
  { timestamps: true }
);

export const ProductReview =
  mongoose.models.ProductReview ??
  mongoose.model("ProductReview", productReviewSchema);
