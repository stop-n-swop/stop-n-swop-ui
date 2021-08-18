import { Condition, Region } from '@sns/contracts/listing';
import React from 'react';
import { useGetCurrency, useGetMessage } from 'ui/intl';
import { Checkbox, CheckboxGroup, CheckboxGroupItem } from 'ui/elements/check';
import { ids } from 'ui/messages';
import { Filter, Filters } from 'ui/modules/product/filters';
import { Controller } from 'react-hook-form';
// import StarFilter from './StarFilter';

const priceRanges = [
  [0, 1000],
  [1000, 5000],
  [5000, 10000],
  [10000, Infinity],
];

export default function ListingsFilters() {
  const getMessage = useGetMessage();
  const getCurrency = useGetCurrency();

  return (
    <Filters>
      <Filter
        name="features"
        label={getMessage(ids.listings.filters.features.label)}
      >
        <Controller
          name="features"
          defaultValue={[]}
          render={({ field: { value, onChange } }) => (
            <CheckboxGroup value={value} onChange={onChange} limit={5}>
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
          )}
        />
      </Filter>
      <Filter
        name="condition"
        label={getMessage(ids.listings.filters.condition.label)}
      >
        <Controller
          name="condition"
          defaultValue={[]}
          render={({ field: { value, onChange } }) => (
            <CheckboxGroup value={value} onChange={onChange} limit={5}>
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
          )}
        />
      </Filter>
      <Filter name="price" label={getMessage(ids.listings.filters.price.label)}>
        <Controller
          name="priceRange"
          defaultValue={[]}
          render={({ field: { value, onChange } }) => {
            const min = value[0] ?? Infinity;
            const max = value[1] ?? -Infinity;
            return (
              <div className="space-y-3">
                {priceRanges.map((range) => {
                  const [from, to] = range;
                  const label =
                    to === Infinity
                      ? `${getCurrency(from)}+`
                      : `${getCurrency(from)} - ${getCurrency(to)}`;
                  const checked = from >= min && to <= max;

                  return (
                    <Checkbox
                      value={checked}
                      label={label}
                      onChange={(checked) => {
                        const newValue = [min, max];
                        if (checked) {
                          if (from < min) {
                            newValue[0] = from;
                          }
                          if (to > max) {
                            newValue[1] = to;
                          }
                        } else {
                          if (from === min) {
                            if (to < max) {
                              newValue[0] = to;
                            } else {
                              newValue[0] = null;
                            }
                          } else {
                            newValue[0] = to;
                          }
                          if (to === max) {
                            if (from > min) {
                              newValue[1] = from;
                            } else {
                              newValue[1] = null;
                            }
                          }
                        }
                        onChange(newValue);
                      }}
                    />
                  );
                })}
              </div>
            );
          }}
        />
      </Filter>
      <Filter
        name="region"
        label={getMessage(ids.listings.filters.region.label)}
      >
        <Controller
          name="region"
          defaultValue={[]}
          render={({ field: { value, onChange } }) => (
            <CheckboxGroup value={value} onChange={onChange}>
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
          )}
        />
      </Filter>
      {/* TODO: reimplement star rating */}
      {/* <Filter
        name="rating"
        label={getMessage(ids.listings.filters.rating.label)}
      >
        <Controller
          name="rating"
          defaultValue={0}
          render={({ field: { value, onChange } }) => (
            <StarFilter value={value} onChange={onChange} />
          )}
        />
      </Filter> */}
    </Filters>
  );
}
