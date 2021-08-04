import { BaseError } from '@sns/abyss';
import React, { useState } from 'react';

export default function FormError({ error }: { error: any }) {
  const [showMore, setShowMore] = useState(false);

  if (error == null) {
    return null;
  }

  const message = (() => {
    if (typeof error === 'string') {
      return error;
    }
    if (error instanceof BaseError) {
      if (showMore) {
        return (
          <pre>
            {' '}
            {JSON.stringify(
              {
                message: error.toString(),
                ...error.toHttpResponse(),
              },
              null,
              2,
            )}
          </pre>
        );
      }
      return error.toString();
    }
    if (typeof error.message === 'string') {
      return error.message;
    }
    if (typeof error.ResultMessage === 'string') {
      return error.ResultMessage;
    }
    return undefined;
  })();

  if (message == null) {
    return null;
  }

  return (
    <div
      onDoubleClick={() => setShowMore(!showMore)}
      className="bg-danger-light p-4 rounded"
    >
      {message}
    </div>
  );
}
