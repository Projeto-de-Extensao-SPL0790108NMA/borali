import { useCallback, useRef } from 'react';

/**
 * @param {string} value - The value to be debounced.
 * @param func
 * @param {number} [delay] - The delay in milliseconds (default: 500 ms).
 * @returns {string} The debounced value.
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useDebounce<T extends (...args: any[]) => void>(
  func: T,
  delay: number,
): (...args: Parameters<T>) => void {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const debouncedFunction = useCallback(
    (...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        func(...args);
      }, delay);
    },
    [func, delay],
  );

  return debouncedFunction;
}
