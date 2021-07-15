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
} from './keys';

export default function useExchanges() {
  useExchange(
    [
      [TokensKey, UserKey],
      [LogInKey, AuthKey, LogOutKey],
    ],
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
  );
}
