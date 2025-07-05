if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");

const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const listingRoute = require("./routes/listing.js");
const reviewRoute = require("./routes/review.js");
const userRoute = require("./routes/user.js");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/User.js");
const MongoStore = require("connect-mongo");


app.listen(8080, () => {
  console.log("Server is running on port 8080");
});

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "public")));

const dbUrl = process.env.ATLASDB_URL;

// ====== Mongoose connection ======
async function main() {
  await mongoose.connect(dbUrl);
}
main().then(() => {
  console.log("Mongoose connected");
});
const store = MongoStore.create({
  mongoUrl: dbUrl,
  touchAfter: 24 * 60 * 60,
  crypto: {
    secret: "thisIsASecret",
  },
});
store.on("error", function (e) {
  console.log("SESSION STORE ERROR", e);
});
 


app.use(
  session({
    secret: "youHaveToMakeThisHardToGuess",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.success = req.flash("success");
  next();
});

app.use("/listings", listingRoute);
app.use("/listings/:id/review", reviewRoute);
app.use("/", userRoute);

app.use((err, req, res, next) => {
  res.status(err.status || 500).render("error.ejs", { err, title: "Error" });
});

app.get("/", (req, res) => {
  res.send("This is the home page");
});
