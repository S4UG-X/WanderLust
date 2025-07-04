const express = require("express");
const router = express.Router({ mergeParams: true });
const Listing = require("../models/listing");
const Review = require("../models/review");
const wrapAsync = require("../utils/wrapAsync.js");
const customError = require("../utils/customError.js");
const { reviewSchema } = require("../schema.js");

const validateReview = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body);
  if (error) {
    throw new customError(500, error);
  } else {
    next();
  }
};

router.post(
  "/",
  validateReview,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let review = req.body.review;

    let newReview = await Review.create(review);
    let listing = await Listing.findById(id);
    listing.reviews.push(newReview._id);
    await newReview.save();
    await listing.save();
     req.flash("success", "Review is Added");

    // res.render("show.ejs", { listing, title: listing.title });
    res.redirect(`/listings/${id}`);
  })
);
//delete review
router.delete("/:reviewId", async (req, res) => {
  let { id, reviewId } = req.params;

  await Listing.findByIdAndUpdate(id, {
    $pull: { reviews: reviewId },
  });
  await Review.findByIdAndDelete(reviewId);
   req.flash("success", "Review is Deleted");

  res.redirect(`/listings/${id}`);
});
module.exports = router;
