import React from 'react';
import Buying from './Buying';
import Selling from './Selling';

export default function BuyingOrSelling() {
  return (
    <div className="md:flex md:justify-around md:bg-black">
      <Selling />
      <Buying />
    </div>
  );
}
