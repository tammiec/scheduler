import { useEffect, useRef } from 'react';

export default function useSocket() {
  const socket = useRef();

  useEffect(() => {
    
    socket.current = new WebSocket('ws://localhost:8001');

    socket.current.onopen = event => {
      socket.current.send('ping');
    }

    return () => socket.current.close();

  }, [])

  return { socket };
}