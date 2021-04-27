import { createContext } from 'react';

export interface Context {
  messages: Record<string, string>;
  locale: string;
  currency: string;
}

export const context = createContext<Context>(null);
