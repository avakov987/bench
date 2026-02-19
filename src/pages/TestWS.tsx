import { useRef, useState, type KeyboardEvent } from 'react';
import useWS from '../hooks/useWS';
import Chat from '../components/Chat';

export default function TestWebSocket() {
	const inputRef = useRef<HTMLInputElement>(null);
	const [connectionKey, setConnectionKey] = useState(
		`connection_${Date.now()}`
	);
	const { isConnected, error, send, disconnect, messages } = useWS(
		connectionKey,
		'wss://echo.websocket.org'
	);

	const handleSend = () => {
		if (!inputRef.current) return;

		const text = inputRef.current.value.trim();

		if (!text) return;

		send(text);

		inputRef.current.value = '';
	};

	const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>): void => {
		if (event.key === 'Enter') {
			handleSend();
		}
	};

	const handleCreateConnection = () => {
		setConnectionKey(`connection_${Date.now()}`);
	};
	return (
		<div>
			<div>Test WS</div>
			{error && error instanceof Error && (
				<div style={{ color: 'red' }}>{error.message ?? error}</div>
			)}

			<div
				style={{
					marginBottom: '30px',
					padding: '20px',
					backgroundColor: '#f0f7ff',
					borderRadius: '8px',
				}}
			>
				<button
					onClick={handleCreateConnection}
					style={{ backgroundColor: '#2196F3' }}
				>
					создать новое подключение
				</button>

				<button
					onClick={disconnect}
					disabled={!isConnected}
					style={{
						backgroundColor: isConnected ? '#f44336' : '#ccc',
					}}
				>
					отключиться
				</button>
			</div>

			<div>статус: {isConnected ? 'CONNECTED' : 'DISCONNECTED'}</div>

			<div>
				<button
					style={{ backgroundColor: '#4CAF50' }}
					onClick={handleSend}
				>
					отправить сообщение
				</button>
			</div>

			<input
				ref={inputRef}
				type="text"
				onKeyDown={handleKeyPress}
				disabled={!isConnected}
				style={{
					flex: 1,
					backgroundColor: isConnected ? 'white' : '#f5f5f5',
				}}
			/>

			<Chat messages={messages} />
		</div>
	);
}

// const folder = {
// 	value: 1,
// 	folder: [
// 		{
// 			value: 2,
// 			folder: null,
// 		},
// 		{
// 			value: 2,
// 			folder: {
// 				value: 4,
// 				next: null,
// 			},
// 		},
// 	],
// };

// const sum = (folder) => {
// 	let num = 0;
// 	let i = 0;

// 	const a = (folder) => {
// 		// if (!folder || !folder.value) {
// 		//   sum();

// 		// }
// 		i = i + 1;

// 		// num = num + (folder.value ?? 0);
// 		if (num > 10) return num;

// 		console.log('*', num, folder.value, i);

// 		// есть внутри фолдер
// 		if (folder.hasOwnProperty('folder')) {
// 			console.log('has', folder);

// 			// если есть смотрим есть ли велью
// 			if (folder.hasOwnProperty('value')) {
// 				console.log('(*&(*&(*&', i, folder);

// 				// еслт есть то прибывляем к общему велью еще велью
// 				console.log('сюда должны зайти');
// 				num = num + folder.value;
// 				// заходим на уровень ниже
// 				console.log('CHECK');

// 				a(folder.folder);
// 			}

// 			if (Array.isArray(folder)) {
// 				folder.forEach((el) => {
// 					if (el.value) {
// 						i = i + el.value;
// 					}

// 					if (el.folder) {
// 					}
// 				});
// 			}

// 			// если велью нет то просто идем дальше
// 			console.log('сли велью нет то просто идем дальше');
// 			a(folder);
// 		}

// 		if (!folder.hasOwnProperty('folder')) {
// 			console.log(folder.value);
// 			return num;
// 		}
// 	};
// 	a(folder);
// };

