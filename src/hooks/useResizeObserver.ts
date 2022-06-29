import { useCallback, useRef } from "react";

function useResizeObserver<T extends HTMLElement>(
  callback: ResizeObserverCallback
) {
  const ref = useRef<ResizeObserver | null>(null);
  const callbackRef = useCallback<(element: T|null) => void>((element) => {
    if (ref.current) {
      ref.current.disconnect();
    }
    if (element) {
      const observer = new ResizeObserver(callback);
      observer.observe(element);
      ref.current = observer;
    }
  }, [callback]);
  return [callbackRef];
}

export default useResizeObserver;
