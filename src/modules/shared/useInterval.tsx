import { useEffect, useRef } from "react";

type Fn = () => void;
/**
 * useInterval - Runs a callback on a set interval.
 * @param callback Function to run on interval
 * @param delay Interval in ms. If null, interval is paused.
 */
export function useInterval(callback: Fn, delay: number | null) {
  const savedCallback = useRef<Fn>(undefined);

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    if (delay === null) return;

    const tick = () => {
      if (savedCallback.current) savedCallback.current();
    };

    const id = setInterval(tick, delay);
    return () => clearInterval(id);
  }, [delay]);
}
