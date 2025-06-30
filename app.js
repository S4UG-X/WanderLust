const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const Listing = require("./models/listing");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

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

//delete route
app.delete("/listings/:id", async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndDelete(id);
  res.redirect("/listings");
});

//Edit and Update
app.get("/listings/:id/edit", async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);
  res.render("edit.ejs", { listing, title: `Edit ${listing.title}` });
});
app.patch("/listings/:id", async (req, res) => {
  let { id } = req.params;
  let newListing = req.body.listing;
  await Listing.findByIdAndUpdate(id, newListing);
  // console.log(newListing)
  res.redirect(`/listings/${id}`);
});

//Add new route
app.get("/listings/new", (req, res) => {
  res.render("new.ejs", {title: "New Listing"});
});
app.post("/listings", async (req, res) => {
  let data = req.body.listing;
  await Listing.create(data);
  res.redirect("/listings");
  // console.log(data)
});

//show route
app.get("/listings/:id", async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);
  res.render("show.ejs", { listing, title: listing.title });
  // console.log(listing)
});

//index route
app.get("/listings", async (req, res) => {
  let listings = await Listing.find({});
  res.render("index.ejs", { listings, title: "All Listings" });
  // console.log( typeof listings)
});

app.get("/", (req, res) => {
  res.send("This is the home page");
});
