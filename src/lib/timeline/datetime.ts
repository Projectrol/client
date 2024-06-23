const getTotalDaysInMonth = (month: number, year: number): number => {
  return new Date(year, month, 0).getDate();
};

const getTotalDaysInYear = (year: number): number => {
  const totalMonths = 12;
  const totalDays = Array(totalMonths)
    .fill("")
    .reduce(
      (currTotal, _, i) => currTotal + getTotalDaysInMonth(i + 1, year),
      0
    );
  return totalDays;
};

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export { getTotalDaysInMonth, getTotalDaysInYear, monthNames };
