import { Status } from '@respite/core';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import Button from 'ui/elements/Button';
import { ids } from 'ui/messages';
import { getButtonState } from '../../login/utils';

export default function Buttons({ status }: { status: Status }) {
  return (
    <Button
      type="submit"
      kind="primary"
      state={getButtonState(status)}
      className="w-full md:w-1/2 md:mx-auto xl:px-20 xl:w-full"
    >
      <FormattedMessage id={ids.auth.register.buttons.submit} />
    </Button>
  );
}
