export const formatXAF = (amount: number): string => {
  if (amount === undefined || amount === null) return '0 XAF';
  const integerPart = Math.round(amount).toString();
  const formatted = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return `${formatted} XAF`;
};
