import React, { ReactNode } from 'react';

export default function Browse({ children }: { children: ReactNode }) {
  return (
    <h1
      className="font-logo bg-gray-900 px-3 lg:px-6 text-xs md:text-sm lg:text-base"
      style={{ textShadow: '3px 3px #000' }}
    >
      {children}
    </h1>
  );
}
