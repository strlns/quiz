import { type EffectCallback, useEffect, useRef } from "react";

/**
 * Execute callback once after mounting component.
 * Like useEffect with empty dependency array, but
 * without being called twice in development + react strict mode.
 * See github.com/facebook/react/issues/24502
 * */
export const useOnMount = (effect: EffectCallback) => {
  const hasRun = useRef(0);
  useEffect(() => {
    hasRun.current++;
    if (hasRun.current < 2) {
      return effect();
    }
  }, []);
};
