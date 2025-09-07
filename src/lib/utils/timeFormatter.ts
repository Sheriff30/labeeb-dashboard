export function formatTimeArabic(timeStr: string) {
  const [hourStr, minuteStr] = timeStr.split(":");
  let hour = parseInt(hourStr, 10);

  const period = hour < 12 ? "ص" : "م";

  hour = hour % 12 || 12;

  return `${hour}:${minuteStr} ${period}`;
}
