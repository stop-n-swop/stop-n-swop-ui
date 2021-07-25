import { useExchange } from '@respite/exchange';
import {
  TokensKey,
  AuthKey,
  UserKey,
  UpdateUserKey,
  ListingsKey,
  CreateListingKey,
  MyListingsKey,
  ListingKey,
  ListingCountKey,
  HistoryKey,
  UpdateListingKey,
  MyOrdersKey,
  ListingOrdersKey,
  ChangeStatusKey,
  ChangeListingStatusKey,
  AddressKey,
  CreateOrderKey,
  PatchOrderKey,
  SaveBankKey,
  UploadKycKey,
  PlaceOrderKey,
  CardsKey,
  CreateCardKey,
  BalanceKey,
  WithdrawBalanceKey,
  TransactionsKey,
} from './keys';

export default function useExchanges() {
  useExchange(
    [[TokensKey, UserKey], [AuthKey]],
    [UserKey, [UpdateUserKey, SaveBankKey, UploadKycKey]],
    [
      [ListingsKey, ListingKey, MyListingsKey, ListingCountKey, HistoryKey],
      [CreateListingKey, UpdateListingKey],
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
      [ChangeStatusKey, ChangeListingStatusKey, PatchOrderKey],
    ],
    [[MyOrdersKey], [CreateOrderKey]],
    [[MyOrdersKey, ListingsKey, HistoryKey], [PlaceOrderKey]],
    [CardsKey, CreateCardKey],
    [[BalanceKey, TransactionsKey], [WithdrawBalanceKey]],
  );
}
