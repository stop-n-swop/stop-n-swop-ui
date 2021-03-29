import { ShortProduct } from 'core/entity/products';
import React, { useState } from 'react';
import NewListing from './NewListing';

export default function ConnectedNewListing() {
  const [, setSearch] = useState('');
  const [productId, setProductId] = useState('');
  const results: ShortProduct[] = [
    {
      productId: 'super_mario_60',
      name: 'Super Mario 60',
    },
    {
      productId: 'super_mario_61',
      name: 'Super Mario 61',
    },
    {
      productId: 'super_mario_62',
      name: 'Super Mario 62',
    },
    {
      productId: 'super_mario_63',
      name: 'Super Mario 63',
    },
    {
      productId: 'super_mario_64',
      name: 'Super Mario 64',
    },
  ];

  return (
    <NewListing
      onSearch={setSearch}
      productId={productId}
      setProductId={setProductId}
      results={results}
    />
  );
}
