import { BaseError } from '@sns/abyss';
import React from 'react';
import type { FallbackProps } from 'react-error-boundary';

interface Props extends FallbackProps {
  error: any;
}

export default function ErrorPage({ error }: Props) {
  const message = (() => {
    if (error instanceof BaseError) {
      return error.toString();
    }
    if (typeof error === 'string') {
      return error;
    }
    return error?.message;
  })();

  return <>{message}</>;
}
