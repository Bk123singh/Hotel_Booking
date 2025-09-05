const User = require("../models/user.js");
const passport = require("passport");


module.exports.getsignupForm = (req, res) => {
  res.render("users/signup.ejs");
};

module.exports.getSignUpData = async (req, res) => {
  try {
    let { username, email, password } = req.body;
    const newUser = new User({ email, username });
    const regiserUser = await User.register(newUser, password);
    // console.log(regiserUser);
    req.login(regiserUser, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("sucess", "Welcome to Wanderlust");
      res.redirect("/listings");
    });
  } catch (error) {
    req.flash("error", error.message);
    res.redirect("/signup");
  }
};

module.exports.getLoginForm = (req, res) => {
  res.render("users/login.ejs");
};
module.exports.getLogInData = (req, res) => {
  req.flash("success", "Welcome back to Wanderlust!");
  const redirectUrl = res.locals.redirectUrl || "/listings";
  res.redirect(redirectUrl);
};

module.exports.getLogOut = (req, res, next) => {
  req.logOut((err) => {
    if (err) {
      return next();
    }
    req.flash("success", "you are logged out !");
    res.redirect("/listings");
  });
};
