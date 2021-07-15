import React from 'react';
import { useParams } from 'react-router-dom';
import CompleteScreen from 'ui/modules/checkout/complete/Screen';

export default function Complete() {
  const { orderId } = useParams<{ orderId: string }>();

  return <CompleteScreen orderId={orderId} />;
}
