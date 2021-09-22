import React, { ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

export default function Sky({ children }: Props) {
  return <div className="relative flex-grow w-full">{children}</div>;
}
