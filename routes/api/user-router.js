import express from "express";
import userController from "../../controllers/user-controllers.js";
import { upload, authenticate, isEmptyBody } from "../../middlewares/index.js";
import { validateBody } from "../../decorators/index.js";
// import { emailSchema, loginSchema, registerSchema } from "../../models/user.js";

// const registerValidate = validateBody(registerSchema);
// const loginValidate = validateBody(loginSchema);
// const emailValidate = validateBody(emailSchema);

const userRouter = express.Router();

// userRouter.post("/register", userController.register);
// userRouter.get("/verify/:verificationToken", userController.verify);
// userRouter.post("/verify", isEmptyBody, emailValidate, userController.resendValidateEmail);
// userRouter.post("/login", loginValidate, userController.login);
userRouter.post(
  "/add-avatar",
  upload.single("avatar"),
  userController.addAvatar
);
userRouter.get("/current", userController.getCurrent);
// userRouter.patch(
//   "/avatars",
//   authenticate,
//   upload.single("avatar"),
//   userController.updateAvatar
// );
// Error: Route.patch() requires a callback function but got a [object Undefined]

export default userRouter;
