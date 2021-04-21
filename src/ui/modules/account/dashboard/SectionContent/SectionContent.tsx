import React, { ReactNode } from 'react';

export default function SectionContent({ children }: { children: ReactNode }) {
  return <div className="flex-grow flex flex-col space-y-3">{children}</div>;
}
