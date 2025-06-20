import { createContext } from "react";
import { WebSocketContextType } from "../interface/websocket.interface";

export const WebSocketContext = createContext<WebSocketContextType | undefined>(
  undefined
);
