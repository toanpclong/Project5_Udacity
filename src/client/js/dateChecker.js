function checkForDate(stringDate) {
  console.log("::: Running checkForDate :::", stringDate);
  const dateNow = new Date();
  const dateInput = new Date(stringDate);
  const periodDay = Math.round(
    (dateInput.getTime() - dateNow.getTime()) / (1000 * 3600 * 24)
  );
  return periodDay;
}

export { checkForDate };
