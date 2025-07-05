const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
module.exports = {
  createReview: async (req, res) => {
    let { id } = req.params;
    let review = req.body.review;

    let newReview = await Review.create(review);
    let listing = await Listing.findById(id);
    listing.reviews.push(newReview._id);
    newReview.author = req.user._id;
    await newReview.save();
    await listing.save();
    req.flash("success", "Review is Added");

    // res.render("show.ejs", { listing, title: listing.title });
    res.redirect(`/listings/${id}`);
  },
  deleteReview: async (req, res) => {
    let { id, reviewId } = req.params;

    await Listing.findByIdAndUpdate(id, {
      $pull: { reviews: reviewId },
    });
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Review is Deleted");

    res.redirect(`/listings/${id}`);
  },
};
