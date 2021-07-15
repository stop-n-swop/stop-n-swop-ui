import jpex from 'jpex';
import type { CreateCard } from 'core/payments';
import type { AuthDriver } from 'core/io';
import type {
  CreateCardRequest,
  CreateCardResponse,
} from '@sns/contracts/payment';

jpex.factory<CreateCard>(
  (driver: AuthDriver): CreateCard =>
    async () => {
      const { data } = await driver<CreateCardRequest, CreateCardResponse>({
        url: '/users/my/cards',
        method: 'POST',
      });

      return data;
    },
);
