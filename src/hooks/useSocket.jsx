import React, { createContext, useContext, useEffect, useState } from 'react';

const SocketContext = createContext();

export function useSocket() {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
}

export function SocketProvider({ children }) {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Mock socket connection for development
    console.log('🔌 Mock Socket.IO connection established');
    setIsConnected(true);
    
    const mockSocket = {
      on: (event, callback) => {
        console.log(`Mock socket listening for: ${event}`);
      },
      emit: (event, data) => {
        console.log(`Mock socket emitting: ${event}`, data);
      },
      off: (event, callback) => {
        console.log(`Mock socket stopped listening for: ${event}`);
      },
      close: () => {
        console.log('Mock socket disconnected');
        setIsConnected(false);
      }
    };
    
    setSocket(mockSocket);

    return () => {
      mockSocket.close();
    };
  }, []);

  const value = {
    socket,
    isConnected,
    emit: (event, data) => {
      if (socket) {
        socket.emit(event, data);
      }
    },
    on: (event, callback) => {
      if (socket) {
        socket.on(event, callback);
      }
    },
    off: (event, callback) => {
      if (socket) {
        socket.off(event, callback);
      }
    }
  };

  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  );
}