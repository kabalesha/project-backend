import express from "express";
import userController from "../../controllers/user-controllers.js";
import { upload, authenticate } from "../../middlewares/index.js";

const router = express.Router();

router.get("/current", authenticate, userController.getCurrent);
router.patch(
  "/add-avatar",
  authenticate,
  upload.single("avatarURL"),
  userController.addAvatar
);

export default router;
