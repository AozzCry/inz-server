import { Router } from "express";

import {
  createQuestion,
  deleteQuestion,
  likeQuestion,
  answerQuestion,
  likeAnswer,
  dislikeQuestion,
  dislikeAnswer,
  deleteAnswer,
} from "../controllers/questionController.js";
import { isAuthenticatedAdmin, isAuthenticatedUser } from "../utils/auth.js";

export default /* question */ Router()
  .post("/create", isAuthenticatedUser, createQuestion)
  .patch("/like", isAuthenticatedUser, likeQuestion)
  .patch("/dislike", isAuthenticatedUser, dislikeQuestion)
  .patch("/delete", isAuthenticatedUser, deleteQuestion)

  .patch("/answer", isAuthenticatedUser, answerQuestion)
  .patch("/answer/like", isAuthenticatedUser, likeAnswer)
  .patch("/answer/dislike", isAuthenticatedUser, dislikeAnswer)
  .patch("/answer/delete", isAuthenticatedUser, deleteAnswer)

  .patch("/delete", isAuthenticatedAdmin, deleteQuestion)
  .patch("/answer/delete", isAuthenticatedAdmin, deleteAnswer);
