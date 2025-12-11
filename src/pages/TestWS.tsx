import { useRef, useState } from 'react';
import useWS from '../hooks/useWS';
import Chat from '../components/Chat';

export default function TestWebSocket() {
	const inputRef = useRef<HTMLInputElement>(null);
	const [connectionKey, setConnectionKey] = useState<string>(
		`connection_${Date.now()}`
	);
	const { isConnected, send, disconnect, messages } = useWS(
		connectionKey,
		'wss://echo.websocket.org'
	);

	const handleSend = (): void => {
		if (!inputRef.current) return;

		const text = inputRef.current.value.trim();

		if (!text) return;

		send(text);
		inputRef.current.value = '';
	};

	const handleKeyPress = (event): void => {
		if (event.key === 'Enter') {
			event.preventDefault();
			handleSend();
		}
	};

	const handleCreateConnection = (): void => {
		setConnectionKey(`connection_${Date.now()}`);
	};

	const getInputValue = (): string => {
		return inputRef.current?.value.trim() || '';
	};

	const hasTextToSend = (): boolean => {
		return getInputValue().length > 0;
	};

	return (
		<div>
			<div>Test WS</div>

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
					onClick={handleSend}
					disabled={!isConnected || !hasTextToSend()}
					style={{
						backgroundColor:
							isConnected && hasTextToSend() ? '#4CAF50' : '#ccc',
					}}
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
