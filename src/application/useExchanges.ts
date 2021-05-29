import { useExchange } from '@respite/exchange';
import {
  LogInKey,
  TokensKey,
  AuthKey,
  LogOutKey,
  UserKey,
  UpdateUserKey,
  ListingsKey,
  CreateListingKey,
  MyListingsKey,
  ListingKey,
  ListingCountKey,
  ListingHistoryKey,
  AddToBasketKey,
  BasketKey,
} from './keys';

export default function useExchanges() {
  useExchange(
    [
      [TokensKey, UserKey, BasketKey],
      [LogInKey, AuthKey, LogOutKey],
    ],
    [UserKey, UpdateUserKey],
    [
      [
        ListingsKey,
        ListingKey,
        MyListingsKey,
        ListingCountKey,
        ListingHistoryKey,
      ],
      CreateListingKey,
    ],
    [BasketKey, AddToBasketKey],
  );
}
