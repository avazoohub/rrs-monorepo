export function getTimeElapsed(pastDate: any) {
    const currentDate = new Date();
  
    const timeDifference = currentDate.getTime() - pastDate.getTime();
  
    const hours = Math.floor(timeDifference / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  
    if (minutes < 60) {
      return `${minutes} minutes ago`
    } else if(hours < 24) {
      return `${hours} hours ago`
    }

    return `${days} days ago`
}