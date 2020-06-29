// number formatter

export const CurrencyFormatter = (money: number) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  });

  return formatter.format(money);
};

export const DateFormatter = (date: string | number) => {
  // ms to  YYYY-MM-DD  HH:MM
  return new Date(date).toISOString().slice(0, 16).replace(/T/g, " ");
};
