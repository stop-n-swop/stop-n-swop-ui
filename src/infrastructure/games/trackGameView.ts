import jpex from 'jpex';
import type { TrackGameView } from 'core/games';
import type { Driver } from 'core/io';

jpex.factory<TrackGameView>(
  (driver: Driver): TrackGameView =>
    async ({ id }) => {
      await driver({
        url: '/games/{productId}/view',
        method: 'POST',
        params: {
          productId: id,
        },
      });
    },
);
