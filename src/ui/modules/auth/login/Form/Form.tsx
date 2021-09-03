import React, { ReactNode } from 'react';

export default function LoginForm({ children }: { children: ReactNode }) {
  return (
    <div className="relative overflow-y-hidden flex-grow flex flex-col md:justify-center md:items-center">
      {children}
    </div>
  );
}
