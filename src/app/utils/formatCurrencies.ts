export function formatToUSD(amount: number): string {
  const sanitizedAmount = parseFloat(String(amount));

  return sanitizedAmount.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
}
