const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");

const Listing = require("./models/listing");

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
  

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

  
mongoose.connect("mongodb://localhost:27017/wanderlust")
    .then(() => {
        console.log("Mongoose connected");
    })
    .catch((err) => { 
        console.log("Mongoose connection error");
        console.log(err);
    });

    //checking
    // app.get("/checking", async (req, res) => {
    //     const newListing  = new Listing({
    //         title: "Old Boat",
    //         description: "A very old boat",
    //         image: "https://via.placeholder.com/150",
    //         price: 100000,
    //         location: "New York",
    //         country: "USA",
    //     });
    //     await newListing.save();
    //     res.send(newListing);
    // });

    





app.get("/", (req, res) => {
    res.send("This is the home page");
});





