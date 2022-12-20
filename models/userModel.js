import { Schema, model, ObjectId } from "mongoose";

const userSchema = new Schema({
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
    unique: true,
    required: true,
    match: [
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
      "Please fill a valid email address.",
    ],
    minLength: 3,
    maxLength: 254,
  },
  password: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 127,
  },
  registerDate: {
    type: Date,
    default: Date.now,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  isBanned: {
    type: Boolean,
    default: false,
  },
  address: {
    street: { type: String, maxLength: 254 },
    streetNr: { type: String, maxLength: 254 },
    city: { type: String, maxLength: 254 },
    postalCode: { type: String, maxLength: 254 },
  },
  lastSeenProducts: {
    type: [{ type: ObjectId }],
    uniqueitems: true,
    maxItems: 5,
  },
});

export default model("User", userSchema);
