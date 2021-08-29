import React, { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default function Reel({ children }: Props) {
  return (
    <div className="flex justify-between space-x-2 sm:space-x-4 md:space-x-6 lg:space-x-8 xl:space-x-12">
      {children}
    </div>
  );
}
