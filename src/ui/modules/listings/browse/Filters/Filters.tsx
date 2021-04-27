import { Condition, Region } from '@sns/contracts/listing';
import React from 'react';
import { useGetMessage } from 'ui/intl';
import { CheckboxGroup, CheckboxGroupItem } from 'ui/elements/check';
import { ids } from 'ui/messages';
import { Filter, Filters } from 'ui/modules/product/filters';
import StarFilter from './StarFilter';

export default function ListingsFilters() {
  const getMessage = useGetMessage();

  return (
    <Filters>
      <Filter
        name="features"
        label={getMessage(ids.listings.filters.features.label)}
      >
        <CheckboxGroup
          value={['boxed', 'instructions']}
          onChange={() => null}
          limit={5}
        >
          <CheckboxGroupItem
            label={getMessage(ids.listings.filters.features.boxed)}
            value="boxed"
          />
          <CheckboxGroupItem
            label={getMessage(ids.listings.filters.features.unboxed)}
            value="unboxed"
          />
          <CheckboxGroupItem
            label={getMessage(ids.listings.filters.features.instructions)}
            value="instructions"
          />
        </CheckboxGroup>
      </Filter>
      <Filter
        name="condition"
        label={getMessage(ids.listings.filters.condition.label)}
      >
        <CheckboxGroup value={[]} onChange={() => null} limit={5}>
          <CheckboxGroupItem
            label={getMessage(ids.conditions.mint)}
            value={Condition.MINT}
          />
          <CheckboxGroupItem
            label={getMessage(ids.conditions.likeNew)}
            value={Condition.LIKE_NEW}
          />
          <CheckboxGroupItem
            label={getMessage(ids.conditions.used)}
            value={Condition.USED}
          />
          <CheckboxGroupItem
            label={getMessage(ids.conditions.poor)}
            value={Condition.POOR}
          />
        </CheckboxGroup>
      </Filter>
      <Filter name="price" label={getMessage(ids.listings.filters.price.label)}>
        <CheckboxGroup value={[]} onChange={() => null}>
          <CheckboxGroupItem label="£0 - £1,000,000" value={[0, 1000000]} />
        </CheckboxGroup>
      </Filter>
      <Filter
        name="region"
        label={getMessage(ids.listings.filters.region.label)}
      >
        <CheckboxGroup value={[]} onChange={() => null}>
          <CheckboxGroupItem
            label={getMessage(ids.regions.pal)}
            value={Region.PAL}
          />
          <CheckboxGroupItem
            label={getMessage(ids.regions.ntscu)}
            value={Region.NTSCU}
          />
          <CheckboxGroupItem
            label={getMessage(ids.regions.ntscc)}
            value={Region.NTSCC}
          />
          <CheckboxGroupItem
            label={getMessage(ids.regions.ntscj)}
            value={Region.NTSCJ}
          />
        </CheckboxGroup>
      </Filter>
      <Filter
        name="rating"
        label={getMessage(ids.listings.filters.rating.label)}
      >
        <StarFilter />
      </Filter>
    </Filters>
  );
}
