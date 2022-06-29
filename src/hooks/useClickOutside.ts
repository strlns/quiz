import { RefObject, useEffect } from "react";

const useClickOutside = (ref: RefObject<HTMLElement>, callback: () => void) => {
    const handleClick = (event: MouseEvent) => {
      if (ref.current && isNode(event.target) && !ref.current.contains(event.target)) {
        callback();
      }
    };
    useEffect(() => {
      document.addEventListener('click', handleClick);
      return () => {
        document.removeEventListener('click', handleClick);
      };
    });
  };
  
const isNode = (e: EventTarget | null): e is Node  => {
    return e !== null && ("nodeType" in e);
}

export default useClickOutside;