import { useDispatch, useSelector } from 'react-redux';
import Component1 from './Component1';
import Component2 from './Component2';
import Component3 from './Component3';
import Component4 from './Component4';
import { rerender } from './store/store';
import { useEffect } from 'react';

export default function DifficultExample() {
	const dispatch = useDispatch();
	const timestamp = useSelector(
		(state: {}) => state?.rerender?.timestamp || Date.now()
	);
	console.log('ререндер');
	useEffect(() => {
		const timer = setInterval(() => {
			dispatch(rerender());
		}, 1000);

		return () => clearInterval(timer);
	}, [dispatch, timestamp]);

	return (
		<div>
			<Component1 />
			<Component2 />
			<Component3 />
			<Component4 />
		</div>
	);
}
