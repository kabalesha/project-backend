const regroupedDataByDays = (array) => {
  return array.reduce((acc, obj) => {
    const date = new Date(obj.date);
    date.setHours(0, 0, 0, 0); // Установка времени на начало текущего дня

    if (!acc[date]) {
      acc[date] = [];
    }

    acc[date].push(obj);
    return acc;
  }, {});
};

export default regroupedDataByDays;
