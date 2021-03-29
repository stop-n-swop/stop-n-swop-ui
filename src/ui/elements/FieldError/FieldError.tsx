import React from 'react';

export default function FieldError({ error }: { error: any }) {
  if (error == null) {
    return null;
  }

  return <div className="text-red-300 text-sm">{error.message}</div>;
}
