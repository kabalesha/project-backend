import Water from "../models/water.js";
import WaterProfile from "../models/waterProfile.js";

import { HttpError } from "../middlewares/index.js";
import ControllerWrapper from "../utils/ControllerWrapper.js";

const getDailyNorma = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await WaterProfile.findOne(owner);
  res.json(result);
};

const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await WaterProfile.find(owner);
  res.json(result);
};

const setDailyNorma = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await WaterProfile.findOneAndUpdate(owner, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(201).json(result);
};

const addWater = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Water.create({ owner, ...req.body });
  res.status(201).json(result);
};

const getById = async (req, res) => {
  const { waterId } = req.params;
  const result = await Water.findById(waterId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

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
  updateById: ControllerWrapper(updateById),
  deleteById: ControllerWrapper(deleteById),
  getAll: ControllerWrapper(getAll),
  addWater: ControllerWrapper(addWater),
  getDailyNorma: ControllerWrapper(getDailyNorma),
  setDailyNorma: ControllerWrapper(setDailyNorma),
  getById: ControllerWrapper(getById),
};
