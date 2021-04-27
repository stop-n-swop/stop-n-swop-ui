import React from 'react';
import type { FallbackProps } from 'react-error-boundary';
import { getErrorMessage } from 'domain/selectors/common';
import { useIntl } from 'ui/intl';

interface Props extends FallbackProps {
  error: any;
}

export default function ErrorPage({ error }: Props) {
  const message = getErrorMessage(error, useIntl());

  return <>{message}</>;
}
