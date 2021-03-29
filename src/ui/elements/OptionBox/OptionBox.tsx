import React, { ReactNode, useRef } from 'react';
import cx from 'classnames';

export default function OptionBox({
  type,
  onClick,
  children,
  selected,
  className,
}: {
  type?: string;
  className?: string;
  selected?: boolean;
  onClick(): void;
  children: ReactNode;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const submitText = 'submit';

  return (
    <div className={className}>
      <div className="relative" style={{ '--aspect-ratio': 1 } as any}>
        <button
          type="button"
          className={cx(
            'text-black rounded-lg shadow-inner focus:outline-none w-full flex flex-col justify-center items-center space-y-4',
            selected
              ? 'bg-green-500 text-white'
              : 'bg-green-50 hover:bg-green-200',
          )}
          onClick={() => {
            onClick();
            if (type === 'submit') {
              setTimeout(() => {
                ref.current?.click();
              }, 500);
            }
          }}
        >
          {children}
        </button>
        <If condition={type === 'submit'}>
          <button className="hidden" ref={ref} type="submit">
            {submitText}
          </button>
        </If>
      </div>
    </div>
  );
}
