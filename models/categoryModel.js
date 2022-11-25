import { Schema, model, ObjectId } from "mongoose";

export const categorySchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
    maxLength: 30,
  },
});

export default model("Categor", categorySchema);
