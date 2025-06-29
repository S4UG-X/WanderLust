const Listing = require("../models/listing"); 
const mongoose = require("mongoose")
const initData = require("../init/data.js")




mongoose
  .connect("mongodb://localhost:27017/wanderlust")
  .then(() => {
    console.log("Mongoose connected");
  })
  .catch((err) => {
    console.log("Mongoose connection error");
    console.log(err);
  });


  
 const dbinit = async ()=>{
  await Listing.deleteMany({})
  Listing.insertMany(initData.data)
  console.log("Done")
 }
 dbinit();