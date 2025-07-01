const mongoose = require("mongoose")
const reviewSchema = new mongoose.Schema({
  username: {
    type: String,
    default: "Jane Doe",
  },
  rating: {
    type: String,
  },
  comment: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});
const Review = mongoose.model("Review", reviewSchema)
module.exports = Review