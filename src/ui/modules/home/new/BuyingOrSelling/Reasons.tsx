import React, { ReactNode } from 'react';

export default function Reasons({ children }: { children: ReactNode }) {
  return <ul className="space-y-4 flex-grow">{children}</ul>;
}
