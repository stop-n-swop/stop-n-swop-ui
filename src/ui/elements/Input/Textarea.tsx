import React, { ReactNode, TextareaHTMLAttributes } from 'react';
import cx from 'classnames';

type State = 'none' | 'error';

export interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  id: string;
  label: ReactNode;
  height?: number | string;
  state?: State;
}

export default function Textarea({
  id,
  label,
  height = 'auto',
  state,
  ...props
}: Props) {
  return (
    <div className="flex-grow">
      <label htmlFor={id} className="text-gray-200 text-sm">
        {label}
      </label>
      <textarea
        className={cx(
          'border rounded bg-transparent outline-none w-full px-4 py-3',
          state === 'error' && 'border-red-400',
        )}
        style={{ height }}
        {...props}
      />
    </div>
  );
}
