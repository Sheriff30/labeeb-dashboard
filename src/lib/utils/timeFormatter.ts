export const formatTime = (time: string) => {
  const [h, m] = time.split(":");
  let hour = parseInt(h);

  // Convert 24-hour to 12-hour format
  if (hour === 0) {
    hour = 12; // 00:xx becomes 12:xx AM
  } else if (hour > 12) {
    hour = hour - 12; // 13:xx becomes 1:xx PM, 17:xx becomes 5:xx PM
  }

  return m === "00" ? hour.toString() : `${hour}:${m}`;
};
