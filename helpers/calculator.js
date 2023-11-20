const calculateDailyFulfillment = (data, waterRate) => {
  const sumOfFulfillment = data.reduce((sum, el) => sum + el.amount, 0);

  const dailyNormFulfillment =
    waterRate !== 0 ? Math.round((sumOfFulfillment / waterRate) * 100) : 0;

  return dailyNormFulfillment;
};

export default calculateDailyFulfillment;
