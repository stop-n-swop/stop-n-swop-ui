import React from 'react';
import { Link } from 'react-router-dom';
import { makeNewListingPlatformPath } from 'ui/constants/paths';
import Button from 'ui/elements/Button';
import Typeahead from 'ui/elements/Typeahead';
import { useGetMessage } from 'ui/intl';
import { ids } from 'ui/messages';
import type { Platform } from '@sns/contracts/product';

interface Props {
  onSearch(value: string): void;
  platformId: string;
  setPlatformId(value: string): void;
  results: Platform[];
}

export default function PlatformFinder({
  onSearch,
  platformId,
  setPlatformId,
  results,
}: Props) {
  const options = results.map((platform) => ({
    value: platform.id,
    label: platform.name,
  }));
  const getMessage = useGetMessage();

  return (
    <div>
      <h2 className="text-lg">{getMessage(ids.listings.new.title)}</h2>
      <Typeahead
        id="platform_search"
        options={options}
        value={platformId}
        onChange={setPlatformId}
        onSearch={onSearch}
        autoFocus
        label={getMessage(ids.listings.new.platform.label)}
      />
      <If condition={Boolean(platformId)}>
        <div className="mt-10 flex justify-center">
          <Button
            component={Link}
            kind="primary"
            to={makeNewListingPlatformPath({ platformId })}
          >
            <span>{getMessage(ids.listings.new.platform.button)}</span>
          </Button>
        </div>
      </If>
    </div>
  );
}
