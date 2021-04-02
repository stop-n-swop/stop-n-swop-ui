import { State } from 'ui/elements/Button';
import { Status } from '@respite/core';

export const getButtonState = (status: Status): State => {
  switch (status) {
    case Status.LOADING:
      return 'pending';
    case Status.SUCCESS:
      return 'success';
    default:
      return 'none';
  }
};
