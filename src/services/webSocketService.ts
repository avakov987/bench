type WebSocketConnection = {
  socket: WebSocket;
  url: string;
  isConnected: boolean;
};

type ConnectionsMap = Record<string, WebSocketConnection | undefined>;

class WebSocketService {
  private connections: ConnectionsMap = {};

  connect(key: string, url: string): WebSocket {
    const existingConnection = this.connections[key];

    if (existingConnection) {
      if (existingConnection.socket.readyState === WebSocket.OPEN) {
        return existingConnection.socket;
      }

      existingConnection.socket.close();
      delete this.connections[key];
    }

    const socket = new WebSocket(url);

    this.connections[key] = {
      socket,
      url,
      isConnected: socket.readyState === WebSocket.OPEN,
    };

    return socket;
  }

  send(key: string, message: string) {
    const connection = this.connections[key];

    if (!connection) {
      console.log('по ключу нет совпадений');

      return;
    }

    if (connection.socket.readyState === WebSocket.OPEN) {
      connection.socket.send(message);
    }
  }

  disconnect(key: string) {
    const connection = this.connections[key];

    if (connection) {
      connection.socket.close(1000, 'disconnect');
      delete this.connections[key];
    }
  }

  getConnection(key: string): WebSocketConnection | null {
    return this.connections[key] || null;
  }

  getActiveKeys(): string[] {
    return Object.keys(this.connections);
  }

  cleanUp(): void {
    Object.values(this.connections).forEach((connection) => {
      connection?.socket.close();
    });
    this.connections = {};
  }
}

export const webSocket = new WebSocketService();