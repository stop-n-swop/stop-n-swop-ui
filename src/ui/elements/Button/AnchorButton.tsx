import React from 'react';
import type { Props } from './types';
import Button from './Button';

export default function LinkButton(props: Props) {
  return <Button component="a" padding={false} {...props} />;
}
