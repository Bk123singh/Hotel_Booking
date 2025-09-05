const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { listingSchema, reviewSchema } = require("../schema.js");
const listing = require("../models/listing.js");
const session = require("express-session");
const { isLogin, isOwner, validateListing } = require("../middleware.js");
const controller = require("../controller/listing.js");
const multer = require("multer");
const { storage} = require("../cloudConfig.js");
const upload = multer({storage });


// validatelisting

// Route to show all listings

router
  .route("/")
  .get(wrapAsync(controller.index))
  .post(isLogin, validateListing,upload.single("listing[image]"), wrapAsync(controller.CreateNewListing));


// New listing form

router.get("/new", isLogin, controller.getNewForm);

// Create listing

router
  .route("/:id")
  .get(wrapAsync(controller.showListing))
  .put(isLogin, isOwner,upload.single("listing[image]"), validateListing, wrapAsync(controller.UpdateListing));

router
  .route("/:id")
  .get(wrapAsync(controller.showListing))
  .put(isLogin, isOwner, validateListing, wrapAsync(controller.UpdateListing))
  .delete(isLogin, isOwner, wrapAsync(controller.deleteListing));

//edit form route

router.get("/:id/edit", isLogin, isOwner, wrapAsync(controller.getEditForm));

module.exports = router;
