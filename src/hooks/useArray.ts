// import { useState, useMemo } from 'react';

// export default function useArray<T>(initialValue: T[] = []) {
//   const [value, setValue] = useState<T[]>(initialValue);

//   const methods = useMemo(() => ({
//     push: (item: T) => setValue(prev => [...prev, item]),
//     pop: () => setValue(prev => prev.slice(0, -1)),
//     unshift: (item: T) => setValue(prev => [item, ...prev]),
//     shift: () => setValue(prev => prev.slice(1)),
//     removeByIndex: (index: number) => setValue(prev => prev.filter((_, i) => i !== index)),
//     clear: () => setValue([]),
//     update: (index: number, item: T) => setValue(prev => prev.map((el, i) => i === index ? item : el)),
//     insert: (index: number, item: T) => setValue(prev => [
//       ...prev.slice(0, index),
//       item,
//       ...prev.slice(index)
//     ])
//   }), []);

//   return {
//     value,
//     methods
//   };
// }

// // 2) подход близкий к редаксу
// import { useReducer, useMemo } from 'react';

// function createArrayReducer<T>() {

//   return (state: T[], action: any): T[] => {
//     switch (action.type) {
//       case 'PUSH': return [...state, action.payload];
//       case 'POP': return state.slice(0, -1);
//       case 'UNSHIFT': return [action.payload, ...state];
//       case 'SHIFT': return state.slice(1);
//       case 'REMOVE_BY_INDEX': return state.filter((_, i) => i !== action.payload);
//       case 'CLEAR': return [];
//       case 'UPDATE': return state.map((item, i) => i === action.payload.index ? action.payload.item : item);
//       case 'INSERT': return [
//         ...state.slice(0, action.payload.index),
//         action.payload.item,
//         ...state.slice(action.payload.index)
//       ];
//       case 'SET': return action.payload;

//       default: return state;
//     }
//   };
// }

// export default function useArray<T>(initialValue: T[] = []) {
//   const [value, dispatch] = useReducer(createArrayReducer<T>(), initialValue);

//   const methods = useMemo(() => ({
//     push: (item: T) => dispatch({ type: 'PUSH', payload: item }),
//     pop: () => dispatch({ type: 'POP' }),
//     unshift: (item: T) => dispatch({ type: 'UNSHIFT', payload: item }),
//     shift: () => dispatch({ type: 'SHIFT' }),
//     removeByIndex: (index: number) => dispatch({ type: 'REMOVE_BY_INDEX', payload: index }),
//     clear: () => dispatch({ type: 'CLEAR' }),
//     update: (index: number, item: T) => dispatch({ type: 'UPDATE', payload: { index, item } }),
//     insert: (index: number, item: T) => dispatch({ type: 'INSERT', payload: { index, item } })
//   }), []);

//   return { value, methods };
// }