import { ListingOwnedByUserError } from '@sns/abyss';
import React, { useMemo } from 'react';
import FormError from './FormError';

export default {
  title: 'elements / FormError',
};

export const Basic = () => {
  const err = useMemo(() => {
    return new ListingOwnedByUserError();
  }, []);

  return <FormError error={err} />;
};
