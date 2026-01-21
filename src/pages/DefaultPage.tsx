import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
// import useHover from '../hooks/useHover';
// import useToggle from '../hooks/useToggle';
// import { useEffectOnce } from '../hooks/useEffectOnce';
import SimpleExample from './SimpleExample';
import { useDebounce } from '../hooks/useDebounce';
import useToggle from '../hooks/useToggle';
// import useArray from '../hooks/useArray';
import useClickOutside from '../hooks/useClickOutside';
// import useIsMounted from '../hooks/useIsMounted';
import useHover from '../hooks/useHover';
import TTT from './TTT';
import Test from './Test';
import useUpdateEffect from '../hooks/useUpdateEffect';
import useFocus from '../hooks/useFocus';
import PhoneNumberInput from '../components/PhoneNumberInput';
import ProxyStateValtio from '../components/ProxyStateValtio';
// import { useEffectOnce } from '../hooks/useEffectOnce';
// import { useDebounce } from '../hooks/useDebounce';
// import { usePrevious } from '../hooks/usePrevios';

export default function DefaultPage() {
	const [ref, isFocused] = useFocus();
	const [a, aa] = useState(false);
	const [b, bb] = useState(false);
	const [showA, setShowA] = useState(true);
	const searchApi = (v) => {
		console.log('search api', v);
	};
	const debouncedFunction = useDebounce(searchApi, 5000);
	// const { value, toggle } = useToggle();
	// console.log(usePrevious(a));

	// const { isHover, hoverRef } = useHover();
	// console.log(value, toggle);
	// console.log(useDebounce(String(showA), 5000));
	// console.log('@', showA);
	// console.log(
	// 	useEffectOnce(() => {
	// 		console.log('YRRAAAA');
	// 	})
	// );

	// const { value, methods } = useArray([5, 67, 3]);
	// useEffect(() => {
	// 	unshift(876);
	// 	console.log(value);
	// }, []);
	// const res = useIsMounted();
	// console.log(res());

	// const refQwe = useClickOutside(() => {
	// 	console.log('98798789', a);
	// });
	// console.log(refQwe);
	// console.log();
	// console.log(
	// 	useUpdateEffect(() => {
	// 		console.log('useUpdateEffect');

	// 		return () => {
	// 			console.log('^^^^^^^^^^^');
	// 		};
	// 	}, [showA])
	// );
	// console.log({ isFocused });

	return (
		<div>
			<ProxyStateValtio />
			<PhoneNumberInput />
			<div>
				<input ref={ref} placeholder="Click me" />
				{isFocused && (
					<p style={{ color: 'green' }}>Input is focused!</p>
				)}
				<div>Focus state: {isFocused ? 'Focused' : 'Not focused'}</div>
			</div>
			{/* <Test /> */}
			{/* {!showA && <TTT />} */}
			<div
			// ref={refQwe}
			// onClick={() => {
			// 	unshift(876);
			// }}
			>
				dsf
			</div>
			<input
				type="text"
				onChange={(event) => debouncedFunction(event.target.value)}
			/>

			{/* <button onClick={toggle}>{value ? 'Turn OFF' : 'Turn ON'}</button>
			<p>Current state: {value ? 'ON' : 'OFF'}</p> */}

			{/* Пример с чекбоксом */}
			{/* <label>
				<input type="checkbox" checked={value} onChange={toggle} />
				Toggle me
			</label> */}

			{/* <div onClick={() => on(!toggle)}>{String(toggle)}</div> */}
			{/* <div onClick={() => methods.push(324)}>wwww</div> */}
			{/* <div>
				{showA ? (
					<div ref={hoverRef}>Элемент A</div>
				) : (
					<div ref={hoverRef}>Элемент B</div>
				)}
			</div> */}
			<div onClick={() => aa(!a)}>DefaultPage</div>
			{/* <div ref={hoverRef}>qwe</div> */}
			<div onClick={() => setShowA(!showA)}>setShowA</div>
			{/* <SimpleExample showA={showA} /> */}
			{showA && <SimpleExample />}
			<div>
				<Link to="simple">simple</Link>
			</div>
			<div>
				<Link to="middle">middle</Link>
			</div>
			<div>
				<Link to="difficult">difficult</Link>
			</div>
			<div>
				<Link to="test-ws">test-ws</Link>
			</div>
		</div>
	);
}
