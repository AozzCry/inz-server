import { Schema, model } from "mongoose";

export const categorySchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
    maxLength: 30,
  },
});

export default model("Category", categorySchema);
