import { useLayoutEffect, useState } from 'react';
import { webSocket } from '../services/webSocketService';

interface UseWSReturn {
  isConnected: boolean;
  error: Error | null;
  send: (data: string | object) => void;
  disconnect: () => void;
  getAllConnections: () => string[];
  messages: string[];
}

export default function useWS(key: string, url?: string): UseWSReturn {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [messages, setMessages] = useState<string[]>([]);

  useLayoutEffect(() => {
    if (!url) {
      setError(new Error('url is required'));

      return;
    }

    const socket = webSocket.connect(key, url);

    socket.onopen = (event) => {
      if (event.cancelable) {
        setError(new Error('Failed to open connection'))

        return;
      }

      setIsConnected(true);
      setError(null);
    }

    socket.onmessage = (event: MessageEvent) => {
      try {
        const message = event.data.toString();
        const isSystemMessage =
          message.startsWith('Request') ||
          message.includes('served by') ||
          message.includes('WebSocket') ||
          message.includes('connection');

        if (!isSystemMessage) {
          setMessages(prev => [...prev, message]);
        }
      } catch (error) {
        setError(new Error('Failed to process message'));
      }
    }

    socket.onerror = () => {
      setIsConnected(false);
      setError(new Error('WebSocket connection error'));
    }

    socket.onclose = () => {
      setIsConnected(false);
    }

    if (socket.readyState === WebSocket.OPEN) {
      setIsConnected(true);
    }

    return () => {
      socket.onopen = null;
      socket.onmessage = null;
      socket.onerror = null;
      socket.onclose = null;
    };
  }, [key, url]);

  const send = (data: string | object): void => {
    try {
      const success = webSocket.send(key, data);
      console.log({ success });
    } catch (error) {
      setError(error instanceof Error ? error : new Error('unknown send error'));
    }
  }

  const disconnect = (): void => {
    try {
      webSocket.disconnect(key);
    } catch (error) {
      console.log(error);

      setError(new Error('Failed disconnected'))
    }
  }

  const getAllConnections = () => webSocket.getActiveKeys()

  return {
    isConnected,
    error,
    send,
    disconnect,
    getAllConnections,
    messages
  };
}