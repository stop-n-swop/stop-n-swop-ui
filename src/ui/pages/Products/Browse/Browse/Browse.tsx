import React from 'react';
import { useCascade } from 'ui/hooks';
import Search from 'ui/modules/product/browse/Search';
import { ProductList } from 'ui/modules/product/products';
import Filters from 'ui/modules/product/browse/Filters';
import type { Manufacturer, Platform } from '@sns/contracts/product';
import PageTitle from 'ui/elements/PageTitle';
import { FormattedMessage } from 'react-intl';
import { ids } from 'ui/messages';
import Item from '../Item';

export default function Browse({
  productIds,
  platforms,
  manufacturers,
  search,
  onSearch,
}: {
  productIds: string[];
  platforms: Platform[];
  manufacturers: Manufacturer[];
  search: string;
  onSearch(value: string): void;
}) {
  const cascade = useCascade(productIds.length);

  return (
    <div className="flex-grow flex flex-col">
      <PageTitle>
        <FormattedMessage id={ids.products.title} />
      </PageTitle>
      <Search value={search} onChange={onSearch} />
      <div className="flex-grow flex flex-col lg:flex-row">
        <Filters manufacturers={manufacturers} platforms={platforms} />
        <ProductList>
          {productIds.map((productId, i) => (
            <Item key={productId} style={cascade(i)} productId={productId} />
          ))}
        </ProductList>
      </div>
    </div>
  );
}
