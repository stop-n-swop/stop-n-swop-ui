import React from 'react';
import Card from 'ui/elements/Card';
import { useGetMessage } from 'ui/intl';
import { ids } from 'ui/messages';
import Loader from 'ui/modules/Loader';

export default function ProcessingScreen() {
  const g = useGetMessage();

  return (
    <div className="flex-grow flex justify-center items-center">
      <Card
        title={g(ids.checkout.payment.title)}
        className="max-w-screen-sm mx-auto"
      >
        <div className="flex flex-col items-center">
          <div className="space-y-12 w-96 text-center">
            <Loader />
            <p>{g(ids.checkout.processing.text)}</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
