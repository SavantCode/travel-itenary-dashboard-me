// src/hooks/useConfirmNavigation.ts
import { useContext, useEffect, useRef } from "react";
import { UNSAFE_NavigationContext } from "react-router-dom";

export function useConfirmNavigation(message: string, when = true) {
  const { navigator } = useContext(UNSAFE_NavigationContext);
  const skipNextNavigation = useRef(false);

  const allowNextNavigation = () => {
    skipNextNavigation.current = true;
  };

  useEffect(() => {
    if (!when) return;

    const push = navigator.push;

    navigator.push = (...args: any[]) => {
      if (skipNextNavigation.current) {
        skipNextNavigation.current = false; // reset
        push(...args);
        return;
      }

      const confirmLeave = window.confirm(message);
      if (confirmLeave) {
        push(...args);
      }
      // else → stay
    };

    return () => {
      navigator.push = push;
    };
  }, [navigator, message, when]);

  return { allowNextNavigation };
}
