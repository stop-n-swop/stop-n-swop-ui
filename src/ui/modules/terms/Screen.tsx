import React, { ReactNode } from 'react';
import Card from 'ui/elements/Card';

export default function TermsScreen({ children }: { children: ReactNode }) {
  return (
    <div className="flex-grow flex flex-col">
      <Card className="flex-grow">
        <div className="help w-full max-w-screen-xl mx-auto">{children}</div>
      </Card>
    </div>
  );
}
