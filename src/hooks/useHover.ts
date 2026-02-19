// цепляемся к событиям и выясняем какое сработало в зависимости от этого ставим изховер или нет

// 1) самый простой вариант, но ненадежный, могут возникнуть проблемы при условной рендеринге и при изменении ДОМ, возможные утечки памяти
// для статических элементов можно использовать
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
      console.log('&&&');

      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return { hoverRef, isHover };
}

// // 2) вариант с инпользование callback и ref, предсказуемо будет работать с условным рендерингом, нет утечек
// import { useState, useCallback, useRef, useEffect } from 'react';

// export default function useHover<T extends HTMLElement = HTMLElement>() {
//   const [isHover, setIsHover] = useState(false);
//   const cleanupRef = useRef<(() => void) | null>(null);

//   const hoverRef = useCallback((node: T | null) => {
//     if (cleanupRef.current) {
//       cleanupRef.current();
//       cleanupRef.current = null;
//     }

//     if (!node) {
//       setIsHover(false);
//       return;
//     }

//     const handleMouseEnter = () => setIsHover(true);
//     const handleMouseLeave = () => setIsHover(false);

//     node.addEventListener('mouseenter', handleMouseEnter);
//     node.addEventListener('mouseleave', handleMouseLeave);

//     cleanupRef.current = () => {
//       node.removeEventListener('mouseenter', handleMouseEnter);
//       node.removeEventListener('mouseleave', handleMouseLeave);
//     };
//   }, []);


//   useEffect(() => {
//     return () => {
//       cleanupRef.current?.();
//     };
//   }, []);

//   return { hoverRef, isHover };
// }