import mongoose, { Schema } from "mongoose";

const productDetailSchema = new Schema({
  img: {
    type: [String],
    required: true,
  },
  des: {
    type: String,
    required: true,
  },
  color: {
    type: [String],
    required: true,
  },
  size: {
    type: [String],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export const ProductDetail =
  mongoose.models.ProductDetail ??
  mongoose.model("ProductDetail", productDetailSchema);
