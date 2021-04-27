import React, { ReactNode } from 'react';
import { context } from './context';

export default function Provider({
  locale = 'en-gb',
  currency = 'GBP',
  messages = {},
  children,
}: {
  locale?: string;
  currency?: string;
  messages?: Record<string, string>;
  children: ReactNode;
}) {
  return (
    <context.Provider value={{ locale, currency, messages }}>
      {children}
    </context.Provider>
  );
}
