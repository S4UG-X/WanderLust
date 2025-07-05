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
  
  initData.data = initData.data.map((obj) => ({
    ...obj,
    owner: "6868d6de744e0ef05f0a2252", 
  }));
  await Listing.insertMany(initData.data)
  // console.log("Done")
 }
 dbinit();