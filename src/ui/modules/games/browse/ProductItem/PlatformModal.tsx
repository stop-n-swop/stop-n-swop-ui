import React from 'react';
import { Link } from 'react-router-dom';
import cx from 'classnames';
import { makeGamePath } from 'ui/constants/paths';
import { useGetMessage } from 'ui/intl';
import { ids } from 'ui/messages';
import Modal from 'ui/elements/Modal';
import { sortBy } from 'crosscutting/utils';
import type { Game, Platform } from '@sns/contracts/product';

interface Props {
  game: Game;
  platforms: Platform[];
  listingCounts: Record<string, number>;
  showPlatforms: boolean;
  setShowPlatforms(value: boolean): void;
}

export default function PlatformModal({
  game: { gameId, name },
  platforms,
  listingCounts,
  showPlatforms,
  setShowPlatforms,
}: Props) {
  const g = useGetMessage();
  const sortedPlatforms = sortBy(
    platforms,
    (platform) => {
      const productId = `${platform.id}-${gameId}`;
      const count = listingCounts[productId] ?? 0;
      return count;
    },
    false,
  );

  return (
    <Modal
      title={g(ids.games.search.results.platforModalTitle)}
      isOpen={showPlatforms}
      onClose={() => setShowPlatforms(false)}
    >
      <div className="space-y-8">
        <p>{name}</p>
        <div className="space-y-8">
          {sortedPlatforms.map((platform) => {
            const productId = `${platform.id}-${gameId}`;
            const count = listingCounts[productId] ?? 0;

            return (
              <Link
                key={productId}
                to={makeGamePath({ productId })}
                className={cx(
                  count || 'text-gray-300',
                  'block hover:text-primary transition-colors',
                )}
              >
                <div className="space-x-4 justify-between flex">
                  <span className="font-semibold text-lg">{platform.name}</span>
                  <span className="text-sm font-light">
                    {g(ids.games.search.results.available, {
                      count,
                    })}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </Modal>
  );
}
