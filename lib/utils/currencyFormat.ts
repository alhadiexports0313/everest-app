export const createPkrFormatter = (locale: string) => (value: number) =>
  new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "PKR",
    maximumFractionDigits: 0,
  }).format(value);

export const createUsdFormatter = (usdRate: number | null) => {
  if (!usdRate) return null;
  return (value: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value * usdRate);
};
