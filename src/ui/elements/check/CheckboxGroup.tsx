import React, { Children, ReactNode, useMemo, useState } from 'react';
import { useGetMessage } from 'ui/intl';
import { ids } from 'ui/messages';
import Button from '../Button';
import FieldError from '../FieldError';
import context from './context';

interface Props {
  value: any[];
  onChange(value: any[]): void;
  limit?: number;
  error?: any;
  children?: ReactNode;
}

export default function CheckboxGroup({
  onChange,
  value: list,
  limit,
  error,
  children,
}: Props) {
  const getMessage = useGetMessage();
  const [showMore, setShowMore] = useState(false);
  const total = Children.count(children);

  const childrenArr = useMemo(() => {
    if (showMore || !limit) {
      return children;
    }
    if (total > limit) {
      return Children.toArray(children).slice(0, limit);
    }
    return children;
  }, [children, limit, showMore, total]);

  return (
    <context.Provider
      value={{
        check(value) {
          onChange(list.concat(value));
        },
        uncheck(value) {
          onChange(list.filter((item) => item !== value));
        },
        isChecked(value) {
          return list.includes(value);
        },
      }}
    >
      <div className="space-y-3">
        {childrenArr}
        <If condition={limit && total > limit}>
          <Button
            kind="tertiary"
            className="text-xs"
            padding={false}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              return setShowMore(!showMore);
            }}
          >
            <Choose>
              <When condition={showMore}>
                {getMessage(ids.elements.checkbox.collapse)}
              </When>
              <Otherwise>{getMessage(ids.elements.checkbox.expand)}</Otherwise>
            </Choose>
          </Button>
        </If>
        <If condition={Boolean(error)}>
          <FieldError error={error} />
        </If>
      </div>
    </context.Provider>
  );
}
