import React from 'react';
import Statistics from 'ui/modules/listings/listings/Stats';
import type { Stats } from '@sns/contracts/listing';

export default function Features({ stats }: { stats: Stats }) {
  return (
    <div className="px-6 pb-8 bg-black md:bg-transparent">
      <Statistics stats={stats} />
    </div>
  );
}
