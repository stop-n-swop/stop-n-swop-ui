import React from 'react';
import { Link } from 'react-router-dom';
import { GAMES, makeMyOrderPath } from 'ui/constants/paths';
import Button from 'ui/elements/Button';
import Card from 'ui/elements/Card';
import Text from 'ui/help/checkout/complete.mdx';
import { useGetMessage } from 'ui/intl';
import { ids } from 'ui/messages';

export default function CompleteScreen({ orderId }: { orderId: string }) {
  const getMessage = useGetMessage();

  return (
    <div className="flex-grow flex flex-col justify-center lg:items-center">
      <Card
        className="flex-grow flex flex-col md:flex-grow-0 container xl:max-w-screen-lg mx-auto"
        title={getMessage(ids.checkout.complete.title)}
      >
        <div className="space-y-8">
          <div className="help">
            <Text orderId={orderId} />
          </div>
          <div className="flex justify-around">
            <Button component={Link} to={GAMES} kind="secondary">
              {getMessage(ids.checkout.complete.games)}
            </Button>
            <Button
              component={Link}
              to={makeMyOrderPath({ orderId })}
              kind="primary"
            >
              {getMessage(ids.checkout.complete.myOrder)}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
