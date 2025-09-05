const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError");
const { listingSchema, reviewSchema } = require("../schema.js");
const Review = require("../models/review.js");
const listing = require("../models/listing.js");
const controller = require("../controller/review.js");
const {
  isLogin,
  isOwner,
  validateListing,
  validateReview,
  isReviewAuthor,
} = require("../middleware.js");

//reviews
//post route

router.post("/", isLogin, validateReview, wrapAsync(controller.ReviewPost));

// delete review Route
router.delete(
  "/:reviewId",
  isLogin,
  isReviewAuthor,
  wrapAsync(controller.ReviewDelete)
);

module.exports = router;
