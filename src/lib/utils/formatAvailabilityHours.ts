type AvailabilityHours = {
  morning?: string;
  afternoon?: string;
};

export const formatAvailabilityHours = (
  availabilityHours: AvailabilityHours
) => {
  const formatTimeRange = (timeRange: string) => {
    const [start, end] = timeRange.split("-");

    const formatTime = (time: string) => {
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

    return `${formatTime(start)}-${formatTime(end)}`;
  };

  const formatted: string[] = [];

  if (availabilityHours.morning) {
    formatted.push(`${formatTimeRange(availabilityHours.morning)} صباحاً`);
  }

  if (availabilityHours.afternoon) {
    formatted.push(`${formatTimeRange(availabilityHours.afternoon)} مساءً`);
  }

  return formatted.join(" و ");
};
