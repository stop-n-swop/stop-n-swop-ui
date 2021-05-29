import jpex from 'jpex';
import type { GetTokens } from 'core/auth';
import type { FetchMyBasket } from 'core/basket';
import type { Persist } from 'core/io';
import type { Basket } from '@sns/contracts/basket';

const fetchMyBasket =
  (getTokens: GetTokens, persist: Persist): FetchMyBasket =>
  async () => {
    const { authToken } = await getTokens();
    if (authToken) {
      // TODO: fetch basket from api
      return null;
    }

    const basket = await persist.get<Basket>('basket');

    return basket;
  };

jpex.factory<FetchMyBasket>(fetchMyBasket);
