import express from "express";
import userController from "../../controllers/user-controllers.js";
import { upload, authenticate, isEmptyBody } from "../../middlewares/index.js";
import { validateBody } from "../../decorators/index.js";

const router = express.Router();

// router.post("/add-avatar", authenticate, upload.single("avatarURL"), userController.addAvatar);
router.get("/current", authenticate, userController.getCurrent);
router.patch(
  "/update",
  authenticate,
  upload.single("avatarURL"),
  userController.updateUserData
);
// router.patch("/add-avatar", authenticate, upload.single("avatarURL"), userController.addAvatar);
// router.get("/current", authenticate, userController.getCurrent);
// router.patch("/update", authenticate, userController.updateUserData);
// >>>>>>> aba55f5df9a23b77931c573dad9beb00820bc8a1

export default router;
