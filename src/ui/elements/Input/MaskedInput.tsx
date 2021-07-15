import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import cx from 'classnames';

export default function MaskedInput({
  value,
  onChange,
  render,
  groupLength,
  maxLength,
  className,
}: {
  value: string;
  onChange(value: string): any;
  groupLength: number;
  maxLength: number;
  className?: string;
  render: (props: {
    minLength: number;
    maxLength: number;
    index: number;
    first: boolean;
    last: boolean;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => any;
  }) => JSX.Element;
}) {
  const totalGroups = maxLength / groupLength;

  const splitValue = (value: string) => {
    const v = value || '';
    return new Array(totalGroups).fill(null).map((_, i) => {
      return v.substr(i * groupLength, groupLength);
    });
  };

  const ref = useRef<HTMLDivElement>(null);
  const [values, setValues] = useState<string[]>(() => {
    return splitValue(value);
  });
  const parsed = values.join('');

  useEffect(() => {
    if (parsed === value && parsed !== '') {
      return;
    }
    setValues(splitValue(value));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  useEffect(() => {
    if (parsed !== value) {
      onChange(parsed);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parsed]);

  return (
    <div ref={ref} className={cx('flex space-x-2', className)}>
      {values.map((part, i) => {
        const props = {
          minLength: groupLength,
          maxLength: maxLength - groupLength * i,
          index: i,
          first: i === 0,
          last: i === totalGroups - 1,
          value: part,
          onKeyDown: (e: any) => {
            if (e.target.value.length === 1 && e.key === 'Backspace') {
              setTimeout(() => {
                ref.current.querySelectorAll('input')[i - 1]?.focus();
              }, 0);
            }
          },
          onChange: (e: ChangeEvent<HTMLInputElement>) => {
            let { value } = e.target;
            const newValues = [...values];

            if (value) {
              let x = i;
              for (; x < totalGroups; x += 1) {
                newValues[x] = value.substr(0, groupLength);
                value = value.substr(groupLength);
                if (!value) {
                  break;
                }
              }
              if (x < totalGroups && x > i) {
                const inputs = ref.current.querySelectorAll('input');
                inputs[x]?.focus();
              } else if (x === i && newValues[x].length === groupLength) {
                const inputs = ref.current.querySelectorAll('input');
                inputs[x + 1]?.focus();
              }
            } else {
              newValues[i] = '';
            }
            setValues(newValues);
          },
        };

        return render(props);
      })}
    </div>
  );
}
