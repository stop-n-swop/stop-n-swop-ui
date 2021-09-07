import React, { useMemo } from 'react';
import cx from 'classnames';
import { useGetMessage } from 'ui/intl';
import { ids } from 'ui/messages';
import type { Game, Platform } from '@sns/contracts/product';

interface Props {
  game: Game;
  platforms: Platform[];
  listingCounts: Record<string, number>;
}

export default function Listings({
  game: { id, gameId },
  platforms,
  listingCounts,
}: Props) {
  const g = useGetMessage();
  const totalListings = useMemo(() => {
    if (platforms.length <= 1) {
      return listingCounts[id] ?? 0;
    }
    return platforms.reduce((acc, platform) => {
      const id = `${platform.id}-${gameId}`;
      const count = listingCounts[id] ?? 0;
      return acc + count;
    }, 0);
  }, [gameId, id, listingCounts, platforms]);
  const hasListings = totalListings > 0;

  return (
    <div
      className={cx(
        'text-xs',
        hasListings ? 'text-primary-lightest' : 'text-gray-500',
      )}
    >
      {g(ids.games.search.results.available, {
        count: totalListings,
      })}
    </div>
  );
}
