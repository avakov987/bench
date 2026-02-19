interface ChatProps {
	messages?: string[];
}

export default function Chat({ messages = [] }: ChatProps) {
	return (
		<div>
			<div
				style={{
					height: '300px',
					border: '1px solid #ccc',
					overflowY: 'auto',
					padding: '10px',
				}}
			>
				{messages.map((msg, index) => (
					<div
						key={`${msg}_${index}_${Date.now()}`}
						style={{
							padding: '5px 0',
							borderBottom: '1px solid #eee',
						}}
					>
						{msg}
					</div>
				))}
			</div>
		</div>
	);
}
