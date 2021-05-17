import type { useCreateListing } from 'application/listings/useCreateListing';
import type { Values } from 'ui/modules/listings/new/types';

export const useOnSubmit = ({
  create,
  productId,
  platformId,
}: {
  productId: string;
  platformId: string;
  create: ReturnType<typeof useCreateListing>['action'];
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
    await create({
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
      products: [
        {
          platformId,
          productId,
        },
      ],
    });
  };
  return onSubmit;
};
