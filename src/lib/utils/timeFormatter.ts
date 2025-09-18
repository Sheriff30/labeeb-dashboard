export const formatTime = (time: string) => {
  if (!time) return "";

  const [hours, minutes] = time.split(":");
  const hour = parseInt(hours);
  const min = parseInt(minutes);

  // Convert to 12-hour format
  let displayHour = hour;
  let period = "";

  if (hour === 0) {
    displayHour = 12;
    period = "ص";
  } else if (hour < 12) {
    period = "ص";
  } else if (hour === 12) {
    period = "م";
  } else {
    displayHour = hour - 12;
    period = "م";
  }

  // Format the time
  if (min === 0) {
    return `${displayHour}${period}`;
  } else {
    return `${displayHour}:${min.toString().padStart(2, "0")}${period}`;
  }
};
