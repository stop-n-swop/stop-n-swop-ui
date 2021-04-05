import { Status } from 'core/constants/order';

export interface Order {
  listingId: string;
  username: string;
  status: Status;
}
