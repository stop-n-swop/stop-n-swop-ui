import React, { ReactNode } from 'react';
import { FaCheck } from 'react-icons/fa';
import cx from 'classnames';

type Kind = 'primary' | 'secondary';

interface Props {
  value: boolean;
  label?: ReactNode;
  className?: string;
  readonly?: boolean;
  kind?: Kind;
  onChange?(checked: boolean): void;
}

const getColourClasses = ({
  value,
  readonly,
  kind,
}: {
  value: boolean;
  readonly: boolean;
  kind: Kind;
}) => {
  if (kind === 'secondary') {
    if (value) {
      if (readonly) {
        return 'text-black border-black';
      }
      return 'bg-white border-transparent text-green-500';
    }
    return 'border-black text-transparent';
  }
  if (value) {
    if (readonly) {
      return 'text-white border-white';
    }
    return 'bg-green-500 border-transparent text-white';
  }
  return 'border-white text-transparent';
};

export default function Checkbox({
  onChange,
  value,
  label = '',
  className,
  readonly,
  kind = 'primary',
}: Props) {
  return (
    <label className={cx('flex items-center cursor-pointer', className)}>
      <button
        type="button"
        className={cx(
          getColourClasses({ readonly, value, kind }),
          'p-1 border-2 md:transition-colors',
        )}
        role="checkbox"
        aria-checked={value}
        onClick={() => onChange?.(!value)}
      >
        <FaCheck className="text-xs" />
      </button>
      <span className={cx(label && 'pl-2')}>{label}</span>
    </label>
  );
}
