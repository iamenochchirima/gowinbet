import { MagicToken } from "@/@types/tokens";

export const formatAmount = (value: number | string | undefined, item: MagicToken): string => {
  if (value === undefined) {
    return "--";
  }

  // Convert value to a number if it's a string
  const numericValue = typeof value === "string" ? parseFloat(value) : value;

  // Handle invalid numbers (e.g., NaN)
  if (isNaN(numericValue)) {
    return "--";
  }

  if (numericValue < 100) {
    return numericValue.toFixed(4);
  }

  const decimals = item.metadata.decimals ?? 0;

  const adjustedValue = numericValue / Math.pow(10, decimals);

  if (adjustedValue >= 1_000_000_000) {
    return (adjustedValue / 1_000_000_000).toFixed(1).replace(/\.0$/, "") + "B";
  }
  if (adjustedValue >= 1_000_000) {
    return (adjustedValue / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  }
  if (adjustedValue >= 1_000) {
    return (adjustedValue / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
  }

  return adjustedValue.toFixed(2).replace(/\.00$/, "");
};

export const formatAmountWithoutToken = (value: number | undefined): string => {
  if (value === undefined) {
    return "--";
  }

  if (value < 100) {
    return value.toFixed(4).replace(/\.00$/, '');
  }

  if (value >= 1_000_000_000) {
    return (value / 1_000_000_000).toFixed(1).replace(/\.0$/, '') + "B";
  }
  if (value >= 1_000_000) {
    return (value / 1_000_000).toFixed(1).replace(/\.0$/, '') + "M";
  }
  if (value >= 1_000) {
    return (value / 1_000).toFixed(1).replace(/\.0$/, '') + "K";
  }
  
  return value.toFixed(2).replace(/\.00$/, '');
}