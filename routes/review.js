const express = require("express");
const router = express.Router({ mergeParams: true });

const wrapAsync = require("../utils/wrapAsync.js");

const reviewController = require("../controller/review.js");
const {
  isLoggedIn,
  validateReview,
  isReviewAuthor,
} = require("../middleware.js");

router.post(  
  "/",
  validateReview,
  isLoggedIn,
  wrapAsync(reviewController.createReview)
);
//delete review
router.delete("/:reviewId", isReviewAuthor, reviewController.deleteReview);
module.exports = router;
