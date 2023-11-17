import express from "express";
import userController from "../../controllers/user-controllers.js";
import { upload, authenticate, isEmptyBody } from "../../middlewares/index.js";
import { validateBody } from "../../decorators/index.js";

const router = express.Router();

router.patch("/add-avatar", authenticate, upload.single("avatarURL"), userController.addAvatar);
router.get("/current", authenticate, userController.getCurrent);
router.patch("/update", authenticate, upload.single("avatarURL"), userController.updateUserData);

export default router;
