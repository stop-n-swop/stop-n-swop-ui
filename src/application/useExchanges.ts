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
  HistoryKey,
  AddToBasketKey,
  BasketKey,
  UpdateListingKey,
  MyOrdersKey,
  SubmitBasketKey,
  ListingOrdersKey,
  ChangeStatusKey,
  ChangeListingStatusKey,
  AddressKey,
} from './keys';

export default function useExchanges() {
  useExchange(
    [
      [TokensKey, UserKey, BasketKey],
      [LogInKey, AuthKey, LogOutKey],
    ],
    [UserKey, UpdateUserKey],
    [
      [ListingsKey, ListingKey, MyListingsKey, ListingCountKey, HistoryKey],
      [CreateListingKey, UpdateListingKey],
    ],
    [BasketKey, AddToBasketKey],
    [
      [
        MyOrdersKey,
        ListingOrdersKey,
        BasketKey,
        ListingsKey,
        ListingKey,
        ListingCountKey,
        HistoryKey,
      ],
      SubmitBasketKey,
    ],
    [
      [
        ListingsKey,
        ListingKey,
        MyListingsKey,
        ListingCountKey,
        HistoryKey,
        MyOrdersKey,
        ListingOrdersKey,
        AddressKey,
      ],
      [ChangeStatusKey, ChangeListingStatusKey],
    ],
  );
}
