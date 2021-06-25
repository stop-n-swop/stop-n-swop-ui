import React from 'react';
import { Link } from 'react-router-dom';
import { makeGameNewListingPath } from 'ui/constants/paths';
import Button from 'ui/elements/Button';
import Typeahead from 'ui/elements/Typeahead';
import { FaRocket } from 'react-icons/fa';
import { useGetMessage } from 'ui/intl';
import { ids } from 'ui/messages';
import type { Game } from '@sns/contracts/product';

interface Props {
  onSearch(value: string): void;
  productId: string;
  platformId: string;
  setProductId(value: string): void;
  results: Game[];
}

export default function GameFinder({
  onSearch,
  platformId,
  productId,
  setProductId,
  results,
}: Props) {
  const options = results.map((product) => ({
    value: product.id,
    label: product.name,
  }));
  const getMessage = useGetMessage();

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
            to={makeGameNewListingPath({ productId, platformId })}
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
