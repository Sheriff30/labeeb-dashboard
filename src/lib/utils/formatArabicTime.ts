export function formatArabicTime(datetime: string) {
  if (!datetime) return "";

  const date = new Date(datetime);
  const options = { hour: "numeric", hour12: true };
  return new Intl.DateTimeFormat(
    "ar-EG",
    options as Intl.DateTimeFormatOptions
  ).format(date);
}
