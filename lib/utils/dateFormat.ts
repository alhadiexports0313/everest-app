export const formatOrderDateTime = (createdAt: number, isUrdu: boolean) => {
  const now = new Date(createdAt);
  const dateLocale = isUrdu ? "ur-PK" : "en-GB";
  const orderDate = now.toLocaleDateString(dateLocale, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  const orderTime = now.toLocaleTimeString(dateLocale, {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  return { orderDate, orderTime };
};
