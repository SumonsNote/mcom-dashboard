import mongoose, { Schema } from "mongoose";

const productSliderSchema = new Schema({
  title: String,
  shortDes: String,
  price: Number,
  image: String,
  productId: { type: Schema.Types.ObjectId, ref: "Product" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const ProductSlider =
  mongoose.models.ProductSlider ??
  mongoose.model("ProductSlider", productSliderSchema);
