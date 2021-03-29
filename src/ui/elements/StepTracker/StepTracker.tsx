import React from 'react';
import cx from 'classnames';

const Segment = ({ index, current }: { index: number; current: number }) => {
  return (
    <div
      className={cx(
        'rounded-full w-4 h-4 transition-colors flex-shrink-0',
        current >= index && 'bg-green-400 border-2 border-green-400',
        // current === index && 'border-green-400 border-2 bg-transparent',
        current < index && 'border-gray-200 border-2 bg-transparent',
      )}
      style={{ transitionDuration: '500ms', transitionDelay: '250ms' }}
    />
  );
};

const Trail = ({
  index,
  current,
  total,
}: {
  index: number;
  current: number;
  total: number;
}) => {
  return (
    <div
      className={cx('h-1 relative bg-gray-200')}
      style={{ width: `${(1 / (total - 1)) * 100}%` }}
    >
      <div
        className={cx(
          'absolute left-0 top-0 h-full bg-green-400',
          current >= index ? 'w-full' : 'w-0',
        )}
        style={{
          transition: 'width 500ms',
        }}
      />
    </div>
  );
};

export default function StepTracker({
  current,
  total,
}: {
  current: number;
  total: number;
}) {
  const arr = new Array(total).fill(null);

  return (
    <div className="flex items-center">
      {arr.map((_, i) => (
        <>
          <If condition={i > 0}>
            <Trail current={current} index={i} total={total} />
          </If>
          <Segment current={current} index={i} />
        </>
      ))}
    </div>
  );
}
