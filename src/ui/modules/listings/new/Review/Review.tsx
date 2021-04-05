import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';
import Button from 'ui/elements/Button';
import { ids } from 'ui/messages';
import { Actions, ListingsItem } from 'ui/modules/listings/listings';
import Buttons from '../Buttons';
import { Values } from '../types';

interface Props {
  username: string;
  location: string;
  previous(): void;
}

export default function Review({ username, location, previous }: Props) {
  const { getValues } = useFormContext<Values>();
  const { boxed, condition, instructions, price, region, images } = getValues();

  return (
    <div>
      <h3 className="text-lg">
        <FormattedMessage id={ids.listings.new.review.title} />
      </h3>
      <div className="my-12">
        <ListingsItem
          image={images[0]}
          location={location}
          rating={2.5}
          username={username}
          style={{}}
          stats={{
            boxed,
            condition,
            instructions,
            region,
          }}
        >
          <Actions listingId="" price={price} productId="" readonly />
        </ListingsItem>
      </div>
      <Buttons previous={previous} showNext={false}>
        <Button kind="primary" type="submit">
          <FormattedMessage id={ids.listings.new.review.submit} />
        </Button>
      </Buttons>
    </div>
  );
}
