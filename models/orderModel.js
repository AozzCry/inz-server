import { Schema, model } from "mongoose";

export const orderSchema = new Schema({
  products: {
    type: [
      {
        productName: { required: true, type: String },
        productPrice: { required: true, type: Number, min: 0.01 },
        productId: { required: true, type: Schema.Types.ObjectId },
        productNameLink: { required: true, type: String },
        count: { required: true, type: Number, min: 1, default: 1 },
      },
    ],
    required: true,
  },
  sumPrice: {
    required: true,
    min: 0.01,
    type: Number,
  },
  userId: {
    required: true,
    type: Schema.Types.ObjectId,
  },
  userInfo: {
    required: true,
    type: {
      firstname: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 254,
      },
      lastname: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 254,
      },
      username: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 254,
      },
      email: {
        type: String,
        required: true,
        match: [
          /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
          "Please fill a valid email address.",
        ],
        minLength: 3,
        maxLength: 254,
      },
    },
  },
  address: {
    street: { required: true, type: String, maxLength: 254 },
    streetNr: { required: true, type: String, maxLength: 254 },
    city: { required: true, type: String, maxLength: 254 },
    postalCode: { required: true, type: String, maxLength: 254 },
  },
  status: {
    required: true,
    type: String,
    enum: [
      "pending",
      "awaiting payment",
      "awaiting fulfillment",
      "delivering",
      "completed",
      "cancelled",
      "declined",
    ],
    default: "pending",
  },
  orderDate: {
    required: true,
    type: Date,
    default: Date.now,
  },
});

export default model("Order", orderSchema);
