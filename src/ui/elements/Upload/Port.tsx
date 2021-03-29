import React, { ReactNode } from 'react';

export default function Port({ children }: { children: ReactNode }) {
  return (
    <div className="p-3 border-2 border-dashed">
      <div className="relative" style={{ '--aspect-ratio': 1 } as any}>
        {children}
      </div>
    </div>
  );
}
