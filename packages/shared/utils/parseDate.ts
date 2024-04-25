export function parseDate(date: string | Date, withTime?: boolean, type: string = 'full') {
    const originalDate = date;
    const parsedDate = new Date(originalDate);

    const yearFormat = `numeric`;
    const monthFormat = `2-digit`;
    const dateFormat = `numeric`;
    const hourFormat = `2-digit`;
    const minuteFormat = `2-digit`;
    const secondFormat = `2-digit`;

    let options: Intl.DateTimeFormatOptions = {
        dateStyle: 'medium',
        // year: yearFormat,
        // month: monthFormat,
        // day: dateFormat,
        // hour: hourFormat,
        // minute: minuteFormat,
        // second: secondFormat,
        hour12: true,
        timeZone: 'America/New_York'
    };

    return parsedDate.toLocaleDateString('en-US', options)
}