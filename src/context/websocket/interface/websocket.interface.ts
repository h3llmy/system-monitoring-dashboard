export type WebSocketContextType = {
  socket: WebSocket | null;
  sendMessage: (msg: string) => void;
  lastMessage: string | null;
};
