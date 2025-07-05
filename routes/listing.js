const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");


const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");




//delete route
router.delete(
  "/:id", isOwner,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    listing.reviews._id;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Data is Deleted");
    res.redirect("/listings");
  })
);

//Edit and Update
router.get(
  "/:id/edit",
  isOwner,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    res.render("edit.ejs", { listing, title: `Edit ${listing.title}` });
  })
);
router.patch(
  "/:id",
  isOwner,
  validateListing,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let newListing = req.body.listing;
    await Listing.findByIdAndUpdate(id, newListing);
    req.flash("success", "Data is Updated");
    // console.log(newListing)
    res.redirect(`/listings/${id}`);
  })
);

//Add new route
router.get("/new", isLoggedIn, (req, res) => {
  res.render("new.ejs", { title: "New Listing" });
});
router.post(
  "/",
  validateListing,
  wrapAsync(async (req, res) => {
    let data = req.body.listing;
    data.owner = req.user._id;
    await Listing.create(data);

    req.flash("success", "Data is created");
    res.redirect("/listings");
    // console.log(data)
  })
);

//show route
router.get(
  "/:id",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id)
      .populate({
        path: "reviews",
        populate: {
          path: "author",
        },
      })
      .populate("owner");
     
    res.render("show.ejs", { listing, title: listing.title });
    // console.log(listing)
  })
);

//index route
router.get(
  "/",
  wrapAsync(async (req, res) => {
    let listings = await Listing.find({});
    res.render("index.ejs", { listings, title: "All Listings" });
    // console.log( typeof listings)
  })
);

module.exports = router;
