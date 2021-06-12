import React, { Children, ReactNode } from 'react';

const chevron = '>';

export default function Browse({ children }: { children: ReactNode }) {
  const nodes = Children.toArray(children).reduce((acc: any, child, i) => {
    if (i === 0) {
      return [child];
    }
    return [...acc, <span>{chevron}</span>, child];
  }, []);

  return (
    <h1
      className="bg-gray-900 px-3 lg:px-6 py-2 md:py-3 text-xs text-gray-200 lowercase lg:mb-8 space-x-3"
      style={{ textShadow: '3px 3px #000' }}
    >
      {nodes}
    </h1>
  );
}
