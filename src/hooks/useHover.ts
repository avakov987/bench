import { useEffect, useRef, useState } from "react";

export default function useHover<T extends HTMLElement>() {
  const [isHover, setIsHover] = useState(false);
  const hoverRef = useRef<T | null>(null);

  useEffect(() => {
    const element = hoverRef.current;

    if (!element) return;

    const handleMouseEnter = () => setIsHover(true);
    const handleMouseLeave = () => setIsHover(false);

    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return { hoverRef, isHover };
}

// цепляемся к событиям и выясняем какое сработало в зависимости от этого ставим изховер или нет