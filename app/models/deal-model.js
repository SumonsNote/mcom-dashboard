import mongoose, { Schema } from "mongoose";
const dealSchema = new Schema([
  {
    productId: { type: Schema.Types.ObjectId, ref: "Product" },
    label: { type: String, required: true },
    title: { type: String, required: true },
    short_description: { type: String, required: true },
    image: { type: String, required: true },
  },
]);

export const Deal = mongoose.models.Deal ?? mongoose.model("Deal", dealSchema);
