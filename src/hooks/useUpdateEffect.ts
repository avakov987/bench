import { useEffect, useRef, type DependencyList, type EffectCallback } from "react";


export default function useUpdateEffect(effect: EffectCallback, dependencies: DependencyList) {
  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current) return effect()

    isMounted.current = true;
  }, dependencies);
}
