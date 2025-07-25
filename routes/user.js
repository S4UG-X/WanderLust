const express = require("express");
const router = express.Router();

const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

const userController = require("../controller/user.js");

router
  .route("/signup")
  .get(userController.renderSignup)
  .post(userController.signupPost);
router
  .route("/login")
  .get(userController.renderLogin)
  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    userController.loginPost
  );

router.get("/logout", userController.logout);

module.exports = router;
