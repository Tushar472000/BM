export const toCurrency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
}).format;

export const pricePerGram = (price: number) => {
  const value = price / 28.35;
  return Math.round(value * 100) / 100;
};

export const pricePerKilo = (price: number) => {
  const value = price / 0.028;
  return Math.round(value * 100) / 100;
};

export const toPercent = (value: number) => {
  const newValue = Math.round(value * 100) / 100;
  return newValue;
};
