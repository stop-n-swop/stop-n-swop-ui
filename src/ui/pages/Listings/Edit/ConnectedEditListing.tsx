import { Condition, Region, Listing } from '@sns/contracts/listing';
import React, { useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import cartridge from 'ui/assets/s-l640.jpg';
import cartridge2 from 'ui/assets/cartridge-back.jpg';
import cartridge3 from 'ui/assets/Super_Mario_64_Boxart.png';
import useMachine from 'ui/modules/listings/new/machine';
import type { Values } from 'ui/modules/listings/new/types';
import { MY_LISTINGS } from 'ui/constants/paths';
import { useAuthGuard } from 'usecases/auth';
import EditListing from './EditListing';

const listing: Listing = {
  listingId: 'sm64_001',
  description: '',
  location: 'London, UK',
  price: 50,
  productId: 'super_mario_64',
  rating: 3.5,
  stats: {
    boxed: false,
    condition: Condition.POOR,
    region: Region.PAL,
    instructions: false,
  },
  username: 'seller1337',
  images: [cartridge, cartridge2, cartridge3],
  createdDate: new Date('2021-03-30'),
};

export default function ConnectedEditListing() {
  useAuthGuard();
  const { push } = useHistory();
  const { productId, listingId } = useParams<{
    productId: string;
    listingId: string;
  }>();
  const onSubmit = async (values: Values) => {
    // eslint-disable-next-line no-console
    console.log(values);
    return new Promise((res) => {
      setTimeout(res, 2000);
    });
  };
  const formProps = useForm<Values>({
    defaultValues: {
      boxed: listing.stats.boxed,
      condition: listing.stats.condition,
      description: listing.description,
      images: listing.images,
      instructions: listing.stats.instructions,
      price: listing.price,
      region: listing.stats.region,
    },
  });

  const [step, dispatch] = useMachine('condition', { onSubmit });
  const name = 'Super Mario 64';

  useEffect(() => {
    if (step === 'done') {
      push(MY_LISTINGS);
    }
  }, [push, step]);

  return (
    <FormProvider {...formProps}>
      <EditListing
        listingId={listingId}
        productId={productId}
        dispatch={dispatch}
        step={step}
        name={name}
        location="London, UK"
        username="seller1337"
      />
    </FormProvider>
  );
}