// const sum = (folder) => {
// 	let num = 0;

// 	const recursion = (item) => {
// 		if (!item) return;

// 		if (item.value && item.value !== 0) {
// 			num += item.value;
// 		}

// 		if (item.folder) {
// 			if (Array.isArray(item.folder)) {
// 				item.folder.forEach((el) => recursion(el));
// 			} else {
// 				recursion(item.folder);
// 			}
// 		}
// 	};

// 	recursion(folder);

// 	return num;
// };

// console.log(sum(folder)); // 9

// 3. Имеется объект - компания. Компания разделена на департаменты. В
// департаменте есть сотрудники.
// Необходимо написать функцию для поиска сотрудника с наибольшим окладом.
// const company = {
// 	dep1: {
// 		id: 1,
// 		employees: [
// 			{ id: 1, fullName: 'John Doe', salary: 140 },
// 			{ id: 2, fullName: 'Ed Smith', salary: 150 },
// 		],
// 	},
// 	dep2: {
// 		id: 2,
// 		employees: [
// 			{ id: 3, fullName: 'Ed Doe', salary: 90 },
// 			{ id: 4, fullName: 'John Smith', salary: 150 },
// 		],
// 	},
// };

// const findStaff = (company) => {
// 	const companyKeys = Object.keys(company);

// 	return companyKeys.reduce(
// 		(acc, i) => {
// 			const employees = company[i].employees;

// 			employees.forEach((man) => {
// 				if (man.salary > acc.salary) {
// 					acc = { name: man.fullName, salary: man.salary };
// 				}
// 			});

// 			return acc;
// 		},
// 		{ name: null, salary: 0 }
// 	);
// };

// console.log(findStaff(company));

// class Foo {
// 	constructor() {
// 		this.id = 'foo'; // 2) добавляем в this св-во id
// 		this.print(); // 3) вызываем print из класса Bar! так как он экземпляр именно Bar
// 	}
// 	print() {
// 		console.log('foo' + this.id);
// 	}
// }
// class Bar extends Foo {
// 	constructor() {
// 		// 1) начинаем строить экземпляр, this пока пуст, при вызове супер вызываем род конструктор
// 		super();
// 		// 4) переопределяем id
// 		this.id = 'bar';
// 		// 5) опять вызываем метод в Bar
// 		this.print();
// 		// 6) тут уже с помощью super вызываем род метод
// 		super.print();
// 	}
// 	print() {
// 		console.log('bar' + this.id);
// 	}
// }
// new Bar();
// barfoo
// barbar
// foobar

// Создать функцию, которая будет вычислять, является ли фраза палиндромом?
// - Казак
// - А роза упала на лапу Азора
// - А в Енисее — синева.
// - Голод, чем меч долог?
// Сложность по памяти должна быть O(n)
// function isPalindrome() {
// // code here...
// }
// const isPalindrome = (string) => {
// 	// console.log(string.split(''));
// 	// const word = string.split(' ').join('').toLowerCase();
// 	// const newWord = word.split('').reverse().join('').toLowerCase();
// 	// if (word === newWord) return true;
// 	// return false;
// };
// console.log(isPalindrome('А роза упала на лапу Азора'));

// const isPalindrome = (string) => {
// 	const cleanedStr = string.toLowerCase().replace(/[^a-zа-яё]/g, '');
// 	let end = cleanedStr.length - 1;

// 	for (let i = 0; i < end; i++) {
// 		if (cleanedStr[i] !== cleanedStr[end]) {
// 			return false;
// 		}

// 		end = end - 1;
// 	}

// 	return true;
// };
// console.log(isPalindrome('Голод, чем меч долог?'));

// Создать функцию carry, которая принимает функцию и возвращает
// каррированную копию.
// Например,
// =========
// // Создать функцию carry, которая принимает функцию и возвращает
// // каррированную копию.
// // Например,
// const sum = (a, b, c) => a + b + c;
// sum(1, 2, 3); // вернет сумму чисел

