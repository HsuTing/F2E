import { useState, useEffect, useRef } from 'react';
import getElementPosition from 'fbjs/lib/getElementPosition';

export const useOutOfBreakpoint = (breakpoint: number) => {
  const breakpointRef = useRef<HTMLDivElement | null>(null);
  const [outOfBreakpoint, setOutOfBreakpoint] = useState(false);

  useEffect(() => {
    const resize = () => {
      if (!breakpointRef.current) return;

      const { width } = getElementPosition(breakpointRef.current);

      setOutOfBreakpoint(width > breakpoint);
    };

    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
    };
  }, [breakpoint]);

  return {
    breakpointRef,
    outOfBreakpoint,
  };
};
