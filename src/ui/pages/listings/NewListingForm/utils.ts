import { makeNewListingCompletePath } from 'ui/constants/paths';
import type { useCreateListing } from 'application/listings/useCreateListing';
import type { Values } from 'ui/modules/listings/new/types';

export const useOnSubmit = ({
  create,
  productId,
  platformId,
  push,
}: {
  productId: string;
  platformId: string;
  create: ReturnType<typeof useCreateListing>['action'];
  push(to: string): void;
}) => {
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
    const { id: listingId } = await create({
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
      productIds: [productId],
    });
    push(
      makeNewListingCompletePath({
        listingId,
        platformId,
        productId,
      }),
    );
  };
  return onSubmit;
};
