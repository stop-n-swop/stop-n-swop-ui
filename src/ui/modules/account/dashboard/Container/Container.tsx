import React, { ReactNode } from 'react';
import Card from 'ui/elements/Card';

export default function Container({
  name,
  children,
}: {
  name: string;
  children: ReactNode;
}) {
  return (
    <>
      <Card className="w-full flex-grow lg:my-4 xl:w-4/5 mx-auto flex flex-col">
        <h2 className="text-xl font-bold my-4">Welcome {name}!</h2>
        {children}
      </Card>
    </>
  );
}
