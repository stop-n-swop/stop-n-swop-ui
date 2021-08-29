import React, { ReactNode } from 'react';

export default function Screen({
  dash,
  suggested,
  popular,
  recentlyAdded,
}: {
  dash: ReactNode;
  suggested: ReactNode;
  popular: ReactNode;
  recentlyAdded: ReactNode;
}) {
  return (
    <div className="container mx-auto space-y-8 py-8">
      {dash}
      <div className="space-y-8 lg:space-y-12">
        {suggested}
        {popular}
        {recentlyAdded}
      </div>
    </div>
  );
}
