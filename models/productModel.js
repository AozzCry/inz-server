import { Schema, model } from "mongoose";
import { Buffer } from "buffer";
import { log } from "console";

export const productSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
    minlength: 3,
    maxlength: 127,
  },
  price: {
    type: Number,
    required: true,
  },
  shortDescription: {
    type: String,
    maxlength: 63,
  },
  longDescription: {
    type: String,
    maxlength: 4000,
  },
  specifications: [
    {
      name: { type: String, maxlength: 30 },
      value: { type: String, maxlength: 254 },
    },
  ],
  categories: {
    type: [{ type: String, maxlength: 30 }],
    uniqueitems: true,
    maxItems: 5,
  },
  quantity: {
    required: true,
    type: Number,
    default: 0,
  },
  status: {
    required: true,
    type: String,
    enum: ["in stock", "out of stock", "discontinued"],
    default: "out of stock",
  },
  createdDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  timesBought: {
    required: true,
    type: Number,
    default: 0,
  },
  countOfReviews: {
    required: true,
    type: Number,
    default: 0,
  },
  starsFromReviews: {
    required: true,
    type: Number,
    default: 0,
  },
  miniImg: {
    type: Buffer,
  },
  nameLink: {
    type: String,
    unique: true,
    required: true,
  },
});
productSchema.index({ name: "text" });
export default model("Product", productSchema);
