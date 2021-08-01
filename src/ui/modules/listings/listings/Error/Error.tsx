import { BaseError } from '@sns/abyss';
import React from 'react';
import Button from 'ui/elements/Button';
import Card from 'ui/elements/Card';
import { useMessage } from 'ui/intl';
import { ids } from 'ui/messages';
import type { FallbackProps } from 'react-error-boundary';

export default function Error({ error, resetErrorBoundary }: FallbackProps) {
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
    <Card className="flex-grow flex flex-col items-center">
      <div className="space-y-8">
        <p>{message}</p>
        <div className="justify-center flex">
          <Button kind="primary" onClick={resetErrorBoundary}>
            {useMessage(ids.error.retryButton)}
          </Button>
        </div>
      </div>
    </Card>
  );
}
