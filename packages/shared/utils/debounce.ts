interface DebouncedFunction<T extends (...args: any[]) => void> {
  (...args: Parameters<T>): void;
  cancel: () => void;
}

export function debounce<T extends (...args: any[]) => void>(func: T, wait: number): DebouncedFunction<T> {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  const debouncedFunction: DebouncedFunction<T> = function(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout!);
      func(...args);
    };
    clearTimeout(timeout!);
    timeout = setTimeout(later, wait);
  } as DebouncedFunction<T>;

  debouncedFunction.cancel = () => {
    if (timeout !== null) {
      clearTimeout(timeout);
      timeout = null;
    }
  };

  return debouncedFunction;
}
