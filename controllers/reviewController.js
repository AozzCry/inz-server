import Review from "../models/reviewModel.js";
import Product from "../models/productModel.js";
import Order from "../models/orderModel.js";

// User authenticated
export function getProductReviews({ body: { productId } }, res) {
  if (typeof productId === "string")
    Review.find({ productId: productId }, (error, reviews) => {
      res.status(200).json(reviews);
    });
  else res.status(400).json({ message: "Product id is empty or wrong type" });
}
export function likeReview({ body: { reviewId }, user }, res) {
  if (typeof reviewId === "string")
    Review.findById(reviewId, async (error, review) => {
      if (!review) res.status(404).json({ message: "Review doesn't exist." });
      else {
        let index = 0;
        for await (const userId of review.usersThatLiked) {
          if (userId.equals(user._id)) {
            review.usersThatLiked.splice(index, 1);
            review.save();
            return res
              .status(200)
              .json({ message: "Succesfully unliked review." });
          }
          index += 1;
        }

        review.usersThatLiked.push(user._id);
        review.save();
        res.status(200).json({ message: "Succesfully liked review" });
      }
    });
  else res.status(400).json({ message: "Review id is empty or wrong type" });
}
export function dislikeReview({ body: { reviewId }, user }, res) {
  if (typeof reviewId === "string")
    Review.findById(reviewId, async (error, review) => {
      if (!review) res.status(404).json({ message: "Review doesn't exist." });
      else {
        let index = 0;
        for await (const userId of review.usersThatDisliked) {
          if (userId.equals(user._id)) {
            review.usersThatDisliked.splice(index, 1);
            review.save();
            return res
              .status(200)
              .json({ message: "Succesfully unliked review." });
          }
          index += 1;
        }

        review.usersThatDisliked.push(user._id);
        review.save();
        res.status(200).json({ message: "Succesfully liked review" });
      }
    });
  else res.status(400).json({ message: "Review id is empty or wrong type" });
}
export function createReview({ body, user }, res) {
  const newReview = new Review(body);
  newReview.userUsername = user.username;
  newReview.userId = user._id;
  const error = newReview.validateSync();
  if (error) res.status(400).json({ message: error.message });
  else
    Review.findOne(
      { productId: newReview.productId, userId: newReview.userId },
      (error, review) => {
        if (review)
          res
            .status(404)
            .json({ message: "You can't review product more then once." });
        else {
          Product.findById(newReview.productId, (error, product) => {
            if (!product) {
              res
                .status(404)
                .json({ message: "Product with this id doesn't exist." });
            } else {
              Order.findOne(
                {
                  userId: user._id,
                  "products.productId": newReview.productId,
                },
                (error, orders) => {
                  if (orders) newReview.userOrderedProduct = true;
                  product.countOfReviews = product.countOfReviews + 1;
                  product.starsFromReviews =
                    product.starsFromReviews + newReview.stars;
                  product.timesBought = product.timesBought + 1;

                  newReview.save();
                  product.save();
                  res.status(201).json({ message: "Review created." });
                }
              );
            }
          });
        }
      }
    );
}

// Admin authenticated
export function deleteReview({ body, user }, res) {
  if (typeof body.id === "string") {
    Review.findOne({ _id: body.id }, function (error, review) {
      if (error) res.json({ message: "Couldn't delete review: " + error });
      else if (!review)
        res.status(404).json({ message: "Review doesn't exists." });
      else {
        if (user.isAdmin === true || user._id.equals(review.userId)) {
          Product.findById(review.productId, (error, product) => {
            product.countOfReviews = product.countOfReviews - 1;
            product.starsFromReviews = product.starsFromReviews - review.stars;
            product.save();
            review.remove();
            review.save();
            res.status(200).json({ message: "Review has been deleted" });
          });
        }
      }
    });
  } else {
    res.status(400).json({ message: "Review id is empty of wrong type" });
  }
}
