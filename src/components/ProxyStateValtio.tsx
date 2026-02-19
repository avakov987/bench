import { useEffect, useState } from 'react';
// import { useSnapshot } from '../hooks/useSnapshot';
// import { proxy } from '../store/proxyStore';
// const listeners = new Set<() => void>();

// function proxy<T extends object>(state: T) {
// 	return new Proxy(state, {
// 		set(target: { [key: string]: any }, prop: string, value) {
// 			target[prop] = value;
// 			listeners.forEach((listener) => {
// 				// console.log(listener());
// 				listener();
// 			});

// 			return true;
// 		},
// 	});
// }

// function useSnapshot<T extends object>(state: T) {
// 	const [, setTick] = useState({});

// 	useEffect(() => {
// 		const update = () => setTick({});
// 		listeners.add(update);

// 		return () => {
// 			listeners.delete(update);
// 		};
// 	}, []);

// 	return state;
// }

// Создаём независимые стейты

// Храним слушателей в замыкании
// export function proxy(target) {
// 	const listeners = new Set();

// 	const proxyObj = new Proxy(target, {
// 		set(targetObj, prop, value) {
// 			console.log('Setting', prop, 'to', value);
// 			targetObj[prop] = value;
// 			listeners.forEach((fn) => fn());
// 			return true;
// 		},
// 	});

// 	// Возвращаем и Proxy, и доступ к listeners
// 	return {
// 		state: proxyObj,
// 		subscribe: (fn) => {
// 			listeners.add(fn);
// 			return () => listeners.delete(fn);
// 		},
// 	};
// }

// // Использование:
// const { state, subscribe } = proxy({ count: 0 });

// function useSnapshot() {
// 	const [, setTick] = useState({});

// 	useEffect(() => {
// 		const unsubscribe = subscribe(() => {
// 			console.log('Update!');
// 			setTick({});
// 		});

// 		// Возвращаем функцию, которая вызывает unsubscribe
// 		return () => {
// 			unsubscribe(); // Теперь возвращает void
// 		};
// 	}, []);

// 	return state;
// }

// export default function Component() {
// 	const snap = useSnapshot();

// 	return (
// 		<div>
// 			<h1>{snap.count}</h1>
// 			<button onClick={() => state.count++}>+</button>
// 		</div>
// 	);
// }

type ProxyStore<T> = {
	state: T;
	subscribe: (fn: () => void) => () => void;
};

function createProxy<T extends object>(initialState: T): ProxyStore<T> {
	const listeners = new Set<() => void>();

	const proxyObj = new Proxy(initialState, {
		set(targetObj: any, prop: string | symbol, value: string | number) {
			targetObj[prop] = value;
			listeners.forEach((fn) => fn());
			return true;
		},
	});

	return {
		state: proxyObj,
		subscribe: (fn: () => void) => {
			listeners.add(fn);
			return () => listeners.delete(fn);
		},
	};
}

// cоздаём несколько независимых состояний
const counterStore = createProxy({ count: 0 });
const userStore = createProxy({ name: 'TOM', age: 30 });
const themeStore = createProxy({ mode: 'light' });

function useSnapshot<T>(store: ProxyStore<T>): T {
	const [, setTick] = useState({});

	useEffect(() => {
		const unsubscribe = store.subscribe(() => {
			setTick({});
		});

		return unsubscribe;
	}, [store]);

	return store.state;
}

//  использует только counter
function One() {
	const counter = useSnapshot(counterStore);
	console.log('Counter');

	return (
		<div>
			<div>{counter.count}</div>
			<button onClick={() => counterStore.state.count++}>+</button>
		</div>
	);
}

// использует только user
function Two() {
	const user = useSnapshot(userStore);
	const counter = useSnapshot(counterStore);
	console.log('Two', counter);

	return (
		<div>
			<div> {user.name}</div>
		</div>
	);
}

// использует user
function Three() {
	console.log('Three');

	const user = useSnapshot(themeStore);

	return (
		<div>
			<div>
				user {user.name} ({user.age})
			</div>
		</div>
	);
}

export default function ProxyStateValtio() {
	return (
		<div style={{ border: 'solid black 1px' }}>
			<One />
			<Two />
			<Three />

			<div>
				<button
					onClick={() => {
						counterStore.state.count += 1;
					}}
				>
					one
				</button>

				<button
					onClick={() => {
						userStore.state.name = 'BOB';
					}}
				>
					two
				</button>

				<button
					onClick={() => {
						themeStore.state.mode = 'dark';
					}}
				>
					three
				</button>
			</div>
		</div>
	);
}
