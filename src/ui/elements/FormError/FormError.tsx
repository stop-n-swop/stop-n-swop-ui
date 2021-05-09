import { BaseError } from '@sns/abyss';
import React from 'react';

export default function FormError({ error }: { error: any }) {
  if (error == null) {
    return null;
  }

  const message = (() => {
    if (typeof error === 'string') {
      return error;
    }
    if (error instanceof BaseError) {
      return error.toString();
    }
    if (typeof error.message === 'string') {
      return error.message;
    }
    return undefined;
  })();

  if (message == null) {
    return null;
  }

  return <div className="bg-danger p-4 rounded">{message}</div>;
}
