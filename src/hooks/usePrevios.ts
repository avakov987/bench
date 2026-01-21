// этот способ решает проблему что если какое-то другое состояние обновится, юзПревиос вернет актуальный каррент который равен велью
// это происходит так как хук раньше возвращал сначала current а затем его же и менял после того как компонент ренедрелился и при этом велью не менялся
// вариант с useMemo считаю избыточным(замысел чтобы хук выполнялся только при обновлении велью), вариант с 2умя стейтами неоптимизированным

// 1) вариант с юзЭффект для стриктМод, но все же оптимизированеimport { useRef, useEffect } from 'react';

export function usePrevious<T>(value: T): T | undefined {
  const currentRef = useRef<T>(value);
  const prevRef = useRef<T | undefined>(undefined);

  useEffect(() => {
    if (currentRef.current !== value) {
      prevRef.current = currentRef.current;
      currentRef.current = value;
    }
  }, [value]);

  return prevRef.current;
}

// 2)
import { useRef } from "react";

export function usePrevious<T>(value: T): T | undefined {
  const currentRef = useRef<T>(value)
  const previousRef = useRef<T | undefined>(undefined)
  if (currentRef.current !== value) {
    previousRef.current = currentRef.current
    currentRef.current = value
  }

  return previousRef.current
}

