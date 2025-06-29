const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema({
    title: String,
    description: String,
    image: String,
    price: Number,
    location: String,
    country: String, 
});

const Listing = mongoose.model("Listing", listingSchema);