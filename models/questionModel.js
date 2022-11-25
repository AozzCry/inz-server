import { Schema, model, ObjectId } from "mongoose";

export const questionSchema = new Schema({
  text: {
    type: String,
    required: true,
    maxLength: 508,
  },
  askingUsername: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 254,
  },
  askingId: {
    type: ObjectId,
    required: true,
  },
  addedDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

export default model("Question", questionSchema);
