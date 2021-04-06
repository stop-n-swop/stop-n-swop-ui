import type { Status as IStatus } from '@sns/contracts/order';
import type { Audit } from '@sns/contracts/listing';
import React from 'react';
import Buyer from '../Buyer';
import History from '../History';
import Status from '../Status';
import ViewLink from '../ViewLink';

interface Props {
  productId: string;
  listingId: string;
  status: IStatus;
  buyer: string;
  seller: string;
  history: Audit;
  createdDate: Date;
}

export default function Overview({
  productId,
  listingId,
  status,
  buyer,
  seller,
  history,
  createdDate,
}: Props) {
  return (
    <div className="space-y-8 lg:w-1/2">
      <div className="space-y-8 flex flex-col lg:flex-row lg:space-y-0">
        <div className="lg:w-1/2">
          <Status status={status} />
        </div>
        <Buyer username={buyer} />
      </div>
      <ViewLink listingId={listingId} productId={productId} />
      <History username={seller} createdDate={createdDate} history={history} />
    </div>
  );
}
