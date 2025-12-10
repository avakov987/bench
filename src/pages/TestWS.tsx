import { useLayoutEffect, useState, useCallback } from 'react';
import { webSocket } from '../services/webSocketService';

interface UseWSReturn {
	isConnected: boolean;
	error: Error | null;
	send: (data: string | object) => boolean;
	disconnect: () => void;
	getAllConnections: () => string[];
	messages: string[];
}

export default function useWS(key: string, url?: string): UseWSReturn {
	const [isConnected, setIsConnected] = useState<boolean>(false);
	const [error, setError] = useState<Error | null>(null);
	const [messages, setMessages] = useState<string[]>([]);

	useLayoutEffect(() => {
		if (!url) return;

		const socket = webSocket.connect(key, url);

		const handleOpen = () => {
			setIsConnected(true);
			setError(null);
		};

		const handleMessage = (event: MessageEvent) => {
			const message = event.data.toString();
			const isSystemMessage =
				message.startsWith('Request') ||
				message.includes('served by') ||
				message.includes('WebSocket') ||
				message.includes('connection');

			if (!isSystemMessage) {
				setMessages((prev) => [...prev, message]);
			}
		};

		const handleClose = () => {
			setIsConnected(false);
		};

		const handleError = (event: Event) => {
			console.error(`${key}: error`, event);
			setIsConnected(false);
			setError(new Error('WebSocket connection error'));
		};

		socket.addEventListener('open', handleOpen);
		socket.addEventListener('message', handleMessage);
		socket.addEventListener('close', handleClose);
		socket.addEventListener('error', handleError);

		if (socket.readyState === WebSocket.OPEN) {
			setIsConnected(true);
		}

		return () => {
			socket.removeEventListener('open', handleOpen);
			socket.removeEventListener('message', handleMessage);
			socket.removeEventListener('close', handleClose);
			socket.removeEventListener('error', handleError);
		};
	}, [key, url]);

	const send = useCallback(
		(data: unknown) => {
			return webSocket.send(key, data);
		},
		[key]
	);

	const disconnect = useCallback((): void => {
		webSocket.disconnect(key);
	}, [key]);

	return {
		isConnected,
		error,
		send,
		disconnect,
		getAllConnections: () => webSocket.getActiveKeys(),
		messages,
	};
}
