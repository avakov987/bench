

import { useEffect, useRef, type EffectCallback } from 'react'

// 1) через замыкание
// export function useEffectOnce(effect: EffectCallback) {
//   const hasRun = useRef(false)
//   const cleanupRef = useRef<ReturnType<EffectCallback>>(null)

//   useEffect(() => {
//     if (!hasRun.current) {
//       const cleanup = effect() // Сохраняем в локальной переменной
//       hasRun.current = true

//       return () => {
//         if (cleanup) {
//           cleanup()
//         }
//       }
//     }
//   }, [])
// }
// 2) либо так через юзРеф
export function useEffectOnce(effect: EffectCallback) {
  const hasRun = useRef(false)
  const cleanupRef = useRef<ReturnType<EffectCallback>>(null)

  useEffect(() => {
    if (!hasRun.current) {
      cleanupRef.current = effect()
      // effect()
      hasRun.current = true
    }

    return () => {
      console.log('****');
    }
    // () => {
    // if (cleanupRef.current) {
    //   cleanupRef.current()
    // }

    // }
  }, [])
}