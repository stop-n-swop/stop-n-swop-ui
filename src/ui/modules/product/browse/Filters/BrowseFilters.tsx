import type { Manufacturer, Platform } from '@sns/contracts/product';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Checkbox, CheckboxGroup, CheckboxGroupItem } from 'ui/elements/check';
import { ids } from 'ui/messages';
import { Filter, Filters } from '../../filters';

interface Props {
  manufacturers: Manufacturer[];
  platforms: Platform[];
}

export default function BrowseFilters({ manufacturers, platforms }: Props) {
  return (
    <Filters>
      <Filter
        name="preferences"
        label={<FormattedMessage id={ids.products.filters.preferences.label} />}
      >
        <Checkbox
          label={
            <FormattedMessage
              id={ids.products.filters.preferences.favourites}
            />
          }
          value={false}
          onChange={() => null}
          className="mb-3"
        />
        <Checkbox
          label={
            <FormattedMessage id={ids.products.filters.preferences.available} />
          }
          value
          onChange={() => null}
        />
      </Filter>
      <Filter
        name="manufacturer"
        label={
          <FormattedMessage id={ids.products.filters.manufacturer.label} />
        }
      >
        <CheckboxGroup value={['Nintendo']} onChange={() => null}>
          {manufacturers.map(({ id, name }) => (
            <CheckboxGroupItem key={id} label={name} value={id} />
          ))}
        </CheckboxGroup>
      </Filter>
      <Filter
        name="platform"
        label={<FormattedMessage id={ids.products.filters.platform.label} />}
      >
        <CheckboxGroup value={[]} onChange={() => null} limit={5}>
          {platforms.map(({ name, productId: id }) => (
            <CheckboxGroupItem key={id} label={name} value={id} />
          ))}
        </CheckboxGroup>
      </Filter>
    </Filters>
  );
}
