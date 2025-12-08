import { useSelector } from 'react-redux';
import useSWR from '../hooks/useSWR';

export default function Component3() {
	const timestamp = useSelector((state: any) => state?.rerender?.timestamp);
	const fetcher = async (key: string) => {
		return await fetch(`https://petstore.swagger.io/v2/pet/${key}`, {
			method: 'GET',
		}).then((res) => res.json());
	};

	const { data, isLoading, error } = useSWR('8', fetcher);

	if (error) return 'error';

	return (
		<div style={{ marginBottom: 30, border: '1px solid black' }}>
			Component3
			{isLoading ? (
				<div>Loading...</div>
			) : (
				<>
					<div>id: {data?.id}</div>
					<div>status: {data?.status}</div>
					<div>name: {data?.name}</div>
				</>
			)}
		</div>
	);
}
