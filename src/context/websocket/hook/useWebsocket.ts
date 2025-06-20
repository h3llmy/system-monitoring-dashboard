import { useContext } from "react";
import { WebSocketContext } from "../context/websocket";
import { WebSocketContextType } from "../interface/websocket.interface";

export const useWebSocket = (): WebSocketContextType => {
  const context = useContext(WebSocketContext);
  if (!context)
    throw new Error("useWebSocket must be used within a WebSocketProvider");
  return context;
};
