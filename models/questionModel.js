import { Schema, model } from "mongoose";

export const answerSchema = new Schema({
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
  text: {
    type: String,
    required: true,
    maxLength: 508,
  },
  usersThatLiked: {
    type: [Schema.Types.ObjectId],
  },
  usersThatDisliked: {
    type: [Schema.Types.ObjectId],
  },
  addedDate: {
    type: Date,
    default: Date.now,
  },
});

export const questionSchema = new Schema({
  productId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  text: {
    type: String,
    required: true,
    maxLength: 508,
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
  usersThatLiked: {
    type: [Schema.Types.ObjectId],
  },
  usersThatDisliked: {
    type: [Schema.Types.ObjectId],
  },
  answers: {
    type: [answerSchema],
  },
  addedDate: {
    type: Date,
    default: Date.now,
  },
});

export default model("Question", questionSchema);
