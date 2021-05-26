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
} from './keys';

export default function useExchanges() {
  useExchange(
    [
      [TokensKey, UserKey],
      [LogInKey, AuthKey, LogOutKey],
    ],
    [UserKey, UpdateUserKey],
    [[ListingsKey, MyListingsKey], CreateListingKey],
  );
}
