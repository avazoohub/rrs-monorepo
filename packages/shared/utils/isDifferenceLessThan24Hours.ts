export function isDifferenceLessThan24Hours(dateTime1: any | string | undefined, dateTime2: string | undefined): boolean | undefined {
  if (dateTime1 && dateTime2) {
    const date1 = new Date(dateTime1);
    const date2 = new Date(dateTime2);
    
    // Calculate the difference in milliseconds
    const difference = Math.abs(date2.getTime() - date1.getTime());

    // Check if the difference is less than 24 hours (24 * 60 * 60 * 1000 milliseconds)
    return difference < 86400000;
  }
  
  return undefined
  }
  
  