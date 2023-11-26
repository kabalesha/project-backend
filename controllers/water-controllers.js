import Water from "../models/water.js";
import User from "../models/User.js";
import { HttpError } from "../middlewares/index.js";
import ControllerWrapper from "../utils/ControllerWrapper.js";
import {
  calculateDailyFulfillment,
  formatDate,
  regroupedDataByDays,
} from "../helpers/index.js";
import formatTime from "../helpers/formatDateBD.js";

const getByMonth = async (req, res) => {
  const { _id: owner, waterDailyNorma } = req.user;
  const { monthNumber } = req.params;
  // console.log(req.params);
  // console.log(req);
  // console.log(monthNumber);
  const adjustedMonth = parseInt(monthNumber) - 1;

  const startOfMonth = new Date();
  startOfMonth.setMonth(adjustedMonth, 1);
  startOfMonth.setHours(0, 0, 0, 0); // Устанавливает первое число месяца

  const endOfMonth = new Date();
  endOfMonth.setMonth(adjustedMonth + 1, 0); // Устанавливает последний день месяца
  endOfMonth.setHours(23, 59, 59, 999);

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

const getStatsForDay = async (req, res) => {
  const { _id: owner, waterDailyNorma } = req.user;
  const { day, month } = req.params;
  const adjustedDay = parseInt(day);
  const adjustedMonth = parseInt(month) - 1;

  const date = new Date();
  date.setMonth(adjustedMonth);
  date.setDate(adjustedDay);

  const waterServings = await Water.find({ date, owner });

  const dailyNormFulfillment = calculateDailyFulfillment(
    waterServings,
    waterDailyNorma
  );

  res.json({
    waterDailyNorma,
    dailyNormFulfillment,
    waterServings,
  });
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
  const { date, amount } = req.body;

  const convertDateFullTime = formatTime.convertTimeToFullDate(date);

  const user = await Water.create({ owner, amount, date: convertDateFullTime });

  const convertDateLittleTime = formatTime.formatDate(user.date);

  res
    .status(201)
    .json({ date: convertDateLittleTime, amount: user.amount, _id: user._id });
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
  const { date, amount } = req.body;

  const convertDateFullTime = formatTime.convertTimeToFullDate(date);
  const result = await Water.findByIdAndUpdate(
    waterId,
    { date: convertDateFullTime },
    { amount },
    {
      new: true,
    }
  );

  if (!result) {
    throw HttpError(404, "Not found");
  }

  const convertDateLittleTime = formatTime.formatDate(result.date);
  res.status(200).json({
    date: convertDateLittleTime,
    amount: result.amount,
    _id: result._id,
  });
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
  getStatsForDay: ControllerWrapper(getStatsForDay),
};
