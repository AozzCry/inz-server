import { Schema, model, ObjectId } from "mongoose";

export const reviewSchema = new Schema({
  text: {
    type: String,
    maxLength: 508,
  },
  stars: {
    type: Number,
    required: true,
    enum: [1, 2, 3, 4, 5],
  },
  reviewerUsername: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 254,
  },
  reviewer: {
    type: ObjectId,
    required: true,
  },
  addedDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

export default model("Review", reviewSchema);
