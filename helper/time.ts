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