export const addOneMonth = (date: Date): string => {
  const nextMonthDate = new Date(date);
  nextMonthDate.setMonth(nextMonthDate.getMonth() + 1);

  const formatDate = (d: number): string => d.toString().padStart(2, "0");

  const month = formatDate(nextMonthDate.getMonth() + 1);
  const day = formatDate(nextMonthDate.getDate());
  const year = nextMonthDate.getFullYear();

  return `${month}/${day}/${year}`;
};
