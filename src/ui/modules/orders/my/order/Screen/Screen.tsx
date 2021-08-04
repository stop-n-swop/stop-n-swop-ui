import React, { ReactNode } from 'react';
import Card from 'ui/elements/Card';
import FormError from 'ui/elements/FormError';
import type { Game } from '@sns/contracts/product';

export default function MyOrderScreen({
  game,
  error,
  overview,
}: {
  game: Game;
  error: any;
  overview: ReactNode;
}) {
  return (
    <Card
      title={game.name}
      className="md:mt-3 lg:mt-4 xl:mg-8 xl:w-4/5 xl:mx-auto flex flex-col"
    >
      <If condition={error}>
        <FormError error={error} />
      </If>
      {overview}
    </Card>
  );
}
