import React from 'react';
import { BaseError } from '@sns/abyss';

export default function FieldError({ error }: { error: any }) {
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

  return <div className="text-danger-light py-3 text-sm">{message}</div>;
}
