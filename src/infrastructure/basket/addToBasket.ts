import { ulid } from 'ulid';
import { Status } from '@sns/contracts/basket';
import jpex from 'jpex';
import type { GetTokens } from 'core/auth';
import type { AddToBasket, FetchMyBasket } from 'core/basket';
import type { Persist } from 'core/io';

const addToBasket =
  (
    getTokens: GetTokens,
    persist: Persist,
    fetchBasket: FetchMyBasket,
  ): AddToBasket =>
  async ({ listingId }) => {
    const { authToken } = await getTokens();
    if (authToken) {
      // TODO: add to basket via api
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
