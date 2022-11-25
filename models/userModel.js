import { Schema, model } from "mongoose";

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
    required: true,
    default: Date.now,
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  },
  address: {
    street: { type: String, maxLength: 254 },
    streetNr: { type: String, maxLength: 254 },
    city: { type: String, maxLength: 254 },
    postalCode: { type: String, maxLength: 254 },
  },
});

export default model("User", userSchema);
