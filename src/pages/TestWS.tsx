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
