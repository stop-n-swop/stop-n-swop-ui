import { BASE_CHARGE_RATE } from '@sns/contracts/listing';
import React from 'react';

const perc = '%';

export default function BaseChargeRate() {
  return (
    <>
      {BASE_CHARGE_RATE * 100}
      {perc}
    </>
  );
}
