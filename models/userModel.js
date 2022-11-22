import { Schema, model } from "mongoose";

const userSchema = new Schema({
  firstname: { required: true, type: String },
  lastname: { required: true, type: String },
  username: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    unique: true,
    type: String,
  },
  password: { required: true, type: String },
  registerDate: {
    required: true,
    type: Date,
    default: Date.now,
  },
  isAdmin: {
    required: true,
    type: Boolean,
    default: false,
  },
  address: {
    street: String,
    streetNr: String,
    city: String,
    postalCode: String,
  },
});

export default model("User", userSchema);
