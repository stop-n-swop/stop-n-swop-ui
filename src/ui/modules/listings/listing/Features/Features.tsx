import React from 'react';
import Statistics from 'ui/modules/listings/listings/Stats';
import { Stats } from 'core/entity/listings';

export default function Features({ stats }: { stats: Stats }) {
  return (
    <div className="px-6 py-8 bg-black md:bg-transparent">
      <Statistics stats={stats} />
    </div>
  );
}
