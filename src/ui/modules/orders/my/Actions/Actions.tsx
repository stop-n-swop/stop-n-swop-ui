import React, { useState, MouseEvent } from 'react';
import { Order, Status } from '@sns/contracts/order';
import Button from 'ui/elements/Button';
import { useGetMessage } from 'ui/intl';
import { ids } from 'ui/messages';
import { makeGetButtonState } from 'ui/modules/listings/my/listings/Actions';
import type { Status as RStatus } from '@respite/core';

interface Props {
  order: Order;
  status: RStatus;
  onClick(status: Status): void;
}

export default function Actions({ order, status, onClick }: Props) {
  const [active, setActive] = useState<Status>();
  const handleClick =
    (status: Status) => (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      setActive(status);
      onClick(status);
    };
  const getMessage = useGetMessage();
  const getButtonState = makeGetButtonState(active, status);

  if (order.status === Status.CREATED) {
    return null;
  }
  if (order.status === Status.PAID) {
    return null;
  }
  if (order.status === Status.POSTED) {
    return (
      <Button
        kind="primary"
        state={getButtonState(Status.RECEIVED)}
        onClick={handleClick(Status.RECEIVED)}
      >
        {getMessage(ids.order.actions.received)}
      </Button>
    );
  }
  if (order.status === Status.RECEIVED) {
    return (
      <Button kind="primary">{getMessage(ids.order.actions.feedback)}</Button>
    );
  }
  return null;
}
