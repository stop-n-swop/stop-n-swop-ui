import { BaseError, ValidationError } from '@sns/abyss';
import React, { useMemo } from 'react';
import Button from 'ui/elements/Button';
import { useGetMessage } from 'ui/intl';
import { ids } from 'ui/messages';

export default function Error({
  error,
  previous,
}: {
  error: any;
  previous(): void;
}) {
  const getMessage = useGetMessage();
  const message = useMemo(() => {
    if (error instanceof ValidationError) {
      return Object.values(error.errors);
    }
    if (error instanceof BaseError) {
      return error.toString();
    }
    return error?.message;
  }, [error]);

  return (
    <div className="space-y-8 flex flex-col items-center my-12">
      <h2>{getMessage(ids.listings.new.error.title)}</h2>
      <Choose>
        <When condition={Array.isArray(message)}>
          {(message as string[]).map((message) => (
            <p>{message}</p>
          ))}
        </When>
        <Otherwise>
          <p>{message}</p>
        </Otherwise>
      </Choose>
      <Button kind="secondary" onClick={previous}>
        {getMessage(ids.listings.new.error.back)}
      </Button>
    </div>
  );
}
