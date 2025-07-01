const mongoose = require("mongoose");
const Review = require("./review.js");
const listingSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: {
    filename: {
      type: String,
      default: "listingimage",
    },
    url: {
      type: String,
      default:
        "https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png",
      set: (v) =>
        v === ""
          ? "https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png"
          : v,
    },
  },
  price: Number,
  location: String,
  country: String,
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
});

listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    await Review.deleteMany({ _id: { $in: listing.reviews } });
  }
});


module.exports = mongoose.model("Listing", listingSchema);
