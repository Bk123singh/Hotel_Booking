const Review = require("../models/review.js");
const { listingSchema, reviewSchema } = require("../schema.js");
const listing = require("../models/listing.js");

module.exports.ReviewPost = async (req, res) => {
  const listingId = req.params.id;

  let data = await listing.findById(listingId);
  let newReview = new Review(req.body.review);
  newReview.author = req.user._id;
  data.reviews.push(newReview);

  await newReview.save();
  await data.save();
  req.flash("success", "New Review created!");
  res.redirect(`/listings/${data._id}`);
};

module.exports.ReviewDelete = async (req, res) => {
  let { id, reviewId } = req.params;
  await listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);
  req.flash("success", "Review Deleted !");
  res.redirect(`/listings/${id}`);
};
