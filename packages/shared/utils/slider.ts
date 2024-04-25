export function slider(slides: React.RefObject<HTMLDivElement | HTMLElement>) {
    let startX: number;
    let isDown: boolean = false;
    let scrollLeft: number | undefined = 0;
    let current = slides.current;

    const handleMouseDown = (e: any) => {
      isDown = true;
      current?.classList.add("active");
      startX = e.pageX - (current?.offsetLeft ? current?.offsetLeft : 0);
      scrollLeft = current?.scrollLeft;
    };

    const handleMouseLeave = () => {
      isDown = false;
      current?.classList.remove("active");
    };

    const handleMouseUp = () => {
      isDown = false;
      current?.classList.remove("active");
    };

    const handleMouseMove = (e: any) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - (current?.offsetLeft ? current?.offsetLeft : 0);
      const walk = (x - startX) * 3; 
      if (current) current.scrollLeft = (scrollLeft ? scrollLeft : 0) - walk;
    };

    if (current) {
      current?.addEventListener("mousedown", handleMouseDown);
      current?.addEventListener("mouseleave", handleMouseLeave);
      current?.addEventListener("mouseup", handleMouseUp);
      current?.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      if (current) {
        current?.removeEventListener("mousedown", handleMouseDown);
        current?.removeEventListener("mouseleave", handleMouseLeave);
        current?.removeEventListener("mouseup", handleMouseUp);
        current?.removeEventListener("mousemove", handleMouseMove);
      }
    };
}

