import React, { useState, MouseEvent } from 'react';
import { Status as RStatus } from '@respite/core';
import { Order } from 'core/entity/orders';
import { Status } from 'core/constants/order';
import Button from 'ui/elements/Button';
import { FormattedMessage } from 'react-intl';
import { ids } from 'ui/messages';
import { makeGetButtonState } from 'ui/modules/listings/my/listings/Actions';

interface Props {
  order: Order;
  status: RStatus;
  onClick(status: Status): void;
}

export default function Actions({ order, status, onClick }: Props) {
  const [active, setActive] = useState<Status>();
  const handleClick = (status: Status) => (
    e: MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();
    setActive(status);
    onClick(status);
  };
  const getButtonState = makeGetButtonState(active, status);

  if (order.status === Status.CREATED) {
    return null;
  }
  if (order.status === Status.SOLD) {
    return null;
  }
  if (order.status === Status.POSTED) {
    return (
      <Button
        kind="primary"
        state={getButtonState(Status.RECEIVED)}
        onClick={handleClick(Status.RECEIVED)}
      >
        <FormattedMessage id={ids.order.actions.received} />
      </Button>
    );
  }
  if (order.status === Status.RECEIVED) {
    return (
      <Button kind="primary">
        <FormattedMessage id={ids.order.actions.feedback} />
      </Button>
    );
  }
  return null;
}
