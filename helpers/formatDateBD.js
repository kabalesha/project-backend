// З повного часу отримуємо години:хвилини
const formatDate = (inputDate) => {
  const dateObj = new Date(inputDate);

  const hours = dateObj.getHours();
  const minutes = dateObj.getMinutes();

  const formattedDate = `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}`;

  return formattedDate;
};

export default formatDate;

// З годин:хвилин у повний час
function convertTimeToFullDate(inputTime) {
  const currentDate = new Date();
  const [hours, minutes] = inputTime.split(":").map(Number);
  currentDate.setHours(hours, minutes, 0, 0);
  const formattedDate = currentDate.toISOString();

  return formattedDate;
}
