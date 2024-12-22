import mongoose, { Schema } from "mongoose";

const categorySchema = new Schema(
  {
    categoryName: {
      type: String,
      required: true,
    },
    categoryImg: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
categorySchema.index({ categoryName: "text", createdAt: -1 });

export const Category =
  mongoose.models.Category ?? mongoose.model("Category", categorySchema);
