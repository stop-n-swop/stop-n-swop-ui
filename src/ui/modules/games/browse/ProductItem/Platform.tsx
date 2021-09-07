import React from 'react';
import { useGetMessage } from 'ui/intl';
import { ids } from 'ui/messages';
import type { Platform as IPlatform } from '@sns/contracts/product';

interface Props {
  platforms: IPlatform[];
}

export default function Platform({ platforms }: Props) {
  const g = useGetMessage();
  const hasManyPlatforms = platforms.length > 1;

  return (
    <div className="text-xs">
      <Choose>
        <When condition={hasManyPlatforms}>
          <span>
            {g(ids.games.search.results.platformAvailable, {
              count: platforms.length,
            })}
          </span>
        </When>
        <Otherwise>
          <span>{platforms[0]?.name}</span>
        </Otherwise>
      </Choose>
    </div>
  );
}
