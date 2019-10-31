import { useEffect, useRef } from 'react';

export default function useSocket() {
  const socket = useRef();

  useEffect(() => {
    
    socket.current = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);

    socket.current.onopen = event => {
      socket.current.send('ping');
    }

    return () => socket.current.close();

  }, [])

  return { socket };
}