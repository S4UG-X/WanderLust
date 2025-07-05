const User = require("../models/User.js");

module.exports = {
  renderSignup: (req, res) => {
    res.render("users/signup.ejs", { title: "signup" });
  },
  signupPost: async (req, res) => {
    try {
      let { username, email, password } = req.body;
      let newUser = new User({
        username,
        email,
      });
      const registeredUser = await User.register(newUser, password);
      req.login(registeredUser, (err) => {
        if (err) {
          return next(err);
        }
        req.flash("success", "Welcome to WanderLust!"); // Set success message
        res.redirect("/listings");
      });
    } catch (err) {
      req.flash("error", err.message);
      res.redirect("/signup");
    }
  },
  renderLogin: (req, res) => {
    res.render("users/login.ejs", { title: "Login" });
  },
  loginPost: (req, res) => {
    req.flash("success", "Welcome back to WanderLust");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
  },
  logout: (req, res, next) => {
    req.logout(function (err) {
      if (err) {
        return next(err);
      }
      req.flash("success", "Logged out successfully!");
      let redirectUrl = res.locals.redirectUrl || "/listings";

      res.redirect(redirectUrl);
    });
  },
};
