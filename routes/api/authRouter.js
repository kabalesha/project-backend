import express from "express";
import isEmptyBody from "../../middlewares/isEmptyBody.js";
import authController from "../../controllers/authControllers.js";
import User from "../../models/User.js";
import validateBodyAuth from "../../middlewares/validateBodyAuth.js";

const router = express.Router();

router.post(
  "/singup",
  isEmptyBody,
  validateBodyAuth(User.userSingUpSchema),
  authController.singUp
);

router.post(
  "/singin",
  isEmptyBody,
  validateBodyAuth(User.userSingInSchema),
  authController.singIn
);

// router.post("/logout", authentificate, authController.logout);

// router.get("/current", authentificate, authController.current);

// router
//   .route("/")
//   .get(authentificate, authController.findUsersStatusFavorite)
//   .patch(authentificate, authController.updateUserSubscription);

// router.patch(
//   "/avatars",
//   authentificate,
//   storage.single("avatar"),
//   authController.updateAvatar
// );

// router.get("/verify/:verificationToken", authController.verify);

// router.post(
//   "/verify",
//   validateBodyAuth(userEmailSchema),
//   authController.resendVerify
// );

// module.exports = router;

export default router;
