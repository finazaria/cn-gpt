import { useState, useCallback, useRef } from 'react';

// Simulates streaming by revealing content in chunks
export function useStreaming() {
  const [streaming, setStreaming] = useState(false);
  const cancelRef = useRef(false);

  const streamContent = useCallback((onChunk, onDone, totalDelay = 1800) => {
    cancelRef.current = false;
    setStreaming(true);
    // Signal that streaming has started so UI can render progressive content
    const startTime = Date.now();
    
    // We use a counter-based approach: every 80ms we emit a "progress" tick
    // The actual content rendering is done by the component based on progress 0..1
    const tickInterval = 60;
    const totalTicks = Math.floor(totalDelay / tickInterval);
    let tick = 0;

    const interval = setInterval(() => {
      if (cancelRef.current) {
        clearInterval(interval);
        setStreaming(false);
        return;
      }
      tick++;
      const progress = Math.min(tick / totalTicks, 1);
      onChunk(progress);
      if (progress >= 1) {
        clearInterval(interval);
        setStreaming(false);
        onDone();
      }
    }, tickInterval);

    return () => {
      cancelRef.current = true;
      clearInterval(interval);
    };
  }, []);

  const cancel = useCallback(() => {
    cancelRef.current = true;
  }, []);

  return { streaming, streamContent, cancel };
}
