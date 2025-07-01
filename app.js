const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const Listing = require("./models/listing");
const Review = require("./models/review");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js");
const customError = require("./utils/customError.js");
const {listingSchema, reviewSchema} = require("./schema.js");


app.listen(8080, () => {
  console.log("Server is running on port 8080");
});

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "public")));

mongoose
  .connect("mongodb://localhost:27017/wanderlust")
  .then(() => {
    console.log("Mongoose connected");
  })
  .catch((err) => {
    console.log("Mongoose connection error");
    console.log(err);
  });


const validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);
  if (error) {
    throw new customError(500, error);
  } else {
    next();
  }
};
const validateReview = (req, res,next)=>{
  let {error}=reviewSchema.validate(req.body)
  if(error){
    throw new customError(500, error)

  }else{
    next()
  }
}

//delete route
app.delete(
  "/listings/:id",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id)
    listing.reviews._id
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
  })
);

//Edit and Update
app.get(
  "/listings/:id/edit",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    res.render("edit.ejs", { listing, title: `Edit ${listing.title}` });
  })
);
app.patch(
  "/listings/:id",
  validateListing,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let newListing = req.body.listing;
    await Listing.findByIdAndUpdate(id, newListing);
    // console.log(newListing)
    res.redirect(`/listings/${id}`);
  })
);

//Add new route
app.get("/listings/new", (req, res) => {
  res.render("new.ejs", { title: "New Listing" });
});
app.post(
  "/listings",
  validateListing,
  wrapAsync(async (req, res) => {
    let data = req.body.listing;
    await Listing.create(data);
    res.redirect("/listings");
    // console.log(data)
  })
);

//show route
app.get(
  "/listings/:id",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id).populate("reviews");
    res.render("show.ejs", { listing, title: listing.title });
    // console.log(listing)
  })
);

//index route
app.get(
  "/listings",
  wrapAsync(async (req, res) => {
    let listings = await Listing.find({});
    res.render("index.ejs", { listings, title: "All Listings" });
    // console.log( typeof listings)
  })
);

//Review route

app.post(
  "/listings/:id/review",validateReview,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let review = req.body.review;

    let newReview = await Review.create(review);
    let listing = await Listing.findById(id);
    listing.reviews.push(newReview._id);
    await newReview.save()
    await listing.save();
   
    // res.render("show.ejs", { listing, title: listing.title });
    res.redirect(`/listings/${id}`);
  })
);
//delete review
app.delete("/listings/:id/review/:reviewId",async (req, res)=>{
  let {id, reviewId}= req.params

  await Listing.findByIdAndUpdate(id, {
    $pull: { reviews: reviewId },
  });
 ;
await Review.findByIdAndDelete(reviewId)
   
res.redirect(`/listings/${id}`)
})






app.use((err, req, res, next) => {
  res.status(err.status || 500).render("error.ejs", { err, title: "Error" });
});

app.get("/", (req, res) => {
  res.send("This is the home page");
});
