import express from "express";
import { authenticate, isValidId } from "../../middlewares/index.js";
import { validateBody } from "../../decorators/index.js";
import waterControllers from "../../controllers/water-controllers.js";
import waterAddSchema from "../../models/water.js";
const router = express.Router();

const waterAddValidate = validateBody(waterAddSchema);

router.use(authenticate);

router.get("/today", waterControllers.getForToday);

router.get("/month", waterControllers.getByMonth);

router.get("/stats", waterControllers.getStatsForDay);

router.get("/getById/:waterId", isValidId, waterControllers.getById);

router.post("/add", waterAddValidate, waterControllers.addWater);

router.patch(
  "/update/:waterId",
  isValidId,
  waterAddValidate,
  waterControllers.updateById
);

router.delete("/delete/:waterId", isValidId, waterControllers.deleteById);

router.patch("/update/dailyNorma", waterControllers.setDailyNorma);

export default router;
