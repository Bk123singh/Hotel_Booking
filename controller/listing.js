const listing = require("../models/listing.js");
const { isLogin, isOwner, validateListing } = require("../middleware.js");
const { listingSchema, reviewSchema } = require("../schema.js");
const Reivew = require("../models/review.js");

module.exports.index = async (req, res) => {
  const data = await listing.find();
  res.render("listing/index.ejs", { data }); // also passed data
};

module.exports.getNewForm = (req, res) => {
  res.render("listing/new.ejs");
};

module.exports.CreateNewListing = async (req, res) => {
  let url = req.file.path;
  let filename = req.file.filename;
  const newListing = new listing(req.body.listing);
  newListing.owner = req.user._id;
  newListing.Image = { url, filename };
  await newListing.save();
  req.flash("success", "New Listing is created!");
  res.redirect("/listings");
};

module.exports.showListing = async (req, res) => {
  const { id } = req.params;
  const data = await listing
    .findById(id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner");
  res.render("listing/show.ejs", { data });
};

module.exports.getEditForm = async (req, res) => {
  let { id } = req.params;
  let data = await listing.findById(id);

  if (!data) {
    req.flash("error", " listing you requested for does not exit!");
    res.redirect("/listings");
  }
  let originalImageUrl = data.Image.url;
  changeImage = originalImageUrl.replace("/upload", "/upload/h_100,w_150");

  res.render("listing/edit.ejs", { data, changeImage });
};

module.exports.UpdateListing = async (req, res) => {
  const { id } = req.params;

  const updatedListing = await listing.findByIdAndUpdate(id, req.body.listing, {
    new: true,
  });
  if (typeof req.file !== "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;
    updatedListing.Image = { url, filename };
    updatedListing.save();
  }

  req.flash("success", "Listing Updated !");
  res.redirect(`/listings/${updatedListing._id}`);
};

module.exports.deleteListing = async (req, res) => {
  const { id } = req.params;
  await listing.findByIdAndDelete(id);
  req.flash("success", "Listings Deleted !");
  res.redirect("/listings");
};
