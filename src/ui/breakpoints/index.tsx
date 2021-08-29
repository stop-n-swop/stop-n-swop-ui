import React, { useState, useContext, useEffect } from 'react';
import { useDebouncedCallback } from 'use-debounce';

const breakpointContext = React.createContext<Record<string, boolean>>({});

type Breakpoint = [string, number];

type BreakpointProps = {
  breakpoints: Breakpoint[];
  children: React.ReactNode;
};

const getBreakpoints = (breakpoints: Breakpoint[]) => {
  return breakpoints.reduce((acc, [key, threshold]) => {
    if (typeof window === 'undefined') {
      return {
        ...acc,
        [key]: false,
      };
    }

    const mql = window.matchMedia(`(min-width: ${threshold}px)`);

    return {
      ...acc,
      [key]: mql.matches,
    };
  }, {} as Record<string, boolean>);
};

function BreakpointProvider({ breakpoints, children }: BreakpointProps) {
  const [matches, setMatches] = useState(() => getBreakpoints(breakpoints));
  const recalculateMatches = useDebouncedCallback(() => {
    setMatches(getBreakpoints(breakpoints));
  }, 250);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', recalculateMatches);
      return () => window.removeEventListener('resize', recalculateMatches);
    }
    return null;
  }, [recalculateMatches]);

  return (
    <breakpointContext.Provider value={matches}>
      {children}
    </breakpointContext.Provider>
  );
}

function useBreakpoints() {
  return useContext(breakpointContext);
}

export {
  BreakpointProvider,
  useBreakpoints,
  breakpointContext as BreakpointContext,
};
