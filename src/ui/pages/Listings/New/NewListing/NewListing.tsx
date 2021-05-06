import React from 'react';
import { useMessage } from 'ui/intl';
import Card from 'ui/elements/Card';
import PageTitle from 'ui/elements/PageTitle';
import { ids } from 'ui/messages';
import Intro from 'ui/modules/listings/new/Intro';

interface Props {
  productId: string;
  platformId: string;
  results: any[];
  onSearch(value: string): void;
  setProductId(value: string): void;
}

export default function NewListing({
  productId,
  platformId,
  results,
  onSearch,
  setProductId,
}: Props) {
  return (
    <div className="flex-grow flex flex-col relative">
      <PageTitle>{useMessage(ids.listings.new.pageTitle)}</PageTitle>
      <Card className="lg:absolute lg:left-1/2 lg:top-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 lg:transform w-full xl:w-4/5">
        <Intro
          productId={productId}
          platformId={platformId}
          results={results}
          onSearch={onSearch}
          setProductId={setProductId}
        />
      </Card>
    </div>
  );
}
