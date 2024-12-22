import mongoose, { Schema } from "mongoose";

const bestSellingSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    rating: { type: Number, default: 0 },
    review_number: { type: Number, default: 0 },
    count_stock: { type: Number, required: true },
    sales_rank: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);
bestSellingSchema.index({ name: "text", description: "text", createdAt: -1 });
export const BestSelling =
  mongoose.models.BestSelling ??
  mongoose.model("BestSelling", bestSellingSchema);
