import { ulid } from 'ulid';
import {
  AddToBasketRequest,
  AddToBasketResponse,
  Status,
} from '@sns/contracts/basket';
import jpex from 'jpex';
import type { GetTokens } from 'core/auth';
import type { AddToBasket, FetchMyBasket } from 'core/basket';
import type { AuthDriver, Persist } from 'core/io';

const addToBasket =
  (
    getTokens: GetTokens,
    persist: Persist,
    fetchBasket: FetchMyBasket,
    driver: AuthDriver,
  ): AddToBasket =>
  async ({ listingId }) => {
    const { authToken } = await getTokens();
    if (authToken) {
      await driver<AddToBasketRequest, AddToBasketResponse>({
        method: 'POST',
        url: '/baskets/my/items',
        data: { listingId },
      });
      return;
    }
    let basket = await fetchBasket();

    if (basket == null) {
      basket = {
        id: ulid(),
        status: Status.LOCAL_ONLY,
        items: [],
      };
    }

    basket.items.push({
      id: ulid(),
      listingId,
    });

    persist.set('basket', basket);
  };

jpex.factory<AddToBasket>(addToBasket);
