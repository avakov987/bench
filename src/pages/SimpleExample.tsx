import { useEffect } from 'react';
import Component1 from '../components/Component1';
// import { useEffectOnce } from '../hooks/useEffectOnce';

export default function SimpleExample() {
	// useEffectOnce(() => {
	// 	console.log('blya');

	// 	return () => {
	// 		console.log('вот ог');
	// 	};
	// });

	return (
		<div>
			<Component1 />
		</div>
	);
}
