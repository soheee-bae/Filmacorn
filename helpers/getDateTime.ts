export const getYearandMonth = (dateStr: string) => {
  let dates = dateStr.split("-");
  const year = dates[0];

  const date = new Date();
  date.setMonth(Number(dates[1]) - 1);
  const month = date.toLocaleString("en-US", { month: "long" });

  return { year, month };
};

export const getTimeWithFormat = (totalMinutes: number) => {
  const hours = Math.floor(totalMinutes / 60);
  const hourUnit = hours < 2 ? "hr" : "hrs";
  const minutes = totalMinutes % 60;
  const minUnit = minutes < 2 ? "min" : "mins";

  return { hours, hourUnit, minutes, minUnit };
};
