import mongoose, { Schema } from "mongoose";

// Define sub-schema for region
const RegionSchema = new Schema({
  name: { type: String, required: true },
  currency_code: { type: String, required: true },
  currency_symbol: { type: String, required: true },
});

// Define sub-schema for regional pricing
const RegionalPricingSchema = new Schema({
  region: { type: RegionSchema, required: true },
  price: { type: Number, required: true },
  discount_price: { type: Number, required: true },
  purchase_price: { type: Number, required: true },
  stock_quantity: { type: Number, required: true },
});

// Define sub-schema for variants
const VariantSchema = new Schema({
  storage: {
    size: { type: Number, required: true },
    unit: { type: String, required: true, enum: ["GB", "TB"] },
  },
  regional_pricing: [RegionalPricingSchema],
});

// Define main product schema
const stockSchema = new Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
      unique: true,
    },
    sku: { type: String, required: true, unique: true },
    stock: { type: Number, required: true, min: 0 },
    dealer: { type: String, required: true },
    sold_out: { type: Number, default: 0, min: 0 },
    variants: [VariantSchema],
    status: {
      type: String,
      enum: ["in-stock", "low-stock", "out-of-stock", "discontinued"],
      default: "in-stock",
    },
  },
  { timestamps: true }
);

export const Stock =
  mongoose.models.Stock ?? mongoose.model("Stock", stockSchema);
