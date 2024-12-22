import mongoose, { Schema } from "mongoose";

const sliderSchema = new Schema([
  {
    productId: { type: Schema.Types.ObjectId, ref: "Product" },
    image: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    regular_price: { type: Number, required: true },
    discount_price: { type: Number, required: true },
  },
]);

export const Slider =
  mongoose.models.Slider ?? mongoose.model("Slider", sliderSchema);
