export function getHour(date: any) {
    const datetimeString = date
    const formattedDate = new Date(datetimeString);

    let hours: any = formattedDate.getHours();
    const minutes = String(formattedDate.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'pm' : 'am';

    // Convert to 12-hour format
    hours = hours % 12;
    // The hour '0' should be '12'
    hours = hours ? hours : 12; // the hour '0' should be '12'
    hours = String(hours).padStart(2, '0');

    return `${hours}:${minutes} ${ampm}`
}