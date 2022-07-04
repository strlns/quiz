import { debounce } from "lodash-es";
import { useEffect, useState } from "react";

const useIsNearTopOrScrollingUp = (nearTopThreshold: number) => {
  const [isNearTopOrScrollingUp, setIsNearTopOrScrollingUp] = useState(false);

  useEffect(() => {
    let oldScrollY = window.scrollY;
    const listener: EventListener = debounce(() => {
      const { scrollY } = window;
      setIsNearTopOrScrollingUp(
        scrollY < oldScrollY || scrollY < Math.max(nearTopThreshold, 100)
      );
      oldScrollY = scrollY;
    }, 25);
    window.addEventListener("scroll", listener, { passive: true });
    return () => window.removeEventListener("scroll", listener);
  }, [nearTopThreshold]);

  return isNearTopOrScrollingUp;
}

export default useIsNearTopOrScrollingUp;