// function carry(f) {
// 	console.log(f.arguments);
// }

// const carrySum = carry(sum);
// carrySum(1)(2)(3); // 6

// // 7. Что будет в консоле?
// console.log('cl1'); //1
// const f1 = async () => {
// 	console.log('async'); // 5 7
// };
// const f2 = async () => {
// 	console.log(1); //2
// 	await f1();
// 	console.log('await'); // 6
// 	await f1();
// };
// f2(2);
// console.log(3); //3
// setTimeout(() => {
// 	console.log('timeout'); // 9
// });
// const p = new Promise((res) => {
// 	console.log('promise'); // 4
// 	res();
// });
// p.then(() => {
// 	console.log('promise then'); // 8
// });

// // cl1 1 3 promise async await async promisethen timeout

// // 8. Move the first letter of each word to the end of it, then add "ay" to the end of the
// // word. Leave punctuation marks untouched.
// function pigIt(str) {
// 	const arr = str.split(/([^a-zA-Z])/);

// 	const res = arr.map((i) => {
// 		if (!i.match(/^[a-z]+$/i)) {
// 			return i;
// 		}

// 		const q = i.slice(1);
// 		console.log(q + i.charAt() + 'ay');

// 		return q + i.charAt() + 'ay';
// 	});

// 	return res.join('');
// }
// console.log(pigIt('Pig latin is cool'));

// import React, { useEffect } from 'react';

// const Parent: React.FC<{ children: JSX.Element }> = ({ children }) => {
// 	console.log(1); // 1

// 	useEffect(() => console.log(2), []); // 5
// 	return <div>{children}</div>;
// };

// const Child: React.FC = () => {
// 	console.log(3); // 3
// 	useEffect(() => console.log(4), []); // 4
// 	return <div />;
// };
// const App: React.FC = () => {
// 	return (
// 		<Parent>
// 			<Child />
// 		</Parent>
// 	);
// };
// export default App;
// изначально реакт заходит в род компонент, выводит консоль 1, далее вызывает дочь, в ней консоль 3, после этого реакт начинает выполнять эффект от дочерних вверх к родительским

// 2. useEffect
// function Comp() {
// 	const [a, setA] = useState(1);

// 	useEffect(() => {
// 		console.log(a);
// 		return () => {
// 			console.log(a);
// 		};
// 	}, [a]);
// 	return <button onClick={() => setA(2)}>1</button>;
// }
// // 1, 1, 2 - 1 сработает после монтирования, далее при сетим a в это время срабатывает функция очистки и вернется замкнутая a,она равна 1, и далее после ререндера будет 2

// 3. Что выведется в теге <p> до нажатия на кнопку и после?
// import React, { useState, useEffect } from 'react';

// const initState: { a: number | null } = { a: 5 };

// const App: React.FC = () => {
// 	const [state, setState] = useState(initState);

// 	useEffect(() => {
// 		initState.a = null;
// 	}, []);

// 	const increment = () => setState((prev) => ({ ...prev, a: prev.a + 1 }));

// 	return (
// 		<div>
// 			<p>{state.a}</p>
// 			<button onClick={increment}>Прибавить</button>
// 		</div>
// 	);
// };

// export default App;

// // этап монтирования компонента, state.a = 5
// // сетим state a = 6

// // 4. Какое значение будет выведено в консоль при первом нажатии кнопки. Как
// // сделать так, чтобы вывело значение 102
// const App = () => {
// 	const [count, setCount] = useState(0);

// 	const handleClick = () => {
// 		setCount(1 + count);
// 		setCount(100 + count);
// 		setCount(1 + count);

// 		console.log(count);
// 	};

// 	return (
// 		<div>
// 			<button onClick={handleClick}>click</button>
// 		</div>
// 	);
// };
// // count будет равен 1 но так как сеттер асинхронен то на текущем рендере будет 0
