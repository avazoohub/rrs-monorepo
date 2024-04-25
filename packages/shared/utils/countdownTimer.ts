export function countdownTimer(date: string | Date | any) {
    
    const timer = setInterval(function() {
        const now = new Date().getTime();
        const distance = date - now;
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        if (distance < 0) {
            clearInterval(timer);
            return "EXPIRED";
        }

        return `${days} + "d " + ${hours} + "h " + ${minutes} + "m " + ${seconds} + "s"`
  
    }, 1000);

    return timer
}