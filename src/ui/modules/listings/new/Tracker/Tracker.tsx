import React from 'react';
import StepTracker from 'ui/elements/StepTracker';
import { Step } from '../machine';

const order = [
  'condition',
  'features',
  'region',
  'price',
  'description',
  'photos',
  'review',
];
const total = order.length;

export default function Tracker({ step }: { step: Step }) {
  let current = order.indexOf(step);
  if (current < 0) {
    current = total - 1;
  }

  return (
    <div className="hidden mb-4 md:block lg:w-3/4 lg:mx-auto xl:w-1/2 xl:mb-6">
      <StepTracker current={current} total={total} />
    </div>
  );
}
