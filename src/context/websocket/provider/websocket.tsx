import { FC, useEffect, useRef, useState } from "react";
import { WebSocketContext } from "../context/websocket";

export const WebSocketProvider: FC<{
  url: string;
  children: React.ReactNode;
}> = ({ url, children }) => {
  const [lastMessage, setLastMessage] = useState<string | null>(null);
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const socket = new WebSocket(url);
    socketRef.current = socket;

    socket.onopen = () => console.log("WebSocket connected");
    socket.onmessage = (event) => setLastMessage(event.data);
    socket.onclose = () => console.log("WebSocket disconnected");
    socket.onerror = (err) => console.error("WebSocket error", err);

    return () => {
      socket.close();
    };
  }, [url]);

  const sendMessage = (msg: string) => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(msg);
    }
  };

  return (
    <WebSocketContext.Provider
      value={{ socket: socketRef.current, sendMessage, lastMessage }}
    >
      {children}
    </WebSocketContext.Provider>
  );
};
