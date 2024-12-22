import mongoose, { Schema } from "mongoose";

const trendingSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: String, required: true },
    image: { type: String, required: true },
    rating: { type: String, default: 0 },
    review_number: { type: Number, default: 0 },
    count_stock: { type: Number, required: true },
  },

  {
    timestamps: true,
  }
);

export const Trending =
  mongoose.models.Trending ?? mongoose.model("Trending", trendingSchema);
