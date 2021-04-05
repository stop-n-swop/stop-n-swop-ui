import React from 'react';
import { Link } from 'react-router-dom';
import { makeProductNewListingPath } from 'ui/constants/paths';
import Button from 'ui/elements/Button';
import Typeahead from 'ui/elements/Typeahead';
import { FaRocket } from 'react-icons/fa';
import { ShortProduct } from 'core/entity/products';
import { FormattedMessage } from 'react-intl';
import { ids } from 'ui/messages';

interface Props {
  onSearch(value: string): void;
  productId: string;
  setProductId(value: string): void;
  results: ShortProduct[];
}

export default function Intro({
  onSearch,
  productId,
  setProductId,
  results,
}: Props) {
  const options = results.map((product) => ({
    value: product.productId,
    label: product.name,
  }));

  return (
    <div>
      <h2 className="text-lg">
        <FormattedMessage id={ids.listings.new.title} />
      </h2>
      <Typeahead
        id="product_search"
        options={options}
        value={productId}
        onChange={setProductId}
        onSearch={onSearch}
        autoFocus
        label={<FormattedMessage id={ids.listings.new.intro.label} />}
      />
      <If condition={Boolean(productId)}>
        <div className="mt-10 flex justify-center">
          <Button
            component={Link}
            kind="primary"
            to={makeProductNewListingPath({ productId })}
          >
            <span className="pr-3">
              <FormattedMessage id={ids.listings.new.intro.button} />
            </span>
            <FaRocket />
          </Button>
        </div>
      </If>
    </div>
  );
}
