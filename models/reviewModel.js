import { Schema, model, ObjectId } from "mongoose";

export const reviewSchema = new Schema({
  productId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  text: {
    type: String,
    maxLength: 508,
  },
  stars: {
    type: Number,
    required: true,
    enum: [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5],
  },
  userUsername: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 254,
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  addedDate: {
    type: Date,
    default: Date.now,
  },
  userOrderedProduct: {
    type: Boolean,
    default: false,
  },
  usersThatLiked: {
    type: [],
  },
  usersThatDisliked: {
    type: [],
  },
});

export default model("Review", reviewSchema);
