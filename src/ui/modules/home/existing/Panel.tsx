import React, { ReactNode } from 'react';

export default function Panel({
  title,
  children,
  ctas,
}: {
  title: ReactNode;
  children: ReactNode;
  ctas: ReactNode;
}) {
  return (
    <div className="bg-gray-600 rounded-lg p-8 space-y-4 w-1/4 flex flex-col items-start">
      <h3 className="text-xs font-semibold text-primary">{title}</h3>
      <div className="space-y-4 flex-grow w-full flex flex-col items-start">
        {children}
      </div>
      <div className="w-full">{ctas}</div>
    </div>
  );
}
