// lib/formatDatetime.ts

export function formatDateTime(dateString?: string): string {
  if (!dateString) return "";

  const date = new Date(
    dateString.endsWith("Z") ? dateString : `${dateString}Z`
  );

  if (isNaN(date.getTime())) return "";

  return new Intl.DateTimeFormat("vi-VN", {
    timeZone: "Asia/Ho_Chi_Minh",
    weekday: "long",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}
