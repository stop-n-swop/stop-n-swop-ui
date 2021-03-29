import React, { ReactNode } from 'react';
import { FormattedMessage } from 'react-intl';
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
  return (
    <div className="text-right mt-10 flex justify-end space-x-6">
      <If condition={!first}>
        <Button kind="secondary" onClick={previous}>
          <FormattedMessage id={ids.listings.new.buttons.back} />
        </Button>
      </If>
      <If condition={!last && showNext}>
        <Button kind="primary" type="submit">
          <FormattedMessage id={ids.listings.new.buttons.next} />
        </Button>
      </If>
      {children}
    </div>
  );
}
