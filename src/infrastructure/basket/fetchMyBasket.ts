import jpex from 'jpex';
import type { GetTokens } from 'core/auth';
import type { FetchMyBasket } from 'core/basket';
import type { AuthDriver, Persist } from 'core/io';
import type {
  Basket,
  FetchBasketRequest,
  FetchBasketResponse,
} from '@sns/contracts/basket';

const fetchMyBasket =
  (getTokens: GetTokens, persist: Persist, driver: AuthDriver): FetchMyBasket =>
  async () => {
    const { authToken } = await getTokens();
    if (authToken) {
      const { data: basket } = await driver<
        FetchBasketRequest,
        FetchBasketResponse
      >({
        url: '/baskets/my',
      });
      return basket;
    }

    const basket = await persist.get<Basket>('basket');

    return basket;
  };

jpex.factory<FetchMyBasket>(fetchMyBasket);
