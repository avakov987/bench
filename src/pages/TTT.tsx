import { useEffect } from 'react';
import useIsMounted from '../hooks/useIsMounted';

export default function TTT() {
	const isMounted = useIsMounted();
	console.log(isMounted);

	useEffect(() => {
		console.log('1. В useEffect (после монтирования):', isMounted);

		setTimeout(() => {
			console.log('2. В setTimeout через 100мс:', isMounted);
		}, 100);

		setTimeout(() => {
			console.log('3. В setTimeout через 1000мс:', isMounted);
		}, 1000);
	}, []);

	console.log('0. Во время рендера:', isMounted);

	return <div>;kfsjdgnkjdfsngkljfsdngkljfdn</div>;
}
