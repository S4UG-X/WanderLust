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
const { reviewSchema} = require("./schema.js");
const listingRoute = require("./routes/listing.js") 
const reviewRoute = require("./routes/review.js") 
const session = require("express-session")
const flash = require("connect-flash")








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

app.use(
  session({
    secret: "youHaveToMakeThisHardToGuess",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(flash());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  next()
});




app.use("/listings", listingRoute);
app.use("/listings/:id/review", reviewRoute);






app.use((err, req, res, next) => {
  res.status(err.status || 500).render("error.ejs", { err, title: "Error" });
});

app.get("/", (req, res) => {
  res.send("This is the home page");
});
