// 1) возвращаю функцию, чтобы была актуальное значение(примитив не будет содержать актуального значения)

import { useRef, useEffect } from 'react';

export default function useIsMounted(): () => boolean {
  const isMountedRef = useRef(false);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  return () => isMountedRef.current;
}