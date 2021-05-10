import React, { useState } from 'react';
import { useAuthGuard } from 'application/auth';
import NewListing from './NewListing';

export default function ConnectedNewListing() {
  useAuthGuard({ username: true });

  const [, setSearch] = useState('');
  const [productId, setProductId] = useState('');
  const results: unknown[] = [
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
      platformId="nintendo-64"
      setProductId={setProductId}
      results={results}
    />
  );
}
