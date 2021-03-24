import React, { useState } from 'react';
import { Platform } from 'core/entity/products';
import NewListing from './NewListing';

const productIds = [
  'Super Mario 64',
  'Super Mario Sunshine',
  'Super Mario Galaxy',
  'Super Mario Galaxy 2',
  'Super Mario World',
  'Super Mario Bros 3',
  'Super Mario Bros 2',
  'Super Mario Bros',
  'Super Mario Kart',
  'Mario Kart 64',
  'Mario Kart Double Dash',
  'Mario Kart Wii',
  'Mario Kart 8',
];
const manufacturers = ['Nintendo', 'Sony', 'Microsoft'].map((name) => ({
  id: name,
  name,
}));
const platforms: Platform[] = [
  'NES',
  'SNES',
  'N64',
  'Gamecube',
  'Wii',
  'Wii U',
].map((name) => ({
  productId: name,
  platformId: name,
  name,
  type: 'platform',
  banner: '',
  cover: '',
  developer: '',
  publisher: '',
  releaseDate: new Date(),
}));

export default function ConnectedNewListing() {
  const [search, setSearch] = useState('');

  return (
    <NewListing
      search={search}
      onSearch={setSearch}
      manufacturers={manufacturers}
      platforms={platforms}
      productIds={productIds}
    />
  );
}
