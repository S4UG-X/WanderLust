

const Listing = require("../models/listing.js");


module.exports.index = async (req, res) => {
  let listings = await Listing.find({});
  res.render("index.ejs", { listings, title: "All Listings" });
};
module.exports.showRoute = async (req, res) => {
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
};
module.exports.addNewPost = async (req, res) => {
  let url = req.file.path;
  let data = req.body.listing;
  data.image = { url };
  data.owner = req.user._id;
  await Listing.create(data);

  req.flash("success", "Data is created");
  res.redirect("/listings");
  // console.log(data)
};
module.exports.addNewGet = (req, res) => {
  res.render("new.ejs", { title: "New Listing" });
};

module.exports.editPatch = async (req, res) => {
  let { id } = req.params;
  let newListing = req.body.listing;
  if (req.file) {
    let url = req.file.path;
    newListing.image = { url };
  }
  await Listing.findByIdAndUpdate(id, newListing);
  req.flash("success", "Data is Updated");
  // console.log(newListing)
  res.redirect(`/listings/${id}`);
};
module.exports.editGet = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);
  res.render("edit.ejs", { listing, title: `Edit ${listing.title}` });
};
module.exports.deleteRoute = async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndDelete(id);
  req.flash("success", "Data is Deleted");
  res.redirect("/listings");
};
