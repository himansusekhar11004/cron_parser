export const minute = 59;
export const hour = 23;
export const month = 12;
export const day_of_month = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();
export const day_of_week = 7;
export const expression_map = ["minute", "hour", "day_of_month", "month", "day_of_week", "command"];
export const ranges = {
    minute: [0, minute],
    hour: [0, hour],
    month: [1, month],
    day_of_month: [1, day_of_month],
    day_of_week: [1, day_of_week]
};