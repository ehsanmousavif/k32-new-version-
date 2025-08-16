export function timeAgo(createdAt: Date | string) {
  if (!createdAt) return "تاریخ نامشخص";

  const now = new Date();
  const past = new Date(createdAt);
  const diff = now.getTime() - past.getTime();

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30));
  const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));

  if (years > 0) return `${years} سال پیش`;
  if (months > 0) return `${months} ماه پیش`;
  if (days > 0) return `${days} روز پیش`;
  if (hours > 0) return `${hours} ساعت پیش`;
  if (minutes > 0) return `${minutes} دقیقه پیش`;
  if (seconds > 0) return `${seconds} ثانیه پیش`;

  return "همین الان";
}
