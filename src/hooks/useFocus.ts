import { useState, useRef, useEffect, type RefObject } from 'react';

export default function useFocus<T extends HTMLElement = HTMLElement>(): [
  RefObject<T | null>,
  boolean
] {
  const [isFocused, setIsFocused] = useState(false);
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const element = ref.current

    if (!element) return;

    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);

    element.addEventListener('focus', handleFocus);
    element.addEventListener('blur', handleBlur);

    return () => {
      element.removeEventListener('focus', handleFocus);
      element.removeEventListener('blur', handleBlur);
    };
  }, []);

  return [ref, isFocused];
}