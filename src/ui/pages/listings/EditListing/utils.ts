import { useEffect } from 'react';
import { useUpdateListing } from 'application/listings';
import { makeMyListingPath } from 'ui/constants/paths';
import { useHistory } from 'react-router-dom';
import type { Listing } from '@sns/contracts/listing';
import type { Values } from 'ui/modules/listings/new/types';
import type { Step } from 'ui/modules/listings/new/machine';

export const useOnSubmit = ({
  productId,
  listingId,
}: {
  productId: string;
  listingId: string;
}) => {
  const { action, error } = useUpdateListing();

  const onSubmit = async ({
    boxed,
    condition,
    description,
    images,
    instructions,
    postage,
    price,
    region,
  }: Values) => {
    await action({
      id: listingId,
      productIds: [productId],
      currency: 'GBP',
      description,
      images: Object.fromEntries(
        Object.entries(images).filter(([, value]) => value),
      ),
      postage,
      price,
      stats: {
        boxed,
        condition,
        instructions,
        region,
      },
    });
  };

  return [onSubmit, error] as const;
};

export const getDefaultValues = (listing: Listing): Values => ({
  boxed: listing.stats.boxed,
  condition: listing.stats.condition,
  description: listing.description,
  images: listing.images,
  instructions: listing.stats.instructions,
  price: listing.price,
  region: listing.stats.region,
  postage: listing.postage,
});

export const useRedirectOnDone = ({
  step,
  listingId,
}: {
  step: Step;
  listingId: string;
}) => {
  const { push } = useHistory();

  useEffect(() => {
    if (step === 'done') {
      push(makeMyListingPath({ listingId }));
    }
  }, [listingId, push, step]);
};
