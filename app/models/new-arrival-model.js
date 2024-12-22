import mongoose, { Schema } from "mongoose";

const newArrivalSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    brand: { type: String, required: true },
    model: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    processor: { type: String, required: true },
    ram: { type: Number, required: true },
    storage: { type: Number, required: true },
    camera: { type: String, required: true },
    battery: { type: Number, required: true },
    display: { type: String, required: true },
    operating_system: { type: String, required: true },
    connectivity: { type: String, required: true },
    rating: { type: Number, default: 0 },
    review_number: { type: Number, default: 0 },
    count_stock: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

export const NewArrival =
  mongoose.models.NewArrival ?? mongoose.model("NewArrival", newArrivalSchema);
