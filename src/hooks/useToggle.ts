// использую тут юзКоллбэк так как если передавать тогл в другой компонент он будет его триггерить на ререндер

import { useCallback, useState } from "react";

export default function useToggle(initialState = false): { value: boolean; toggle: () => void } {
  const [state, setState] = useState(initialState)

  const toggle = useCallback(() => {
    setState((prevState) => !prevState)
  }, [])

  return { value: state, toggle }
}

// import { useCallback, useState } from "react";

// export default function useToggle(initialState = false): { value: boolean; toggle: () => void } {
//   const [state, setState] = useState(initialState)

//   const toggle = () => {
//     setState((prevState) => !prevState)
//   }

//   return { value: state, toggle }
// }