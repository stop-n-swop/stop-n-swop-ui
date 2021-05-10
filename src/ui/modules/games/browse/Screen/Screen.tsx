import React, { ReactNode } from 'react';
import Search from 'ui/modules/games/browse/Search';
import { ProductList } from 'ui/modules/product/products';
import Filters from 'ui/modules/games/browse/Filters';
import type { Platform } from '@sns/contracts/product';
import PageTitle from 'ui/elements/PageTitle';
import { useMessage } from 'ui/intl';
import { ids } from 'ui/messages';
import type { Query } from '@respite/core';
import type { useGames } from 'application/games';
import More from '../More';
import Empty from '../Empty';

export default function BrowseScreen({
  platformsQuery,
  gamesQuery,
  hasSearched,
  search,
  platformIds,
  setPlatformIds,
  onSearch,
  children,
  setPage,
}: {
  hasSearched: boolean;
  platformsQuery: Query<Platform[]>;
  gamesQuery: ReturnType<typeof useGames>;
  search: string;
  platformIds: string[];
  onSearch(value: string): void;
  setPlatformIds(value: string[]): void;
  setPage(page: number): void;
  children: ReactNode;
}) {
  const {
    data: {
      nextPage,
      counts: { platforms: platformCounts },
    },
  } = gamesQuery;
  const { data: platforms } = platformsQuery;

  return (
    <div className="flex-grow flex flex-col">
      <PageTitle>{useMessage(ids.games.title)}</PageTitle>
      <Search value={search} onChange={onSearch} />
      <div className="flex-grow flex flex-col lg:flex-row">
        <Filters
          platforms={platforms}
          platformIds={platformIds}
          setPlatformIds={setPlatformIds}
          platformCounts={platformCounts}
          hasSearched={hasSearched}
        />
        <Choose>
          <When condition={!hasSearched}>
            <Empty />
          </When>
          <Otherwise>
            <div className="flex-grow">
              <ProductList>{children}</ProductList>
              <If condition={nextPage != null && nextPage >= 0}>
                <More nextPage={nextPage} setPage={setPage} />
              </If>
            </div>
          </Otherwise>
        </Choose>
      </div>
    </div>
  );
}
