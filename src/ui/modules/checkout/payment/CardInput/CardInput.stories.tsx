import React, { useState } from 'react';
import CardInput from './CardInput';

export default {
  title: 'modules / payment / CardScreen / CardInput',
};

export const Basic = () => {
  const [value, setValue] = useState('');

  return (
    <div>
      <div>
        <CardInput label="Card number" value={value} onChange={setValue} />
      </div>
      <div>{value}</div>
    </div>
  );
};
