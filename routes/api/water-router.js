import express from "express";
import { authenticate, isValidId } from "../../middlewares/index.js";
import { validateBody } from "../../decorators/index.js";
import waterControllers from "../../controllers/water-controllers.js";
import waterAddSchema from "../../models/water.js";
const router = express.Router();

const waterAddValidate = validateBody(waterAddSchema);

router.use(authenticate);

router.get("/");

router.get("/:waterId", isValidId, waterControllers.getById);

router.post("/", waterAddValidate, waterControllers.addWater);

router.patch(
  "/:waterId",
  isValidId,
  waterAddValidate,
  waterControllers.updateById
);

router.delete("/:waterId", isValidId, waterControllers.deleteById);

router.get("/dailyNorma", waterControllers.getDailyNorma);

router.patch("/dailyNorma", waterControllers.setDailyNorma);

export default router;
