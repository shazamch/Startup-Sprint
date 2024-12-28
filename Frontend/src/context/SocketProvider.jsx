import React, { createContext, useContext, useMemo, useEffect } from "react";
import { io } from "socket.io-client";

// Get the base URL from environment variables
const baseURL = import.meta.env.VITE_BASE_URL;

const SocketContext = createContext(null);

export const useSocket = () => {
  const socket = useContext(SocketContext);
  return socket;
};

export const SocketProvider = (props) => {
  const socket = useMemo(() => io(baseURL), [baseURL]);

  useEffect(() => {
    console.log("Connecting to socket...");
    socket.on("connect", () => {
      console.log("Socket connected: ", socket.id);
    });

    socket.on("connect_error", (err) => {
      console.error("Socket connection error: ", err);
    });

    return () => {
      socket.off("connect");
      socket.off("connect_error");
      socket.disconnect();
      console.log("Socket disconnected.");
    };
  }, [socket]);

  return (
    <SocketContext.Provider value={socket}>
      {props.children}
    </SocketContext.Provider>
  );
};
