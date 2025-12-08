// import { useEffect, useRef } from "react";

// export function usePrevious<T>(value: T): T | null {
//   const ref = useRef<T | null>(null);

//   useEffect(() => {
//     ref.current = value;
//   }, [value]);

//   return ref.current;
// }

// // пользуемся тем что до первого рендера рефа пуста, а юзэффект сработает после монтирования

// import { useState, useEffect } from 'react';

// export function usePrevious<T>(value: T): T | undefined {
//   const [previous, setPrevious] = useState<T | undefined>();
//   const [current, setCurrent] = useState(value);

//   useEffect(() => {
//     if (current !== value) {
//       setPrevious(() => current);
//       setCurrent(() => value);
//     }
//   }, [value, current]);

//   return previous;
// }

// import { useRef, useLayoutEffect } from 'react';

// export function usePrevious<T>(value: T): T | null {
//   const ref = useRef<T | null>(null);

//   useLayoutEffect(() => {
//     console.log(ref.current, value);

//     ref.current = value;
//   });

//   return ref.current;
// }