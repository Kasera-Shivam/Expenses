import express from "express";
import passport from "passport";
import middleware from "../middleware.js";
import userController from "../controllers/user.controller.js";

const router = express.Router({ mergeParams: true });

router.route("/google").get(
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router
  .route("/login")
  .get(passport.authenticate("google"), userController.login);

router
  .route("/fetch/me")
  .get(middleware.isAuthenticated, userController.fetchMyAccount);

export default router;
