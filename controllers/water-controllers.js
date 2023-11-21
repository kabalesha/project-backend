import Water from "../models/water.js";
import User from "../models/User.js";
import { HttpError } from "../middlewares/index.js";
import ControllerWrapper from "../utils/ControllerWrapper.js";
import {
  calculateDailyFulfillment,
  formatDate,
  regroupedDataByDays,
} from "../helpers/index.js";

const getByMonth = async (req, res) => {
  const { _id: owner, waterDailyNorma } = req.user;
  const { monthNumber } = req.params;
  const adjustedMonth = parseInt(monthNumber) - 1; //Уменьшаем на 1, чтобы соответствовать нумерации месяцев в JavaScript

  const startOfMonth = new Date();
  startOfMonth.setMonth(adjustedMonth, 1); // Устанавливает первое число месяца

  const endOfMonth = new Date();
  endOfMonth.setMonth(adjustedMonth + 1, 0); // Устанавливает последний день месяца

  const waterInputsForThisMonth = await Water.find({
    date: {
      $gte: startOfMonth,
      $lte: endOfMonth,
    },
    owner,
  });

  const filteredArray = Object.values(
    regroupedDataByDays(waterInputsForThisMonth)
  );

  const result = filteredArray.map((array) => {
    const formattedDate = formatDate(array[0].date);

    const formattedWaterRate = waterDailyNorma / 1000;

    const dailyNormFulfillment = calculateDailyFulfillment(
      array,
      waterDailyNorma
    );

    return {
      data: formattedDate,
      waterDailyNorma: formattedWaterRate,
      dailyNormFulfillment,
      servingOfWater: array.length,
    };
  });

  res.json(result);
};

const getForToday = async (req, res) => {
  const { _id: owner, waterDailyNorma } = req.user;

  const currentDate = new Date();
  const startOfDay = new Date(currentDate);
  startOfDay.setHours(0, 0, 0, 0); // Установка времени на начало текущего дня

  const endOfDay = new Date(currentDate);
  endOfDay.setHours(23, 59, 59, 999); // Установка времени на конец текущего дня

  const waterInputsForToday = await Water.find({
    date: {
      $gte: startOfDay,
      $lte: endOfDay,
    },
    owner,
  }).select("-createdAt -updatedAt");

  const dailyNormFulfillment = calculateDailyFulfillment(
    waterInputsForToday,
    waterDailyNorma
  );

  res.json({ waterInputsForToday, dailyNormFulfillment });
};

const setDailyNorma = async (req, res) => {
  const { waterDailyNorma } = req.body;
  const { _id } = req.user;
  const result = await User.UserNew.findOneAndUpdate(_id, { waterDailyNorma });
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

const updateById = async (req, res) => {
  const { waterId } = req.params;
  const result = await Water.findByIdAndUpdate(waterId, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(result);
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
  addWater: ControllerWrapper(addWater),
  setDailyNorma: ControllerWrapper(setDailyNorma),
  getById: ControllerWrapper(getById),
  getForToday: ControllerWrapper(getForToday),
  getByMonth: ControllerWrapper(getByMonth),
};
