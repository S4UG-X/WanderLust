const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const customError = require("../utils/customError.js");
const { listingSchema } = require("../schema.js");



const validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);
  if (error) {
    throw new customError(500, error);
  } else {
    next();
  }
};

//delete route
router.delete(
  "/:id",
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
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    res.render("edit.ejs", { listing, title: `Edit ${listing.title}` });
  })
);
router.patch(
  "/:id",
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
router.get("/new", (req, res) => {
  res.render("new.ejs", { title: "New Listing" });
});
router.post(
  "/",
  validateListing,
  wrapAsync(async (req, res) => {
    let data = req.body.listing;
    await Listing.create(data);

    req.flash("success", "Data is created")
    res.redirect("/listings");
    // console.log(data)
  })
);

//show route
router.get(
  "/:id",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id).populate("reviews");
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