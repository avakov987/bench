import { Link } from 'react-router-dom';

export default function DefaultPage() {
	return (
		<div>
			<div>DefaultPage</div>
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
