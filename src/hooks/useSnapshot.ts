// import { useState, useEffect } from 'react';
// import { createProxy, listenersMap } from '../store/proxyStore';

import { useEffect, useState } from "react";

// // let listeners = new Set();

// // function proxy(state) {
// //   return new Proxy(state, {
// //     set(target, prop, value) {
// //       target[prop] = value;
// //       listeners.forEach(listener => listener());
// //       return true;
// //     }
// //   });
// // }

// // function useSnapshot(state) {
// //   const [_, setTick] = useState({});

// //   useEffect(() => {
// //     const update = () => setTick({});
// //     listeners.add(update);
// //     return () => listeners.delete(update);
// //   }, []);

// //   return state;
// // }


// export default function useSnapshot() {
//   const [, setTick] = useState({});

//   useEffect(() => {
//     const unsubscribe = subscribe(() => {
//       console.log('Update!');
//       setTick({});
//     });

//     return unsubscribe;
//   }, []);

//   return state;
// }