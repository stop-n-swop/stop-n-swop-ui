import React from 'react';
import { useFormContext } from 'react-hook-form';
import { useGetMessage } from 'ui/intl';
import Button from 'ui/elements/Button';
import { ids } from 'ui/messages';
import { Actions, ListingsItem } from 'ui/modules/listings/listings';
import Buttons from '../Buttons';
import type { Values } from '../types';

interface Props {
  username: string;
  location: string;
  previous(): void;
}

export default function Review({ username, location, previous }: Props) {
  const { getValues } = useFormContext<Values>();
  const { boxed, condition, instructions, price, region, images, postage } =
    getValues();
  const getMessage = useGetMessage();

  return (
    <div>
      <div className="my-12">
        <ListingsItem
          image={Object.values(images)[0]}
          location={location}
          rating={0}
          username={username}
          style={{}}
          stats={{
            boxed,
            condition,
            instructions,
            region,
          }}
        >
          <Actions
            listingId=""
            price={price}
            productId=""
            currency="GBP"
            postage={postage}
            readonly
            addToBasket={null}
          />
        </ListingsItem>
      </div>
      <Buttons previous={previous} showNext={false}>
        <Button kind="primary" type="submit">
          {getMessage(ids.listings.new.review.submit)}
        </Button>
      </Buttons>
    </div>
  );
}
