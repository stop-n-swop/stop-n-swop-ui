import { useAction } from '@respite/action';
import { encase } from 'react-jpex';
import type { CompleteCard, CreateCard } from 'core/payments';

type Args = {
  cardNumber: string;
  cvc: string;
  expiry: string;
};

export const useCreateCard = encase(
  (createCard: CreateCard, completeCard: CompleteCard) => () => {
    return useAction(async ({ cardNumber, cvc, expiry }: Args) => {
      const { cardRegistrationUrl, id, accessKey, preregistrationData } =
        await createCard();
      const result = await completeCard({
        accessKey,
        cardRegistrationUrl,
        id,
        preregistrationData,
        cardNumber,
        cvc,
        expiry,
      });
      return result;
    }, []);
  },
);
