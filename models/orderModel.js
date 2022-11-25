import { Schema, ObjectID } from "mongoose";

export const orderSchema = new Schema({
  products: {
    type: [
      {
        product: ObjectID,
        quantity: { type: Number, default: 1 },
      },
    ],
    required: true,
  },
  price: {
    required: true,
    type: Number,
  },
  status: {
    required: true,
    type: String,
    enum: [
      "pending",
      "awaiting payment",
      "awaiting fulfillment",
      "delivering",
      "awaiting pickup",
      "completed",
      "cancelled",
      "declined",
    ],
  },
  orderDate: {
    required: true,
    type: Date,
    default: Date.now,
  },
});

export default model("Order", orderSchema);
