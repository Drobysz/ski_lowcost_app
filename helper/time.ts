export const getNights = (checkIn: string, checkOut: string) => {
    const start = new Date(checkIn);
    const end = new Date(checkOut);

    const diffMs = end.getTime() - start.getTime();
    return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
};

export const getPeriodString = (checkIn: string, checkOut: string)=> {
    const start = new Date(checkIn);
    const end = new Date(checkOut);

    const month_in = start.toLocaleString('en-US', { month: 'short' });
    const day_in = start.getDay().toString();

    const month_out = end.toLocaleString('en-US', { month: 'short' });
    const day_out = end.getDay().toString();

    return `${month_in} ${day_in} - ${month_out} ${day_out} (${getNights(checkIn, checkOut)} nights)`;
}

export const toInputDate = (date: string | Date) => {
  return new Date(date).toISOString().split("T")[0];
};

export const addDaysToInputDate = (date: string | Date, days: number) => {
  const nextDate = new Date(date);
  nextDate.setDate(nextDate.getDate() + days);

  return toInputDate(nextDate);
};

export const isValidInputDateRange = (checkIn: string, checkOut: string) => {
  const start = new Date(checkIn).getTime();
  const end = new Date(checkOut).getTime();

  return Number.isFinite(start) && Number.isFinite(end) && end > start;
};

export const getWeeks = (checkIn: string, checkOut: string)=> {
  const start = new Date(checkIn);
  const end = new Date(checkOut);

  return Math.ceil(Math.abs(end.getTime() - start.getTime()) / (1000 * 3600 * 24 * 7));
}

export const getTimeStatus = (checkIn: string, checkOut: string, currentDate: string)=> {
  const start = new Date(checkIn);
  const end = new Date(checkOut);
  const today = new Date(currentDate);

  if (start >= today) {
    return "upcoming";
  } else if (end < today) {
    return "past"
  } else {
    return "current"
  }
}