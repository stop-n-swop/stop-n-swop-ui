import React from 'react';
import { useMessage } from 'ui/intl';
import Card from 'ui/elements/Card';
import PageTitle from 'ui/elements/PageTitle';
import { ids } from 'ui/messages';
import PlatformFinder from 'ui/modules/listings/new/Platform';
import type { Platform } from '@sns/contracts/product';

interface Props {
  platformId: string;
  results: Platform[];
  onSearch(value: string): void;
  setPlatformId(value: string): void;
}

export default function NewListing({
  platformId,
  results,
  onSearch,
  setPlatformId,
}: Props) {
  return (
    <div className="flex-grow flex flex-col relative">
      <PageTitle>{useMessage(ids.listings.new.pageTitle)}</PageTitle>
      <Card
        title={useMessage(ids.listings.new.title)}
        className="lg:absolute lg:left-1/2 lg:top-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 lg:transform w-full xl:w-4/5"
      >
        <PlatformFinder
          platformId={platformId}
          results={results}
          onSearch={onSearch}
          setPlatformId={setPlatformId}
        />
      </Card>
    </div>
  );
}
