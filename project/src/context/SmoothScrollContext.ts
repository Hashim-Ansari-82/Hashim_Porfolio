import { createContext, useContext } from 'react';

export interface SmoothScrollContextValue {
  scrollTo: (target: string | number) => void;
}

export const SmoothScrollContext = createContext<SmoothScrollContextValue>({
  scrollTo: () => undefined,
});

export function useScrollTo() {
  return useContext(SmoothScrollContext).scrollTo;
}
