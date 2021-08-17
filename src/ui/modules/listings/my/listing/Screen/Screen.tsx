import React, { ReactNode } from 'react';
import Card from 'ui/elements/Card';

import FormError from 'ui/elements/FormError';
import type { Game } from '@sns/contracts/product';

export default function MyListingScreen({
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
      className="md:mt-3 lg:mt-4 xl:mt-8 w-full max-w-screen-lg mx-auto flex flex-col space-y-8"
    >
      <If condition={error}>
        <FormError error={error} />
      </If>
      {overview}
    </Card>
  );
}
