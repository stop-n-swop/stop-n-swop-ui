import React, { Suspense } from 'react';
import { Link } from 'react-router-dom';
import { makeGameNewListingPath } from 'ui/constants/paths';
import Button from 'ui/elements/Button';
import Typeahead from 'ui/elements/Typeahead';
import { FaArrowRight } from 'react-icons/fa';
import { useGetMessage } from 'ui/intl';
import { ids } from 'ui/messages';
import Loader from 'ui/modules/Loader';
import type { Game, Platform } from '@sns/contracts/product';
import type { Query } from '@respite/core';
import Preview from './Preview';

interface Props {
  onSearch(value: string): void;
  productId: string;
  setProductId(value: string): void;
  results: Game[];
  platforms: Platform[];
  openHowItWorks(): void;
  openTrouble(): void;
  gameQuery: Query<Game>;
  loading: boolean;
}

export default function GameFinder({
  onSearch,
  productId,
  setProductId,
  results,
  platforms,
  openHowItWorks,
  openTrouble,
  gameQuery,
  loading,
}: Props) {
  const getMessage = useGetMessage();
  const options = results.map((product) => {
    const platform = platforms.find(
      (platform) => platform.id === product.platformId,
    );
    const value = product.id;
    const label = getMessage(ids.listings.new.game.game, {
      game: product.name,
      platform: platform.name,
    });

    return {
      value,
      label,
    };
  });

  return (
    <div className="space-y-8 flex-grow flex flex-col items-start">
      <h3 className="text-lg">{getMessage(ids.listings.new.game.label)}</h3>
      <div className="w-full">
        <Typeahead
          id="game_search"
          options={options}
          value={productId}
          onChange={setProductId}
          onSearch={onSearch}
          autoFocus
          label=""
          isLoading={loading}
        />
      </div>
      <div className="flex  w-full justify-between items-end">
        <Button
          className="text-sm"
          padding={false}
          kind="tertiary"
          onClick={openHowItWorks}
        >
          {getMessage(ids.listings.new.buttons.help)}
        </Button>
        <Button className="text-xs" padding={false} onClick={openTrouble}>
          {getMessage(ids.listings.new.buttons.trouble)}
        </Button>
      </div>
      <If condition={Boolean(productId)}>
        <div className="flex flex-col justify-around sm:flex-row flex-grow w-full">
          <div className="w-3/4 mx-auto sm:mx-0 sm:w-1/2">
            <Suspense
              fallback={
                <div className="flex justify-center items-center">
                  <Loader />
                </div>
              }
            >
              <Preview gameQuery={gameQuery} />
            </Suspense>
          </div>
          <div className="sm:w-1/2 flex justify-center items-center">
            <Button
              component={Link}
              kind="primary"
              to={makeGameNewListingPath({ productId })}
              className="w-full sm:w-auto"
              style={{ minWidth: '75%' }}
            >
              <span className="pr-3">
                {getMessage(ids.listings.new.game.button)}
              </span>
              <FaArrowRight />
            </Button>
          </div>
        </div>
      </If>
    </div>
  );
}
