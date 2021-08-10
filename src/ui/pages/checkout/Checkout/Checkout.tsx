/* eslint-disable */
import { useGame } from 'application/games';
import { useListing } from 'application/listings';
import { useCreateOrder } from 'application/orders';
import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { makeContinueCheckoutPath } from 'ui/constants/paths';
import Price from 'ui/modules/checkout/intro/Price';
import Screen from 'ui/modules/checkout/intro/Screen';
import HowItWorks from 'ui/modules/checkout/intro/HowItWorks';
import Controls from 'ui/modules/checkout/intro/Controls';
import ProtectionModal from 'ui/modules/checkout/intro/ProtectionModal';
import { useAuthGuard } from 'application/auth';

export default function CheckoutPage() {
  useAuthGuard({ username: true });
  const { listingId } = useParams<{ listingId: string }>();
  const { data: listing } = useListing({ id: listingId });
  const { data: game } = useGame({ id: listing.productIds[0] });
  const { id: productId } = game;
  const { action: createOrder, submitting, error } = useCreateOrder();
  const { push } = useHistory();
  const [protectionModalOpen, setProtectionModalOpen] = useState(false);

  const handleClick = async () => {
    const { orderId } = await createOrder({ listingId });
    push(makeContinueCheckoutPath({ orderId }));
  };

  return (
    <Screen
      game={game}
      listing={listing}
      error={error}
      price={
        <Price
          listing={listing}
          openProtectionModal={() => setProtectionModalOpen(true)}
        />
      }
      howItWorks={<HowItWorks />}
      controls={
        <Controls
          listingId={listingId}
          productId={productId}
          submitting={submitting}
          onClick={handleClick}
        />
      }
    >
      <ProtectionModal
        isOpen={protectionModalOpen}
        onClose={() => setProtectionModalOpen(false)}
      />
    </Screen>
  );
}
