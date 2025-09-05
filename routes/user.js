const express = require("express");
const router = express.Router();
const User = require("../models/user");
const wrapAsync = require("../utils/wrapAsync");
const { route } = require("./listings");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware");
const controller = require("../controller/user.js");

router
  .route("/signup")
  .get(controller.getsignupForm)
  .post(wrapAsync(controller.getSignUpData));

router
  .route("/login")
  .get(controller.getLoginForm)
  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    controller.getLogInData
  );

router.get("/logout", controller.getLogOut);
module.exports = router;
