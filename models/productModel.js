import { Schema, model } from "mongoose";
import { userSchema } from "./userModel";

export const productSchema = new Schema({
  name: {
    required: true,
    type: String,
  },
  price: {
    required: true,
    type: Number,
  },
  desc: {
    required: true,
    type: String,
  },
  count: {
    required: true,
    type: Number,
  },
  creator: {
    required: true,
    type: userSchema,
  },
  createdDate: {
    required: true,
    type: Date,
    default: Date.now,
  },
  categories: {
    type: Array(String),
  },
});

export default model("Product", productSchema);
