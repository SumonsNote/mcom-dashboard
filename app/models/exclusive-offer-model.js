import mongoose, { Schema } from "mongoose";

const exclusiveSchema = new Schema({
  productId: { type: Schema.Types.ObjectId, ref: "Product" },
  label: { type: String, required: true },
  title: { type: String, required: true },
  image: { type: String, required: true },
});

export const ExclusiveOffer =
  mongoose.models.ExclusiveOffer ??
  mongoose.model("ExclusiveOffer", exclusiveSchema);
