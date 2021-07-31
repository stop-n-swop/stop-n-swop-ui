import React from 'react';
import { Link } from 'react-router-dom';
import { makeGameNewListingPath } from 'ui/constants/paths';
import Button from 'ui/elements/Button';
import Typeahead from 'ui/elements/Typeahead';
import { FaRocket } from 'react-icons/fa';
import { useGetMessage } from 'ui/intl';
import { ids } from 'ui/messages';
import type { Game, Platform } from '@sns/contracts/product';

interface Props {
  onSearch(value: string): void;
  productId: string;
  setProductId(value: string): void;
  results: Game[];
  platforms: Platform[];
}

export default function GameFinder({
  onSearch,
  productId,
  setProductId,
  results,
  platforms,
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
    <div>
      <Typeahead
        id="product_search"
        options={options}
        value={productId}
        onChange={setProductId}
        onSearch={onSearch}
        autoFocus
        label={getMessage(ids.listings.new.game.label)}
      />
      <If condition={Boolean(productId)}>
        <div className="mt-10 flex justify-center">
          <Button
            component={Link}
            kind="primary"
            to={makeGameNewListingPath({ productId })}
          >
            <span className="pr-3">
              {getMessage(ids.listings.new.game.button)}
            </span>
            <FaRocket />
          </Button>
        </div>
      </If>
    </div>
  );
}
