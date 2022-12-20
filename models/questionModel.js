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
  addedDate: {
    type: Date,
    default: Date.now,
  },
  usersThatLiked: {
    type: [Schema.Types.ObjectId],
  },
  usersThatDisliked: {
    type: [Schema.Types.ObjectId],
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
  addedDate: {
    type: Date,
    default: Date.now,
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
});

export default model("Question", questionSchema);
