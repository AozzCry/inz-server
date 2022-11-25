import { Schema, model } from "mongoose";

export const productSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 127,
  },
  price: {
    type: Number,
    required: true,
  },
  desc: {
    type: String,
    maxlength: 508,
  },
  specification: {
    type: {
      name: { type: String, maxlength: 30 },
      value: { type: String, maxlength: 254 },
    },
  },
  quantity: {
    required: true,
    type: Number,
    default: 0,
  },
  state: {
    required: true,
    type: String,
    enum: ["in stock", "stocked on demand", "out of stock", "discontinued"],
    default: "out of stock",
  },
  createdDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  categories: {
    type: [String],
    uniqueitems: true,
    maxItems: 10,
  },
});

export default model("Product", productSchema);
