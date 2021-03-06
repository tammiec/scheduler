import { useState } from 'react';

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  // Transition to a new mode
  const transition = function(newMode, replace = false) {
    setMode(newMode);
    if (replace) {
      return;
    } else {
      setHistory(prev => ([...prev, newMode]));
    }
  };

  // Go back one mode
  const back = function() {
  if (mode === initial) {
    return;
  }
    history.pop();
    setMode(history[history.length - 1]);
  }

  return { mode, transition, back };
}