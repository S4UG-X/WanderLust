const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const listingController = require("../controller/listing.js");
const { storage } = require("../cloudConfig.js");
const multer = require("multer");
const upload = multer({ storage });
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");

router.get("/:id/edit", isOwner, wrapAsync(listingController.editGet));

router.get("/new", isLoggedIn, listingController.addNewGet);

router
  .route("/:id")
  .get(wrapAsync(listingController.showRoute))
  .patch(
    isOwner,
    upload.single("listing[image][url]"),
    validateListing,
    wrapAsync(listingController.editPatch)
  )
  .delete(isOwner, wrapAsync(listingController.deleteRoute));

router
  .route("/")
  .get(wrapAsync(listingController.index))
  .post(
    upload.single("listing[image][url]"),
    validateListing,
    wrapAsync(listingController.addNewPost)
  );

module.exports = router;
