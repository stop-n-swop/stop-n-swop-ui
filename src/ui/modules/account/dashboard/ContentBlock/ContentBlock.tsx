import React, { ReactNode } from 'react';

export default function ContentBlock({ children }: { children: ReactNode }) {
  return (
    <div className="mt-8 lg:mt-0 flex-grow px-6 py-4 bg-black space-y-3">
      {children}
    </div>
  );
}
