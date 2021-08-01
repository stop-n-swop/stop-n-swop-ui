import { BaseError } from '@sns/abyss';
import React from 'react';
import Card from 'ui/elements/Card';
import { FaFrownOpen } from 'react-icons/fa';
import Button from 'ui/elements/Button';
import { useGetMessage } from 'ui/intl';
import { ids } from 'ui/messages';
import type { FallbackProps } from 'react-error-boundary';

interface Props extends FallbackProps {
  error: any;
}

export default function ErrorPage({ error, resetErrorBoundary }: Props) {
  const g = useGetMessage();
  const message = (() => {
    if (error instanceof BaseError) {
      return error.toString();
    }
    if (typeof error === 'string') {
      return error;
    }
    return error?.message;
  })();

  return (
    <div className="flex-grow flex md:justify-center md:items-center">
      <Card
        title={
          <div className="flex items-center space-x-12 w-full">
            <FaFrownOpen size="4rem" className="text-danger" />
            <span>{g(ids.error.title)}</span>
          </div>
        }
        className="max-w-screen-md w-full"
      >
        <div className="space-y-8">
          <p>{message}</p>
          <Button kind="primary" onClick={() => resetErrorBoundary(error)}>
            {g(ids.error.retryButton)}
          </Button>
        </div>
      </Card>
    </div>
  );
}
