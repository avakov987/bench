import { useEffect, useRef, type RefObject } from 'react';

export default function useClickOutside(
  callback: () => void
): RefObject<HTMLElement | null> {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;

      if (ref.current && !ref.current.contains(event.target)) callback();
    }


    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return ref;
}


// export default function useClickOutside(callback: () => void) {
//   const ref = useRef<HTMLElement>(null);
//   const callbackRef = useRef(callback);

//   if (callbackRef.current !== callback) {
//     callbackRef.current = callback;
//   }

//   useEffect(() => {
//     const handler = (event: MouseEvent) => {
//       if (!(event.target instanceof Element)) return;

//       if (ref.current && !ref.current.contains(event.target)) {
//         callbackRef.current();
//       }
//     };

//     document.addEventListener('mousedown', handler);

//     return () => {
//       document.removeEventListener('mousedown', handler);
//     };
//   }, []);

//   return ref;
// }