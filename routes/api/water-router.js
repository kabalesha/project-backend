import express from "express";
const router = express.Router();

router.use(authenticate);

router.get("/");

router.get("/:waterId");

router.post("/");

router.patch("/:waterId");

router.delete("/:waterId");

router.get("/dailyNorma");

router.patch("/dailyNorma");

export default router;
