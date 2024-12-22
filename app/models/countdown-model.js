import mongoose, { Schema } from "mongoose";

const countdownSchema = new Schema(
  {
    label: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    start_date: { type: Date, required: true },
    end_date: { type: Date, required: true },
    is_active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Countdown =
  mongoose.models.Countdown ?? mongoose.model("Countdown", countdownSchema);
