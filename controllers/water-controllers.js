import Water from "../models/water.js";

import { HttpError } from "../middlewares/index.js";
import { ctrlWrapper } from "../decorators/index.js";

const getDailyNorma = (req, res) => {};

const setDailyNorma = (req, res) => {};

const addWater = (req, res) => {};

const waterStats = (req, res) => {};

const updateById = async (req, res) => {
  const { waterId } = req.params;
  const result = await Water.findByIdAndUpdate(waterId, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(201).json(result);
};

const deleteById = async (req, res) => {
  const { waterId } = req.params;
  const result = await Water.findByIdAndDelete(waterId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json({
    message: "Delete success",
  });
};

export default {
  updateById: ctrlWrapper(updateById),
  deleteById: ctrlWrapper(deleteById),
};
