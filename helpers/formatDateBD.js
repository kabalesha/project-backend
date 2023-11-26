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
