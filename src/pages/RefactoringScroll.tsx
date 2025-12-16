import { useState, useRef, type JSX, useEffect } from 'react';

const fetchCall = () => Promise.resolve(Math.random());

export default function ScrollWithRandomNumber(): JSX.Element {
	const [number, setNumber] = useState(0);
	const [scroll, setScroll] = useState(0);
	const containerRef = useRef<HTMLDivElement | null>(null);

	const handleScroll = () => setScroll(containerRef.current.scrollTop);

	useEffect(() => {
		const getData = async () => {
			const result = await fetchCall();

			setNumber(result);
		};
		getData();
	}, []);

	useEffect(() => {
		if (containerRef.current) {
			containerRef.current?.addEventListener('scroll', handleScroll);
		}

		return () => {
			containerRef.current?.removeEventListener('scroll', handleScroll);
		};
	}, []);

	return (
		<div
			ref={containerRef}
			style={{
				height: 300,
				overflow: 'auto',
			}}
		>
			<div style={{ height: 1000 }}>
				<div>Number: {number}</div>
				<div>Scroll: {scroll}</div>
			</div>
		</div>
	);
}
