import React, { ReactNode } from 'react';
import {
  FaCheck,
  FaEnvelope,
  FaLock,
  FaThumbsDown,
  FaThumbsUp,
  FaTimes,
  FaUnlock,
} from 'react-icons/fa';
import { Status as Action } from '@sns/contracts/order';
import { Status } from '@respite/action';
import { ids } from 'ui/messages';
import Button, { Kind, State } from 'ui/elements/Button';
import { useGetMessage } from 'ui/intl';

const iconMatrix = {
  [Action.OPEN]: FaUnlock,
  [Action.CLOSED]: FaLock,
  [Action.CANCELLED]: FaTimes,
  [Action.APPROVED]: FaCheck,
  [Action.DECLINED]: FaTimes,
  [Action.POSTED]: FaEnvelope,
  [Action.RECEIVED]: FaThumbsUp,
  [Action.DISPUTED]: FaThumbsDown,
};
const kindMatrix = {
  [Action.OPEN]: 'primary',
  [Action.CLOSED]: 'secondary',
  [Action.CANCELLED]: 'primary',
  [Action.APPROVED]: 'primary',
  [Action.DECLINED]: 'secondary',
  [Action.POSTED]: 'primary',
  [Action.RECEIVED]: 'primary',
  [Action.DISPUTED]: 'secondary',
};
const stateMatrix = {
  [Action.CANCELLED]: 'error',
  [Action.DECLINED]: 'error',
};
const messageMatrix = {
  [Action.OPEN]: ids.order.actions.open,
  [Action.CLOSED]: ids.order.actions.closed,
  [Action.CANCELLED]: ids.order.actions.cancelled,
  [Action.APPROVED]: ids.order.actions.approved,
  [Action.DECLINED]: ids.order.actions.declined,
  [Action.POSTED]: ids.order.actions.posted,
  [Action.RECEIVED]: ids.order.actions.received,
  [Action.DISPUTED]: ids.order.actions.disputed,
};

interface Props {
  orderId: string;
  action: Action;
  status: Status;
  active: boolean;
  onClick(args: { orderId: string; status: Action }): void;
  state?: State;
  kind?: Kind;
  showIcon?: boolean;
  children?: ReactNode;
}

const Nothing = () => null;

const getButtonState = (
  active: boolean,
  status: Status,
  action: Action,
  baseState: State | undefined,
): State => {
  const defaultState = baseState ?? stateMatrix[action] ?? 'none';
  if (!active) {
    return defaultState;
  }
  if (status === Status.LOADING) {
    return 'pending';
  }
  if (status === Status.SUCCESS) {
    return 'success';
  }
  return defaultState;
};

export default function ActionButton({
  orderId,
  action,
  active,
  onClick,
  status,
  kind: baseKind,
  state: baseState,
  showIcon = true,
  children,
}: Props) {
  const g = useGetMessage();
  const Icon = (showIcon ? iconMatrix[action] : undefined) ?? Nothing;
  const kind = baseKind ?? kindMatrix[action];
  const state = getButtonState(active, status, action, baseState);
  const messageId = messageMatrix[action];

  return (
    <Button
      className="w-full lg:w-auto space-x-4"
      kind={kind}
      state={state}
      onClick={() => onClick({ orderId, status: action })}
    >
      <Choose>
        <When condition={children}>{children}</When>
        <Otherwise>
          <span>
            <Icon />
          </span>
          <span>{g(messageId)}</span>
        </Otherwise>
      </Choose>
    </Button>
  );
}
