import { Schema, model } from "mongoose";
import { userSchema } from "./userModel";

export const reviewSchema = new Schema({
  text: {
    required: true,
    type: String,
  },
  stars: {
    required: true,
    type: Number,
  },
  reviewer: {
    required: true,
    type: userSchema,
  },
  addedDate: {
    required: true,
    type: Date,
    default: Date.now,
  },
});

export default model("Review", reviewSchema);
