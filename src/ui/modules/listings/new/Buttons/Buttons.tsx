import React, { ReactNode } from 'react';
import { useGetMessage } from 'ui/intl';
import Button from 'ui/elements/Button';
import { ids } from 'ui/messages';

export default function Buttons({
  first = false,
  last = false,
  showNext = true,
  previous,
  children,
}: {
  previous(): void;
  showNext?: boolean;
  first?: boolean;
  last?: boolean;
  children?: ReactNode;
}) {
  const getMessage = useGetMessage();

  return (
    <div className="text-right mt-10 flex justify-end space-x-6">
      <If condition={!first}>
        <Button kind="secondary" onClick={previous}>
          {getMessage(ids.listings.new.buttons.back)}
        </Button>
      </If>
      {children}
      <If condition={!last && showNext}>
        <Button kind="primary" type="submit">
          {getMessage(ids.listings.new.buttons.next)}
        </Button>
      </If>
    </div>
  );
}
