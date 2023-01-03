import { Router } from "express";

import {
  getProductReviews,
  createReview,
  deleteReview,
  likeReview,
  dislikeReview,
} from "../controllers/reviewController.js";
import { isAuthenticatedAdmin, isAuthenticatedUser } from "../utils/auth.js";

export default /* review */ Router()
  .get("/", isAuthenticatedAdmin, getProductReviews)
  .post("/create", isAuthenticatedUser, createReview)
  .patch("/like", isAuthenticatedUser, likeReview)
  .patch("/dislike", isAuthenticatedUser, dislikeReview)
  .delete("/:_id", isAuthenticatedUser, deleteReview)

  .delete("/:_id", isAuthenticatedAdmin, deleteReview);
