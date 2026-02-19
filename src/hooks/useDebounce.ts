// // 1) самый очевидный и простой вариант

// import { useEffect, useRef, useState } from "react";

// import { useEffect, useState } from "react";

// export function useDebounce<T>(value: T, delay: number): T {
//   const [debouncedValue, setDebouncedValue] = useState<T>(value);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setDebouncedValue(value);
//     }, delay);

//     return () => {
//       clearTimeout(timer);
//     };
//   }, [value, delay]);

//   return debouncedValue;
// }

// // 2) более явное управлением таймером и предсказуемая очистка через рефу

// export function useDebounce<T>(value: T, delay: number): T {
//   const [debouncedValue, setDebouncedValue] = useState<T>(value);
//   const timeoutRef = useRef<number>(null);

//   useEffect(() => {
//     if (timeoutRef.current) {
//       clearTimeout(timeoutRef.current);
//     }

//     timeoutRef.current = setTimeout(() => {
//       setDebouncedValue(value);
//     }, delay);

//     return () => {
//       if (timeoutRef.current) {
//         clearTimeout(timeoutRef.current);
//       }
//     };
//   }, [value, delay])

//   return debouncedValue
// }


// import { useRef, useEffect, useCallback } from 'react';

// export function useDebounceCallback<T extends (...args: unknown[]) => any>(
//   callback: T,
//   delay: number
// ): T {
//   const timeoutRef = useRef<any>(null);
//   const callbackRef = useRef(callback);

//   useEffect(() => {
//     callbackRef.current = callback;
//   }, [callback]);

//   const debouncedFunction = useCallback((...args: Parameters<T>) => {
//     if (timeoutRef.current) {
//       clearTimeout(timeoutRef.current);
//     }

//     timeoutRef.current = setTimeout(() => {
//       callbackRef.current(...args);
//     }, delay);
//   }, [delay]);

//   return debouncedFunction as T;
// }

import { useRef, useCallback } from 'react';

export function useDebounce<T extends (...args: unknown[]) => any>(
  callback: T,
  delay: number
): T {
  const timeoutRef = useRef<number | null>(null);
  const callbackRef = useRef(callback);

  callbackRef.current = callback;

  const debouncedFunction = useCallback((...args: Parameters<T>) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      callbackRef.current(...args);
    }, delay);
  }, [delay]);

  return debouncedFunction as T;
}
